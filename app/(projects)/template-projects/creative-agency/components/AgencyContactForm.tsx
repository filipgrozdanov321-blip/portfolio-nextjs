'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import '../styles/AgencyContactForm.css';

const budgetOptions = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+'];

export default function AgencyContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // After sending, the long form is replaced by a short message. On a phone
  // you would be left scrolled to the middle of nothing, so this brings the
  // message into view and lets screen readers announce it.
  useEffect(() => {
    if (!submitted) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    successRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  }, [submitted]);

  if (submitted) {
    return (
      <div
        className="agency-contact-form-success"
        ref={successRef}
        role="status"
      >
        <h2 className="agency-contact-form-success-title">Message received.</h2>
        <p className="agency-contact-form-success-text">
          We'll get back to you within two business days.
        </p>
      </div>
    );
  }

  return (
    <form className="agency-contact-form" onSubmit={handleSubmit}>
      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-name">Name</label>
        <input id="agency-name" name="name" type="text" autoComplete="name" required className="agency-contact-form-input" />
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-email">Email</label>
        <input id="agency-email" name="email" type="email" autoComplete="email" required className="agency-contact-form-input" />
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-company">Company</label>
        <input id="agency-company" name="company" type="text" autoComplete="organization" className="agency-contact-form-input" />
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-budget">Project Budget</label>
        <select id="agency-budget" name="budget" required defaultValue="" className="agency-contact-form-select">
          <option value="" disabled>Select a range</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-message">Message</label>
        <textarea id="agency-message" name="message" required rows={5} className="agency-contact-form-textarea" />
      </div>

      <button type="submit" className="agency-contact-form-submit">
        Send Message
      </button>
    </form>
  );
}