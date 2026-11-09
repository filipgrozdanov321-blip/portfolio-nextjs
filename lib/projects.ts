// The featured projects, shown on the home page and on /projects.
// Edit them here and both places update.
//
// Every project below is a demo with a fictional business and sample data.
// When you have a real client project, add it with label "Client project".

export type ProjectLabel = "Demo" | "Client project";

export interface Project {
  slug: string;
  title: string;
  label: ProjectLabel;
  /** One line: the problem this solves for a business */
  problem: string;
  features: string[];
  stack: string[];
  /** Live link */
  href: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
}

export const projects: Project[] = [
  {
    slug: "appointment-booking",
    title: "Appointment Booking App",
    label: "Demo",
    problem:
      "Lets a salon or clinic take bookings online, so customers stop calling and messaging to find a free slot.",
    features: [
      "Five steps: service, staff member, date and time, contact details, confirmation",
      "Only shows staff who offer the chosen service, and only their free time slots",
      "A live booking summary where any earlier step can be changed",
      "Form checks with clear error messages before anything is confirmed",
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS"],
    href: "/demo-projects/appointment-booking-app",
    image: {
      src: "/images/projects/appointment-booking.jpg",
      width: 1440,
      height: 900,
      alt: "Booking demo, step 1 of 5: a grid of salon services such as a haircut, hair coloring and a massage, each showing its length and price, under a progress bar for the five booking steps.",
    },
  },
  {
    slug: "ecommerce-store",
    title: "E-commerce Store",
    label: "Demo",
    problem:
      "Gives a small shop its own online store, where customers can browse, filter, fill a cart and check out.",
    features: [
      "16 product pages with photo galleries, each pre-built as static HTML",
      "Filter by category and price, and sort by price or newest",
      "Cart drawer with product options and quantities",
      "Three-step checkout (shipping, payment, review) with form validation",
    ],
    stack: ["Next.js", "React", "TypeScript", "React Context"],
    href: "/demo-projects/ecommerce-demo",
    image: {
      src: "/images/projects/ecommerce-store.jpg",
      width: 1440,
      height: 900,
      alt: "Home page of the shop demo for a homeware brand called Norrland: the headline \"Considered objects for a quieter home\" over a living-room photo with a Shop Now button, then a row of shipping and returns promises.",
    },
  },
  {
    slug: "real-estate-website",
    title: "Real Estate Agency Website",
    label: "Demo",
    problem:
      "Helps a property agency put its listings online, so buyers can find a home that fits and contact an agent directly.",
    features: [
      "Search from the home page, then filter by location, property type, price and bedrooms",
      "A page for every listing, with a photo gallery and full-screen viewer",
      "An enquiry form on each listing and a contact page",
      "Multi-page site: home, listings, about and contact",
    ],
    stack: ["Next.js", "React", "TypeScript", "CSS"],
    href: "/template-projects/real-estate-listings",
    image: {
      src: "/images/projects/real-estate-website.jpg",
      width: 1440,
      height: 900,
      alt: "Home page of the real estate demo for an agency called Meridian Realty: a headline over a photo of a house, with a search bar for location, property type and price.",
    },
  },
  {
    slug: "sales-dashboard",
    title: "Sales Analytics Dashboard",
    label: "Demo",
    problem:
      "Shows a business owner revenue, orders and best sellers on one screen, instead of digging through spreadsheets.",
    features: [
      "Switch between the last 7, 30 or 90 days, or all time",
      "Key numbers at a glance, including growth against the previous period",
      "Revenue and order charts that adapt to phone screens",
      "Revenue by category and a top-products table",
    ],
    stack: ["Next.js", "React", "TypeScript", "Recharts"],
    href: "/demo-projects/sales-analytics-dashboard",
    image: {
      src: "/images/projects/sales-dashboard.jpg",
      width: 1440,
      height: 900,
      alt: "Sales dashboard demo: four summary cards for total revenue, orders, average order value and revenue growth, above a green area chart of daily revenue for the last 30 days.",
    },
  },
];
