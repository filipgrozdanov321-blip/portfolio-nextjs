"use client";

import { scrollToSection } from "../lib/scrollTo";
import "../styles/finalCTA.css";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="final-cta-container">
        <h2 className="final-cta-title">Ready to fill your chair?</h2>
        <p className="final-cta-subtitle">
          Join hundreds of studios already saving time and reducing no-shows with ChairTime.
        </p>
        <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="final-cta-button">
          Get Started
        </a>
      </div>
    </section>
  );
}