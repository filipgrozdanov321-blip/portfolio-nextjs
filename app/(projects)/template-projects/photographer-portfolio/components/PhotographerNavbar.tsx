"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/PhotographerNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

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

  const isActive = (href: string) => pathname === href;

  return (
    <header className="portfolio-navbar">
      <BackButton />
      <div className="portfolio-navbar-inner">
        <Link
          href={BASE_PATH}
          className="portfolio-navbar-logo"
          onClick={() => setIsMenuOpen(false)}
        >
          Wren Ashby
        </Link>

        <nav className="portfolio-navbar-links portfolio-navbar-links-desktop">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
          className="portfolio-navbar-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="portfolio-navbar-mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`portfolio-navbar-mobile-link ${
                isActive(link.href) ? "portfolio-navbar-link-active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`${BASE_PATH}/contact`}
            className="portfolio-navbar-cta portfolio-navbar-cta-mobile"
            onClick={() => setIsMenuOpen(false)}
          >
            Book a Session
          </Link>
        </nav>
      )}
    </header>
  );
}