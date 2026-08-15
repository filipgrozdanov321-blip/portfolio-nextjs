import AgencyTeamGrid from '../components/AgencyTeamGrid';
import '../styles/AgencyAboutPage.css';

const values = [
  'Craft over trend',
  'Opinions, not options',
  "Fast doesn't mean sloppy",
  'Say no, so we can say yes to the right thing',
];

export default function AboutPage() {
  return (
    <div className="agency-about-page">
      <div className="agency-about-page-header">
        <h1 className="agency-about-page-title">
          We started Glyph because most agencies play it safe.
        </h1>
        <p className="agency-about-page-mission">
          Glyph Studio is an independent creative studio built for founders who'd
          rather stand out than fit in. We work in branding, digital design, and
          motion — and we turn down projects that just want a safer version of
          what's already out there.
        </p>
      </div>

      <div className="agency-about-page-values">
        <h2 className="agency-about-page-values-title">How We Think</h2>
        <ul className="agency-about-page-values-list">
          {values.map((value) => (
            <li key={value} className="agency-about-page-values-item">
              {value}
            </li>
          ))}
        </ul>
      </div>

      <div className="agency-about-page-team">
        <h2 className="agency-about-page-team-title">The Studio</h2>
        <AgencyTeamGrid />
      </div>
    </div>
  );
}