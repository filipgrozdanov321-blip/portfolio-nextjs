"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import "../styles/StartupCTASection.css";

export default function StartupCTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitted");
  }

  return (
    <section id="cta" className="startup-cta">
      <div className="startup-container startup-cta-inner">
        <span className="startup-cta-eyebrow startup-mono">GET STARTED</span>

        <h2 className="startup-cta-headline">
          Get paged before your customers do.
        </h2>

        <p className="startup-cta-subhead">
          Free during beta. Set up your first check in under five minutes —
          no credit card, no sales call.
        </p>

        {status === "submitted" ? (
          <div className="startup-cta-success">
            <CheckCircle2 size={18} />
            <span>You&apos;re on the list — we&apos;ll email you shortly.</span>
          </div>
        ) : (
          <form className="startup-cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="startup-cta-input"
              aria-label="Work email"
            />
            <button type="submit" className="startup-cta-button">
              Get Early Access
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}