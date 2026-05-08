'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/store/wishlist';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import FadeIn from '@/components/motion/FadeIn';

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <section className="container-luxe pt-12 pb-24">
      <FadeIn className="mb-12">
        <p className="eyebrow mb-3 flex items-center gap-2"><Heart className="w-3.5 h-3.5" /> Your Wishlist</p>
        <h1 className="display-2 mb-3">The pieces you have your eye on.</h1>
        <p className="lead max-w-xl">
          Save styles for later — we will let you know if a piece is running low or
          becomes available again.
        </p>
      </FadeIn>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-cream-100">
          <p className="font-serif text-2xl mb-3">Your wishlist is empty.</p>
          <p className="lead max-w-md mx-auto mb-8">
            Tap the heart on any piece to save it here. Wishlists are saved on your device.
          </p>
          <Link href="/shop" className="btn-primary">Discover the shop</Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </section>
  );
}
