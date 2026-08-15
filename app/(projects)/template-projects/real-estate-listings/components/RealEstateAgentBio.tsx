import { Award, GraduationCap, MapPin } from "lucide-react";
import "../styles/RealEstateAgentBio.css";

const credentials = [
  { icon: GraduationCap, label: "Licensed Texas Real Estate Broker" },
  { icon: Award, label: "Top 1% Austin Board of Realtors, 2023–2025" },
  { icon: MapPin, label: "11 years serving Central Austin neighborhoods" },
];

export default function RealEstateAgentBio() {
  return (
    <section className="realestate-section realestate-agentbio">
      <div className="realestate-container realestate-agentbio-inner">
        <div className="realestate-agentbio-image-wrap">
          <img
            src="/images/realestate/agent-headshot.jpg"
            alt="Portrait of Alex Whitfield, Meridian Realty agent"
            className="realestate-agentbio-image"
          />
        </div>

        <div className="realestate-agentbio-content">
          <p className="realestate-eyebrow">About Your Agent</p>
          <h1 className="realestate-agentbio-title">Alex Whitfield</h1>
          <p className="realestate-agentbio-role">Listing Agent, Meridian Realty</p>

          <div className="realestate-agentbio-credentials">
            {credentials.map((credential) => {
              const Icon = credential.icon;
              return (
                <div key={credential.label} className="realestate-agentbio-credential">
                  <Icon size={17} />
                  <span>{credential.label}</span>
                </div>
              );
            })}
          </div>

          <div className="realestate-agentbio-text">
            <p>
              I got into real estate after buying and renovating my own first house in Travis
              Heights, and realizing how much of the process nobody explains clearly. Most of what
              I do now is try to close that gap for other people.
            </p>
            <p>
              I work with a small number of clients at a time, on purpose. That means fewer
              generic showings and more time spent actually understanding what a property is
              worth and whether it fits what someone's looking for — not just what's listed on
              the sheet.
            </p>
            <p>
              Outside of work, I'm usually at Barton Springs, at a Longhorns game, or trying (and
              often failing) to keep up with renovations on my own place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}