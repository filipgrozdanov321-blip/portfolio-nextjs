import '../styles/AgencyProcess.css';

const steps = [
  {
    number: '01',
    name: 'Discover',
    description:
      'We dig into the brand, the market, and the goal before a single pixel gets made.',
  },
  {
    number: '02',
    name: 'Design',
    description:
      'Concepts get explored, tested, and narrowed until the direction is unmistakably right.',
  },
  {
    number: '03',
    name: 'Build',
    description:
      'The chosen direction gets built out across every surface it needs to live on.',
  },
  {
    number: '04',
    name: 'Launch',
    description:
      'We ship, then stay close to make sure the brand lands the way it was designed to.',
  },
];

export default function AgencyProcess() {
  return (
    <section className="agency-process">
      <div className="agency-process-inner">
        <h2 className="agency-process-title">How We Work</h2>

        <div className="agency-process-grid">
          {steps.map((step) => (
            <div key={step.number} className="agency-process-step">
              <span className="agency-process-step-number">{step.number}</span>
              <h3 className="agency-process-step-name">{step.name}</h3>
              <p className="agency-process-step-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}