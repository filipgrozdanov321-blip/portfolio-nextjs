import '../styles/AgencyServiceDetail.css';

interface AgencyServiceDetailProps {
  name: string;
  audience: string;
  deliverable: string;
  includes: string[];
}

export default function AgencyServiceDetail({
  name,
  audience,
  deliverable,
  includes,
}: AgencyServiceDetailProps) {
  return (
    <div className="agency-service-detail">
      <h2 className="agency-service-detail-name">{name}</h2>

      <div className="agency-service-detail-body">
        <div className="agency-service-detail-text">
          <p className="agency-service-detail-audience">{audience}</p>
          <p className="agency-service-detail-deliverable">{deliverable}</p>
        </div>

        <ul className="agency-service-detail-includes">
          {includes.map((item) => (
            <li key={item} className="agency-service-detail-includes-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}