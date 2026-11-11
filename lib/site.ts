// One place for site-wide values. Everything that mentions the site's
// address, your contact details or your personal facts reads from here.

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
    // Shown on the About page as: "Based in <location>. I speak <languages>."
    location: "Kranj, Slovenia",
    languages: "English, Macedonian, Slovenian, Serbian and Croatian",
    howIWork:
      "One person from first call to launch, a fixed price agreed upfront, and you own the code and the domain.",
    // TODO(filip): commit your photo at public/images/filip.jpg (portrait
    // crop works best). The About page checks for it when the site is built
    // and shows it automatically; without it, the card has no photo area.
    photo: "/images/filip.jpg",
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
