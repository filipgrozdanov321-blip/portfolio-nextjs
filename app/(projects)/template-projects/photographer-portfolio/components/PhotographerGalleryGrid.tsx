"use client";

import { useState } from "react";
import Image from "next/image";
import PhotographerLightbox from "./PhotographerLightbox";
import "../styles/PhotographerGalleryGrid.css";

const CATEGORIES = ["Portraits", "Editorial", "Branding", "Personal"] as const;
type Category = (typeof CATEGORIES)[number];

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/photographer/portraits-01.jpg", alt: "Studio portrait, soft light", category: "Portraits" },
  { src: "/images/photographer/portraits-02.jpg", alt: "Natural light portrait", category: "Portraits" },
  { src: "/images/photographer/portraits-03.jpg", alt: "Black and white close-up portrait", category: "Portraits" },
  { src: "/images/photographer/portraits-04.jpg", alt: "Outdoor portrait, golden hour", category: "Portraits" },
  { src: "/images/photographer/portraits-05.jpg", alt: "Window light portrait", category: "Portraits" },
  { src: "/images/photographer/portraits-06.jpg", alt: "Studio portrait, dark backdrop", category: "Portraits" },

  { src: "/images/photographer/editorial-01.jpg", alt: "Editorial fashion portrait", category: "Editorial" },
  { src: "/images/photographer/editorial-02.jpg", alt: "Editorial portrait, bold styling", category: "Editorial" },
  { src: "/images/photographer/editorial-03.jpg", alt: "Editorial portrait, urban backdrop", category: "Editorial" },
  { src: "/images/photographer/editorial-04.jpg", alt: "Editorial portrait, dramatic light", category: "Editorial" },
  { src: "/images/photographer/editorial-05.jpg", alt: "Editorial portrait, minimal set", category: "Editorial" },

  { src: "/images/photographer/branding-01.jpg", alt: "Personal branding session, office setting", category: "Branding" },
  { src: "/images/photographer/branding-02.jpg", alt: "Personal branding, candid work moment", category: "Branding" },
  { src: "/images/photographer/branding-03.jpg", alt: "Personal branding, neutral backdrop", category: "Branding" },
  { src: "/images/photographer/branding-04.jpg", alt: "Personal branding, lifestyle setting", category: "Branding" },

  { src: "/images/photographer/personal-01.jpg", alt: "Personal project, quiet moment", category: "Personal" },
  { src: "/images/photographer/personal-02.jpg", alt: "Personal project, film style", category: "Personal" },
  { src: "/images/photographer/personal-03.jpg", alt: "Personal project, travel portrait", category: "Personal" },
  { src: "/images/photographer/personal-04.jpg", alt: "Personal project, candid street", category: "Personal" },
];

export default function PhotographerGalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("Portraits");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = GALLERY_IMAGES.filter(
    (image) => image.category === activeCategory
  );
  
  const isFourImages = filteredImages.length === 4;

  const handleClose = () => setLightboxIndex(null);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <section className="portfolio-gallery">
      <div className="portfolio-gallery-tabs">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`portfolio-gallery-tab ${
              activeCategory === category ? "portfolio-gallery-tab-active" : ""
            }`}
            onClick={() => {
              setActiveCategory(category);
              setLightboxIndex(null);
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="portfolio-gallery-grid">
  {isFourImages ? (
    <>
      <div className="portfolio-gallery-row">
        {filteredImages.slice(0, 2).map((image, index) => (
          <button
            key={image.src}
            className="portfolio-gallery-item"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Open image: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="portfolio-gallery-image"
            />
          </button>
        ))}
      </div>
      <div className="portfolio-gallery-row">
        {filteredImages.slice(2, 4).map((image, index) => (
          <button
            key={image.src}
            className="portfolio-gallery-item"
            onClick={() => setLightboxIndex(index + 2)}
            aria-label={`Open image: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="portfolio-gallery-image"
            />
          </button>
        ))}
      </div>
    </>
  ) : (
    filteredImages.map((image, index) => (
      <button
        key={image.src}
        className="portfolio-gallery-item"
        onClick={() => setLightboxIndex(index)}
        aria-label={`Open image: ${image.alt}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="portfolio-gallery-image"
        />
      </button>
    ))
  )}
</div>

      {lightboxIndex !== null && (
        <PhotographerLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}