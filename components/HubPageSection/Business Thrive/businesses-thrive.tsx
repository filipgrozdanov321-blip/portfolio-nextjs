"use client";

import { useEffect, useRef, useState } from "react";
import "./businesses-thrive.css";

// How much of an element must be on screen before it fades in.
// 0.7 was too high: on a phone the stacked columns are taller than 70% of
// the screen, so they could never reach it and stayed invisible.
const REVEAL_THRESHOLD = 0.15;

const BusinessesThriveSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState({
    title: false,
    subtitle: false,
    leftColumn: false,
    rightColumn: false,
    problemItemsStart: false,
    solutionItemsStart: false,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;

          if (el.classList.contains("heading")) {
            setIsVisible((prev) => ({ ...prev, title: true }));
          } else if (el.classList.contains("bt-under-header")) {
            setIsVisible((prev) => ({ ...prev, subtitle: true }));
          } else if (el.classList.contains("bt-column-left")) {
            setIsVisible((prev) => ({ ...prev, leftColumn: true }));
          } else if (el.classList.contains("bt-column-right")) {
            setIsVisible((prev) => ({ ...prev, rightColumn: true }));
          }

          // Each element only needs to reveal once
          observer.unobserve(el);
        });
      },
      { threshold: REVEAL_THRESHOLD }
    );

    // Only look inside THIS section (".heading" is a very generic class name)
    const elements = section.querySelectorAll(
      ".heading, .bt-under-header, .bt-column-left, .bt-column-right"
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-i-help" className="businesses-thrive" ref={sectionRef}>
      <div className="bt-container">
        <h2 className={`heading ${isVisible.title ? "visible" : ""}`}>
          How I Help Businesses Thrive Online
        </h2>

        <p className={`bt-under-header ${isVisible.subtitle ? "visible" : ""}`}>
          Most businesses don’t have a traffic problem — they have a clarity,
          conversion, and execution problem. Here’s where it usually breaks
          down, and how I fix it.
        </p>

        <div className="bt-grid">
          {/* LEFT COLUMN */}
          <div
            className={`bt-column-left ${isVisible.leftColumn ? "visible" : ""}`}
            onAnimationEnd={() =>
              setIsVisible((prev) =>
                prev.problemItemsStart
                  ? prev
                  : { ...prev, problemItemsStart: true }
              )
            }
          >
            <h3 className="problems">The Problems I See</h3>

            <div
              className={`bt-card left ${
                isVisible.problemItemsStart ? "items-visible" : ""
              }`}
            >
              <ul>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  A website that looks <strong>outdated</strong> the moment
                  someone lands on it
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Messaging that talks about you, not to your{" "}
                  <strong>customer</strong>
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Decent traffic that never actually turns into{" "}
                  <strong>customers</strong>
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  No real funnel — just a page waiting around for{" "}
                  <strong>leads</strong>
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Marketing spend with no clear <strong>ROI</strong> to point
                  to
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`bt-column-right ${
              isVisible.rightColumn ? "visible" : ""
            }`}
            onAnimationEnd={() =>
              setIsVisible((prev) =>
                prev.solutionItemsStart
                  ? prev
                  : { ...prev, solutionItemsStart: true }
              )
            }
          >
            <h3 className="solutions">How I Solve Them</h3>

            <div
              className={`bt-card right ${
                isVisible.solutionItemsStart ? "items-visible" : ""
              }`}
            >
              <ul>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  A modern site that reads as <strong>credible</strong> in the
                  first five seconds
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Messaging built around what your{" "}
                  <strong>customer</strong> actually cares about
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  A structure designed to turn visitors into{" "}
                  <strong>customers</strong>
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  A real <strong>funnel</strong> — content, capture, and
                  follow-up working together
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Tracking that shows exactly what's driving{" "}
                  <strong>results</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessesThriveSection;