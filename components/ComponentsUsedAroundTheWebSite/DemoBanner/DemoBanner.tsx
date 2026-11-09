import Link from "next/link";
import "./DemoBanner.css";

// A slim bar at the top of every demo, so nobody mistakes a demo's
// fictional business for a real one, with a way back to the portfolio.
export default function DemoBanner() {
  return (
    <aside className="demo-banner" aria-label="About this demo">
      <p className="demo-banner-text">
        Demo project by{" "}
        <Link href="/" className="demo-banner-name">
          Filip Grozdanov
        </Link>{" "}
        – fictional business
      </p>
      <Link href="/projects" className="demo-banner-back">
        <span aria-hidden="true">←</span>
        <span>Back to portfolio</span>
      </Link>
    </aside>
  );
}
