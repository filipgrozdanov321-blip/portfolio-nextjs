import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "../styles/RealEstateAgentPreview.css";

export default function RealEstateAgentPreview() {
  return (
    <section className="realestate-section realestate-agentpreview">
      <div className="realestate-container realestate-agentpreview-inner">
        <div className="realestate-agentpreview-image-wrap">
          <img
            src="/images/realestate/agent-headshot.jpg"
            alt="Portrait of the Meridian Realty agent"
            className="realestate-agentpreview-image"
          />
        </div>

        <div className="realestate-agentpreview-content">
          <p className="realestate-eyebrow">Your Agent</p>
          <h2 className="realestate-agentpreview-title">
            Someone who answers the phone, not a call center
          </h2>
          <p className="realestate-agentpreview-text">
            I've spent the last decade helping Austin buyers and sellers make sense of a market
            that changes fast. My approach is simple: give people the same information I'd want
            if it were my own money on the line.
          </p>
          <Link href="/template-projects/real-estate-listings/about" className="realestate-agentpreview-link">
            Meet Your Agent
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}