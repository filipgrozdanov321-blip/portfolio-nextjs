"use client";

import Link from "next/link";
import "../styles/navbar.css";
import { scrollToSection } from "../lib/scrollTo";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

export default function Navbar() {
  return (
    <>
      <header className="navbar">
      <BackButton />
        <div className="navbar-container">
          <Link href="/template-projects/saas-landing-page" className="navbar-logo">
            ChairTime
          </Link>

          <nav className="navbar-links">
            <a href="#features" onClick={(e) => scrollToSection(e, "features")}>Features</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, "how-it-works")}>How It Works</a>
            <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}>Pricing</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, "faq")}>FAQ</a>
          </nav>

          <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="navbar-cta">
            Get Started
          </a>
        </div>
      </header>
    </>
  );
}