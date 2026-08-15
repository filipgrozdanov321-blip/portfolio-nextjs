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
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="shop-product-card-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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