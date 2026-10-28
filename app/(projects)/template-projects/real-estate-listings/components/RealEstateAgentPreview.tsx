import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "../styles/RealEstateAgentPreview.css";

export default function RealEstateAgentPreview() {
  return (
    <section className="realestate-section realestate-agentpreview">
      <div className="realestate-container realestate-agentpreview-inner">
        <div className="realestate-agentpreview-image-wrap">
          {/* Was a plain <img>, which always downloaded the full-size file.
              The photo is about 40% of the container on desktop (about 480px)
              and at most 340px wide when the page stacks on a phone. */}
          <Image
            src="/images/realestate/agent-headshot.jpg"
            alt="Portrait of the Meridian Realty agent"
            fill
            sizes="(max-width: 860px) 340px, 480px"
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
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}