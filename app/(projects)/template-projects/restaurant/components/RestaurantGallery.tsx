"use client";

import { useState } from "react";
import type { KeyboardEvent } from "react";
import Image from "next/image";
import RestaurantLightbox from "./RestaurantLightbox";
import "../styles/RestaurantGallery.css";

// "gridArea" is no longer used by this file (the tile positions now live in
// RestaurantGallery.css, so media queries can change them without !important).
// It stays in the data in case RestaurantLightbox's prop type expects it.
const GALLERY_ITEMS = [
  { id: 1, alt: "Pasta dish", url: "/images/restaurant/gallery-1.jpg", gridArea: "1 / 1 / 3 / 2" },
  { id: 2, alt: "Restaurant interior", url: "/images/restaurant/gallery-2.jpg", gridArea: "1 / 2 / 2 / 3" },
  { id: 3, alt: "Wood fired pizza", url: "/images/restaurant/gallery-3.jpg", gridArea: "2 / 2 / 3 / 3" },
  { id: 4, alt: "Dessert plating", url: "/images/restaurant/gallery-4.jpg", gridArea: "1 / 3 / 2 / 4" },
  { id: 5, alt: "Wine selection", url: "/images/restaurant/gallery-5.jpg", gridArea: "2 / 3 / 3 / 4" },
  { id: 6, alt: "Chef at work", url: "/images/restaurant/gallery-6.jpg", gridArea: "1 / 4 / 3 / 5" },
];

export default function RestaurantGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);
  const handlePrev = () => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  const handleNext = () => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % GALLERY_ITEMS.length));

  // Enter AND Space open a tile (a real button does both)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // stops Space from scrolling the page
      handleOpen(index);
    }
  };

  return (
    <section id="restaurant-gallery" className="restaurant-gallery">
      <div className="restaurant-gallery-inner">

        <div className="restaurant-gallery-header">
          <p className="restaurant-gallery-eyebrow">A Glimpse Inside</p>
          <h2 className="restaurant-gallery-title">Our Gallery</h2>
        </div>

        <div className="restaurant-gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="restaurant-gallery-card"
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.alt}`}
              onClick={() => handleOpen(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {/* Was a CSS background-image (always the full-size file). With
                  next/image a phone downloads a much smaller one. The sizes
                  line matches the grid: 1 column on phones, 2, then 3, then
                  4 columns from 1000px up. */}
              <Image
                src={item.url}
                alt=""
                fill
                sizes="(max-width: 539px) 100vw, (max-width: 799px) 50vw, (max-width: 999px) 33vw, 25vw"
                className="restaurant-gallery-card-img"
              />

              <div className="restaurant-gallery-card-overlay">
                <span className="restaurant-gallery-card-label">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {activeIndex !== null && (
        <RestaurantLightbox
          items={GALLERY_ITEMS}
          activeIndex={activeIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}