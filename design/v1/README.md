# Homepage Visual Design V1

Date: 2026-10-16

## Preview

Open `index.html` directly in a browser. Fonts, images, icons, and scripts are local; the homepage preview does not require a development server.

This is the original standalone homepage design prototype. The production React implementation now lives in the repository's `src/` directory and is previewed with `npm run dev`. Use that preview to navigate to the rebuilt case studies.

## Design Decisions

- English content for technical peers and the open-source community.
- The person's name is the primary headline, with the engineering statement below.
- A full-width graphite sculpture image anchors the hero, with muted cyan reflections.
- Neutral charcoal surfaces, off-white text, thin separators, and open space carry the rest of the page.
- Five modules: Hero, About, Selected Work, Field Notes, and Contact.
- Existing projects, contact information, results, and experience are retained.
- Experience expands in place. Notes uses an honest empty state.
- Mobile navigation supports Escape, focus restoration, and closing after navigation.
- Interaction is limited to native scrolling, hover states, menu expansion, and the experience disclosure. Reduced-motion preferences disable smooth scrolling and transitions.

## Exports

The local `exports/` directory is ignored by Git.

| File | Format |
| --- | --- |
| `home-hero-8k.png` | 7680 x 4320, rendered at a 1920 x 1080 CSS viewport with 4x density |
| `home-full-8k.png` | Full homepage at 7680px width, 4x density |
| `home-mobile.png` | Full homepage at 1170px width, a 390px CSS viewport with 3x density |
| `home-overview.png` | 1440px-wide overview for convenient review |
| `checks.json` | Layout, assets, and interaction verification results |

The browser renders text and UI at the target density. The generated hero bitmap is 1672 x 941, so the 8K screenshot canvas does not imply an 8K source photograph. A higher-resolution art master can be produced after the visual direction is approved.

## Assets

- `hero-sculpture.webp`: generated specifically for this design, optimized from the generated PNG.
- `project-*.webp`: optimized copies of the existing site's three concept illustrations. Their dark treatment is applied with CSS; these are not product screenshots.
- `inter-*.woff2`: Inter Latin, distributed through `@fontsource/inter`. License included as `INTER-LICENSE.txt`.
- Arrow and menu icons: `lucide-static`. License included as `LUCIDE-LICENSE.txt`.

The high-resolution generated original is ignored by Git. Browser dependencies and export scripts are installed under `/Users/yafei.shuai/personal/.tools/site-design/`; browser downloads and temporary files use Personal-local caches.

## Review Focus

This prototype records the hero composition, typography, reading rhythm, project presentation, and mobile layout. The React implementation carries this direction into reusable components, structured content, and the Pages deployment pipeline.
