"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import "./footer.css";

export default function Footer() {
  const scrollToTop = () => {
    // Skip the smooth animation for people who turned on "reduce motion"
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>{site.name}</h3>
            <p>
              Web developer building fast websites and web apps for small
              businesses and agencies. Websites from {site.pricing.websitesFrom}.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy-policy">Privacy Notice</Link></li>
              <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                  Email
                </a>
              </li>
              <li>
                <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp" aria-hidden="true"></i>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
