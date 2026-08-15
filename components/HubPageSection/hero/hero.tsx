"use client";

import Link from "next/link";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-h1-title">Your Title Goes Here</h1>

        <p>
          A short description or tagline. Make it punchy — nobody reads long fluff
          on a portfolio hero.
        </p>

        <div className="hero-cta-anim">
          <Link href="/contact" className="contact-button-hero">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
