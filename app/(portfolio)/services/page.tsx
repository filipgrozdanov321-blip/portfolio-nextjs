"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../../../styles/pages/services-page.css";

export default function ServicesPage() {
  useEffect(() => {
    document.querySelectorAll("[data-animate-load]").forEach(el => {
      requestAnimationFrame(() => {
        el.classList.add("in-view");
      });
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target
            .querySelectorAll("[data-animate]")
            .forEach(el => el.classList.add("in-view"));

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.8 }
    );

    document
      .querySelectorAll("[data-animate-section]")
      .forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">
      <section className="services-hero">
        <h1 data-animate="fade-up" data-delay="1" data-animate-load>
          Serious Websites. Measurable Growth.
        </h1>

        <p data-animate="fade-up" data-delay="2" data-animate-load>
          I build websites and marketing systems that are fast, clear, and
          built to get results — not to chase a trend.
        </p>

        <div data-animate="fade-up" data-delay="3" data-animate-load>
          <Link href="/contact" className="services-hero-cta">
            Get a Consultation
          </Link>
        </div>
      </section>

      <section className="services-overview" data-animate-section>
        <div className="services-overview-header">
          <h2 data-animate="fade-down" data-delay="5" data-animate-load>
            Core Services
          </h2>

          <p data-animate="fade-up">
            Two services, built to work together or hold their own on their own.
          </p>
        </div>

        <div className="services-overview-grid">
          <div className="services-overview-item-wrapper">
            <div
              className="services-overview-item web-dev-card"
              data-animate="fade-left"
              data-delay="2"
            >
              <h3>Web Development</h3>
              <p>
                Custom-built websites that load fast, scale cleanly, and guide users
                to take action.
              </p>
            </div>
          </div>

          <div className="services-overview-item-wrapper">
            <div
              className="services-overview-item digital-marketing-card"
              data-animate="fade-right"
              data-delay="2"
            >
              <h3>Digital Marketing</h3>
              <p>
                SEO, analytics, and marketing built to get you found — and
                make that traffic worth something.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail" data-animate-section>
        <div data-animate="fade-up">
          <h2>Web Development</h2>

          <p className="service-description">
            I build websites from the ground up — clean code, fast
            performance, zero fluff. Every decision comes down to one
            question: does this help the site do its job.
          </p>

          <ul className="service-points">
            <li>Custom React or WordPress builds</li>
            <li>Mobile-first, responsive layouts</li>
            <li>SEO-ready structure</li>
            <li>Performance and accessibility focused</li>
          </ul>

          <Link href="/contact" className="service-cta">
            Start a Web Project →
          </Link>
        </div>
      </section>

      <section className="service-detail alt" data-animate-section>
        <div data-animate="fade-up">
          <h2>Digital Marketing</h2>

          <p className="service-description">
            Marketing without measurement is guessing. I focus on visibility,
            tracking, and optimizing what actually moves the needle.
          </p>

          <ul className="service-points" data-stagger>
            <li>SEO foundations and audits</li>
            <li>Conversion optimization</li>
            <li>Analytics and tracking setup</li>
            <li>Content and structure improvements</li>
          </ul>

          <Link href="/contact" className="service-cta">
            Improve My Results →
          </Link>
        </div>
      </section>

      <section className="services-process" data-animate-section>
        <h2 data-animate="fade-down">How I Work</h2>

        <div className="process-steps" data-stagger>
          {[
            ["01", "Understand", "Identify what’s broken or missing."],
            ["02", "Build / Fix", "Focus on what creates impact."],
            ["03", "Optimize", "Refine speed, flow, and usability."],
            ["04", "Iterate", "Improve based on real results."],
          ].map(([num, title, text], i) => (
            <div key={i} data-animate="fade-left" data-delay-cards={i + 1}>
              <span>{num}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-structure" data-animate-section>
        <h2 data-animate="fade-down">How I Run a Project</h2>

        <p className="services-structure-intro" data-animate="fade-up" data-delay="1">
          Every project follows a clear process, designed to cut confusion
          and deliver something you can actually use.
        </p>

        <div className="services-structure-grid" data-stagger>
          {[
            ["Clear Scope", "You know exactly what’s being built and why."],
            ["A Defined Process", "Work moves through set phases, not chaos."],
            ["Measured Outcomes", "Decisions guided by real data."],
          ].map(([title, text], i) => (
            <div key={i} data-animate="fade-right" data-delay-cards={3 - i}>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-outcomes" data-animate-section>
        <h2 data-animate="fade-down">What This Solves for You</h2>

        <div className="services-outcomes-grid" data-stagger>
          {[
            ["No More Guesswork", "You’re not left wondering what matters."],
            ["Clear Technical Direction", "Decisions are made with purpose."],
            ["A Website That Actually Works", "Fast, intentional, built around how people actually use it."],
            ["Less Back-and-Forth", "Clear scope means fewer revisions."],
            ["Confidence in What You’re Shipping", "You can defend every choice."],
            ["Something You Can Build On", "Your site is designed to grow."],
          ].map(([title, text], i) => (
            <div
              key={i}
              data-animate={i < 3 ? "fade-left" : "fade-right"}
              data-delay-cards={i + 1}
            >
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-final-cta" data-animate-section>
        <h2 data-animate="fade-down" data-delay="1">
          Ready to Work Together?
        </h2>

        <p data-animate="fade-up" data-delay="2">
          If you need a website or marketing system that actually performs,
          let’s talk.
        </p>

        <div data-animate="fade-up" data-delay="3">
          <Link href="/contact" className="services-hero-cta">
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}