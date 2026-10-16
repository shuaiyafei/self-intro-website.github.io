import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export async function loadNotes(directory) {
  const notes = [];
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai" }).format(new Date());
  for (const filename of (await readdir(directory)).filter(
    (name) => name.endsWith(".md") && name !== "README.md",
  )) {
    const slug = filename.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(
        `Invalid note filename: ${filename}. Use lowercase words separated by hyphens.`,
      );
    }
    const { data, content } = matter(await readFile(path.join(directory, filename), "utf8"));
    if (data.draft !== undefined && typeof data.draft !== "boolean") {
      throw new Error(`${filename}: draft must be true or false.`);
    }
    if (data.draft === true) continue;
    for (const field of ["title", "description", "date"]) {
      if (typeof data[field] !== "string" || !data[field].trim()) {
        throw new Error(
          `${filename}: ${field} must be a nonempty string. Quote dates as YYYY-MM-DD.`,
        );
      }
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
      !Number.isFinite(Date.parse(data.date)) ||
      new Date(data.date).toISOString().slice(0, 10) !== data.date
    ) {
      throw new Error(`${filename}: invalid publication date.`);
    }
    if (
      data.tags !== undefined &&
      (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string"))
    ) {
      throw new Error(`${filename}: tags must be a list of strings.`);
    }
    if (!content.trim()) throw new Error(`${filename}: article body must not be empty.`);
    if (data.date > today) continue;
    const html = sanitizeHtml(await marked.parse(content), {
      allowedTags: [...sanitizeHtml.defaults.allowedTags, "img"],
      allowedAttributes: {
        a: ["href", "title"],
        img: ["src", "alt", "width", "height"],
        code: ["class"],
      },
      allowedSchemes: ["http", "https", "mailto"],
      allowProtocolRelative: false,
    });
    notes.push({
      slug,
      title: data.title.trim(),
      description: data.description.trim(),
      date: data.date,
      tags: data.tags ?? [],
      html,
    });
  }
  return notes.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
