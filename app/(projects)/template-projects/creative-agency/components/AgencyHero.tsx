import Link from 'next/link';
import '../styles/AgencyHero.css';

export default function AgencyHero() {
  return (
    <section className="agency-hero">
      <div className="agency-hero-inner">
        <p className="agency-hero-eyebrow">Branding / Digital / Motion</p>
        <h1 className="agency-hero-title">
          We build brands that refuse to blend in.
        </h1>
        <p className="agency-hero-subtitle">
          Glyph Studio partners with ambitious startups and challenger brands
          to design identities, products, and motion that actually move people.
        </p>
        <Link
          href="/template-projects/creative-agency/contact"
          className="agency-hero-cta"
        >
          Start a Project
        </Link>
      </div>
    </section>
  );
}