import Link from "next/link";
import "../styles/RestaurantHero.css";

export default function RestaurantHero() {
  return (
    <section id="restaurant-hero" className="restaurant-hero">
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