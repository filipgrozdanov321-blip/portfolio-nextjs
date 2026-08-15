"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import "../styles/RestaurantNavbar.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="restaurant-navbar">
      <BackButton />
      <div className="restaurant-navbar-inner">
      <Link href="/template-projects/restaurant" className="restaurant-navbar-logo">
        Bella Vista
      </Link>

        <nav
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
          className="restaurant-navbar-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}