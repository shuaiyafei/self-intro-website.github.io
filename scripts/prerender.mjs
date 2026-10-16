import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage, routes } from "../.ssr/entry-server.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = path.join(root, "dist");
const template = await readFile(path.join(output, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("Missing prerender root.");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character],
  );

for (const route of routes) {
  const page = renderPage(route);
  const canonical = `${page.siteUrl}${page.path}`;
  const head = `
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="${page.noindex ? "noindex,follow" : "index,follow"}" />
    <link rel="canonical" href="${escape(canonical)}" />
    <meta property="og:title" content="${escape(page.title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:type" content="${page.type}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(page.image)}" />
    <meta property="og:site_name" content="Yafei Shuai" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify(page.person).replace(/</g, "\\u003c")}</script>
  `;
  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
    .replace("</head>", `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);
  const filename = route.endsWith(".html") ? route.slice(1) : `${route.slice(1)}index.html`;
  const destination = path.join(output, filename);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const indexed = routes.filter((route) => route !== "/404.html");
const siteUrl = renderPage("/").siteUrl;
await writeFile(
  path.join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexed.map((route) => `<url><loc>${escape(`${siteUrl}${route}`)}</loc></url>`).join("")}</urlset>\n`,
);
await writeFile(
  path.join(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile(path.join(output, ".nojekyll"), "");
console.log(`Prerendered ${routes.length} React pages into dist/.`);
