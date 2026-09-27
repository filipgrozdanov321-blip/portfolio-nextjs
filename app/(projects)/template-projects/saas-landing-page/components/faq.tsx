"use client";

import { useState } from "react";
import "../styles/faq.css";

const faqs = [
  {
    question: "Do I need a credit card to start?",
    answer:
      "No — the free trial on our Pro plan doesn't require a card upfront. We'll only ask for billing details once you decide to subscribe or upgrade.",
  },
  {
    question: "Can my clients book without creating an account?",
    answer:
      "Yes — clients can book an appointment directly from your booking page in just a few clicks, no account or app download required.",
  },
  {
    question: "What happens if I need to add more staff later?",
    answer:
      "You can upgrade your plan anytime as your studio grows. Changes take effect immediately and billing is prorated automatically.",
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer:
      "No long-term contract on Starter or Pro — both are billed monthly and you can cancel anytime. Enterprise plans are set up individually based on your studio's needs.",
  },
  {
    question: "Does ChairTime send reminders to clients?",
    answer:
      "Yes — email reminders are included on every plan, and Pro and Enterprise add SMS reminders on top to cut no-shows even further.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="saas-faq" id="faq">
      <div className="saas-faq-header">
        <h2 className="saas-faq-title">Frequently asked questions</h2>
        <p className="saas-faq-subtitle">Everything you need to know before getting started.</p>
      </div>

      <div className="saas-faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="saas-faq-item">
              <button
                className="saas-faq-question"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                {faq.question}
                <span className={`saas-faq-icon ${isOpen ? "saas-faq-icon-open" : ""}`}>+</span>
              </button>

              <div className={`saas-faq-answer-wrapper ${isOpen ? "saas-faq-answer-open" : ""}`}>
                <p className="saas-faq-answer">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}