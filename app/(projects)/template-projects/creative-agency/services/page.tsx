import AgencyServiceDetail from '../components/AgencyServiceDetail';
import '../styles/AgencyServicesPage.css';

const services = [
  {
    name: 'Brand Identity',
    audience:
      'For startups and challenger brands that need a real point of view before they need a website.',
    deliverable:
      'A full identity system — logo, type, color, and usage rules built to hold up across every surface.',
    includes: [
      'Naming (if needed)',
      'Logo & mark design',
      'Typography & color system',
      'Brand guidelines document',
      'Launch asset kit',
    ],
  },
  {
    name: 'Digital Design',
    audience:
      'For teams launching or rebuilding a site or product that needs to convert, not just look nice.',
    deliverable:
      'Full website or product UI design, from wireframe to final screens, ready to build.',
    includes: [
      'UX wireframes',
      'Visual design system',
      'Responsive page designs',
      'Component library',
      'Developer handoff files',
    ],
  },
  {
    name: 'Motion',
    audience: 'For brands that need their identity to move — on social, on web, in-product.',
    deliverable: 'Animated brand assets, from micro-interactions to full launch films.',
    includes: [
      'Logo animation',
      'Social motion templates',
      'Product micro-interactions',
      'Launch video / campaign film',
    ],
  },
  {
    name: 'Art Direction',
    audience: 'For brands running ongoing campaigns that need every asset to stay on-message.',
    deliverable:
      'Creative direction and asset oversight across photo, video, and campaign design.',
    includes: [
      'Campaign concepting',
      'Photo / video art direction',
      'Asset review & QA',
      'Style guide enforcement',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="agency-services-page">
      <div className="agency-services-page-header">
        <h1 className="agency-services-page-title">Services</h1>
        <p className="agency-services-page-intro">
          Four disciplines, one studio. We scope each engagement to exactly what
          the brand needs — nothing bundled in just to pad the invoice.
        </p>
      </div>

      <div className="agency-services-page-list">
        {services.map((service) => (
          <AgencyServiceDetail key={service.name} {...service} />
        ))}
      </div>
    </div>
  );
}