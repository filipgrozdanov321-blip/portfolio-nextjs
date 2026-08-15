"use client";

import { useEffect, useState } from "react";
import type { CustomerDetails } from "../data/bookingData";
import "../styles/BookingDetailsStep.css";

interface BookingDetailsStepProps {
  details: CustomerDetails | null;
  onSave: (details: CustomerDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

const EMPTY_DETAILS: CustomerDetails = {
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookingDetailsStep({
  details,
  onSave,
  onNext,
  onBack,
}: BookingDetailsStepProps) {
  const [form, setForm] = useState<CustomerDetails>(details ?? EMPTY_DETAILS);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setForm(details ?? EMPTY_DETAILS);
  }, [details]);

  const errors = {
    name: form.name.trim().length === 0 ? "Name is required." : "",
    email: !isValidEmail(form.email) ? "Enter a valid email address." : "",
    phone: form.phone.trim().length < 7 ? "Enter a valid phone number." : "",
  };

  const isValid = !errors.name && !errors.email && !errors.phone;

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    onSave(next);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleContinue = () => {
    setTouched({ name: true, email: true, phone: true });
    if (isValid) onNext();
  };

  return (
    <section
      className="booking-details-step"
      aria-labelledby="details-step-heading"
    >
      <h2 id="details-step-heading">Your details</h2>
      <p className="booking-step-subtitle">
        We&apos;ll use this to confirm your appointment.
      </p>

      <div className="booking-form-field">
        <label htmlFor="booking-name">Full name</label>
        <input
          id="booking-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="Jordan Smith"
        />
        {touched.name && errors.name && (
          <span className="booking-form-error">{errors.name}</span>
        )}
      </div>

      <div className="booking-form-field">
        <label htmlFor="booking-email">Email</label>
        <input
          id="booking-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="jordan@example.com"
        />
        {touched.email && errors.email && (
          <span className="booking-form-error">{errors.email}</span>
        )}
      </div>

      <div className="booking-form-field">
        <label htmlFor="booking-phone">Phone number</label>
        <input
          id="booking-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          placeholder="(555) 123-4567"
        />
        {touched.phone && errors.phone && (
          <span className="booking-form-error">{errors.phone}</span>
        )}
      </div>

      <div className="booking-form-field">
        <label htmlFor="booking-notes">Notes (optional)</label>
        <textarea
          id="booking-notes"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Anything we should know before your visit?"
          rows={3}
        />
      </div>

      <div className="booking-step-actions">
        <button type="button" className="booking-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="booking-btn-primary"
          onClick={handleContinue}
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </section>
  );
}
