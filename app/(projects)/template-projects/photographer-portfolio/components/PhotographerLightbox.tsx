"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/PhotographerLightbox.css";

interface LightboxImage {
  src: string;
  alt: string;
}

interface PhotographerLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotographerLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: PhotographerLightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  if (!currentImage) return null;

  return (
    <div className="portfolio-lightbox" onClick={onClose}>
      <button
        className="portfolio-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={26} />
      </button>

      <button
        className="portfolio-lightbox-nav portfolio-lightbox-nav-prev"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={30} />
      </button>

      <div
        className="portfolio-lightbox-image-wrap"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="portfolio-lightbox-image"
        />
      </div>

      <button
        className="portfolio-lightbox-nav portfolio-lightbox-nav-next"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={30} />
      </button>

      <div className="portfolio-lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}