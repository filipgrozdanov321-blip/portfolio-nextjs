import Link from 'next/link';
import '../styles/AgencyCTASection.css';

export default function AgencyCTASection() {
  return (
    <section className="agency-cta-section">
      <div className="agency-cta-section-inner">
        <h2 className="agency-cta-section-title">
          Got a brand that needs a point of view?
        </h2>
        <Link
          href="/template-projects/creative-agency/contact"
          className="agency-cta-section-button"
        >
          Start a Project
        </Link>
      </div>
    </section>
  );
}