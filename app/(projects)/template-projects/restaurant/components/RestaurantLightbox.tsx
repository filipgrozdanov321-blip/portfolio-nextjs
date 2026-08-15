"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/RestaurantLightbox.css";

interface LightboxProps {
  items: { id: number; alt: string; url: string }[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function RestaurantLightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const active = items[activeIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="restaurant-lightbox" onClick={onClose}>
      <div
        className="restaurant-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="restaurant-lightbox-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <button className="restaurant-lightbox-arrow restaurant-lightbox-arrow-left" onClick={onPrev} aria-label="Previous">
          <ChevronLeft size={28} />
        </button>

        <div className="restaurant-lightbox-image-wrapper">
          <img
            src={active.url}
            alt={active.alt}
            className="restaurant-lightbox-image"
          />
          <p className="restaurant-lightbox-caption">{active.alt}</p>
        </div>

        <button className="restaurant-lightbox-arrow restaurant-lightbox-arrow-right" onClick={onNext} aria-label="Next">
          <ChevronRight size={28} />
        </button>

        <div className="restaurant-lightbox-dots">
          {items.map((_, i) => (
            <span
              key={i}
              className={`restaurant-lightbox-dot ${i === activeIndex ? "restaurant-lightbox-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}