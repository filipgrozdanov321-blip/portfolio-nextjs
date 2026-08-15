"use client";

import { use } from "react";
import { scrollToSection } from "../lib/scrollTo";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="saas-hero">
      <div className="saas-hero-container">
        <h1 className="saas-hero-title">
          Booking software that keeps your chair full
        </h1>
        <p className="saas-hero-subtitle">
          ChairTime helps salons, barbers, and tattoo studios manage
          appointments, reduce no-shows, and keep clients coming back —
          all from one simple dashboard.
        </p>

        <div className="saas-hero-actions">
          <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="saas-hero-cta-primary">
            Get Started Free
          </a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, "how-it-works")} className="saas-hero-cta-secondary">
            See How It Works
          </a>
        </div>

        <div className="saas-hero-image-placeholder">
          <span>Product Screenshot Placeholder</span>
        </div>
      </div>
    </section>
  );
}