"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import "../styles/RealEstateNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

export default function RealEstateNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/template-projects/real-estate-listings/listings", label: "Listings" },
    { href: "/template-projects/real-estate-listings/about", label: "About" },
  ];

  return (
    <header className="realestate-navbar">
      <BackButton />
      <div className="realestate-navbar-inner">
        <Link
          href="/template-projects/real-estate-listings"
          className="realestate-navbar-logo"
          onClick={() => setIsOpen(false)}
        >
          Meridian <span>Realty</span>
        </Link>

        <nav className="realestate-navbar-links realestate-navbar-links-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="realestate-navbar-link">
              {link.label}
            </Link>
          ))}
          <Link
            href="/template-projects/real-estate-listings/contact"
            className="realestate-btn realestate-btn-primary"
          >
            Get in Touch
          </Link>
        </nav>

        <button
          className="realestate-navbar-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="realestate-navbar-links-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="realestate-navbar-link"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/template-projects/real-estate-listings/contact"
            className="realestate-btn realestate-btn-primary"
            onClick={() => setIsOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      )}
    </header>
  );
}