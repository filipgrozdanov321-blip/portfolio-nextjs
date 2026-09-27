"use client";

import { useEffect, useRef } from "react";
import "../../../styles/pages/about-me.css";

export default function AboutMe() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document
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
      { threshold: 0.7 }
    );

    document
      .querySelectorAll<HTMLElement>("[data-animate-section]")
      .forEach(section => {
        if (!section.querySelector(".timeline")) {
          sectionObserver.observe(section);
        }
      });

    const timelineItemObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target
            .querySelectorAll<HTMLElement>("[data-animate]")
            .forEach(el => el.classList.add("in-view"));

          timelineItemObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    document
      .querySelectorAll<HTMLElement>(".timeline-item")
      .forEach(item => timelineItemObserver.observe(item));

    const timeline = timelineRef.current;
    if (!timeline) return;

    const handleScroll = () => {
      const rect = timeline.getBoundingClientRect();
      const timelineHeight = timeline.offsetHeight;
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        Math.max((windowHeight * 0.55 - rect.top) / timelineHeight, 0),
        1
      );

      const lineHeight = progress * timelineHeight;
      timeline.style.setProperty("--timeline-progress", `${lineHeight}px`);

      timeline
        .querySelectorAll<HTMLElement>(".timeline-item")
        .forEach(item => {
          const dotOffset = item.offsetTop + 31;
          item.classList.toggle("active", dotOffset <= lineHeight);
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionObserver.disconnect();
      timelineItemObserver.disconnect();
    };
  }, []);

  return (
    <div className="about-me">
      <section className="about-me__intro" data-animate-section>
        <div
          className="terminal-window"
          data-animate="fade-up"
          data-delay="1"
          data-animate-load
        >
          <div className="terminal-window__bar">
            <span className="terminal-dot terminal-dot--red"></span>
            <span className="terminal-dot terminal-dot--yellow"></span>
            <span className="terminal-dot terminal-dot--green"></span>
            <span className="terminal-window__filename">whoami.sh</span>
          </div>

          <div className="terminal-window__body">
            <p className="terminal-prompt">
              <span className="terminal-prompt-symbol">$</span>
              <span className="terminal-typed terminal-typed--1">whoami</span>
            </p>

            <h1 className="about-me-title terminal-typed terminal-typed--2">
              Hi, I&apos;m Filip
            </h1>

            <p className="terminal-prompt">
              <span className="terminal-prompt-symbol">$</span>
              <span className="terminal-typed terminal-typed--3">
                cat mission.txt
              </span>
            </p>

            <p className="about-me-description">
              I&apos;m a self-taught web developer — I learned by building
              until things worked, then kept going. Today that means helping
              businesses grow online through sites that perform and marketing
              that&apos;s backed by data, not guesses.
              <span className="terminal-cursor">▌</span>
            </p>
          </div>
        </div>
      </section>

      <section className="about-me__experience" data-animate-section>
        <h2 data-animate="fade-down" data-delay="5" data-animate-load>
          My Journey
        </h2>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-item left">
            <div
              className="timeline-content"
              data-animate="fade-left"
              data-delay-cards="1"
            >
              <span className="timeline-date">The Start</span>
              <h3>Self-Taught & Curious</h3>
              <p>
                I started learning web development in my early twenties,
                through self-study and online courses. What began as
                curiosity turned into a genuine obsession with figuring out
                how things work — and making them work better.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div
              className="timeline-content"
              data-animate="fade-right"
              data-delay-cards="1"
            >
              <span className="timeline-date">First Momentum</span>
              <h3>From Learning to Shipping</h3>
              <p>
                The real shift came when I moved from tutorials to full
                projects — planning, building, and shipping complete websites
                end to end. I got fast at it, without cutting corners on
                quality.
              </p>
            </div>
          </div>

          <div className="timeline-item left">
            <div
              className="timeline-content"
              data-animate="fade-left"
              data-delay-cards="1"
            >
              <span className="timeline-date">The Hard Part</span>
              <h3>Learning Under Pressure</h3>
              <p>
                The steepest part of the climb was debugging — hours chasing
                a single bug, some taking a full day to crack. That
                persistence is still one of my biggest strengths: I don&apos;t
                stop until it actually works.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div
              className="timeline-content"
              data-animate="fade-right"
              data-delay-cards="1"
            >
              <span className="timeline-date">Skill Evolution</span>
              <h3>From Builders to Code</h3>
              <p>
                I started with Wix and WordPress, then moved into real code —
                HTML, CSS, and JavaScript. Today that&apos;s grown into React,
                Next.js, TypeScript, and PostgreSQL, paired with an eye for
                design and marketing.
              </p>
            </div>
          </div>

          <div className="timeline-item left">
            <div
              className="timeline-content"
              data-animate="fade-left"
              data-delay-cards="1"
            >
              <span className="timeline-date">What I Do Now</span>
              <h3>Web, Design & Marketing</h3>
              <p>
                I help businesses build or sharpen their digital presence —
                from websites and ads to copywriting and conversion
                optimization. Whether it&apos;s fixing a bug, improving UX, or
                launching a campaign, I focus on results, not buzzwords.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div
              className="timeline-content"
              data-animate="fade-right"
              data-delay-cards="1"
            >
              <span className="timeline-date">Today</span>
              <h3>Where I&apos;m Headed</h3>
              <p>
                I&apos;ve spent the last year building real, working projects
                — including the site you&apos;re looking at right now — and
                I&apos;m actively taking on client work. Self-directed,
                self-employed, and fully focused on helping businesses
                strengthen their digital presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-me__approach" data-animate-section>
        <h2 data-animate="fade-down">My Approach</h2>

        <p
          className="about-me__approach-intro"
          data-animate="fade-up"
          data-delay="1"
        >
          I follow a clear, repeatable process to avoid wasted time and
          unclear outcomes. Every project moves through the same core steps —
          adjusted to the problem, not trends.
        </p>

        <div className="about-me__approach-steps">
          <div
            className="about-me__approach-step"
            data-animate="fade-left"
            data-delay-cards="1"
          >
            <span className="about-me__approach-step-number">Step 1</span>
            <h3>Understand the Problem</h3>
            <p>
              I identify what&apos;s actually broken or missing — speed,
              structure, messaging, or flow.
            </p>
          </div>

          <div
            className="about-me__approach-step"
            data-animate="fade-left"
            data-delay-cards="2"
          >
            <span className="about-me__approach-step-number">Step 2</span>
            <h3>Build or Fix What Matters</h3>
            <p>
              I fix what matters most — bugs, structure, responsiveness, or a
              full rebuild if needed.
            </p>
          </div>

          <div
            className="about-me__approach-step"
            data-animate="fade-left"
            data-delay-cards="3"
          >
            <span className="about-me__approach-step-number">Step 3</span>
            <h3>Tighten the Experience</h3>
            <p>
              I refine layout and flow so visitors instantly know what to do
              next.
            </p>
          </div>

          <div
            className="about-me__approach-step"
            data-animate="fade-left"
            data-delay-cards="4"
          >
            <span className="about-me__approach-step-number">Step 4</span>
            <h3>Test, Iterate, Improve</h3>
            <p>
              I test, fix, and improve continuously — steady progress over
              one-off delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="about-me__technologies" data-animate-section>
        <h2 data-animate="fade-down">Tools & Technologies</h2>

        <div className="tech-map">
          <div
            className="tech-row"
            data-animate="fade-left"
            data-delay-cards="1"
          >
            <div className="tech-tool">React & Next.js</div>
            <div className="tech-arrow">→</div>
            <div className="tech-result">
              Fast, SEO-friendly websites with real interactivity, not just
              static pages.
            </div>
          </div>

          <div
            className="tech-row"
            data-animate="fade-left"
            data-delay-cards="2"
          >
            <div className="tech-tool">TypeScript</div>
            <div className="tech-arrow">→</div>
            <div className="tech-result">
              Fewer bugs, safer refactors, and code that&apos;s easier to
              maintain long-term.
            </div>
          </div>

          <div
            className="tech-row"
            data-animate="fade-left"
            data-delay-cards="3"
          >
            <div className="tech-tool">Node.js & PostgreSQL</div>
            <div className="tech-arrow">→</div>
            <div className="tech-result">
              Reliable back-end logic, APIs, and data handling that actually
              holds up.
            </div>
          </div>

          <div
            className="tech-row"
            data-animate="fade-left"
            data-delay-cards="4"
          >
            <div className="tech-tool">Custom HTML & CSS</div>
            <div className="tech-arrow">→</div>
            <div className="tech-result">
              Clean, responsive layouts with no bloated frameworks slowing
              things down.
            </div>
          </div>

          <div
            className="tech-row"
            data-animate="fade-left"
            data-delay-cards="5"
          >
            <div className="tech-tool">SEO & Analytics</div>
            <div className="tech-arrow">→</div>
            <div className="tech-result">
              Sites built with visibility, tracking, and measurable growth in
              mind.
            </div>
          </div>
        </div>
      </section>

      <section className="about-me__cta" data-animate-section>
        <p data-animate="fade-down">
          If something on your site is broken, missing, or just not working
          the way it should — let&apos;s fix it.
        </p>

        <div className="cta-button-wrap" data-animate="fade-up" data-delay="1">
          <a href="/contact" className="about-me__cta-button">
            Contact Me
          </a>
        </div>
      </section>
    </div>
  );
}