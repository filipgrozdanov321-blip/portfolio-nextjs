"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { properties } from "../data/listings";
import "../styles/RealEstateContactForm.css";

export default function RealEstateContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  function handleChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  // After sending, the long form is replaced by a short message. On a phone you
  // would be left scrolled to the middle of nothing, so this brings the message
  // into view (and lets screen readers announce it).
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

  if (submitted) {
    return (
      <div className="realestate-contactform-success" ref={successRef} role="status">
        <h3>Message sent</h3>
        <p>
          Thanks, {formData.name.split(" ")[0] || "there"} — this is a static template, so
          nothing was actually delivered, but in a real build this is where a confirmation would
          go.
        </p>
      </div>
    );
  }

  return (
    <form className="realestate-contactform" onSubmit={handleSubmit}>
      <div className="realestate-contactform-row">
        <div className="realestate-contactform-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        <div className="realestate-contactform-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="realestate-contactform-row">
        <div className="realestate-contactform-field">
          <label htmlFor="contact-phone">Phone (optional)</label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="realestate-contactform-field">
          <label htmlFor="contact-property">Property of Interest (optional)</label>
          <select
            id="contact-property"
            value={formData.property}
            onChange={(e) => handleChange("property", e.target.value)}
          >
            <option value="">None specific</option>
            {properties.map((property) => (
              <option key={property.slug} value={property.slug}>
                {property.address}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="realestate-contactform-field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          required
        />
      </div>

      <button type="submit" className="realestate-btn realestate-btn-primary">
        Send Message
      </button>
    </form>
  );
}