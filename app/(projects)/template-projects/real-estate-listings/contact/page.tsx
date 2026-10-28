import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import RealEstateContactForm from "../components/RealEstateContactForm";
import "../styles/RealEstateContactPage.css";

export const metadata: Metadata = {
  title: "Contact | Meridian Realty",
  description: "Get in touch with Meridian Realty in Austin, TX.",
};

export default function RealEstateContactPage() {
  return (
    <div className="realestate-container realestate-contact-page">
      <div className="realestate-contact-intro">
        <p className="realestate-eyebrow">Get in Touch</p>
        <h1 className="realestate-contact-title">
          Let's talk about your next move
        </h1>
        <p className="realestate-contact-lead">
          Fill out the form or reach out directly — whichever's easier.
        </p>
      </div>

      <div className="realestate-contact-layout">
        <RealEstateContactForm />

        <div className="realestate-contact-office">
          <h3>Office</h3>
          <div className="realestate-contact-office-item">
            <MapPin size={17} aria-hidden="true" />
            <span>1401 Congress Ave, Suite 200, Austin, TX 78701</span>
          </div>
          <div className="realestate-contact-office-item">
            <Phone size={17} aria-hidden="true" />
            <span>(512) 555-0148</span>
          </div>
          <div className="realestate-contact-office-item">
            <Mail size={17} aria-hidden="true" />
            <span>hello@meridianrealty.example</span>
          </div>
          <div className="realestate-contact-office-item">
            <Clock size={17} aria-hidden="true" />
            <span>Mon–Fri, 9am–6pm CT</span>
          </div>
        </div>
      </div>
    </div>
  );
}