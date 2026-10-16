export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  dates: string;
  summary: string;
  lead: string;
  image: string;
  imageAlt: string;
  artCaption: string;
  tags: string[];
  role: string;
  focus: string;
  scale: string;
  metrics: Metric[];
  challenge: { title: string; body: string };
  system: { title: string; features: { title: string; body: string }[] };
  flow: { title: string; steps: { label: string; value: string }[] };
  outcome: { title: string; body: string };
}

export interface Note {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  html: string;
}

export type Page =
  | { kind: "home" }
  | { kind: "project"; project: Project }
  | { kind: "notes" }
  | { kind: "note"; note: Note }
  | { kind: "not-found" };
