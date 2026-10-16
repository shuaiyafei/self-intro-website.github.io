import { ArrowUpRight } from "lucide-react";
import type { Project } from "../types";

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

export function ProjectArtwork({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  return (
    <div className={`project-art${featured ? " featured-art" : ""}`}>
      <img src={project.image} width="1536" height="1024" alt={project.imageAlt} loading="lazy" />
      {index !== undefined && (
        <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
      )}
      <span className="art-caption">{project.artCaption}</span>
    </div>
  );
}

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <a
      className={`${featured ? "featured-project" : "project"} project-link`}
      href={`/work/${project.slug}/`}
    >
      <ProjectArtwork project={project} index={index} featured={featured} />
      <div className={featured ? "featured-copy" : "project-info"}>
        <p className="project-category">
          {project.category}
          <span>{project.dates}</span>
        </p>
        {featured ? (
          <h3>{project.title}</h3>
        ) : (
          <div className="project-title">
            <h3>{project.title}</h3>
            <ArrowUpRight className="icon" aria-hidden="true" />
          </div>
        )}
        <p>{project.summary}</p>
        <ProjectTags tags={project.tags} />
        {featured && (
          <div className="project-foot">
            <span className="project-result">
              <strong>{project.metrics[0].value}</strong> {project.metrics[0].label}
            </span>
            <span className="circle-arrow">
              <ArrowUpRight className="icon" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
    </a>
  );
}
