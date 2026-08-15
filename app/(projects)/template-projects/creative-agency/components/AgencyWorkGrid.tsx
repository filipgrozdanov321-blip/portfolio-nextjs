import Image from 'next/image';
import '../styles/AgencyWorkGrid.css';

const projects = [
  { client: 'Nomad Coffee Co.', type: 'Brand Identity', year: '2025', image: '/images/Agency/nomad-coffee.jpg' },
  { client: 'Fenwick Athletics', type: 'Digital Design', year: '2024', image: '/images/Agency/fenwick-athletics.jpg' },
  { client: 'Loop Finance', type: 'Brand + Web', year: '2025', image: '/images/Agency/loop-finance.jpg' },
  { client: 'Marrow Studio', type: 'Motion & Identity', year: '2024', image: '/images/Agency/marrow-studio.jpg' },
  { client: 'Static Records', type: 'Brand Identity', year: '2023', image: '/images/Agency/static-records.jpg' },
  { client: 'Verge Health', type: 'Digital Design', year: '2025', image: '/images/Agency/verge-health.jpg' },
  { client: 'Halcyon Apparel', type: 'Brand Identity', year: '2024', image: '/images/Agency/halcyon-apparel.jpg' },
  { client: 'Northbound Agency', type: 'Digital Design', year: '2023', image: '/images/Agency/northbound-agency.jpg' },
  { client: 'Kindred Studio', type: 'Motion & Identity', year: '2025', image: '/images/Agency/kindred-studio.jpg' },
];

export default function AgencyWorkGrid() {
  return (
    <div className="agency-work-grid">
      {projects.map((project) => (
        <div key={project.client} className="agency-work-grid-card">
          <div className="agency-work-grid-card-image">
            <Image
              src={project.image}
              alt={`${project.client} — ${project.type}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="agency-work-grid-card-meta">
            <span className="agency-work-grid-card-client">{project.client}</span>
            <div className="agency-work-grid-card-details">
              <span className="agency-work-grid-card-type">{project.type}</span>
              <span className="agency-work-grid-card-year">{project.year}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}