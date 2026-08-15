"use client";

import { useState, FormEvent } from "react";
import "../styles/PhotographerContactForm.css";

const SESSION_TYPES = [
  "Portrait Session",
  "Personal Branding Session",
  "Full Editorial Day",
  "Not sure yet",
];

interface FormState {
  name: string;
  email: string;
  sessionType: string;
  preferredDate: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  sessionType: SESSION_TYPES[0],
  preferredDate: "",
  message: "",
};

export default function PhotographerContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FIXED LINE BELOW: Added the missing '<' before HTMLInputElement
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // No backend — this is a UI showcase only.
    setIsSubmitted(true);
    setFormState(INITIAL_STATE);
  };

  if (isSubmitted) {
    return (
      <div className="portfolio-contact-success">
        <h3 className="portfolio-contact-success-title">Thank you</h3>
        <p className="portfolio-contact-success-text">
          Your message has been received. Wren will get back to you within
          1-2 business days.
        </p>
        <button
          className="portfolio-contact-success-button"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="portfolio-contact-form" onSubmit={handleSubmit}>
      <div className="portfolio-contact-field">
        <label htmlFor="name" className="portfolio-contact-label">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formState.name}
          onChange={handleChange}
          className="portfolio-contact-input"
          placeholder="Your full name"
        />
      </div>

      <div className="portfolio-contact-field">
        <label htmlFor="email" className="portfolio-contact-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="portfolio-contact-input"
          placeholder="you@example.com"
        />
      </div>

      <div className="portfolio-contact-field">
        <label htmlFor="sessionType" className="portfolio-contact-label">
          Session Type
        </label>
        <select
          id="sessionType"
          name="sessionType"
          value={formState.sessionType}
          onChange={handleChange}
          className="portfolio-contact-select"
        >
          {SESSION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="portfolio-contact-field">
        <label htmlFor="preferredDate" className="portfolio-contact-label">
          Preferred Date
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          value={formState.preferredDate}
          onChange={handleChange}
          className="portfolio-contact-input"
        />
      </div>

      <div className="portfolio-contact-field">
        <label htmlFor="message" className="portfolio-contact-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className="portfolio-contact-textarea"
          placeholder="Tell me a bit about what you're looking for..."
        />
      </div>

      <button type="submit" className="portfolio-contact-submit">
        Send Message
      </button>
    </form>
  );
}
