import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const source = process.env.GITHUB_SHA;
if (!token || !repository || !source)
  throw new Error("This script runs inside the publishing workflow.");
if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || !/^[a-f0-9]{40}$/.test(source)) {
  throw new Error("Invalid repository or source revision.");
}
const output = fileURLToPath(new URL("../dist", import.meta.url));
await writeFile(
  path.join(output, "build-info.json"),
  `${JSON.stringify({ source, repository, sourceUrl: `https://github.com/${repository}/commit/${source}` }, null, 2)}\n`,
);

async function api(method, endpoint, data, allowMissing = false) {
  const response = await fetch(`https://api.github.com/repos/${repository}${endpoint}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  if (allowMissing && response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub ${method} ${endpoint} failed (${response.status}).`);
  return response.status === 204 ? null : response.json();
}

async function files(directory, prefix = "") {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink in build output: ${relative}`);
    if (entry.isDirectory())
      result.push(...(await files(path.join(directory, entry.name), relative)));
    else if (entry.isFile()) result.push(relative);
  }
  return result.sort();
}

const previous = await api("GET", "/git/ref/heads/gh-pages", undefined, true);
const tree = [];
for (const filename of await files(output)) {
  const blob = await api("POST", "/git/blobs", {
    content: (await readFile(path.join(output, filename))).toString("base64"),
    encoding: "base64",
  });
  tree.push({ path: filename, mode: "100644", type: "blob", sha: blob.sha });
}
// A new root tree omits stale pages while retaining the branch's commit history.
const rootTree = await api("POST", "/git/trees", { tree });
const commit = await api("POST", "/git/commits", {
  message: `Build site from ${source.slice(0, 12)}\n\nSource: https://github.com/${repository}/commit/${source}`,
  tree: rootTree.sha,
  parents: previous ? [previous.object.sha] : [],
  author: {
    name: "github-actions[bot]",
    email: "41898282+github-actions[bot]@users.noreply.github.com",
  },
});
if (previous) await api("PATCH", "/git/refs/heads/gh-pages", { sha: commit.sha, force: false });
else await api("POST", "/git/refs", { ref: "refs/heads/gh-pages", sha: commit.sha });
console.log(`Archived ${tree.length} build files on gh-pages at ${commit.sha}.`);
