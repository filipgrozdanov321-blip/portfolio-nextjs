import { Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import PhotographerContactForm from "../components/PhotographerContactForm";
import "../styles/PhotographerContactPage.css";

export default function PhotographerContactPage() {
  return (
    <div className="portfolio-contact-page">
      <div className="portfolio-contact-page-inner">
        <div className="portfolio-contact-page-intro">
          <h1 className="portfolio-contact-page-title">Book a Session</h1>
          <p className="portfolio-contact-page-text">
            Tell me a bit about what you're looking for and I'll follow up
            to confirm details, availability, and pricing.
          </p>

          <div className="portfolio-contact-page-direct">
            <a href="mailto:hello@wrenashby.com" className="portfolio-contact-page-direct-link">
              <Mail size={18} />
              <span>hello@wrenashby.com</span>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-contact-page-direct-link"
              >
              <SiInstagram size={18} />
              <span>@wrenashby</span>
              </a>
          </div>
        </div>

        <PhotographerContactForm />
      </div>
    </div>
  );
}