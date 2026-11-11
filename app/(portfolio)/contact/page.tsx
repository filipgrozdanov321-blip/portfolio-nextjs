import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ContactForm from "../../../components/ComponentsUsedAroundTheWebSite/ContactForm/ContactFrom";
import { bookingHref, bookingIsExternal, site } from "@/lib/site";
import "../../../styles/pages/Contact.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Filip Grozdanov what you need: a website, a web app or development help for your agency. Book a 15-minute call or send a message and get a reply within a day.",
  path: "/contact",
});

export default function Contact() {
  return (
    <section id="contact-page">
      <div className="contact-page-container">
        <div>
          <h1 className="contact-page-title">Let&rsquo;s Work Together</h1>
          <p className="contact-page-intro">
            Tell me what you&apos;re building or what&apos;s not working, and
            I&apos;ll get back to you personally with real next steps.
          </p>
        </div>

        <div className="contact-page-call">
          <div>
            <h2>Prefer to talk?</h2>
            <p>
              {site.bookingUrl
                ? "Pick a time that suits you for a 15-minute call about what you need. It opens my calendar in a new tab."
                : "Book a 15-minute call: send a message below with a few times that suit you."}
            </p>
          </div>
          <a
            href={bookingHref("#contact-form")}
            className="contact-page-call-button"
            {...(bookingIsExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a 15-minute call
          </a>
        </div>

        <ContactForm />

        <div className="contact-info">
          <h2 className="title-of-alternative">Prefer email or WhatsApp?</h2>

          <div className="contact-page-links">
            <div className="contact-link">
              <i className="fas fa-envelope contact-icon" aria-hidden="true"></i>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>

            <div className="contact-link">
              <i className="fab fa-whatsapp contact-icon" aria-hidden="true"></i>
              <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
