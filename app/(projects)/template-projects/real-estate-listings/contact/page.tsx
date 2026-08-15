import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import RealEstateContactForm from "../components/RealEstateContactForm";

export const metadata: Metadata = {
  title: "Contact | Meridian Realty",
  description: "Get in touch with Meridian Realty in Austin, TX.",
};

export default function RealEstateContactPage() {
  return (
    <div className="realestate-container" style={{ paddingTop: "56px", paddingBottom: "88px" }}>
      <div style={{ maxWidth: "560px", marginBottom: "40px" }}>
        <p className="realestate-eyebrow">Get in Touch</p>
        <h1 style={{ fontSize: "34px", fontWeight: 700, marginTop: "8px" }}>
          Let's talk about your next move
        </h1>
        <p style={{ fontSize: "15px", color: "var(--realestate-gray)", marginTop: "12px" }}>
          Fill out the form or reach out directly — whichever's easier.
        </p>
      </div>

      <div className="realestate-contact-layout">
        <RealEstateContactForm />

        <div className="realestate-contact-office">
          <h3>Office</h3>
          <div className="realestate-contact-office-item">
            <MapPin size={17} />
            <span>1401 Congress Ave, Suite 200, Austin, TX 78701</span>
          </div>
          <div className="realestate-contact-office-item">
            <Phone size={17} />
            <span>(512) 555-0148</span>
          </div>
          <div className="realestate-contact-office-item">
            <Mail size={17} />
            <span>hello@meridianrealty.example</span>
          </div>
          <div className="realestate-contact-office-item">
            <Clock size={17} />
            <span>Mon–Fri, 9am–6pm CT</span>
          </div>
        </div>
      </div>
    </div>
  );
}