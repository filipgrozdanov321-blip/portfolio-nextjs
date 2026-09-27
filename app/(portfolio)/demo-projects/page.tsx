"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../../styles/pages/demo-projects.css";

const demoProjects = [
  {
    title: "Habit Tracker App",
    description: "Track daily habits with streaks and progress stats — simple enough that people actually stick with it.",
    tech: "React · CSS",
    link: "/demo-projects/habit-tracker",
  },
  {
    title: "Sales Analytics Dashboard",
    description: "Interactive revenue dashboard with live filtering — built so decisions come from data, not guesswork.",
    tech: "React · Recharts",
    link: "/demo-projects/sales-analytics-dashboard",
  },
  {
    title: "Task Board (Kanban)",
    description: "Drag-and-drop board for To Do, In Progress, and Done — simple enough that teams actually use it.",
    tech: "React · Drag & Drop",
    link: "/demo-projects/task-board",
  },
  {
    title: "Appointment Booking App",
    description: "Full booking flow — service, time, confirmation — built for salons, clinics, and consultants.",
    tech: "React · State Management",
    link: "/demo-projects/appointment-booking-app",
  },
  {
    title: "AI Content Generator",
    description: "Generates blog intros, product copy, and captions in seconds — no more blank-page syndrome.",
    tech: "React · Claude API",
    link: "/demo-projects/ai-content-generator",
  },
  {
    title: "E-commerce Demo",
    description: "Browse, cart, checkout — a purchase flow built around one thing: getting to checkout without friction.",
    tech: "React · UI/UX",
    link: "/demo-projects/ecommerce-demo",
  },
];

export default function DemoProjects() {
  useEffect(() => {
    // Animate elements on initial load (above the fold)
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
          }, delay * 400); // 👈 stagger timing (tweak if needed)
    
          obs.unobserve(el);
        });
      },
      {
        threshold: 0.6,
      }
    );
    
  
    // 👇 Observe EACH animated element, not sections
    document
      .querySelectorAll("[data-animate]")
      .forEach(el => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);
  

  return (
    <main className="demo-projects">
      <section className="projects-intro" data-animate-section>
        <h1 data-animate="fade-down">
          Demo Projects
        </h1>
        <p data-animate="fade-up" data-delay="1">
          Fully interactive apps, not mockups — built to show how I handle
          real performance, usability, and user flows.
        </p>
      </section>

      <section className="projects-grid" data-animate-section>
        {demoProjects.map((project, index) => (
          <div
            key={index}
            className="project-card-wrap"
            data-animate="fade-left"
            data-delay={index + 2}
          >
            <article className="project-card">
              <div className="project-card__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-card__tech">{project.tech}</span>
              </div>

              <Link href={project.link} className="project-card__cta">
                View Project →
              </Link>
            </article>
          </div>
        ))}
      </section>

      <section className="projects-proof" data-animate-section>
        <h2 data-animate="fade-down">
          What These Demos Prove
        </h2>

        <div className="projects-proof-grid">
          {[
            ["Performance-First Development", "Optimized layouts and code that stays fast under real use."],
            ["UX Built With Intent", "Clear hierarchy that guides people toward action."],
            ["Reusable Architecture", "Components built to scale, not get rebuilt next year."],
            ["SEO & Accessibility", "Semantic HTML and practices that hold up to a real audit."],
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

      <section className="projects-process" data-animate-section>
        <h2 data-animate="fade-up" data-delay="1">
          From Goal to Launch
        </h2>

        <div className="process-grid">
          {[
            ["01", "Define the Goal", "Clarify objective, audience, and success metric."],
            ["02", "Build the System", "Clean structure, scalable components, performance first."],
            ["03", "Optimize for Results", "Refine UX, flow, and every friction point."],
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

      <section className="projects-cta" data-animate-section>
        <h2 data-animate="fade-up" >
          Want Something Like This Built for You?
        </h2>

        <p data-animate="fade-up" data-delay="1">
          These demos reflect how I approach real client projects — structured,
          scalable, and focused on results.
        </p>

        <div data-animate="fade-up" data-delay="2">
          <Link href="/contact" className="projects-cta-link">
            Let's Talk →
          </Link>
        </div>
      </section>
    </main>
  );
}