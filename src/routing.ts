import notes from "virtual:notes";
import { profile } from "./data/profile";
import { projects } from "./data/projects";
import type { Page } from "./types";

export function normalizePath(path: string): string {
  return path.replace(/\/index\.html$/, "/").replace(/\/+$/, "") || "/";
}

export function resolvePage(path: string): Page {
  const normalized = normalizePath(path);
  if (normalized === "/") return { kind: "home" };
  if (normalized === "/notes") return { kind: "notes" };
  const project = projects.find((item) => normalized === `/work/${item.slug}`);
  if (project) return { kind: "project", project };
  const note = notes.find((item) => normalized === `/notes/${item.slug}`);
  if (note) return { kind: "note", note };
  return { kind: "not-found" };
}

export function pageMetadata(page: Page) {
  switch (page.kind) {
    case "home":
      return {
        title: `${profile.name} — ${profile.role}`,
        description: profile.description,
        path: "/",
      };
    case "project":
      return {
        title: `${page.project.title} — ${profile.name}`,
        description: page.project.lead,
        path: `/work/${page.project.slug}/`,
      };
    case "notes":
      return {
        title: `Field Notes — ${profile.name}`,
        description: "Notes on engineering, tools, and the things we make.",
        path: "/notes/",
      };
    case "note":
      return {
        title: `${page.note.title} — ${profile.name}`,
        description: page.note.description,
        path: `/notes/${page.note.slug}/`,
      };
    case "not-found":
      return {
        title: `Page not found — ${profile.name}`,
        description: "This page could not be found.",
        path: "/404.html",
      };
  }
}

export const routes = [
  "/",
  ...projects.map((project) => `/work/${project.slug}/`),
  "/notes/",
  ...notes.map((note) => `/notes/${note.slug}/`),
  "/404.html",
];
