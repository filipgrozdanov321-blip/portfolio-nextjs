import type { Product } from "../data/products";
import ShopProductCard from "./ShopProductCard";
import "../styles/ShopProductGrid.css";

interface ShopProductGridProps {
  products: Product[];
}

export default function ShopProductGrid({ products }: ShopProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="shop-product-grid-empty">
        <p>No products match your filters.</p>
      </div>
    );
  }

  return (
    <div className="shop-product-grid">
      {products.map((product) => (
        <ShopProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}