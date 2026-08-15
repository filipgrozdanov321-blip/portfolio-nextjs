import AgencyWorkGrid from '../components/AgencyWorkGrid';
import '../styles/AgencyWorkPage.css';

export default function WorkPage() {
  return (
    <div className="agency-work-page">
      <div className="agency-work-page-header">
        <h1 className="agency-work-page-title">Work</h1>
        <p className="agency-work-page-intro">
          A selection of brands, products, and campaigns we've built from
          the ground up.
        </p>
      </div>

      <AgencyWorkGrid />
    </div>
  );
}