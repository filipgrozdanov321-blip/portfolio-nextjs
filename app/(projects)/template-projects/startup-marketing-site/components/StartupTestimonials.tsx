import "../styles/StartupTestimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "We caught a connection pool leak forty minutes before it would've taken checkout down during a promo push. Never would've seen it in time on our old setup.",
    name: "Sam Whitfield",
    role: "Lead Engineer, Fernway",
  },
  {
    quote:
      "Our on-call rotation went from three people staring at five dashboards to one Slack message naming the exact service and the exact error.",
    name: "Priya Nandakumar",
    role: "Founding Engineer, Loopline",
  },
  {
    quote:
      "Rivet paged me about a slow query eleven minutes after deploy. Old tooling would've caught it from a support ticket the next morning.",
    name: "Marcus Idehen",
    role: "CTO, Northcrest Labs",
  },
];

export default function StartupTestimonials() {
  return (
    <section className="startup-testimonials">
      <div className="startup-container">
        <span className="startup-testimonials-eyebrow startup-mono">
          EARLY CUSTOMERS
        </span>
        <h2 className="startup-testimonials-headline">
          What the beta cohort is paging us about.
        </h2>

        <div className="startup-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name} className="startup-testimonials-card">
              <p className="startup-testimonials-quote">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="startup-testimonials-attribution startup-mono">
                // {t.name} — {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}