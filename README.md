# Yafei Shuai · Personal Site

React + TypeScript + Vite, with static HTML generated for GitHub Pages.

## Development

Use Node 24 and npm 11.6.0.

```sh
npm ci --ignore-scripts
npm run dev
```

The development server prints its local URL. It defaults to `http://127.0.0.1:5173`.

```sh
npm run build
npm run preview
```

`build` typechecks the source, builds the React client and server entry, then prerenders every public route into `dist/`. `preview` serves that production build.

## Source Structure

| Location | Purpose |
| --- | --- |
| `src/pages/` | Homepage, case study, notes, article, and 404 React views |
| `src/components/` | Shared navigation, footer, project, and notes components |
| `src/hooks/` | Desktop section paging and input handling |
| `src/data/profile.ts` | Personal introduction, contacts, and experience |
| `src/data/projects.ts` | The three migrated project case studies |
| `src/content/notes/` | Markdown articles and authoring instructions |
| `src/styles/` | Shared visual tokens, responsive layout, and page styles |
| `scripts/` | Markdown loading, static rendering, and artifact publishing |
| `public/` | Local images, fonts, licenses, favicon, and custom domain |
| `design/v1/` | Original homepage visual prototype and local design exports |
| `docs/` | Technical design and handover documentation |

## Source And Build In One Repository

- `main` stores the source code, content, lockfile, and workflow.
- `gh-pages` stores generated HTML, CSS, JavaScript, images, and `build-info.json`.
- GitHub Pages uses **GitHub Actions** as its publishing source. The workflow commits the build to `gh-pages`, then deploys those same files as a Pages artifact.

The Actions publishing source is intentional: committing with the workflow's `GITHUB_TOKEN` alone does not trigger a branch-based Pages build. Explicit deployment keeps the archived files and published site in sync without a personal access token.

Pull requests only build. A push to `main` or a manual workflow run on `main` archives and publishes the site. Action versions are pinned to commit SHAs.

## First Release

1. Review the local React build on a source branch before merging.
2. Before merging, in repository **Settings → Pages → Build and deployment**, select **GitHub Actions**. This prevents the legacy root-directory publisher from serving uncompiled source.
3. Preserve the custom domain `shuaiyafei.site`. The build also includes `public/CNAME`.
4. Merge the React source into `main` to trigger publishing. **Actions → Build and Publish Site → Run workflow** on `main` can retry the release.
5. Check the `gh-pages` branch, the deployment, and `build-info.json` against the source commit.
6. Confirm domain and certificate health, then enable **Enforce HTTPS** in Pages settings.

The workflow uses the automatically provided `GITHUB_TOKEN`. Publishing needs `contents: write`, `pages: write`, and `id-token: write`; repository or organization policies must permit them.

## Routes And Recovery

The build generates `/`, all three `/work/<slug>/` pages, `/notes/`, published note pages, and `/404.html`. Existing `/work/<slug>/index.html` URLs continue to work because each route has a real generated file. There is no catch-all SPA redirect.

Prerendered HTML includes the main content and metadata before JavaScript runs. React hydrates it for interactive navigation controls. The notes loader excludes drafts and future-dated posts and sanitizes Markdown HTML.

The header stays visible while scrolling on all screen sizes. Mobile keeps continuous scrolling with header-aware anchor offsets. On desktop (961px and wider), the homepage scrolls one section per wheel gesture, with native scrolling inside content taller than the viewport. Anchor links, keyboard navigation, and reduced-motion preferences remain supported; case studies and note pages use normal reading flow.

To roll back, revert the relevant source commit on `main` and rerun the workflow. The generated branch retains earlier deployment commits and records their source revisions. The previous hand-authored static site also remains in the original Git history at `4e5605a238a3dbecad4ff0f9f2404e0c09200171`; restoring it requires the old branch-based Pages configuration as well.

## Assets

The hero artwork was generated for this site. Project concept diagrams were migrated from the original site. Inter and Lucide license notices are in `public/licenses/`. Design exports and the high-resolution generated original are ignored by Git and are not part of the production bundle.

Official references: [React hydration](https://react.dev/reference/react-dom/client/hydrateRoot), [Vite static deployment](https://vite.dev/guide/static-deploy.html), [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), and [Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
