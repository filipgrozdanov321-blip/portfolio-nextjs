import Link from 'next/link';
import Image from 'next/image';
import '../styles/AgencyWorkPreview.css';

const previewWork = [
  { client: 'Nomad Coffee Co.', type: 'Brand Identity', image: '/images/Agency/nomad-coffee.jpg' },
  { client: 'Fenwick Athletics', type: 'Digital Design', image: '/images/Agency/fenwick-athletics.jpg' },
  { client: 'Loop Finance', type: 'Brand + Web', image: '/images/Agency/loop-finance.jpg' },
  { client: 'Marrow Studio', type: 'Motion & Identity', image: '/images/Agency/marrow-studio.jpg' },
  { client: 'Static Records', type: 'Brand Identity', image: '/images/Agency/static-records.jpg' },
  { client: 'Verge Health', type: 'Digital Design', image: '/images/Agency/verge-health.jpg' },
];

export default function AgencyWorkPreview() {
  return (
    <section className="agency-work-preview">
      <div className="agency-work-preview-inner">
        <div className="agency-work-preview-header">
          <h2 className="agency-work-preview-title">Selected Work</h2>
          <Link
            href="/template-projects/creative-agency/work"
            className="agency-work-preview-link"
          >
            View All Work →
          </Link>
        </div>

        <div className="agency-work-preview-grid">
          {previewWork.map((project) => (
            <div key={project.client} className="agency-work-card">
              <div className="agency-work-card-image">
                <Image
                  src={project.image}
                  alt={`${project.client} — ${project.type}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="agency-work-card-meta">
                <span className="agency-work-card-client">{project.client}</span>
                <span className="agency-work-card-type">{project.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}