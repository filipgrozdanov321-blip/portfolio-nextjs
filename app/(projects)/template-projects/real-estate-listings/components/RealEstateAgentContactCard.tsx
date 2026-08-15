"use client";

import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import "../styles/RealEstateAgentContactCard.css";

interface RealEstateAgentContactCardProps {
  propertyAddress: string;
}

export default function RealEstateAgentContactCard({
  propertyAddress,
}: RealEstateAgentContactCardProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="realestate-agentcontactcard">
      <div className="realestate-agentcontactcard-agent">
        <img
          src="/images/realestate/agent-headshot.jpg"
          alt="Meridian Realty agent"
          className="realestate-agentcontactcard-photo"
        />
        <div>
          <p className="realestate-agentcontactcard-name">Alex Whitfield</p>
          <p className="realestate-agentcontactcard-title">Listing Agent</p>
        </div>
      </div>

      <div className="realestate-agentcontactcard-direct">
        <a href="tel:+15125550148">
          <Phone size={15} />
          (512) 555-0148
        </a>
        <a href="mailto:hello@meridianrealty.example">
          <Mail size={15} />
          hello@meridianrealty.example
        </a>
      </div>

      {submitted ? (
        <div className="realestate-agentcontactcard-success">
          <p>Thanks — your inquiry about {propertyAddress} has been noted.</p>
          <p className="realestate-agentcontactcard-success-sub">
            (This is a static template — no message was actually sent.)
          </p>
        </div>
      ) : (
        <form className="realestate-agentcontactcard-form" onSubmit={handleSubmit}>
          <p className="realestate-agentcontactcard-form-label">
            Ask about {propertyAddress}
          </p>

          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <textarea
            placeholder="I'd like to schedule a showing..."
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            required
          />

          <button type="submit" className="realestate-btn realestate-btn-primary">
            Send Inquiry
          </button>
        </form>
      )}
    </div>
  );
}