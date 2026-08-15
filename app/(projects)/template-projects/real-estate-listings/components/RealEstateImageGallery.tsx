"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import "../styles/RealEstateImageGallery.css";

interface RealEstateImageGalleryProps {
  images: string[];
  alt: string;
}

export default function RealEstateImageGallery({ images, alt }: RealEstateImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="realestate-gallery">
      <div className="realestate-gallery-main" onClick={() => setLightboxOpen(true)}>
        <img src={images[activeIndex]} alt={`${alt} — photo ${activeIndex + 1}`} />
        <span className="realestate-gallery-expand">
          <Expand size={16} />
          View full size
        </span>
      </div>

      {images.length > 1 && (
        <div className="realestate-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={image}
              className={`realestate-gallery-thumb ${
                index === activeIndex ? "realestate-gallery-thumb-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div className="realestate-gallery-lightbox" onClick={() => setLightboxOpen(false)}>
          <button
            className="realestate-gallery-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close gallery"
          >
            <X size={26} />
          </button>

          <button
            className="realestate-gallery-lightbox-nav realestate-gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          <img
            src={images[activeIndex]}
            alt={`${alt} — photo ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="realestate-gallery-lightbox-image"
          />

          <button
            className="realestate-gallery-lightbox-nav realestate-gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          <span className="realestate-gallery-lightbox-count">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}