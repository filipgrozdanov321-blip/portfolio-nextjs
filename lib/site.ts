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

  // TODO(filip): paste your Cal.com or Calendly link here, e.g.
  // "https://cal.com/your-name/15min". While it's empty, every
  // "Book a 15-minute call" button opens the contact form instead.
  bookingUrl: "",

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
    // TODO(filip): fill in these three. Anything still in [brackets] shows
    // on the About page exactly as written, so it's easy to spot.
    city: "[city]",
    languages: "[languages]",
    studies: "[field]",
    howIWork:
      "One person from first call to launch, a fixed price agreed upfront, and you own the code and the domain.",
    // TODO(filip): add your photo at public/images/filip.jpg (a square or
    // portrait crop works best). The About page shows it automatically
    // once the file exists; until then it shows an "FG" placeholder.
    photo: "/images/filip.jpg",
  },
} as const;

/**
 * Where a "Book a 15-minute call" button should go: the booking page when a
 * link is set, otherwise the given fallback (the contact form).
 */
export function bookingHref(fallback = "/contact#contact-form") {
  return site.bookingUrl || fallback;
}

/** True when the booking link points to another site (Cal.com, Calendly). */
export const bookingIsExternal = site.bookingUrl.startsWith("http");
