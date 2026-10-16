import { ArrowLeft } from "lucide-react";
import notes from "virtual:notes";
import { Footer } from "../components/Footer";
import { NotesList, formatNoteDate } from "../components/NotesList";
import { ProjectTags } from "../components/ProjectCard";
import type { Note } from "../types";

export function NotesPage() {
  return (
    <div className="reading-page shell">
      <a className="text-link back-link" href="/#notes">
        <ArrowLeft className="icon" aria-hidden="true" />
        Back home
      </a>
      <p className="eyebrow">THINKING OUT LOUD</p>
      <h1>
        Field notes<span className="accent">.</span>
      </h1>
      <p className="case-lead">Notes on engineering, tools, and the things we make.</p>
      <div className="reading-content">
        <NotesList notes={notes} />
      </div>
      <Footer />
    </div>
  );
}

export function NotePage({ note }: { note: Note }) {
  return (
    <div className="reading-page shell">
      <a className="text-link back-link" href="/notes/">
        <ArrowLeft className="icon" aria-hidden="true" />
        All notes
      </a>
      <p className="eyebrow">
        <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
      </p>
      <h1>{note.title}</h1>
      <p className="case-lead">{note.description}</p>
      <ProjectTags tags={note.tags} />
      <article
        className="prose"
        aria-label={note.title}
        dangerouslySetInnerHTML={{ __html: note.html }}
      />
      <Footer />
    </div>
  );
}
