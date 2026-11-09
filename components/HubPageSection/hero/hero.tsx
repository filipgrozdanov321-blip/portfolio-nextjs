import { bookingHref, bookingIsExternal, site } from "@/lib/site";
import "./hero.css";

// What I build, for whom, and what to do next, in one screen.
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="hero-h1-title">
          {site.headline}
        </h1>

        <p>
          I&apos;m Filip. I build fast business websites and custom web apps
          (booking systems, online shops, dashboards), and I take on
          development work for agencies.
        </p>

        <div className="hero-cta-anim hero-ctas">
          <a
            href={bookingHref()}
            className="contact-button-hero"
            {...(bookingIsExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Book a 15-minute call
          </a>
          <a href="#my-work" className="hero-secondary-cta">
            See my work
          </a>
        </div>
      </div>
    </section>
  );
}
