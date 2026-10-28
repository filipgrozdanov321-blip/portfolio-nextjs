import Image from "next/image";
import RealEstateSearchBar from "./RealEstateSearchBar";
import "../styles/RealEstateHero.css";

export default function RealEstateHero() {
  return (
    <section className="realestate-hero">
      {/* Was a plain <img>, which always downloads the full-size file. With
          next/image a phone gets a much smaller one. "priority" because it is
          the biggest thing on the first screen. */}
      <Image
        src="/images/realestate/hero-bg.jpg"
        alt="A modern Austin home at dusk"
        fill
        priority
        sizes="100vw"
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