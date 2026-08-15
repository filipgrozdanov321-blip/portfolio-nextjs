import { Activity, BellRing, History } from "lucide-react";
import "../styles/StartupFeatures.css";

const FEATURES = [
  {
    icon: Activity,
    title: "Continuous health checks",
    description:
      "Synthetic and heartbeat checks run against every service you register — API, database, queues, cron jobs — with detection inside 30 seconds of a failure.",
    tag: "< 30s detection",
  },
  {
    icon: BellRing,
    title: "Smart on-call paging",
    description:
      "Alerts route by phone, SMS, or Slack to whoever's on call, and automatically escalate to the next person if nobody acknowledges within 90 seconds.",
    tag: "Escalates in 90s",
  },
  {
    icon: History,
    title: "Auto-built incident timeline",
    description:
      "Every alert, ack, and status change is logged as it happens, so your postmortem is already written by the time the incident is resolved.",
    tag: "Zero manual write-up",
  },
];

export default function StartupFeatures() {
  return (
    <section id="product" className="startup-features">
      <div className="startup-container">
        <span className="startup-features-eyebrow startup-mono">
          THE PRODUCT
        </span>
        <h2 className="startup-features-headline">
          Three things Rivet does. Nothing else, on purpose.
        </h2>

        <div className="startup-features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="startup-features-card">
              <feature.icon size={20} className="startup-features-icon" />
              <h3 className="startup-features-card-title">{feature.title}</h3>
              <p className="startup-features-card-desc">
                {feature.description}
              </p>
              <span className="startup-features-card-tag startup-mono">
                {feature.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}