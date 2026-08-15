import "../styles/StartupProblemSection.css";

export default function StartupProblemSection() {
  return (
    <section id="problem" className="startup-problem">
      <div className="startup-container startup-problem-inner">
        <span className="startup-problem-eyebrow startup-mono">
          THE PROBLEM
        </span>

        <h2 className="startup-problem-headline">
          You shouldn&apos;t find out about downtime from a customer.
        </h2>

        <p className="startup-problem-body">
          Most incident tooling is built for teams with a dedicated SRE org
          and a six-figure observability budget. Small teams don&apos;t have
          that. They have three or four engineers, a shared on-call phone
          nobody set up quite right, and a Slack channel full of alerts
          everyone has quietly learned to ignore.
        </p>

        <p className="startup-problem-highlight">
          Rivet is built around one rule: the person who can fix it hears
          about it first — before a customer does, and before it becomes a
          thread in your incident channel titled &ldquo;is anyone seeing
          this?&rdquo;
        </p>
      </div>
    </section>
  );
}