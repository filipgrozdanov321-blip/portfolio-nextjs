import "../styles/RestaurantTestimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sofia Marchetti",
    location: "New York, NY",
    quote:
      "Bella Vista is the closest thing to dining in Naples I have found in New York. The tagliatelle alone is worth the trip.",
    stars: 5,
  },
  {
    id: 2,
    name: "James Whitfield",
    location: "Brooklyn, NY",
    quote:
      "Every detail is considered — the lighting, the wine list, the service. A rare restaurant that actually lives up to its reputation.",
    stars: 5,
  },
  {
    id: 3,
    name: "Amara Diallo",
    location: "Manhattan, NY",
    quote:
      "We celebrated our anniversary here and could not have chosen better. The osso buco was extraordinary. We will be back.",
    stars: 5,
  },
];

export default function RestaurantTestimonials() {
  return (
    <section id="restaurant-testimonials" className="restaurant-testimonials">
      <div className="restaurant-testimonials-inner">

        <div className="restaurant-testimonials-header">
          <p className="restaurant-testimonials-eyebrow">Guest Reviews</p>
          <h2 className="restaurant-testimonials-title">What Our Guests Say</h2>
        </div>

        <div className="restaurant-testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="restaurant-testimonials-card">
              <div className="restaurant-testimonials-stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="restaurant-testimonials-star">&#9733;</span>
                ))}
              </div>
              <p className="restaurant-testimonials-quote">{t.quote}</p>
              <div className="restaurant-testimonials-author">
                <span className="restaurant-testimonials-name">{t.name}</span>
                <span className="restaurant-testimonials-location">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}