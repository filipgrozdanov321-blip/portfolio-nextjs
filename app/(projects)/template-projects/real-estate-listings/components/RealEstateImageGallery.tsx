"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import "../styles/RealEstateImageGallery.css";

// Minimum finger movement (px) that counts as a swipe
const SWIPE_DISTANCE = 50;

interface RealEstateImageGalleryProps {
  images: string[];
  alt: string;
}

export default function RealEstateImageGallery({ images, alt }: RealEstateImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const mainRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Keyboard: Escape closes, arrows change photo, Tab stays inside the lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();

      if (e.key === "Tab" && dialogRef.current) {
        const buttons = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goNext, goPrev, closeLightbox]);

  // Lock the page behind the lightbox, move keyboard focus into it, and give
  // focus back to the big photo when it closes
  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const opener = mainRef.current;
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [lightboxOpen]);

  // Swipe left / right on touch screens
  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Ignore short moves and mostly-vertical moves
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) goNext();
    else goPrev();
  }

  return (
    <div className="realestate-gallery">
      {/* Was a clickable <div>, which the keyboard couldn't reach. It's a real
          button now, so Tab and Enter work. The photo is next/image instead of
          a plain <img>, so phones download a smaller file. "priority" because
          it's the biggest thing on the first screen. */}
      <button
        ref={mainRef}
        type="button"
        className="realestate-gallery-main"
        onClick={() => setLightboxOpen(true)}
        aria-label={`View ${alt} photo ${activeIndex + 1} full size`}
      >
        <Image
          src={images[activeIndex]}
          alt={`${alt} — photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1264px) 100vw, 1192px"
          className="realestate-gallery-main-image"
        />
        <span className="realestate-gallery-expand" aria-hidden="true">
          <Expand size={16} />
          View full size
        </span>
      </button>

      {images.length > 1 && (
        <div className="realestate-gallery-thumbs">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`realestate-gallery-thumb ${
                index === activeIndex ? "realestate-gallery-thumb-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View photo ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, 160px"
                className="realestate-gallery-thumb-image"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="realestate-gallery-lightbox"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          ref={dialogRef}
        >
          <button
            ref={closeRef}
            type="button"
            className="realestate-gallery-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X size={26} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="realestate-gallery-lightbox-nav realestate-gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>

          {/* A box with a set size, so the photo can fill it and fit inside
              (object-fit: contain), whatever its shape */}
          <div
            className="realestate-gallery-lightbox-image-box"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`${alt} — photo ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 85vw"
              className="realestate-gallery-lightbox-image"
            />
          </div>

          <button
            type="button"
            className="realestate-gallery-lightbox-nav realestate-gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>

          <span className="realestate-gallery-lightbox-count" aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}