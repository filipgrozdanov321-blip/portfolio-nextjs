"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "../data/products";
import { useCart } from "../context/ShopCartContext";
import "../styles/ShopProductInfo.css";

interface ShopProductInfoProps {
  product: Product;
}

export default function ShopProductInfo({ product }: ShopProductInfoProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    // addItem opens the cart drawer automatically as confirmation
  };

  return (
    <div className="shop-product-info">
      <span className="shop-product-info-category">{product.category}</span>
      <h1 className="shop-product-info-name">{product.name}</h1>
      <span className="shop-product-info-price">${product.price.toFixed(2)}</span>

      <p className="shop-product-info-description">{product.description}</p>

      {product.variants && product.variants.length > 0 && (
        <div className="shop-product-info-variants">
          <span className="shop-product-info-label">
            {/^(small|medium|large)/i.test(product.variants[0])
              ? "Size"
              : "Color"}
          </span>
          <div className="shop-product-info-variant-options">
            {product.variants.map((variant) => (
              <button
                key={variant}
                type="button"
                className={`shop-product-info-variant-button ${
                  selectedVariant === variant
                    ? "shop-product-info-variant-button-active"
                    : ""
                }`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="shop-product-info-quantity">
        <span className="shop-product-info-label">Quantity</span>
        <div className="shop-product-info-stepper">
          <button
            type="button"
            className="shop-product-info-stepper-button"
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            <Minus size={14} strokeWidth={2} />
          </button>
          <span className="shop-product-info-quantity-value">{quantity}</span>
          <button
            type="button"
            className="shop-product-info-stepper-button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            <Plus size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="shop-product-info-add-button"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}