"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import "../styles/StartupCTASection.css";

export default function StartupCTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const successRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitted");
  }

  // After sending, the form is replaced by a short message. On a phone with the
  // on-screen keyboard open that can leave you looking at blank space, so this
  // brings the message into view (and lets screen readers announce it).
  useEffect(() => {
    if (status !== "submitted") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    successRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [status]);

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
          <div className="startup-cta-success" ref={successRef} role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>You&apos;re on the list — we&apos;ll email you shortly.</span>
          </div>
        ) : (
          <form className="startup-cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="startup-cta-input"
              aria-label="Work email"
            />
            <button type="submit" className="startup-cta-button">
              Get Early Access
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}