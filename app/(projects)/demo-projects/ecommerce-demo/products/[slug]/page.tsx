import { notFound } from "next/navigation";
import { products } from "../../data/products";
import ShopProductGallery from "../../components/ShopProductGallery";
import ShopProductInfo from "../../components/ShopProductInfo";
import "../../styles/ShopProductDetailPage.css";

interface ShopProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ShopProductDetailPage({
  params,
}: ShopProductDetailPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="shop-product-detail-page shop-container">
      <div className="shop-product-detail-layout">
        <ShopProductGallery product={product} />
        <ShopProductInfo product={product} />
      </div>
    </div>
  );
}