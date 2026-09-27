"use client";

import { useEffect, useRef } from "react";
import "./services.css";

export default function ServicesSection() {
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
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <h2 className="services-title animate animate-down">
          What I Actually Deliver
        </h2>

        {/* Web Development */}
        <div className="service-row">
          <div className="service-heading web animate animate-left">
            <h3>Websites That Convert</h3>
            <p>
              I build fast, modern websites designed to turn visitors into
              leads — not just look good.
            </p>
          </div>

          <div className="service-content animate animate-right">
            <ul>
              <li>Custom design built around your brand, not a template</li>
              <li>Mobile-first, responsive layouts</li>
              <li>Clear messaging and conversion-focused structure</li>
              <li>Fast load times and clean code</li>
              <li>Scalable setup for future growth</li>
            </ul>

            <span className="service-outcome">
              Outcome: A website that builds trust and generates inquiries.
            </span>
          </div>
        </div>

        {/* Digital Marketing */}
        <div className="service-row reverse">
          <div className="service-heading marketing animate animate-left">
            <h3>Marketing That Drives Results</h3>
            <p>
              I focus on practical, measurable marketing — not vanity metrics
              or empty traffic.
            </p>
          </div>

          <div className="service-content animate animate-right">
            <ul>
              <li>SEO strategies for long-term organic growth</li>
              <li>Targeted paid ads with clear intent</li>
              <li>Simple funnels that convert visitors into leads</li>
              <li>Email marketing for follow-ups and retention</li>
              <li>Data-driven decisions, not guesswork</li>
            </ul>

            <span className="service-outcome">
              Outcome: More qualified leads and predictable growth.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}