import Link from "next/link";
import Image from "next/image";
import type { Product } from "../data/products";
import "../styles/ShopProductCard.css";

interface ShopProductCardProps {
  product: Product;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
  return (
    <Link
      href={`/demo-projects/ecommerce-demo/products/${product.slug}`}
      className="shop-product-card"
    >
      <div className="shop-product-card-image-wrapper">
        {/* The sizes line matches every grid this card sits in: 2 columns on
            phones (the featured grid and the products page), 3 up to 1024px,
            and about a quarter of the screen above that. Before it said "100vw
            below 640px", which made phones download images about twice as big
            as needed. */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="shop-product-card-image"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="shop-product-card-info">
        <span className="shop-product-card-category">{product.category}</span>
        <h3 className="shop-product-card-name">{product.name}</h3>
        <span className="shop-product-card-price">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}