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
          Tell me what you’re building and where it’s stuck — I’ll reply
          within a day with real next steps, not a sales pitch.
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
                  <a href="mailto:filip.grozdanov.web@gmail.com">
                    filip.grozdanov.web@gmail.com
                  </a>
                </div>

                <div className="contact-link">
                  <i className="fab fa-whatsapp contact-icon"></i>
                  <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </div>

                {/* <div className="contact-link">
                  <i className="fab fa-linkedin contact-icon"></i>
                  <a
                    href="https://www.linkedin.com/in/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}