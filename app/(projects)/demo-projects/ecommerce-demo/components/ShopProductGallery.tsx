"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "../data/products";
import "../styles/ShopProductGallery.css";

interface ShopProductGalleryProps {
  product: Product;
}

export default function ShopProductGallery({ product }: ShopProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="shop-product-gallery">
      <div className="shop-product-gallery-main">
        <Image
          src={product.images[activeIndex]}
          alt={product.name}
          fill
          priority
          className="shop-product-gallery-main-image"
          sizes="(max-width: 900px) 100vw, 55vw"
        />
      </div>

      {product.images.length > 1 && (
        <div className="shop-product-gallery-thumbnails">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={`shop-product-gallery-thumbnail ${
                index === activeIndex ? "shop-product-gallery-thumbnail-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1} of ${product.name}`}
            >
              <Image
                src={image}
                alt=""
                fill
                className="shop-product-gallery-thumbnail-image"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}