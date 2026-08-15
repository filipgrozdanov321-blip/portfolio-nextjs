"use client";

import { useEffect, useRef } from "react";
import ContactForm from "../../ComponentsUsedAroundTheWebSite/ContactForm/ContactFrom";
import "./contact-section.css";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".animate");
    if (!elements || elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.7 }
    );

    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="contact-title animate animate-down">
          Let’s Work Together
        </h2>

        <p className="contact-intro animate animate-up">
          Ready to take your online presence to the next level? I’d love to help
          you bring your vision to life.
        </p>

        <div className="contact-content">
          <div className="contact-grid">
            <div className="animate animate-left">
              <ContactForm />
            </div>

            <div className="contact-info animate animate-right">
              <h3>Prefer email or social?</h3>

              <div className="contact-page-links">
                <div className="contact-link">
                  <i className="fas fa-envelope contact-icon"></i>
                  <a href="mailto:youremail@example.com">
                    youremail@example.com
                  </a>
                </div>

                <div className="contact-link">
                  <i className="fab fa-linkedin contact-icon"></i>
                  <a
                    href="https://www.linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>

                <div className="contact-link">
                  <i className="fas fa-calendar-alt contact-icon"></i>
                  <a
                    href="https://calendly.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule a Meeting
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
