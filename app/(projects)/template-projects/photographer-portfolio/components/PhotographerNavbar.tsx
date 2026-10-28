"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/PhotographerNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

// Keep this number in sync with the 768px media query in PhotographerNavbar.css
const MOBILE_QUERY = "(max-width: 768px)";

const BASE_PATH = "/template-projects/photographer-portfolio";

const NAV_LINKS = [
  { href: `${BASE_PATH}/portfolio`, label: "Portfolio" },
  { href: `${BASE_PATH}/about`, label: "About" },
  { href: `${BASE_PATH}/services`, label: "Services" },
  { href: `${BASE_PATH}/contact`, label: "Contact" },
];

export default function PhotographerNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href;
  const closeMenu = () => setIsMenuOpen(false);

  // Close the menu when the route changes (also covers browser back/forward)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  // While the menu is open: Escape closes it, and so does a press anywhere
  // outside the navbar.
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMenuOpen(false);
      toggleRef.current?.focus(); // don't lose keyboard focus
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  // If the window grows past the mobile breakpoint (rotating a tablet,
  // resizing a browser), reset the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setIsMenuOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="portfolio-navbar" ref={headerRef}>
      <BackButton />
      <div className="portfolio-navbar-inner">
        <Link
          href={BASE_PATH}
          className="portfolio-navbar-logo"
          onClick={closeMenu}
        >
          Wren Ashby
        </Link>

        <nav
          className="portfolio-navbar-links portfolio-navbar-links-desktop"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`portfolio-navbar-link ${
                isActive(link.href) ? "portfolio-navbar-link-active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`${BASE_PATH}/contact`}
          className="portfolio-navbar-cta portfolio-navbar-cta-desktop"
        >
          Book a Session
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="portfolio-navbar-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="portfolio-navbar-mobile-menu"
        >
          {isMenuOpen ? (
            <X size={22} aria-hidden="true" />
          ) : (
            <Menu size={22} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* The mobile menu is only rendered while it's open (unchanged), so
          closed it can't be reached by the keyboard or screen readers. */}
      {isMenuOpen && (
        <nav
          id="portfolio-navbar-mobile-menu"
          className="portfolio-navbar-mobile"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`portfolio-navbar-mobile-link ${
                isActive(link.href) ? "portfolio-navbar-link-active" : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${BASE_PATH}/contact`}
            className="portfolio-navbar-cta portfolio-navbar-cta-mobile"
            onClick={closeMenu}
          >
            Book a Session
          </Link>
        </nav>
      )}
    </header>
  );
}