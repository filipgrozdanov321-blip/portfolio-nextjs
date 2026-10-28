"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import "../styles/RealEstateNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

// Keep this number in sync with the 860px media query in RealEstateNavbar.css
const MOBILE_QUERY = "(max-width: 860px)";

const BASE_PATH = "/template-projects/real-estate-listings";

const navLinks = [
  { href: `${BASE_PATH}/listings`, label: "Listings" },
  { href: `${BASE_PATH}/about`, label: "About" },
];

export default function RealEstateNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href;
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

  return (
    <header className="realestate-navbar" ref={headerRef}>
      <BackButton />
      <div className="realestate-navbar-inner">
        <Link
          href={BASE_PATH}
          className="realestate-navbar-logo"
          onClick={closeMenu}
        >
          Meridian <span>Realty</span>
        </Link>

        <nav
          className="realestate-navbar-links realestate-navbar-links-desktop"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="realestate-navbar-link"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${BASE_PATH}/contact`}
            aria-current={isActive(`${BASE_PATH}/contact`) ? "page" : undefined}
            className="realestate-btn realestate-btn-primary"
          >
            Get in Touch
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="realestate-navbar-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="realestate-navbar-mobile"
        >
          {isOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* The mobile menu is only rendered while it's open (unchanged), so
          closed it can't be reached by the keyboard or screen readers. */}
      {isOpen && (
        <nav
          id="realestate-navbar-mobile"
          className="realestate-navbar-links-mobile"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className="realestate-navbar-link"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${BASE_PATH}/contact`}
            aria-current={isActive(`${BASE_PATH}/contact`) ? "page" : undefined}
            className="realestate-btn realestate-btn-primary"
            onClick={closeMenu}
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  );
}