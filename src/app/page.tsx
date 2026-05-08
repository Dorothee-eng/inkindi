import Hero from '@/components/home/Hero';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import ProductRail from '@/components/home/ProductRail';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import SocialGallery from '@/components/home/SocialGallery';
import Newsletter from '@/components/home/Newsletter';
import { PRODUCTS, getBestSellers, getNewArrivals } from '@/data/products';

export const revalidate = 60 * 60; // ISR — re-render hourly when wired to a CMS

export default function HomePage() {
  const bestSellers = getBestSellers(4);
  const newArrivals = getNewArrivals(4);
  const trending = PRODUCTS.filter((p) => p.rating >= 4.8 && p.inStock).slice(0, 4);

  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedCollections />
      <ProductRail
        eyebrow="Best Sellers"
        title="The pieces she will not take off."
        description="Our most adored designs, chosen by women in 46 countries."
        ctaHref="/shop?sort=best"
        products={bestSellers}
      />
      <BrandStory />
      <ProductRail
        eyebrow="Trending Now"
        title="What is loved this season."
        description="Trending across our Instagram, TikTok and front-row appearances."
        ctaHref="/shop?sort=trending"
        products={trending}
      />
      <Testimonials />
      <ProductRail
        eyebrow="New Arrivals"
        title="Just landed in the atelier."
        description="The newest pieces from our Paris studio — limited quantities."
        ctaHref="/shop?sort=new"
        products={newArrivals}
      />
      <SocialGallery />
      <Newsletter />
    </>
  );
}
