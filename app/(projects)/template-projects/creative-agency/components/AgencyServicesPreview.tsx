import Link from 'next/link';
import '../styles/AgencyServicesPreview.css';

const services = [
  {
    name: 'Brand Identity',
    description:
      'Naming, visual systems, and guidelines built to hold up across every touchpoint.',
  },
  {
    name: 'Digital Design',
    description:
      'Websites and product interfaces designed to convert attention into action.',
  },
  {
    name: 'Motion',
    description:
      'Animation and video that give a brand rhythm, not just a static face.',
  },
  {
    name: 'Art Direction',
    description:
      'Campaign and content direction that keeps every asset on-brand and on-message.',
  },
];

export default function AgencyServicesPreview() {
  return (
    <section className="agency-services-preview">
      <div className="agency-services-preview-inner">
        <div className="agency-services-preview-header">
          <h2 className="agency-services-preview-title">What We Do</h2>
          <Link
            href="/template-projects/creative-agency/services"
            className="agency-services-preview-link"
          >
            View All Services →
          </Link>
        </div>

        <div className="agency-services-preview-list">
          {services.map((service) => (
            <div key={service.name} className="agency-services-preview-item">
              <h3 className="agency-services-preview-name">{service.name}</h3>
              <p className="agency-services-preview-description">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}