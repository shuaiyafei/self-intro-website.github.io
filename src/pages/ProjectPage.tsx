import { ArrowLeft, ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { ProjectArtwork, ProjectTags } from "../components/ProjectCard";
import { projects } from "../data/projects";
import type { Project } from "../types";

export function ProjectPage({ project }: { project: Project }) {
  const next =
    projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  return (
    <div className="case-page">
      <section className="case-hero shell">
        <a className="text-link back-link" href="/#work">
          <ArrowLeft className="icon" aria-hidden="true" />
          Selected work
        </a>
        <p className="eyebrow">
          {project.category} / {project.dates}
        </p>
        <h1>
          {project.title}
          <span className="accent">.</span>
        </h1>
        <p className="case-lead">{project.lead}</p>
        <ProjectTags tags={project.tags} />
        <dl className="case-meta">
          {[
            ["Role", project.role],
            ["Focus", project.focus],
            ["Scale", project.scale],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <figure className="case-cover shell">
        <ProjectArtwork project={project} />
        <figcaption>Concept illustration of the system.</figcaption>
      </figure>
      <div className="case-metrics shell">
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
      <section className="case-story shell">
        <p className="section-label">
          <span>01 /</span> THE CHALLENGE
        </p>
        <div>
          <h2>{project.challenge.title}</h2>
          <p>{project.challenge.body}</p>
        </div>
      </section>
      <section className="case-system">
        <div className="case-story shell">
          <p className="section-label">
            <span>02 /</span> THE SYSTEM
          </p>
          <div>
            <h2>{project.system.title}</h2>
            <div className="case-features">
              {project.system.features.map((feature, index) => (
                <article key={feature.title}>
                  <span className="principle-number">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="case-flow shell" aria-labelledby="flow-title">
        <h2 className="section-label" id="flow-title">
          <span>03 /</span> {project.flow.title}
        </h2>
        <ol>
          {project.flow.steps.map((step, index) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <strong>{step.value}</strong>
              {index < project.flow.steps.length - 1 && (
                <ArrowRight className="icon" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </section>
      <section className="case-story shell">
        <p className="section-label">
          <span>04 /</span> THE OUTCOME
        </p>
        <div>
          <h2>{project.outcome.title}</h2>
          <p>{project.outcome.body}</p>
        </div>
      </section>
      <div className="case-bottom shell">
        <a className="next-project" href={`/work/${next.slug}/`}>
          <span>Next project</span>
          <strong>{next.title}</strong>
          <ArrowRight className="icon" aria-hidden="true" />
        </a>
        <Footer />
      </div>
    </div>
  );
}
