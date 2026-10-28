"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Menu, X } from "lucide-react";
import {
  scrollToSection,
  STARTUP_HOME_PATH,
  STARTUP_STORY_PATH,
} from "../lib/scrollToSection";
import "../styles/StartupNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

// Keep this number in sync with the 780px media query in StartupNavbar.css
const MOBILE_QUERY = "(max-width: 780px)";

const NAV_LINKS = [
  { label: "Product", id: "product" },
  { label: "Proof", id: "proof" },
];

export default function StartupNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Close the menu when the route changes (also covers browser back/forward)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

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

  function handleAnchorClick(id: string) {
    scrollToSection(id, pathname, router);
    setIsOpen(false);
  }

  return (
    <header className="startup-navbar" ref={headerRef}>
    <BackButton />
      <div className="startup-navbar-inner">
        <Link
          href={STARTUP_HOME_PATH}
          className="startup-navbar-logo"
          onClick={closeMenu}
        >
          <Activity size={18} strokeWidth={2.5} aria-hidden="true" />
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
          <Link
            href={STARTUP_STORY_PATH}
            className="startup-navbar-link"
            aria-current={pathname === STARTUP_STORY_PATH ? "page" : undefined}
          >
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
            ref={toggleRef}
            type="button"
            className="startup-navbar-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="startup-navbar-mobile"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* The mobile menu is only rendered while it's open (unchanged), so
          closed it can't be reached by the keyboard or screen readers. */}
      {isOpen && (
        <nav
          id="startup-navbar-mobile"
          className="startup-navbar-mobile"
          aria-label="Mobile"
        >
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
            aria-current={pathname === STARTUP_STORY_PATH ? "page" : undefined}
            onClick={closeMenu}
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