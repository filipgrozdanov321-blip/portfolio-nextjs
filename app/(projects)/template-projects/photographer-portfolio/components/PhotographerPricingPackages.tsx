import Link from "next/link";
import "../styles/PhotographerPricingPackages.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

interface Package {
  name: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
}

const PACKAGES: Package[] = [
  {
    name: "Portrait Session",
    price: "starting at $350",
    duration: "1 hour, one location",
    description:
      "A focused session for individual portraits — headshots, personal use, or a simple refresh of your current photos.",
    includes: [
      "1 hour shoot time",
      "1 outfit change",
      "10 edited digital images",
      "Online gallery for downloads",
    ],
  },
  {
    name: "Personal Branding Session",
    price: "starting at $650",
    duration: "2-3 hours, one or two locations",
    description:
      "Built for professionals who need a full library of images for their website, social presence, and marketing.",
    includes: [
      "2-3 hours shoot time",
      "Up to 3 outfit changes",
      "25 edited digital images",
      "Mix of posed and candid shots",
      "Online gallery for downloads",
    ],
  },
  {
    name: "Full Editorial Day",
    price: "starting at $1,200",
    duration: "Full day, multiple locations",
    description:
      "A complete editorial production for campaigns, lookbooks, or larger branding projects requiring a full day of coverage.",
    includes: [
      "Full day shoot time",
      "Multiple locations and outfit changes",
      "50+ edited digital images",
      "Creative direction and shot list planning",
      "Online gallery for downloads",
    ],
  },
];

export default function PhotographerPricingPackages() {
  return (
    <section className="portfolio-pricing">
      <div className="portfolio-pricing-grid">
        {PACKAGES.map((pkg) => (
          <div key={pkg.name} className="portfolio-pricing-card">
            <h3 className="portfolio-pricing-name">{pkg.name}</h3>
            <p className="portfolio-pricing-price">{pkg.price}</p>
            <p className="portfolio-pricing-duration">{pkg.duration}</p>
            <p className="portfolio-pricing-description">{pkg.description}</p>

            <ul className="portfolio-pricing-includes">
              {pkg.includes.map((item) => (
                <li key={item} className="portfolio-pricing-includes-item">
                  {item}
                </li>
              ))}
            </ul>

            <Link href={`${BASE_PATH}/contact`} className="portfolio-pricing-cta">
              Book This Package
            </Link>
          </div>
        ))}
      </div>

      <p className="portfolio-pricing-note">
        Final pricing depends on scope, location, and specific deliverables.
        Get in touch for a custom quote tailored to your project.
      </p>
    </section>
  );
}