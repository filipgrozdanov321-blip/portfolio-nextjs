"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
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
  const successRef = useRef<HTMLDivElement>(null);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  // After sending, the form is replaced by a short message. On a phone the card
  // is part of a long page, so this brings the message into view (and lets
  // screen readers announce it).
  useEffect(() => {
    if (!submitted) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    successRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [submitted]);

  return (
    <div className="realestate-agentcontactcard">
      <div className="realestate-agentcontactcard-agent">
        {/* A 52px circle. Was a plain <img> that downloaded the full-size
            headshot. */}
        <Image
          src="/images/realestate/agent-headshot.jpg"
          alt="Meridian Realty agent"
          width={52}
          height={52}
          className="realestate-agentcontactcard-photo"
        />
        <div>
          <p className="realestate-agentcontactcard-name">Alex Whitfield</p>
          <p className="realestate-agentcontactcard-title">Listing Agent</p>
        </div>
      </div>

      <div className="realestate-agentcontactcard-direct">
        <a href="tel:+15125550148">
          <Phone size={15} aria-hidden="true" />
          (512) 555-0148
        </a>
        <a href="mailto:hello@meridianrealty.example">
          <Mail size={15} aria-hidden="true" />
          <span>hello@meridianrealty.example</span>
        </a>
      </div>

      {submitted ? (
        <div className="realestate-agentcontactcard-success" ref={successRef} role="status">
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
            aria-label="Your name"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            aria-label="Phone (optional)"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <textarea
            placeholder="I'd like to schedule a showing..."
            aria-label="Message"
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