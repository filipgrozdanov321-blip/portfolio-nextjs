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
          conversion, and execution problem. Here’s where things usually break
          down, and how I fix them.
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
                  Outdated websites that look <strong>untrustworthy</strong>
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Low <strong>conversion</strong> rates despite decent traffic
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Confusing messaging that doesn’t <strong>speak</strong> to the
                  customer
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  No clear funnel or strategy to generate <strong>leads</strong>
                </li>
                <li className={isVisible.problemItemsStart ? "animate" : ""}>
                  Marketing efforts that produce no measurable{" "}
                  <strong>ROI</strong>
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
                  Modern, high-performance websites built for{" "}
                  <strong>conversions</strong>
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Clear <strong>messaging</strong> that positions your offer
                  correctly
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Responsive design <strong>optimized</strong> for all devices
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Data-driven marketing strategies focused on{" "}
                  <strong>results</strong>
                </li>
                <li className={isVisible.solutionItemsStart ? "animate" : ""}>
                  Scalable <strong>systems</strong> designed to grow with your
                  business
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
