"use client";

import { useState } from "react";
import RestaurantLightbox from "./RestaurantLightbox";
import "../styles/RestaurantGallery.css";

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
              style={{
                backgroundImage: `url("${item.url}")`,
                gridArea: item.gridArea,
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${item.alt}`}
              onClick={() => handleOpen(index)}
              onKeyDown={(e) => e.key === "Enter" && handleOpen(index)}
            >
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