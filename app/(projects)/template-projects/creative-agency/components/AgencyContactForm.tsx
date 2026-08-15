'use client';

import { useState, FormEvent } from 'react';
import '../styles/AgencyContactForm.css';

const budgetOptions = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+'];

export default function AgencyContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="agency-contact-form-success">
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
        <input id="agency-name" name="name" type="text" required className="agency-contact-form-input" />
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-email">Email</label>
        <input id="agency-email" name="email" type="email" required className="agency-contact-form-input" />
      </div>

      <div className="agency-contact-form-row">
        <label className="agency-contact-form-label" htmlFor="agency-company">Company</label>
        <input id="agency-company" name="company" type="text" className="agency-contact-form-input" />
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