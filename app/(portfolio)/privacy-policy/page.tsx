import type { Metadata } from "next";
import Link from "next/link";
import { SITE_HOST, SITE_URL, site } from "@/lib/site";
import "../../../styles/pages/PrivacyPolicy.css";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "What personal data the contact form collects, why, the legal basis, how long it's kept, and how to contact Filip Grozdanov about it.",
  alternates: { canonical: "/privacy-policy" },
};

const { legal } = site;

// The booking tool only appears here once a booking link is set in
// lib/site.ts (e.g. "cal.com" or "calendly.com").
const bookingHost = site.bookingUrl ? new URL(site.bookingUrl).host : "";

interface Purpose {
  title: string;
  what: string;
  why: string;
  basis: string;
  howLong: string;
}

const purposes: Purpose[] = [
  {
    title: "When you use the contact form",
    what: "Your name, email address and message, plus the project type, budget and timeline if you choose them.",
    why: "To reply to you and talk about your project.",
    basis:
      "Taking steps you asked for before a possible contract (GDPR Art. 6(1)(b)). If your message isn't about a project, my legitimate interest in answering messages sent to me (Art. 6(1)(f)).",
    howLong: `If your enquiry doesn't turn into a project, I delete it after ${legal.enquiryRetention}. If it does, I keep it with the project records for as long as the project runs and the law requires (for example, for accounting).`,
  },
  {
    title: "When you email me or message me on WhatsApp",
    what: "Whatever you include in your message, and your email address or phone number.",
    why: "To reply to you and talk about your project.",
    basis: "The same as for the contact form (GDPR Art. 6(1)(b) or (f)).",
    howLong: `The same as for the contact form: deleted after ${legal.enquiryRetention} if it doesn't become a project.`,
  },
  ...(bookingHost
    ? [
        {
          title: "When you book a call",
          what: "Your name, email address, the time you pick and anything you add to the booking.",
          why: "To schedule and hold the call.",
          basis: "Taking steps you asked for before a possible contract (GDPR Art. 6(1)(b)).",
          howLong: `The same as for the contact form: deleted after ${legal.enquiryRetention} if it doesn't become a project.`,
        },
      ]
    : []),
  {
    title: "When you visit this website",
    what: "Technical data your browser sends with every request, such as your IP address, browser type and the page you asked for.",
    why: "To deliver the website and keep it secure. This data ends up in the hosting provider's server logs; I don't use it to identify or track you.",
    basis: "My legitimate interest in running a working, secure website (GDPR Art. 6(1)(f)).",
    howLong: "Kept by the hosting provider (Vercel) for a limited time under its own policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy">
      <div className="privacy-policy__container">
        <header className="privacy-policy__header">
          <h1 className="privacy-policy__title">Privacy Notice</h1>
          <p className="privacy-policy__effective-date">
            Last updated: {legal.lastUpdated}
          </p>
        </header>

        <section className="privacy-policy__section">
          <p className="privacy-policy__text">
            <strong>The short version:</strong> I only collect what you send
            me, I use it to reply to you and talk about your project, and I
            delete enquiries that don&apos;t become a project after{" "}
            {legal.enquiryRetention}. No advertising, no tracking cookies, no
            analytics, and I never sell your data.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Who is responsible</h2>
          <ul className="privacy-policy__list">
            <li>Data controller: {legal.controller}</li>
            <li>
              Email:{" "}
              <a className="privacy-policy__email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>Address: {legal.address}</li>
            {legal.registration && <li>Registration: {legal.registration}</li>}
            <li>
              Website: <a href={SITE_URL}>{SITE_HOST}</a>
            </li>
          </ul>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">What I collect, why, and for how long</h2>

          {purposes.map((purpose) => (
            <div key={purpose.title} className="privacy-policy__purpose">
              <h3>{purpose.title}</h3>
              <dl>
                <dt>What</dt>
                <dd>{purpose.what}</dd>
                <dt>Why</dt>
                <dd>{purpose.why}</dd>
                <dt>Legal basis</dt>
                <dd>{purpose.basis}</dd>
                <dt>How long</dt>
                <dd>{purpose.howLong}</dd>
              </dl>
            </div>
          ))}

          <p className="privacy-policy__text">
            The <Link href="/projects">demo projects</Link> run entirely in
            your browser: anything you type into them is not sent to me or
            stored anywhere.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Who else handles your data</h2>
          <ul className="privacy-policy__list">
            <li>
              <strong>Google (Gmail):</strong> contact form messages are sent
              through Gmail and kept in my Gmail inbox.
            </li>
            <li>
              <strong>Vercel:</strong> hosts this website.
            </li>
            <li>
              <strong>WhatsApp (Meta):</strong> only if you choose to message
              me on WhatsApp.
            </li>
            {bookingHost && (
              <li>
                <strong>{bookingHost}:</strong> handles call bookings.
              </li>
            )}
          </ul>
          <p className="privacy-policy__text">
            Some of these companies may process data outside the EU. They use
            safeguards recognised under the GDPR, such as standard contractual
            clauses. This website does not use cookies or analytics, and every
            font is served from this website itself, not from a third party.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Your rights</h2>
          <p className="privacy-policy__text">
            You can ask me to show you the data I have about you, correct it,
            delete it, limit how I use it, or give you a copy. You can also
            object to any use based on my legitimate interest. Email{" "}
            <a className="privacy-policy__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>{" "}
            and I&apos;ll reply within one month.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Complaints</h2>
          <p className="privacy-policy__text">
            If you think I&apos;ve handled your data wrongly, you have the
            right to complain to a data protection authority, in particular in
            the country where you live or work, or where you think the problem
            happened. For example, the Information Commissioner of the
            Republic of Slovenia, or the Personal Data Protection Agency of
            North Macedonia. I&apos;d appreciate the chance to sort it out
            with you first.
          </p>
        </section>

        <section className="privacy-policy__section">
          <h2 className="privacy-policy__heading">Changes</h2>
          <p className="privacy-policy__text">
            If this notice changes, the new version appears on this page with
            a new date at the top.
          </p>
        </section>
      </div>
    </main>
  );
}
