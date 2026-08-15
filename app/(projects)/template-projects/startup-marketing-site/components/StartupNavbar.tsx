"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Menu, X } from "lucide-react";
import {
  scrollToSection,
  STARTUP_HOME_PATH,
  STARTUP_STORY_PATH,
} from "../lib/scrollToSection";
import "../styles/StartupNavbar.css";

const NAV_LINKS = [
  { label: "Product", id: "product" },
  { label: "Proof", id: "proof" },
];

export default function StartupNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function handleAnchorClick(id: string) {
    scrollToSection(id, pathname, router);
    setIsOpen(false);
  }

  return (
    <header className="startup-navbar">
      <div className="startup-navbar-inner">
        <Link
          href={STARTUP_HOME_PATH}
          className="startup-navbar-logo"
          onClick={() => setIsOpen(false)}
        >
          <Activity size={18} strokeWidth={2.5} />
          <span>Rivet</span>
          <span className="startup-navbar-pulse" aria-hidden="true" />
        </Link>

        <nav className="startup-navbar-links-desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="startup-navbar-link"
              onClick={() => handleAnchorClick(link.id)}
            >
              {link.label}
            </button>
          ))}
          <Link href={STARTUP_STORY_PATH} className="startup-navbar-link">
            Story
          </Link>
        </nav>

        <div className="startup-navbar-actions">
          <button
            type="button"
            className="startup-navbar-cta"
            onClick={() => handleAnchorClick("cta")}
          >
            Get Early Access
          </button>

          <button
            type="button"
            className="startup-navbar-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="startup-navbar-mobile" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="startup-navbar-mobile-link"
              onClick={() => handleAnchorClick(link.id)}
            >
              {link.label}
            </button>
          ))}
          <Link
            href={STARTUP_STORY_PATH}
            className="startup-navbar-mobile-link"
            onClick={() => setIsOpen(false)}
          >
            Story
          </Link>
          <button
            type="button"
            className="startup-navbar-cta startup-navbar-cta-mobile"
            onClick={() => handleAnchorClick("cta")}
          >
            Get Early Access
          </button>
        </nav>
      )}
    </header>
  );
}