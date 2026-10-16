import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { NotesPage, NotePage } from "./pages/NotesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { resolvePage } from "./routing";

export function App({ path }: { path: string }) {
  const page = resolvePage(path);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header home={page.kind === "home"} />
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
