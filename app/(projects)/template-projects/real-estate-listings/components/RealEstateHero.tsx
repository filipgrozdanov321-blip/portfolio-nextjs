import RealEstateSearchBar from "./RealEstateSearchBar";
import "../styles/RealEstateHero.css";

export default function RealEstateHero() {
  return (
    <section className="realestate-hero">
      <img
        src="/images/realestate/hero-bg.jpg"
        alt="A modern Austin home at dusk"
        className="realestate-hero-image"
      />
      <div className="realestate-hero-overlay" />

      <div className="realestate-hero-content">
        <p className="realestate-eyebrow realestate-hero-eyebrow">Austin, Texas</p>
        <h1 className="realestate-hero-headline">
          Find a home that actually fits how you live
        </h1>
        <p className="realestate-hero-subheadline">
          Meridian Realty helps buyers and sellers move through the Austin market with clear
          pricing, straight answers, and no pressure.
        </p>

        <div className="realestate-hero-search">
          <RealEstateSearchBar variant="hero" />
        </div>
      </div>
    </section>
  );
}