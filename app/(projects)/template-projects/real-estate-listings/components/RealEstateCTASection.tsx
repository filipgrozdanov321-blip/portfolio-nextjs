import Link from "next/link";
import "../styles/RealEstateCTASection.css";

export default function RealEstateCTASection() {
  return (
    <section className="realestate-cta">
      <div className="realestate-container realestate-cta-inner">
        <h2 className="realestate-cta-title">Ready to talk about your next move?</h2>
        <p className="realestate-cta-text">
          Whether you're buying, selling, or just getting a feel for the market, a short call is
          the fastest way to get real answers.
        </p>
        <Link
          href="/template-projects/real-estate-listings/contact"
          className="realestate-btn realestate-btn-primary realestate-cta-btn"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}