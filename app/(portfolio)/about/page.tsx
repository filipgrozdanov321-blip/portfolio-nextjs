"use client";

import { useEffect, useRef } from "react";
import "../../../styles/pages/about-me.css";

export default function AboutMe() {
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* ---------------------------------------
       PAGE LOAD ANIMATIONS
    --------------------------------------- */
    document
      .querySelectorAll<HTMLElement>("[data-animate-load]")
      .forEach(el => {
        requestAnimationFrame(() => {
          el.classList.add("in-view");
        });
      });

    /* ---------------------------------------
       SECTION-LEVEL SCROLL REVEAL
       (EXCLUDES TIMELINE)
    --------------------------------------- */
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

    /* ---------------------------------------
       TIMELINE ITEM-LEVEL SCROLL REVEAL
    --------------------------------------- */
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

    /* ---------------------------------------
       TIMELINE SCROLL PROGRESS
    --------------------------------------- */
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
        <div className="about-me-div-intro">
          <h1
            className="about-me-title"
            data-animate="fade-up"
            data-delay="1"
            data-animate-load
          >
            Hi, I'm Filip
          </h1>

          <p
            data-animate="fade-up"
            data-delay="2"
            data-animate-load
          >
            I'm a web developer and digital marketing expert with a focus on
            helping businesses grow online. My goal is to create high-quality
            websites and effective marketing strategies that drive results.
          </p>
        </div>
      </section>

      <section className="about-me__experience" data-animate-section>
        <h2             
          data-animate="fade-down"
          data-delay="5"
          data-animate-load>
          My Journey
        </h2>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-item left" 
          >
            <div className="timeline-content"
            data-animate="fade-left"
            data-delay-cards="1"
            >
              <span className="timeline-date">The Start</span>
              <h3>Self-Taught & Curious</h3>
              <p>
                I started learning web development around the age of 20 through
                self-study and online courses. What began as curiosity quickly
                turned into a genuine obsession with building things and
                understanding how the web works.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content"
            data-animate="fade-right"
            data-delay-cards="1"
            >
              <span className="timeline-date">First Momentum</span>
              <h3>From Learning to Shipping</h3>
              <p>
                The real turning point came when I began building full projects
                on my own. I went from tutorials to complete websites, sometimes
                delivering full builds in a single day. Speed, execution, and
                iteration became my strengths.
              </p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-content"
            data-animate="fade-left"
            data-delay-cards="1"
            >
              <span className="timeline-date">The Hard Part</span>
              <h3>Learning Under Pressure</h3>
              <p>
                The most difficult phase was learning itself. Stretching my
                brain, debugging for hours, and hitting walls was (and still is)
                part of the process. Complex bugs can take a full day to solve —
                but each one levels me up.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content"
             data-animate="fade-right"
             data-delay-cards="1"
            >
              <span className="timeline-date">Skill Evolution</span>
              <h3>From Builders to Code</h3>
              <p>
                I started with Wix, then specialized in WordPress before moving
                into core technologies like HTML, CSS, and JavaScript. Today I
                work with React, Node.js, PostgreSQL, and EJS, combining
                development with design and marketing skills.
              </p>
            </div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-content"
            data-animate="fade-left"
            data-delay-cards="1"            
            >
              <span className="timeline-date">What I Do Now</span>
              <h3>Web, Design & Marketing</h3>
              <p>
                I help businesses build or improve their digital presence — from
                websites and ads to copywriting and conversion optimization.
                Whether it’s fixing bugs, improving UX, or launching campaigns,
                I focus on results, not buzzwords.
              </p>
            </div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content"
            data-animate="fade-right"
            data-delay-cards="1"            
            >
              <span className="timeline-date">Today</span>
              <h3>Early-Stage, Fully Committed</h3>
              <p>
                I’ve been actively building projects for the past year and
                recently launched my portfolio to showcase my capabilities.
                I’m self-employed, focused on helping clients strengthen both
                their digital and non-digital presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-me__approach" data-animate-section>
          <h2
          data-animate="fade-down"
          >My Approach</h2>

          <p 
          className="about-me__approach-intro"
          data-animate="fade-up"
          data-delay="1">
            I follow a clear, repeatable process to avoid wasted time and unclear outcomes.
            Every project moves through the same core steps — adjusted to the problem,
            not trends.
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
                Before writing code, I focus on understanding what’s actually broken or missing —
                whether it’s structure, performance, clarity, or conversion.
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
                I prioritize the parts that have the biggest impact. This can mean fixing bugs,
                cleaning up structure, improving responsiveness, or rebuilding what doesn’t work.
              </p>
            </div>

            <div 
            className="about-me__approach-step"
            data-animate="fade-left"
            data-delay-cards="3"
            >
              <span className="about-me__approach-step-number">Step 3</span>
              <h3>Optimize for Clarity & Conversion</h3>
              <p>
                I refine layouts, content, and user flow so visitors understand what’s offered
                and what action to take — without friction or confusion.
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
                I test changes, fix what doesn’t work, and improve over time. The goal is steady,
                measurable improvement — not one-off delivery.
              </p>
            </div>
          </div>
        </section>


        <section className="about-me__values" data-animate-section>
          <h2
          data-animate="fade-down"
          >What Drives Me</h2>
          <p
          data-animate="fade-up"
          data-delay="1"
          >
            I focus on clarity, execution, and constant improvement. I don’t believe in overcomplicating
            things or shipping half-working solutions.
          </p>

          <div className="values-cards">
            <div 
            className="value-card"
            data-animate="fade-right"
            data-delay-cards="5"
            >
              <span className="value-icon">⚡</span>
              <h3>Execution</h3>
              <p>Turning ideas into real, working solutions quickly and efficiently.</p>
            </div>
            <div className="value-card"
            data-animate="fade-right"
            data-delay-cards="4"
            >
              <span className="value-icon">🧩</span>
              <h3>Problem Solving</h3>
              <p>Identifying the core issues and fixing them in a practical, user-focused way.</p>
            </div>
            <div className="value-card"
            data-animate="fade-right"
            data-delay-cards="3"
            >
              <span className="value-icon">🎯</span>
              <h3>Impact</h3>
              <p>Ensuring that everything I build improves the business or user experience meaningfully.</p>
            </div>
            <div 
            className="value-card"
            data-animate="fade-right"
            data-delay-cards="2"
            >
              <span className="value-icon">🚀</span>
              <h3>Growth</h3>
              <p>Continuously learning, iterating, and optimizing to get better results over time.</p>
            </div>
          </div>
        </section>


        <section className="about-me__results-method" data-animate-section>
          <h2 data-animate="fade-down">How I Create Results</h2>

          <div className="results-method">
            <ul className="results-principles">
              <li 
              data-animate="fade-left" 
              data-delay-cards="1"
              >Clarity over complexity</li>
              <li
              data-animate="fade-left"
              data-delay-cards="2"
              >Function before visuals</li>
              <li
              data-animate="fade-left"
              data-delay-cards="3"
              >Speed is non-negotiable</li>
              <li
              data-animate="fade-left"
              data-delay-cards="4"
              >Conversion over decoration</li>
              <li
              data-animate="fade-left"
              data-delay-cards="5"
              >Iteration beats perfection</li>
            </ul>

            <div className="results-explanation">
              <p
              data-animate="fade-right"
              data-delay-cards="3"
              >
                Every project starts with understanding the real problem. Most websites
                fail not because of bad design, but because they’re unclear, slow, or
                unfocused. My job is to remove friction and make the purpose obvious.
              </p>

              <p
              data-animate="fade-right"
              data-delay-cards="4"
              >
                I build with structure first, optimize for performance, and refine based
                on what actually works. No overengineering, no trends for the sake of it —
                just practical decisions that support real business goals.
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
              <div className="tech-tool">React & JavaScript</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Fast, custom-built websites that are clear, responsive, and easy to use.
              </div>
            </div>

            <div className="tech-row"
            data-animate="fade-left"
            data-delay-cards="2"
            >
              <div className="tech-tool">HTML & CSS</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Clean structure, solid layouts, and consistent design across all devices.
              </div>
            </div>

            <div className="tech-row"
            data-animate="fade-left"
            data-delay-cards="3"
            >
              <div className="tech-tool">Node.js & Express</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Reliable back-end logic, APIs, and integrations that actually work.
              </div>
            </div>

            <div className="tech-row"
            data-animate="fade-left"
            data-delay-cards="4"
            >
              <div className="tech-tool">PostgreSQL & EJS</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Structured data handling and dynamic content without unnecessary complexity.
              </div>
            </div>

            <div className="tech-row"
            data-animate="fade-left"
            data-delay-cards="5">

              <div className="tech-tool">WordPress & Wix</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Quick, editable websites for clients who need flexibility and speed.
              </div>
            </div>

            <div className="tech-row"
            data-animate="fade-left"
            data-delay-cards="6"
            >
              <div className="tech-tool">SEO & Analytics</div>
              <div className="tech-arrow">→</div>
              <div className="tech-result">
                Websites built with visibility, tracking, and measurable growth in mind.
              </div>
            </div>
          </div>
        </section>
        
        <section className="about-me__cta" data-animate-section>
          <p data-animate="fade-down">
            If you need help building, fixing, or improving your online presence,
            let's talk.
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
