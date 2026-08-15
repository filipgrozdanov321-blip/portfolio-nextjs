import Link from "next/link";
import Image from "next/image";
import "../styles/ShopCategoryTiles.css";

const BASE_PATH = "/demo-projects/ecommerce-demo";

const CATEGORIES = [
  { name: "Kitchen", image: "/images/shop/category-kitchen.jpg" },
  { name: "Textiles", image: "/images/shop/category-textiles.jpg" },
  { name: "Lighting", image: "/images/shop/category-lighting.jpg" },
  { name: "Decor", image: "/images/shop/category-decor.jpg" },
];

export default function ShopCategoryTiles() {
  return (
    <section className="shop-category-tiles-section">
      <div className="shop-container">
        <h2 className="shop-category-tiles-heading">Shop by Category</h2>
        <div className="shop-category-tiles-grid">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`${BASE_PATH}/products?category=${encodeURIComponent(category.name)}`}
              className="shop-category-tile"
            >
              <div className="shop-category-tile-image-wrapper">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="shop-category-tile-image"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <span className="shop-category-tile-label">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}