"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import "../styles/RestaurantNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

// Keep this number in sync with the 960px media query in RestaurantNavbar.css
const MOBILE_QUERY = "(max-width: 960px)";

const NAV_LINKS = [
  { label: "Home", id: "restaurant-hero" },
  { label: "About", id: "restaurant-about" },
  { label: "Menu", id: "restaurant-menu" },
  { label: "Gallery", id: "restaurant-gallery" },
  { label: "Testimonials", id: "restaurant-testimonials" },
  { label: "Location", id: "restaurant-location" },
];

export default function RestaurantNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // While the menu is open: Escape closes it, and so does a press anywhere
  // outside the navbar.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus(); // don't lose keyboard focus
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  // If the window grows past the mobile breakpoint (rotating a tablet,
  // resizing a browser), reset the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const handleScroll = (
    e: ReactMouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (target) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const behavior = reduceMotion ? "auto" : "smooth";

      if (window.matchMedia(MOBILE_QUERY).matches && headerRef.current) {
        // Mobile layout: the navbar is sticky, so stop the section's top edge
        // just below it instead of underneath it.
        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerRef.current.offsetHeight;
        window.scrollTo({ top: Math.max(0, top), behavior });
      } else {
        target.scrollIntoView({ behavior });
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="restaurant-navbar" ref={headerRef}>
      <BackButton />
      <div className="restaurant-navbar-inner">
        <Link
          href="/template-projects/restaurant"
          className="restaurant-navbar-logo"
          onClick={closeMenu}
        >
          Bella Vista
        </Link>

        <nav
          id="restaurant-navbar-menu"
          aria-label="Main navigation"
          className={`restaurant-navbar-links ${
            isMobileMenuOpen ? "restaurant-navbar-links-open" : ""
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="restaurant-navbar-link"
              onClick={(e) => handleScroll(e, link.id)}
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/template-projects/restaurant/reservations"
            className="restaurant-navbar-cta restaurant-navbar-cta-mobile"
            onClick={closeMenu}
          >
            Book a Table
          </Link>
        </nav>

        <Link
          href="/template-projects/restaurant/reservations"
          className="restaurant-navbar-cta restaurant-navbar-cta-desktop"
        >
          Book a Table
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="restaurant-navbar-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="restaurant-navbar-menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}