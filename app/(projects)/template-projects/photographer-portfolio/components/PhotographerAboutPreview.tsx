import Link from "next/link";
import Image from "next/image";
import "../styles/PhotographerAboutPreview.css";

const BASE_PATH = "/template-projects/photographer-portfolio";

export default function PhotographerAboutPreview() {
  return (
    <section className="portfolio-about-preview">
      <div className="portfolio-about-preview-image-wrap">
        <Image
          src="/images/photographer/wren-portrait.jpg"
          alt="Wren Ashby, photographer"
          fill
          className="portfolio-about-preview-image"
        />
      </div>

      <div className="portfolio-about-preview-content">
        <h2 className="portfolio-about-preview-title">About Wren</h2>
        <p className="portfolio-about-preview-text">
          I started out shooting friends in borrowed light and never really
          stopped. These days my focus is simple: help people feel like
          themselves in front of a camera — confident, unguarded, and
          recognizably them.
        </p>
        <Link href={`${BASE_PATH}/about`} className="portfolio-about-preview-link">
          Read More
        </Link>
      </div>
    </section>
  );
}