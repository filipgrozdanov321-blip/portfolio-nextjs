import Link from "next/link";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">ChairTime</span>
            <p className="footer-tagline">
              Booking software for salons, barbers, and studios.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-links-column">
              <span className="footer-links-title">Product</span>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="footer-links-column">
              <span className="footer-links-title">Company</span>
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Careers</Link>
            </div>

            <div className="footer-links-column">
              <span className="footer-links-title">Legal</span>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ChairTime. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}