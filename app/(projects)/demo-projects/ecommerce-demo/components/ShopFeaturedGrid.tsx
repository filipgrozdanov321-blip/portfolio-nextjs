import Link from "next/link";
import { products } from "../data/products";
import ShopProductCard from "./ShopProductCard";
import "../styles/ShopFeaturedGrid.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

export default function ShopFeaturedGrid() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 8);

  return (
    <section className="shop-featured-grid-section">
      <div className="shop-container">
        <div className="shop-featured-grid-header">
          <h2 className="shop-featured-grid-heading">Featured</h2>
          <Link href={`${BASE_PATH}/products`} className="shop-featured-grid-view-all">
            View All
          </Link>
        </div>

        <div className="shop-featured-grid">
          {featuredProducts.map((product) => (
            <ShopProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}