"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../../styles/pages/template-projects.css";

const templateProjects = [
  {
    title: "SaaS Landing Template",
    description: "A SaaS landing page built around one goal: getting the sign-up, not just looking sleek.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/saas-landing-page",
  },
  {
    title: "Restaurant Website",
    description: "Elegant restaurant site with menu, hours, and a booking flow built to get the table filled.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/restaurant",
  },
  {
    title: "Creative Agency Website",
    description: "A bold, multi-page agency site built to make a service business look like the obvious choice.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/creative-agency",
  },
  {
    title: "Photographer Portfolio",
    description: "Minimal, image-led portfolio built to let the work speak — and turn viewers into inquiries.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/photographer-portfolio",
  },
  {
    title: "Real Estate Listings",
    description: "Property listings with a filterable grid, search, and sorting options — built to get the agent the call.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/real-estate-listings",
  },
  {
    title: "Startup Marketing Site",
    description: "A trust-building site for early-stage startups that need to look credible on day one.",
    tech: "React · Next.js · CSS",
    link: "/template-projects/startup-marketing-site",
  },
];

export default function TemplateProjects() {
  useEffect(() => {
    // Animate elements already visible on load
    document.querySelectorAll("[data-animate-load]").forEach(el => {
      requestAnimationFrame(() => {
        el.classList.add("in-view");
      });
    });
  
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
  
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
  
          setTimeout(() => {
            el.classList.add("in-view");
          }, delay * 400);
  
          obs.unobserve(el);
        });
      },
      {
        threshold: 0.6,
      }
    );
  
    // Observe EACH animated element (not sections)
    document
      .querySelectorAll("[data-animate]")
      .forEach(el => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);

  return (
    <main className="template-projects">
      <section className="templates-intro" data-animate-section>
        <h1 data-animate="fade-down" data-delay="1" data-animate-load>
          Template Projects
        </h1>

        <p data-animate="fade-up" data-delay="2" data-animate-load>
          Polished, production-ready layouts built to launch fast — without
          weeks of back-and-forth over structure and design.
        </p>
      </section>

      <section className="templates-grid" data-animate-section>
        {templateProjects.map((project, index) => (
          <div
            key={index}
            className="template-card-wrap"
            data-animate="fade-left"
            data-delay={index + 2}
          >
            <article className="template-card">
              <div className="template-card__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="template-card__tech">{project.tech}</span>
              </div>

              <Link href={project.link} className="template-card__cta">
                View Template →
              </Link>
            </article>
          </div>
        ))}
      </section>

      <section className="templates-proof" data-animate-section>
        <h2 data-animate="fade-down" data-delay="1">
          What These Templates Prove
        </h2>

        <div className="templates-proof-grid">
          {[
            ["Speed to Market", "A solid starting structure means less time spent building from zero."],
            ["Layouts That Grow", "Built to handle more content and features without a rebuild."],
            ["Consistent UX", "Predictable navigation and hierarchy across every page."],
            ["Real Production Code", "Clean, maintainable code — not throwaway prototype work."],
          ].map(([title, text], i, arr) => (
            <div
              key={i}
              className="proof-item"
              data-animate="fade-right"
              data-delay={arr.length - i}
            >
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="templates-process" data-animate-section>
        <h2 data-animate="fade-up" data-delay="1">
          How These Templates Are Built
        </h2>

        <div className="process-grid">
          {[
            ["01", "Design the System", "Layouts planned for reuse and flexibility."],
            ["02", "Build the Structure", "Clean HTML, scalable CSS, minimal JS."],
            ["03", "Optimize & Polish", "Performance, responsiveness, and every small detail."],
          ].map(([num, title, text], i) => (
            <div
              key={i}
              className="process-card"
              data-animate="fade-up"
              data-delay={i + 1}
            >
              <span className="process-number">{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="templates-cta" data-animate-section>
        <h2 data-animate="fade-up">
          Need a Custom Template?
        </h2>

        <p data-animate="fade-up" data-delay="1">
          These templates are foundations. If you need something tailored to your
          business, I can build it properly.
        </p>

        <div data-animate="fade-up" data-delay="2">
          <Link href="/contact" className="templates-cta-link">
            Let's Talk →
          </Link>
        </div>
      </section>
    </main>
  );
}