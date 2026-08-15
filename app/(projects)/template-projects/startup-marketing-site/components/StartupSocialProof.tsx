import { Sparkles, Newspaper } from "lucide-react";
import "../styles/StartupSocialProof.css";

const MENTIONS = [
  {
    icon: Sparkles,
    label: "Foundry Labs",
    detail: "Spring 2026 cohort",
  },
  {
    icon: Newspaper,
    label: "Stackline Weekly",
    detail: "“Six monitoring tools worth trying”",
  },
];

export default function StartupSocialProof() {
  return (
    <section id="proof" className="startup-social-proof">
      <div className="startup-container startup-social-proof-inner">
        <div className="startup-social-proof-stat">
          <span className="startup-social-proof-number">40+</span>
          <div className="startup-social-proof-stat-copy">
            <p className="startup-social-proof-headline">
              Engineering teams already running Rivet in beta
            </p>
            <p className="startup-social-proof-detail startup-mono">
              600+ services monitored · 12K+ checks a day since March 2026
            </p>
          </div>
        </div>

        <div className="startup-social-proof-mentions">
          {MENTIONS.map((mention) => (
            <div key={mention.label} className="startup-social-proof-mention">
              <mention.icon size={15} />
              <div>
                <span className="startup-social-proof-mention-label">
                  {mention.label}
                </span>
                <span className="startup-social-proof-mention-detail">
                  {mention.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}