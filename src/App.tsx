import { useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { NotesPage, NotePage } from "./pages/NotesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { resolvePage } from "./routing";

export function App({ path, restoreHash = false }: { path: string; restoreHash?: boolean }) {
  const page = resolvePage(path);
  useEffect(() => {
    if (!restoreHash || !window.location.hash) return;
    try {
      document
        .getElementById(decodeURIComponent(window.location.hash.slice(1)))
        ?.scrollIntoView({ block: "start", behavior: "instant" });
    } catch {
      // Ignore malformed fragments instead of interrupting the page.
    }
  }, [restoreHash]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        home={page.kind === "home"}
        section={
          page.kind === "project"
            ? "work"
            : page.kind === "note" || page.kind === "notes"
              ? "notes"
              : undefined
        }
      />
      <main id="main">
        {page.kind === "home" && <HomePage />}
        {page.kind === "project" && <ProjectPage project={page.project} />}
        {page.kind === "notes" && <NotesPage />}
        {page.kind === "note" && <NotePage note={page.note} />}
        {page.kind === "not-found" && <NotFoundPage />}
      </main>
    </>
  );
}
