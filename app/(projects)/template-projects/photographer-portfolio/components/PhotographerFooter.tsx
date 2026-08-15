import Link from "next/link";
import { Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import "../styles/PhotographerFooter.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

const FOOTER_LINKS = [
  { href: `${BASE_PATH}/portfolio`, label: "Portfolio" },
  { href: `${BASE_PATH}/about`, label: "About" },
  { href: `${BASE_PATH}/services`, label: "Services" },
  { href: `${BASE_PATH}/contact`, label: "Contact" },
];

export default function PhotographerFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <div className="portfolio-footer-brand">
          <span className="portfolio-footer-logo">Wren Ashby</span>
          <p className="portfolio-footer-tagline">
            Portrait, editorial, and personal branding photography.
          </p>
        </div>

        <nav className="portfolio-footer-links">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="portfolio-footer-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="portfolio-footer-contact">
          <a href="mailto:hello@wrenashby.com" className="portfolio-footer-icon-link">
            <Mail size={18} />
            <span>hello@wrenashby.com</span>
          </a>
          
          <a 
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-footer-icon-link"
          >
            <SiInstagram size={18} />
            <span>@wrenashby</span>
          </a>
        </div>
      </div>

      <div className="portfolio-footer-bottom">
        <p>© {currentYear} Wren Ashby Photography. All rights reserved.</p>
      </div>
    </footer>
  );
}
