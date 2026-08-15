import Link from "next/link";
import "../styles/PhotographerCTASection.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

export default function PhotographerCTASection() {
  return (
    <section className="portfolio-cta">
      <div className="portfolio-cta-inner">
        <h2 className="portfolio-cta-title">
          Ready to show up as your most confident self?
        </h2>
        <Link href={`${BASE_PATH}/contact`} className="portfolio-cta-button">
          Book a Session
        </Link>
      </div>
    </section>
  );
}