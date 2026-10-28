import Image from "next/image";
import Link from "next/link";
import "../styles/RestaurantHero.css";

export default function RestaurantHero() {
  return (
    <section id="restaurant-hero" className="restaurant-hero">
      {/* Was a CSS background-image, which always downloads the full-size file.
          next/image gives phones a much smaller one. Same look: covers the
          section, centered, with the same dark overlay on top. */}
      <Image
        src="/images/restaurant/hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="restaurant-hero-bg"
      />
      <div className="restaurant-hero-overlay" />
      <div className="restaurant-hero-content">
        <p className="restaurant-hero-eyebrow">Fine Italian Dining</p>
        <h1 className="restaurant-hero-title">
          Where Every Meal <br /> Becomes a Memory
        </h1>
        <p className="restaurant-hero-subtitle">
          Handcrafted pasta, wood-fired flavors, and an atmosphere <br />
          that takes you straight to the Italian countryside.
        </p>
        <Link
          href="/template-projects/restaurant/reservations"
          className="restaurant-hero-cta"
        >
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}