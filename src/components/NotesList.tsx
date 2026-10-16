import { ArrowUpRight } from "lucide-react";
import type { Note } from "../types";

export function formatNoteDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function NotesList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <div className="notes-empty">
        <span className="note-mark" aria-hidden="true">
          [ &nbsp; ]
        </span>
        <p>
          Notes on engineering, tools,
          <br />
          and the things we make.
        </p>
        <span className="coming-soon">
          <span className="status-dot" />A few thoughts are taking shape. Coming soon.
        </span>
      </div>
    );
  }
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <a className="note-list-item" key={note.slug} href={`/notes/${note.slug}/`}>
          <time dateTime={note.date}>{formatNoteDate(note.date)}</time>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <ArrowUpRight className="icon" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
