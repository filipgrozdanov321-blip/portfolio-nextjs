import ShopHero from "./components/ShopHero";
import ShopTrustBadges from "./components/ShopTrustBadges";
import ShopCategoryTiles from "./components/ShopCategoryTiles";
import ShopFeaturedGrid from "./components/ShopFeaturedGrid";

export default function ShopHomePage() {
  return (
    <>
      <ShopHero />
      <ShopTrustBadges />
      <ShopCategoryTiles />
      <ShopFeaturedGrid />
    </>
  );
}