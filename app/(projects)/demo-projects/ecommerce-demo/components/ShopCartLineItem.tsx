"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, type CartItem } from "../context/ShopCartContext";
import "../styles/ShopCartLineItem.css";

interface ShopCartLineItemProps {
  item: CartItem;
}

export default function ShopCartLineItem({ item }: ShopCartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, variant, quantity } = item;

  const handleDecrease = () => updateQuantity(product.slug, variant, quantity - 1);
  const handleIncrease = () => updateQuantity(product.slug, variant, quantity + 1);
  const handleRemove = () => removeItem(product.slug, variant);

  return (
    <div className="shop-cart-line-item">
      <div className="shop-cart-line-item-image-wrapper">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="shop-cart-line-item-image"
          sizes="80px"
        />
      </div>

      <div className="shop-cart-line-item-details">
        <div className="shop-cart-line-item-top">
          <span className="shop-cart-line-item-name">{product.name}</span>
          <button
            type="button"
            className="shop-cart-line-item-remove"
            onClick={handleRemove}
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 size={15} strokeWidth={1.75} />
          </button>
        </div>

        {variant && <span className="shop-cart-line-item-variant">{variant}</span>}

        <div className="shop-cart-line-item-bottom">
          <div className="shop-cart-line-item-stepper">
            <button
              type="button"
              className="shop-cart-line-item-stepper-button"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
            >
              <Minus size={13} strokeWidth={2} />
            </button>
            <span className="shop-cart-line-item-quantity">{quantity}</span>
            <button
              type="button"
              className="shop-cart-line-item-stepper-button"
              onClick={handleIncrease}
              aria-label="Increase quantity"
            >
              <Plus size={13} strokeWidth={2} />
            </button>
          </div>
          <span className="shop-cart-line-item-price">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}