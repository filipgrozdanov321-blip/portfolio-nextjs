"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { bookingHref, bookingIsExternal, site } from "@/lib/site";
import "../../../styles/pages/services-page.css";

// How much of a whole section must be on screen before its content animates
// in. It was 0.8. On a phone the stacked sections (How I Work, Core Services,
// What This Solves for You...) are taller than the screen, so they could
// never be 80% visible and everything inside them stayed at opacity 0.
const SECTION_THRESHOLD = 0.15;

const externalProps = bookingIsExternal
  ? { target: "_blank", rel: "noopener noreferrer" }
  : {};

export default function ServicesContent() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Only look for elements inside THIS page (not the whole document)
    root.querySelectorAll("[data-animate-load]").forEach(el => {
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
      { threshold: SECTION_THRESHOLD }
    );

    root
      .querySelectorAll("[data-animate-section]")
      .forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page" ref={rootRef}>
      <section className="services-hero">
        <h1 data-animate="fade-up" data-delay="1" data-animate-load>
          Websites and Web Apps, Built Around Your Business
        </h1>

        <p data-animate="fade-up" data-delay="2" data-animate-load>
          Fast, mobile-friendly websites, and custom tools like online booking,
          shops and dashboards. One person from first call to launch, at a
          fixed price agreed upfront.
        </p>

        <div data-animate="fade-up" data-delay="3" data-animate-load>
          <a href={bookingHref()} className="services-hero-cta" {...externalProps}>
            Book a 15-minute call
          </a>
        </div>
      </section>

      <section className="services-overview" data-animate-section>
        <div className="services-overview-header">
          <h2 data-animate="fade-down" data-delay="5" data-animate-load>
            Core Services
          </h2>

          <p data-animate="fade-up">
            Two services, built to work together or on their own.
          </p>
        </div>

        <div className="services-overview-grid">
          <div className="services-overview-item-wrapper">
            <a
              href="#websites"
              className="services-overview-item web-dev-card"
              data-animate="fade-left"
              data-delay="2"
            >
              <h3>Business Websites</h3>
              <p>
                Fast, mobile-friendly sites that explain what you do and make
                it easy to get in touch. From {site.pricing.websitesFrom}.
              </p>
            </a>
          </div>

          <div className="services-overview-item-wrapper">
            <a
              href="#web-apps"
              className="services-overview-item web-apps-card"
              data-animate="fade-right"
              data-delay="2"
            >
              <h3>Web Apps</h3>
              <p>
                Booking systems, online shops and dashboards, built around how
                your business actually works.
              </p>
            </a>
          </div>
        </div>
      </section>

      <section id="websites" className="service-detail" data-animate-section>
        <div data-animate="fade-up">
          <h2>Business Websites</h2>

          <p className="service-description">
            A site that tells visitors what you do, why to pick you and how to
            reach you, and that looks right on every phone. Every decision comes
            down to one question: does this help the site do its job?
          </p>

          <ul className="service-points">
            <li>Custom design built around your business, not a template</li>
            <li>Mobile-first, responsive layouts</li>
            <li>A contact form that sends enquiries straight to your inbox</li>
            <li>Basic SEO setup: page titles, descriptions and a sitemap</li>
            <li>Fast loading, clean and accessible HTML</li>
          </ul>

          <p className="service-example">
            Example:{" "}
            <Link href="/projects#real-estate-website">Real Estate Agency Website</Link>
          </p>

          <Link href="/contact" className="service-cta">
            Start a Website Project →
          </Link>
        </div>
      </section>

      <section id="pricing" className="services-pricing" data-animate-section>
        <div className="services-pricing-card" data-animate="fade-up">
          <p className="services-pricing-eyebrow">Pricing</p>
          <h2>Websites from {site.pricing.websitesFrom}</h2>
          <p className="services-pricing-intro">
            A fixed price, agreed before any work starts. Included:
          </p>

          <ul className="services-pricing-list">
            {site.pricing.included.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="services-pricing-note">
            Need more pages, or a web app? Tell me what you need and you&apos;ll
            get a fixed quote.
          </p>

          <div className="services-pricing-buttons">
            <a href={bookingHref()} className="services-hero-cta" {...externalProps}>
              Book a 15-minute call
            </a>
            <Link href="/contact" className="services-pricing-secondary">
              Ask for a quote
            </Link>
          </div>
        </div>
      </section>

      <section id="web-apps" className="service-detail alt" data-animate-section>
        <div data-animate="fade-up">
          <h2>Web Apps</h2>

          <p className="service-description">
            When a website isn&apos;t enough: tools your customers or your team
            use every day, built around your process instead of a
            one-size-fits-all plugin. Each example below is a working demo you
            can try.
          </p>

          <ul className="service-points">
            <li>
              <strong>Booking systems:</strong> customers choose a service, a
              staff member and a free time slot.{" "}
              <Link href="/projects#appointment-booking">See the demo</Link>
            </li>
            <li>
              <strong>Online shops:</strong> product pages, filters, cart and
              checkout. <Link href="/projects#ecommerce-store">See the demo</Link>
            </li>
            <li>
              <strong>Dashboards:</strong> revenue, orders and best sellers on
              one screen. <Link href="/projects#sales-dashboard">See the demo</Link>
            </li>
            <li>
              <strong>For agencies:</strong> React and Next.js development on
              your client projects.
            </li>
          </ul>

          <Link href="/contact" className="service-cta">
            Talk About a Web App →
          </Link>
        </div>
      </section>

      <section className="services-process" data-animate-section>
        <h2 data-animate="fade-down">How I Work</h2>

        <div className="process-steps" data-stagger>
          {[
            ["01", "First Call", "15 minutes to talk through what you need."],
            ["02", "Fixed Price", "A clear scope and a fixed price, agreed before any work starts."],
            ["03", "Build", "I design and build it myself, from first draft to final version."],
            ["04", "Launch", "It goes live on your domain. You own the code and the domain."],
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
        <h2 data-animate="fade-down">What You Can Expect</h2>

        <p className="services-structure-intro" data-animate="fade-up" data-delay="1">
          {site.about.howIWork}
        </p>

        <div className="services-structure-grid" data-stagger>
          {[
            ["Clear Scope", "You know exactly what’s being built and what it costs."],
            ["One Point of Contact", "You talk to the person building it, from first call to launch."],
            ["You Own It", "The code and the domain are yours, not locked to me."],
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
          Tell me what you need. You&apos;ll get a fixed price before any work
          starts.
        </p>

        <div data-animate="fade-up" data-delay="3">
          <a href={bookingHref()} className="services-hero-cta" {...externalProps}>
            Book a 15-minute call
          </a>
        </div>
      </section>
    </main>
  );
}
