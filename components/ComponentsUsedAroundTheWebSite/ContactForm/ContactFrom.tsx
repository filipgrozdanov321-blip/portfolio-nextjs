"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import "./ContactForm.css";

// Option values are the readable labels, so the email you receive says
// "€1,000 – €3,000" rather than a code like "1k-3k".
const PROJECT_TYPES = [
  "Website",
  "Web app (booking system, shop, dashboard)",
  "Redesign of an existing site",
  "Development work for an agency",
  "Not sure yet",
];

const BUDGETS = ["Under €1,000", "€1,000 – €3,000", "€3,000 – €5,000", "€5,000+"];

const TIMELINES = ["ASAP", "Within 1 month", "1–3 months", "Flexible"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          maxLength={200}
          placeholder="Your full name"
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          maxLength={320}
          placeholder="you@example.com"
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="projectType">Project Type</label>
        <select id="projectType" name="projectType">
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="budget">Budget Range</label>
          <select id="budget" name="budget">
            <option value="">Select budget</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-form-group">
          <label htmlFor="timeline">Timeline</label>
          <select id="timeline" name="timeline">
            <option value="">Select timeline</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="contact-form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          placeholder="Tell me about your project..."
          rows={5}
        />
      </div>

      {/* Spam trap: hidden from people, but simple bots fill in every field.
          The server quietly drops any message where this has a value. */}
      <div className="contact-form-trap" aria-hidden="true">
        <label htmlFor="company-website">Leave this field empty</label>
        <input
          type="text"
          id="company-website"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className="contact-form-button"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Let's Get Started"}
      </button>

      <p className="contact-form-privacy">
        I only use your details to reply to your message. See the{" "}
        <Link href="/privacy-policy">privacy notice</Link>.
      </p>

      {status === "success" && (
        <p className="contact-form-status success" role="status">
          Thanks, I&apos;ll get back to you within a day.
        </p>
      )}
      {status === "error" && (
        <p className="contact-form-status error" role="alert">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
    </form>
  );
}
