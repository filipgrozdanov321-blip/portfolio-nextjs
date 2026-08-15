import Link from "next/link";
import Image from "next/image";
import "../styles/PhotographerFeaturedWork.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

const FEATURED_IMAGES = [
  { src: "/images/photographer/featured-01.jpg", alt: "Editorial portrait, studio light" },
  { src: "/images/photographer/featured-02.jpg", alt: "Personal branding session, natural light" },
  { src: "/images/photographer/featured-03.jpg", alt: "Black and white portrait" },
  { src: "/images/photographer/featured-04.jpg", alt: "Outdoor editorial portrait" },
  { src: "/images/photographer/featured-05.jpg", alt: "Corporate headshot, neutral backdrop" },
  { src: "/images/photographer/featured-06.jpg", alt: "Personal branding, lifestyle setting" },
];

export default function PhotographerFeaturedWork() {
  return (
    <section className="portfolio-featured">
      <div className="portfolio-featured-header">
        <h2 className="portfolio-featured-title">Featured Work</h2>
        <Link href={`${BASE_PATH}/portfolio`} className="portfolio-featured-link">
          View Full Portfolio
        </Link>
      </div>

      <div className="portfolio-featured-grid">
        {FEATURED_IMAGES.map((image) => (
          <div key={image.src} className="portfolio-featured-item">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="portfolio-featured-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
}