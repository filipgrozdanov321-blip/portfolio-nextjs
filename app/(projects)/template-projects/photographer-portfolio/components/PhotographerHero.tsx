import Link from "next/link";
import Image from "next/image";
import "../styles/PhotographerHero.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

export default function PhotographerHero() {
  return (
    <section className="portfolio-hero">
      <Image
        src="/images/Photographer/hero.jpg"
        alt="Wren Ashby Photography — featured portrait"
        fill
        priority
        className="portfolio-hero-image"
      />
      <div className="portfolio-hero-overlay" />

      <div className="portfolio-hero-content">
        <h1 className="portfolio-hero-title">Wren Ashby</h1>
        <p className="portfolio-hero-subtitle">
          Portrait, editorial, and personal branding photography — helping
          people show up with confidence.
        </p>

        <div className="portfolio-hero-actions">
          <Link href={`${BASE_PATH}/portfolio`} className="portfolio-hero-btn-primary">
            View Portfolio
          </Link>
          <Link href={`${BASE_PATH}/contact`} className="portfolio-hero-btn-secondary">
            Book a Session
          </Link>
        </div>
      </div>
    </section>
  );
}