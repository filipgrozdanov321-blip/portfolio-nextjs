"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./header.css";

// Keep this number in sync with the 768px media query in header.css
const MOBILE_QUERY = "(max-width: 768px)";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close the menu when the route changes (also covers browser back/forward)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  const closeMenu = () => setIsMenuOpen(false);

  // Escape closes the menu. A press outside the header closes it too.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isMenuOpen) toggleRef.current?.focus(); // don't lose keyboard focus
      setIsMenuOpen(false);
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
    <header className="header" ref={headerRef}>
      <div className="elements-inside-header">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="Filip Grozdanov, home"
            width={140}
            height={40}
            sizes="48px"
            className="logo-img"
            priority
          />
        </Link>

        {/* Hamburger: only visible below 768px (see header.css) */}
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-bars" aria-hidden="true" />
        </button>

        {/* On desktop this wrapper is display: contents, so it doesn't
            affect the layout. On mobile it becomes the slide-down panel. */}
        <div
          id="header-menu"
          className={`header-menu ${isMenuOpen ? "is-open" : ""}`}
        >
          <nav className="nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-button ${isActive(link.href) ? "active" : ""}`}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <Link
              href="/contact"
              className={`contact-button ${isActive("/contact") ? "active" : ""}`}
              aria-current={isActive("/contact") ? "page" : undefined}
              onClick={closeMenu}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
