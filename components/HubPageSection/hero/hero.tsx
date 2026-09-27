"use client";

import Link from "next/link";
import "./hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-h1-title">I build products people actually enjoy using.</h1>

        <p>
          Full-stack developer working in React, Next.js, and TypeScript — from
          pixel-perfect landing pages to fully interactive web apps. Take a look around.
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