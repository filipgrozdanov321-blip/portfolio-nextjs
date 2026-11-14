// One place for site-wide values. Everything that mentions the site's
// web address, your name, your contact email, the booking link or your
// pricing reads from here.

// Moving to your own domain? Change this one line (no trailing slash).
export const SITE_URL = "https://filipgrozdanov.vercel.app";

// "filipgrozdanov.vercel.app", for showing the address as text
export const SITE_HOST = new URL(SITE_URL).host;

export const site = {
  name: "Filip Grozdanov",
  headline: "Websites and web apps for small businesses",
  description:
    "Filip Grozdanov builds fast business websites and custom web apps (booking systems, online shops, dashboards) for small businesses and agencies. Websites from €700.",
  email: "filip.grozdanov.web@gmail.com",

  // Every "Book a 15-minute call" button opens this page in a new tab.
  // If you ever set it to "", the buttons fall back to the contact form.
  bookingUrl: "https://calendly.com/filip-grozdanov-web/intro-call",

  pricing: {
    websitesFrom: "€700",
    included: [
      "Up to 5 pages",
      "Custom design",
      "Works on phones",
      "Contact form",
      "Basic SEO setup",
      "Launch on your domain",
    ],
  },

  about: {
    // Shown on the Services page under "What You Can Expect". The About
    // page's own text lives in app/(portfolio)/about/AboutContent.tsx.
    howIWork:
      "One person from first call to launch, a fixed price agreed upfront, and you own the code and the domain.",
  },

  // Used by the privacy notice (/privacy-policy)
  legal: {
    controller: "Filip Grozdanov",
    // Delete enquiries that don't turn into a project after this long
    enquiryRetention: "12 months",
    lastUpdated: "11 November 2026",
  },
} as const;

/**
 * Where a "Book a 15-minute call" button should go: the booking page when a
 * link is set, otherwise the given fallback (the contact form).
 */
export function bookingHref(fallback = "/contact#contact-form") {
  return site.bookingUrl || fallback;
}

/** True when the booking link points to another site (Calendly, Cal.com). */
export const bookingIsExternal = site.bookingUrl.startsWith("http");

/** The booking service's name for display, e.g. "Calendly" */
export function bookingServiceName(): string {
  if (!site.bookingUrl) return "";
  const host = new URL(site.bookingUrl).host;
  if (host === "calendly.com" || host.endsWith(".calendly.com")) return "Calendly";
  if (host === "cal.com" || host.endsWith(".cal.com")) return "Cal.com";
  return host;
}
