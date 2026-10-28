"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../styles/navbar.css";
import { scrollToSection } from "../lib/scrollTo";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

// Keep this number in sync with the 768px media query in navbar.css
const MOBILE_QUERY = "(max-width: 768px)";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  // While the menu is open: Escape closes it, and so does a press anywhere
  // outside the navbar.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus(); // don't lose keyboard focus
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  // If the window grows past the mobile breakpoint (rotating a tablet,
  // resizing a browser), reset the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setIsOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="navbar" ref={headerRef}>
      <BackButton />
      <div className="navbar-container">
        <Link
          href="/template-projects/saas-landing-page"
          className="navbar-logo"
          onClick={closeMenu}
        >
          ChairTime
        </Link>

        {/* Hamburger: only visible below 768px (see navbar.css) */}
        <button
          ref={toggleRef}
          type="button"
          className="navbar-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="navbar-toggle-bars" aria-hidden="true" />
        </button>

        {/* On desktop this wrapper is display: contents, so the layout is
            identical to before. On mobile it becomes the slide-down panel. */}
        <div
          id="navbar-menu"
          className={`navbar-menu ${isOpen ? "is-open" : ""}`}
        >
          <nav className="navbar-links" aria-label="Page sections">
            <a
              href="#features"
              onClick={(e) => {
                scrollToSection(e, "features");
                closeMenu();
              }}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                scrollToSection(e, "how-it-works");
                closeMenu();
              }}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                scrollToSection(e, "pricing");
                closeMenu();
              }}
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                scrollToSection(e, "faq");
                closeMenu();
              }}
            >
              FAQ
            </a>
          </nav>

          <a
            href="#pricing"
            onClick={(e) => {
              scrollToSection(e, "pricing");
              closeMenu();
            }}
            className="navbar-cta"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}