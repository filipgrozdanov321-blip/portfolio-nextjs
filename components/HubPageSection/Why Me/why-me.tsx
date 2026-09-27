"use client";

import { useEffect, useRef } from "react";
import "./why-me.css";

export default function WhyMeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".animate");
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.9 }
    );

    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-me" className="why-me" ref={sectionRef}>
      <div className="why-me-container">
        <h2 className="why-me-title animate animate-down">
          The Way I Work
        </h2>

        <p className="why-me-intro animate animate-up">
          Most projects fail not because of bad tools, but because of poor
          decisions. This is how I work differently — and why it matters.
        </p>

        <div className="why-me-list">
          {[
            {
              n: "01",
              t: "Clarity Before Code",
              d: "I nail down the goal, message, and structure before writing a line of code — so there's a clear direction from day one.",
              r: "Result: your offer is clearer and converts faster.",
            },
            {
              n: "02",
              t: "Speed Without Breaking Things",
              d: "I move fast without cutting corners. Everything is built to stay stable, scalable, and easy to improve.",
              r: "Result: faster launches without piling up technical debt.",
              right: true,
            },
            {
              n: "03",
              t: "Honest Feedback",
              d: "If something won’t work, I’ll tell you early — not after it fails. My job isn’t to agree, it’s to help you make better decisions.",
              r: "Result: fewer wasted resources and better outcomes.",
            },
            {
              n: "04",
              t: "Ownership Mindset",
              d: "I don’t treat projects like tasks. I treat them like businesses. Every choice is made with long-term impact in mind.",
              r: "Result: work that continues delivering value after launch.",
              right: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`why-me-item animate ${
                item.right ? "item-right animate-right" : "animate-left"
              }`}
            >
              <div className="why-me-item-inner">
                <span className="why-me-number">{item.n}</span>
                <h3>{item.t}</h3>
                <p>{item.d}</p>
                <p className="why-me-result">{item.r}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}