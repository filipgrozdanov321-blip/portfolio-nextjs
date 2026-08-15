import '../styles/AgencyTeamGrid.css';

const team = [
  { name: 'Sasha Reyes', role: 'Founder & Creative Director', line: 'Sees the version of the brand nobody else pitched yet.' },
  { name: 'Tomas Berg', role: 'Head of Design', line: 'Redraws the grid until it stops looking designed.' },
  { name: 'Iris Chen', role: 'Motion Director', line: 'Makes a static logo feel like it has a pulse.' },
  { name: 'Nadia Okafor', role: 'Brand Strategist', line: 'Asks the question that changes the whole brief.' },
  { name: 'Leo Marchetti', role: 'Senior Designer', line: 'Will fight for one extra millimeter of whitespace.' },
  { name: 'Priya Shah', role: 'Producer', line: 'Keeps six projects on time without anyone noticing the effort.' },
];

export default function AgencyTeamGrid() {
  return (
    <div className="agency-team-grid">
      {team.map((member) => (
        <div key={member.name} className="agency-team-card">
          <div className="agency-team-card-image" aria-hidden="true" />
          <h3 className="agency-team-card-name">{member.name}</h3>
          <span className="agency-team-card-role">{member.role}</span>
          <p className="agency-team-card-line">{member.line}</p>
        </div>
      ))}
    </div>
  );
}