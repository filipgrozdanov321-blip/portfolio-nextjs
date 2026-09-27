"use client";

import { useEffect, useState } from "react";
import "./businesses-thrive.css";

const BusinessesThriveSection = () => {
  const [isVisible, setIsVisible] = useState({
    title: false,
    subtitle: false,
    leftColumn: false,
    rightColumn: false,
    problemItemsStart: false,
    solutionItemsStart: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (entry.target.classList.contains("heading")) {
            setIsVisible((prev) => ({ ...prev, title: true }));
          } else if (entry.target.classList.contains("bt-under-header")) {
            setIsVisible((prev) => ({ ...prev, subtitle: true }));
          } else if (entry.target.classList.contains("bt-column-left")) {
            setIsVisible((prev) => ({ ...prev, leftColumn: true }));
          } else if (entry.target.classList.contains("bt-column-right")) {
            setIsVisible((prev) => ({ ...prev, rightColumn: true }));
          }
        });
      },
      { threshold: 0.7 }
    );

    const elements = document.querySelectorAll(
      ".heading, .bt-under-header, .bt-column-left, .bt-column-right"
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-i-help" className="businesses-thrive">
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