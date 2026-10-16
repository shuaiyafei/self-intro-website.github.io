import { ArrowDown, ArrowUpRight } from "lucide-react";
import notes from "virtual:notes";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { SectionHeading } from "../components/SectionHeading";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { NotesList } from "../components/NotesList";

export function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art">
          <img
            src="/images/hero-sculpture.webp"
            width="1672"
            height="941"
            alt=""
            fetchPriority="high"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-line" />
              SOFTWARE ENGINEER
            </p>
            <h1 id="hero-title">
              {profile.name}
              <span className="accent">.</span>
            </h1>
            <p className="hero-statement">
              Making complex systems
              <br />
              feel simple.
            </p>
            <p className="hero-description">
              I build AI agents, cross-platform infrastructure, and developer tools. Thoughtful
              engineering. Useful things.
            </p>
            <div className="hero-actions">
              <a className="button" href="#work">
                Explore my work <ArrowUpRight className="icon" aria-hidden="true" />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowDown className="icon" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="availability">
              <span className="status-dot" />
              {profile.availability}
            </span>
            <a href="#about" className="scroll-link">
              SCROLL TO EXPLORE <ArrowDown className="icon" aria-hidden="true" />
            </a>
            <span className="hero-edition">PERSONAL SPACE / {profile.year}</span>
          </div>
        </div>
      </section>
      <section className="about section shell" id="about" aria-labelledby="about-title">
        <SectionHeading number="01" label="ABOUT" aside="A bit of context" />
        <div className="about-grid">
          <h2 id="about-title">
            Curiosity meets
            <br />
            <span className="muted">engineering.</span>
          </h2>
          <div className="about-copy">
            <p className="lead">{profile.introduction}</p>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="focus-list">
              {profile.focus.map((focus) => (
                <span key={focus}>{focus}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="principles">
          {profile.principles.map((principle, index) => (
            <article key={principle.title}>
              <span className="principle-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
        <details className="background" id="experience">
          <summary>
            <span>Previously &amp; along the way</span>
            <span className="background-preview">Meituan · PalFish · Tencent</span>
            <span className="expand-symbol" aria-hidden="true">
              +
            </span>
          </summary>
          <div className="background-list">
            {profile.experience.map((item) => (
              <div key={item.organization}>
                <span>{item.dates}</span>
                <strong>{item.organization}</strong>
                <p>{item.role}</p>
              </div>
            ))}
          </div>
        </details>
      </section>
      <section className="work section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <SectionHeading number="02" label="SELECTED WORK" aside="Ideas, made tangible" />
          <div className="work-heading">
            <h2 id="work-title">
              Built with purpose<span className="accent">.</span>
            </h2>
            <p>
              A few systems I've helped bring to life.
              <br />
              From shared foundations to intelligent tools.
            </p>
          </div>
          <ProjectCard project={projects[0]} index={0} featured />
          <div className="project-grid">
            {projects.slice(1).map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      </section>
      <section className="notes section shell" id="notes" aria-labelledby="notes-title">
        <SectionHeading number="03" label="FIELD NOTES" aside="Thinking out loud" />
        <div className="notes-grid">
          <div>
            <h2 id="notes-title">
              Room for
              <br />
              <span className="muted">a few thoughts.</span>
            </h2>
            <a className="text-link notes-all" href="/notes/">
              All notes <ArrowUpRight className="icon" aria-hidden="true" />
            </a>
          </div>
          <NotesList notes={notes.slice(0, 3)} />
        </div>
      </section>
      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="shell">
          <SectionHeading
            number="04"
            label="GET IN TOUCH"
            aside="Good things start with a conversation"
          />
          <div className="contact-heading">
            <h2 id="contact-title">
              Let's build
              <br />
              something <span className="accent">useful.</span>
            </h2>
            <a
              className="contact-arrow"
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.name}`}
            >
              <ArrowUpRight className="icon" aria-hidden="true" />
            </a>
          </div>
          <div className="contact-links">
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight className="icon" aria-hidden="true" />
            </a>
            <a
              className="github-link"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find me on GitHub <ArrowUpRight className="icon" aria-hidden="true" />
            </a>
          </div>
          <Footer home />
        </div>
      </section>
    </>
  );
}
