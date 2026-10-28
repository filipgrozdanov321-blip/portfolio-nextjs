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

// Matches the grid in PhotographerGalleryGrid.css: 1 column up to 560px,
// 2 columns up to 900px, then 3 (each at most about 380px wide).
const TILE_SIZES =
  "(max-width: 560px) 100vw, (max-width: 900px) 50vw, (max-width: 1264px) 33vw, 380px";

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

  // One photo tile. The same markup was written out three times before.
  // alt="" because the button already has an aria-label that names the photo
  // (otherwise a screen reader reads the same text twice).
  const renderTile = (image: GalleryImage, index: number) => (
    <button
      key={image.src}
      type="button"
      className="portfolio-gallery-item"
      onClick={() => setLightboxIndex(index)}
      aria-label={`Open image: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt=""
        fill
        sizes={TILE_SIZES}
        className="portfolio-gallery-image"
      />
    </button>
  );

  return (
    <section className="portfolio-gallery">
      <div
        className="portfolio-gallery-tabs"
        role="group"
        aria-label="Portfolio categories"
      >
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`portfolio-gallery-tab ${
              activeCategory === category ? "portfolio-gallery-tab-active" : ""
            }`}
            aria-pressed={activeCategory === category}
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
              {filteredImages
                .slice(0, 2)
                .map((image, index) => renderTile(image, index))}
            </div>
            <div className="portfolio-gallery-row">
              {filteredImages
                .slice(2, 4)
                .map((image, index) => renderTile(image, index + 2))}
            </div>
          </>
        ) : (
          filteredImages.map((image, index) => renderTile(image, index))
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