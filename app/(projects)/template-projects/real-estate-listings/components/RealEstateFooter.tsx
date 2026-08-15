import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../styles/RealEstateFooter.css";

export default function RealEstateFooter() {
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/template-projects/real-estate-listings/listings", label: "Listings" },
    { href: "/template-projects/real-estate-listings/about", label: "About" },
    { href: "/template-projects/real-estate-listings/contact", label: "Contact" },
  ];

  return (
    <footer className="realestate-footer">
      <div className="realestate-footer-inner">
        <div className="realestate-footer-brand">
          <Link href="/template-projects/real-estate-listings" className="realestate-footer-logo">
            Meridian <span>Realty</span>
          </Link>
          <p className="realestate-footer-tagline">
            Residential real estate in Austin, built on straightforward advice and local expertise.
          </p>
          <div className="realestate-footer-socials">
            <a href="#" aria-label="Instagram"><FaInstagram size={16} /></a>
            <a href="#" aria-label="Facebook"><FaFacebook size={16} /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin size={16} /></a>
          </div>
        </div>

        <div className="realestate-footer-column">
          <h4>Navigate</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="realestate-footer-column">
          <h4>Office</h4>
          <ul className="realestate-footer-contact">
            <li>
              <MapPin size={16} />
              <span>1401 Congress Ave, Suite 200, Austin, TX 78701</span>
            </li>
            <li>
              <Phone size={16} />
              <span>(512) 555-0148</span>
            </li>
            <li>
              <Mail size={16} />
              <span>hello@meridianrealty.example</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="realestate-footer-bottom">
        <div className="realestate-container realestate-footer-bottom-inner">
          <p>© {year} Meridian Realty. All rights reserved.</p>
          <p className="realestate-footer-disclaimer">Template showcase — not a licensed brokerage.</p>
        </div>
      </div>
    </footer>
  );
}