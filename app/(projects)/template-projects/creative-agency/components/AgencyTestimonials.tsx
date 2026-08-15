import '../styles/AgencyTestimonials.css';

const testimonials = [
  {
    quote:
      "Glyph rebuilt our entire brand in six weeks and it felt more us than anything we'd had before.",
    name: 'Priya Anand',
    role: 'Founder, Loop Finance',
  },
  {
    quote:
      'They pushed back on our first-round ideas, and they were right to. The final identity is sharper than what we asked for.',
    name: 'Marcus Webb',
    role: 'CMO, Fenwick Athletics',
  },
  {
    quote: 'Fast, opinionated, and easy to work with. Exactly what a studio should be.',
    name: 'Dana Ilić',
    role: 'Co-founder, Marrow Studio',
  },
];

export default function AgencyTestimonials() {
  return (
    <section className="agency-testimonials">
      <div className="agency-testimonials-inner">
        <div className="agency-testimonials-header">
          <p className="agency-testimonials-eyebrow">Client Voices</p>
          <h2 className="agency-testimonials-title">What They Say</h2>
        </div>

        <div className="agency-testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="agency-testimonial-card">
              <span className="agency-testimonial-mark" aria-hidden="true">
                "
              </span>
              <p className="agency-testimonial-quote">{testimonial.quote}</p>
              <div className="agency-testimonial-attribution">
                <div className="agency-testimonial-attribution-text">
                  <span className="agency-testimonial-name">{testimonial.name}</span>
                  <span className="agency-testimonial-role">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}