import "../styles/PhotographerTestimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "Wren made me feel like myself in front of the camera for the first time. The branding photos completely changed how I show up online.",
    name: "Elena Marsh",
    role: "Founder, Marsh & Co.",
  },
  {
    quote:
      "Professional, calm, and genuinely good at directing people who hate being photographed. The headshots were exactly what I needed.",
    name: "David Okafor",
    role: "Management Consultant",
  },
  {
    quote:
      "The editorial shoot exceeded what I pictured. Every frame felt intentional, nothing generic about it.",
    name: "Priya Nandan",
    role: "Creative Director",
  },
];

export default function PhotographerTestimonials() {
  return (
    <section className="portfolio-testimonials">
      <h2 className="portfolio-testimonials-title">What Clients Say</h2>

      <div className="portfolio-testimonials-grid">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.name} className="portfolio-testimonial-card">
            <p className="portfolio-testimonial-quote">“{testimonial.quote}”</p>
            <div className="portfolio-testimonial-author">
              <span className="portfolio-testimonial-name">{testimonial.name}</span>
              <span className="portfolio-testimonial-role">{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}