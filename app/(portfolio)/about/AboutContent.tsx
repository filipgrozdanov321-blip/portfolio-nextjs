"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import filipPhoto from "@/public/images/filip.jpg";
import { bookingHref, bookingIsExternal } from "@/lib/site";
import "../../../styles/pages/about-me.css";

// How much of a whole section must be on screen before its content animates
// in. On a phone the stacked sections (How I work, Tools) are taller than the
// screen, so a high value could never be reached and everything inside them
// would stay at opacity 0.
const SECTION_THRESHOLD = 0.15;

// The first words of each point are shown as the card's title; read together
// with the rest they are one sentence.
const WHAT_I_DO = [
  {
    lead: "Websites",
    rest: " that load fast, work on every phone and make it easy for customers to contact or book you.",
  },
  {
    lead: "Web apps",
    rest: " when a template isn't enough: booking systems, online shops, dashboards.",
  },
  {
    lead: "Extra development capacity",
    rest: " for agencies.",
  },
];

const HOW_I_WORK = [
  "You talk directly to the person building your site, from the first call to launch.",
  "Scope and a fixed price agreed upfront, so there are no surprises.",
  "You own the code and the domain.",
  "Plain language, no jargon.",
];

// Only tools this codebase actually uses (see package.json and the imports).
// If you add or drop a tool in the code, update this list to match.
const TOOLS = [
  {
    name: "Next.js & React",
    use: (
      <>
        The framework behind this site and all four{" "}
        <Link href="/projects">demo projects</Link>.
      </>
    ),
  },
  {
    name: "TypeScript",
    use: "Every page and component is written in it, so mistakes show up before a site goes live.",
  },
  {
    name: "HTML & CSS",
    use: "Hand-written layouts that work from phone to desktop, with no page builder.",
  },
  {
    name: "Node.js & Nodemailer",
    use: "Server code, such as the contact form that emails enquiries to an inbox.",
  },
  {
    name: "Recharts",
    use: (
      <>
        Charts, like the ones in the{" "}
        <Link href="/projects#sales-dashboard">sales dashboard demo</Link>.
      </>
    ),
  },
  {
    name: "ESLint",
    use: "Automatic checks that flag problems in the code.",
  },
];

export default function AboutContent() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Only look for elements inside THIS page (not the whole document)
    root
      .querySelectorAll<HTMLElement>("[data-animate-load]")
      .forEach(el => {
        requestAnimationFrame(() => {
          el.classList.add("in-view");
        });
      });

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target
            .querySelectorAll<HTMLElement>("[data-animate]")
            .forEach(el => el.classList.add("in-view"));

          sectionObserver.unobserve(entry.target);
        });
      },
      { threshold: SECTION_THRESHOLD }
    );

    root
      .querySelectorAll<HTMLElement>("[data-animate-section]")
      .forEach(section => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="about-me" ref={rootRef}>
      {/* ---------- Photo and intro ---------- */}
      <section className="about-me__intro" data-animate-section>
        <div className="about-me__intro-inner">
          <figure
            className="about-me__profile"
            data-animate="fade-up"
            data-animate-load
          >
            {/* The frame is always 4:5 and the crop is anchored near the top
                of the photo (see .about-me__photo-img), so the face is fully
                inside it at every screen size. */}
            <div className="about-me__photo">
              <Image
                src={filipPhoto}
                alt="Filip Grozdanov, web developer"
                fill
                sizes="300px"
                placeholder="blur"
                preload
                className="about-me__photo-img"
              />
            </div>

            <figcaption className="about-me__caption">
              <span className="about-me__profile-name">Filip Grozdanov</span>
              <span className="about-me__profile-role">
                Web developer · Kranj, Slovenia
              </span>
            </figcaption>
          </figure>

          <div
            className="terminal-window"
            data-animate="fade-up"
            data-delay="1"
            data-animate-load
          >
            <div className="terminal-window__bar" aria-hidden="true">
              <span className="terminal-dot terminal-dot--red"></span>
              <span className="terminal-dot terminal-dot--yellow"></span>
              <span className="terminal-dot terminal-dot--green"></span>
              <span className="terminal-window__filename">whoami.sh</span>
            </div>

            <div className="terminal-window__body">
              <p className="terminal-prompt" aria-hidden="true">
                <span className="terminal-prompt-symbol">$</span>
                <span className="terminal-typed terminal-typed--1">whoami</span>
              </p>

              <h1 className="about-me-title terminal-typed terminal-typed--2">
                Hi, I&apos;m Filip.
              </h1>

              <p className="terminal-prompt" aria-hidden="true">
                <span className="terminal-prompt-symbol">$</span>
                <span className="terminal-typed terminal-typed--3">
                  cat about.txt
                </span>
              </p>

              <p className="about-me-description">
                I&apos;m a web developer based in Kranj, Slovenia. I build fast
                websites and web apps for small businesses, such as booking
                systems, online shops and dashboards, and I take on
                development work for agencies.
                <span className="terminal-cursor" aria-hidden="true">▌</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- What I do ---------- */}
      <section
        className="about-me__section"
        aria-labelledby="about-what-i-do"
        data-animate-section
      >
        <h2 id="about-what-i-do" data-animate="fade-down">
          What I do
        </h2>

        <ul className="about-me__cards about-me__cards--3">
          {WHAT_I_DO.map((item, i) => (
            <li key={item.lead} data-animate="fade-left" data-delay-cards={i + 1}>
              <div className="about-me__card">
                <p>
                  <strong className="about-me__card-lead">{item.lead}</strong>
                  {item.rest}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- How I work ---------- */}
      <section
        className="about-me__section"
        aria-labelledby="about-how-i-work"
        data-animate-section
      >
        <h2 id="about-how-i-work" data-animate="fade-down">
          How I work
        </h2>

        <ul className="about-me__cards about-me__cards--4">
          {HOW_I_WORK.map((text, i) => (
            <li key={text} data-animate="fade-left" data-delay-cards={i + 1}>
              <div className="about-me__card about-me__card--check">
                <span className="about-me__check" aria-hidden="true">
                  ✓
                </span>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Tools ---------- */}
      <section
        className="about-me__section about-me__section--narrow"
        aria-labelledby="about-tools"
        data-animate-section
      >
        <h2 id="about-tools" data-animate="fade-down">
          Tools
        </h2>

        <ul className="tech-map">
          {TOOLS.map((tool, i) => (
            <li
              key={tool.name}
              className="tech-row"
              data-animate="fade-left"
              data-delay-cards={i + 1}
            >
              <div className="tech-tool">{tool.name}</div>
              <div className="tech-arrow" aria-hidden="true">
                →
              </div>
              <div className="tech-result">{tool.use}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Languages ---------- */}
      <section
        className="about-me__section about-me__section--narrow"
        aria-labelledby="about-languages"
        data-animate-section
      >
        <h2 id="about-languages" data-animate="fade-down">
          Languages
        </h2>

        <p className="about-me__lead" data-animate="fade-up" data-delay="1">
          I work in English, Macedonian, Slovenian, Serbian and Croatian.
        </p>
      </section>

      {/* ---------- Closing call to action ---------- */}
      <section
        className="about-me__cta"
        aria-labelledby="about-cta"
        data-animate-section
      >
        <h2 id="about-cta" data-animate="fade-down">
          Have a project in mind?
        </h2>

        <div className="cta-button-wrap" data-animate="fade-up" data-delay="1">
          <a
            href={bookingHref()}
            className="about-me__cta-button"
            {...(bookingIsExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a 15-minute call
          </a>
        </div>

        <p className="about-me__cta-alt" data-animate="fade-up" data-delay="2">
          or <Link href="/contact">send a message through the contact form</Link>
        </p>
      </section>
    </div>
  );
}
