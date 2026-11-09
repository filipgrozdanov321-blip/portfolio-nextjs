import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ComponentsUsedAroundTheWebSite/Reveal/Reveal";
import { projects } from "@/lib/projects";
import { bookingHref, bookingIsExternal } from "@/lib/site";
import "../../../styles/pages/projects.css";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Four demo projects by Filip Grozdanov: an appointment booking app, an e-commerce store, a real estate website and a sales dashboard. Live demos with features and tech stack.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <Reveal className="projects-page-intro">
        <h1>Projects</h1>
        <p>
          Four projects you can open and click through, built the way I&apos;d
          build yours. They&apos;re demos: each one uses a fictional business and
          sample data, so nothing you type is sent anywhere.
        </p>
      </Reveal>

      <div className="projects-page-list">
        {projects.map((project, index) => (
          <Reveal key={project.slug} className="projects-page-reveal">
            <article
              id={project.slug}
              className={`project-feature ${index % 2 === 1 ? "is-flipped" : ""}`}
              aria-labelledby={`${project.slug}-title`}
            >
              <div className="project-feature-media">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(max-width: 900px) 100vw, 600px"
                  className="project-feature-img"
                />
              </div>

              <div className="project-feature-body">
                <p className="project-feature-label">
                  <span className="project-feature-tag">{project.label}</span>
                  {project.label === "Demo" && (
                    <span className="project-feature-note">
                      Fictional business, sample data
                    </span>
                  )}
                </p>

                <h2 id={`${project.slug}-title`}>{project.title}</h2>
                <p className="project-feature-problem">{project.problem}</p>

                <h3>Key features</h3>
                <ul className="project-feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <h3>Built with</h3>
                <ul className="project-feature-stack" aria-label="Tech stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <Link href={project.href} className="project-feature-cta">
                  Open live demo<span aria-hidden="true"> →</span>
                  <span className="visually-hidden">: {project.title}</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="projects-page-cta">
        <h2>Want something like this for your business?</h2>
        <p>
          Tell me what you need in a 15-minute call. You&apos;ll get a fixed
          price before any work starts.
        </p>
        <div className="projects-page-cta-buttons">
          <a
            href={bookingHref()}
            className="projects-page-cta-primary"
            {...(bookingIsExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a 15-minute call
          </a>
          <Link href="/contact" className="projects-page-cta-secondary">
            Send a message
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
