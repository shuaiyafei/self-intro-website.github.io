import { renderToString } from "react-dom/server";
import { App } from "./App";
import { pageMetadata, resolvePage } from "./routing";
import { profile } from "./data/profile";
export { routes } from "./routing";

export function renderPage(path: string) {
  const page = resolvePage(path);
  return {
    html: renderToString(<App path={path} />),
    ...pageMetadata(page),
    noindex: page.kind === "not-found",
    type: page.kind === "note" ? "article" : "website",
    siteUrl: profile.siteUrl,
    image: `${profile.siteUrl}/images/hero-sculpture.webp`,
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      url: profile.siteUrl,
      sameAs: [profile.github],
    },
  };
}
