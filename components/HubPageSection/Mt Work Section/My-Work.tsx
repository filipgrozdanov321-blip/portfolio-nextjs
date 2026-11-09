import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ComponentsUsedAroundTheWebSite/Reveal/Reveal";
import { projects } from "@/lib/projects";
import "./My-Work.css";

// Server component: every project's title, description and screenshot alt
// text is in the page's HTML, not added later by JavaScript.
export default function MyWorkSection() {
  return (
    <section id="my-work" className="my-work" aria-labelledby="my-work-title">
      <Reveal className="my-work-header">
        <h2 id="my-work-title" className="my-work-title">
          My Work in Action
        </h2>
        <p className="my-work-intro">
          Four projects you can click through, built the way I&apos;d build
          yours. Each one uses a fictional business and sample data.
        </p>
      </Reveal>

      <ul className="my-work-grid">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal className="my-work-card-reveal" delay={(index % 2) * 150}>
              <article className="my-work-card">
                <div className="my-work-card-media">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(max-width: 760px) 100vw, 560px"
                    className="my-work-card-img"
                  />
                </div>

                <div className="my-work-card-body">
                  <span className="my-work-tag">{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.problem}</p>
                  <Link href={project.href} className="my-work-card-link">
                    Open live demo<span aria-hidden="true"> →</span>
                    <span className="visually-hidden">: {project.title}</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <Link href="/projects" className="my-work-all">
        Features and tech for each project<span aria-hidden="true"> →</span>
      </Link>
    </section>
  );
}
