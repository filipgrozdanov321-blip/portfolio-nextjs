import Link from "next/link";
import Image from "next/image";
import "../styles/ShopHero.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopHero() {
  return (
    <section className="shop-hero">
      <div className="shop-hero-image-wrapper">
        <Image
          src="/images/shop/hero-lifestyle.jpg"
          alt="A calm, sunlit Scandinavian living room with Norrland homeware"
          fill
          priority
          className="shop-hero-image"
          sizes="100vw"
        />
        <div className="shop-hero-overlay" />
      </div>

      <div className="shop-hero-content">
        <span className="shop-hero-eyebrow">Norrland</span>
        <h1 className="shop-hero-heading">
          Considered objects for a quieter home
        </h1>
        <p className="shop-hero-subtext">
          Kitchen, textiles, lighting, and decor — designed to last, chosen
          with care.
        </p>
        <Link href={`${BASE_PATH}/products`} className="shop-hero-cta">
          Shop Now
        </Link>
      </div>
    </section>
  );
}