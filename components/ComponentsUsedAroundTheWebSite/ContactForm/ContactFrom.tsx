"use client";

import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your full name"
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="projectType">Project Type</label>
        <select id="projectType" name="projectType">
          <option value="">Select a project type</option>
          <option value="web-development">Web Development</option>
          <option value="marketing">Marketing</option>
          <option value="branding">Branding</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div className="contact-form-row">
        <div className="contact-form-group">
          <label htmlFor="budget">Budget Range</label>
          <select id="budget" name="budget">
            <option value="">Select budget</option>
            <option value="under-1k">Under $1,000</option>
            <option value="1k-3k">$1,000 - $3,000</option>
            <option value="3k-5k">$3,000 - $5,000</option>
            <option value="5k-plus">$5,000+</option>
          </select>
        </div>

        <div className="contact-form-group">
          <label htmlFor="timeline">Timeline</label>
          <select id="timeline" name="timeline">
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-month">Within 1 month</option>
            <option value="1-3-months">1-3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      <div className="contact-form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell me about your project..."
          rows={5}
        />
      </div>

      <button
        type="submit"
        className="contact-form-button"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Let's Get Started"}
      </button>

      {status === "success" && (
        <p className="contact-form-status success">
          Thanks — I'll get back to you within a day.
        </p>
      )}
      {status === "error" && (
        <p className="contact-form-status error">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
    </form>
  );
}