import Link from "next/link";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";
import "../styles/RestaurantFooter.css";

const FOOTER_LINKS = [
  { label: "About", id: "restaurant-about" },
  { label: "Menu", id: "restaurant-menu" },
  { label: "Gallery", id: "restaurant-gallery" },
  { label: "Testimonials", id: "restaurant-testimonials" },
  { label: "Location", id: "restaurant-location" },
];

export default function RestaurantFooter() {
  return (
    <footer className="restaurant-footer">
      <div className="restaurant-footer-inner">

        <div className="restaurant-footer-brand">
          <span className="restaurant-footer-logo">Bella Vista</span>
          <p className="restaurant-footer-tagline">
            Authentic Italian cuisine crafted with passion since 1987.
          </p>
          <div className="restaurant-footer-socials">
            <a href="#" className="restaurant-footer-social-link" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="restaurant-footer-social-link" aria-label="Facebook">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="restaurant-footer-social-link" aria-label="Twitter">
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

        <div className="restaurant-footer-nav">
          <span className="restaurant-footer-nav-heading">Navigate</span>
          <ul className="restaurant-footer-nav-list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="restaurant-footer-nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="restaurant-footer-contact">
          <span className="restaurant-footer-nav-heading">Contact</span>
          <ul className="restaurant-footer-contact-list">
            <li>392 Greenwich St, New York, NY 10013</li>
            <li>+1 (212) 555-0198</li>
            <li>info@bellavista.com</li>
          </ul>
          <Link
            href="/template-projects/restaurant/reservations"
            className="restaurant-footer-cta"
          >
            Book a Table
          </Link>
        </div>

      </div>

      <div className="restaurant-footer-bottom">
        <p className="restaurant-footer-copyright">
          &copy; {new Date().getFullYear()} Bella Vista. All rights reserved.
        </p>
        <p className="restaurant-footer-credit">
          Template by Filip &mdash; Portfolio Project
        </p>
      </div>
    </footer>
  );
}