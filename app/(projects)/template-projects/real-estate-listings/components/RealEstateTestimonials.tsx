import { Quote } from "lucide-react";
import "../styles/RealEstateTestimonials.css";

const testimonials = [
  {
    quote:
      "We looked at twelve houses over two months and never once felt rushed into a decision. The pricing advice on our offer was exactly right.",
    name: "Rachel M.",
    location: "Buyer, Travis Heights",
  },
  {
    quote:
      "Sold our condo in nine days at $12k over asking. The listing photos and pricing strategy made the difference.",
    name: "David & Priya K.",
    location: "Sellers, The Domain",
  },
  {
    quote:
      "First-time buyer here, and I had no idea what I was doing. Everything was explained in plain terms, no jargon.",
    name: "Marcus T.",
    location: "Buyer, Mueller",
  },
];

export default function RealEstateTestimonials() {
  return (
    <section className="realestate-section realestate-testimonials">
      <div className="realestate-container">
        <div className="realestate-testimonials-header">
          <p className="realestate-eyebrow">Client Stories</p>
          <h2 className="realestate-testimonials-title">What it's been like to work together</h2>
        </div>

        <div className="realestate-testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="realestate-testimonials-card">
              <Quote size={22} className="realestate-testimonials-icon" />
              <p className="realestate-testimonials-quote">{testimonial.quote}</p>
              <div className="realestate-testimonials-attribution">
                <p className="realestate-testimonials-name">{testimonial.name}</p>
                <p className="realestate-testimonials-location">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}