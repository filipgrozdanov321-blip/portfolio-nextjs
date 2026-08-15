import "../styles/Testimonials.css";

const testimonials = [
  {
    quote:
      "Since switching to ChairTime, our no-show rate dropped by half. Clients love being able to book online at midnight.",
    name: "Sarah Mitchell",
    role: "Owner, Brightlane Salon",
  },
  {
    quote:
      "Managing five stylists' schedules used to be a nightmare. Now it's all in one calendar and everyone can see it.",
    name: "Marcus Reyes",
    role: "Manager, UrbanCuts Barbershop",
  },
  {
    quote:
      "My clients keep telling me how easy it is to book with us now. It genuinely feels like a more professional studio.",
    name: "Elena Voss",
    role: "Artist, InkHouse Tattoo Studio",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <h2 className="testimonials-title">Loved by studios everywhere</h2>
        <p className="testimonials-subtitle">
          Don't just take our word for it — here's what real studio owners say.
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testimonial-card">
            <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}