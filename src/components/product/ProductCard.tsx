'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/types';
import Price from '@/components/ui/Price';
import Rating from '@/components/ui/Rating';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const ids = useWishlist((s) => s.ids);
  const inWishlist = ids.includes(product.id);

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="card-product aspect-[4/5] block">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="product-img"
          priority={priority}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-cream-50/90 text-ink text-[10px] uppercase tracking-luxe px-2.5 py-1">New</span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold-500 text-cream-50 text-[10px] uppercase tracking-luxe px-2.5 py-1">Best Seller</span>
          )}
          {product.isLimited && (
            <span className="bg-ink text-cream-50 text-[10px] uppercase tracking-luxe px-2.5 py-1">Limited</span>
          )}
          {!product.inStock && (
            <span className="bg-cream-50/90 text-ink text-[10px] uppercase tracking-luxe px-2.5 py-1">Sold out</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => { e.preventDefault(); toggleWish(product.id); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 grid place-items-center bg-cream-50/85 backdrop-blur-sm hover:bg-cream-50 transition-colors"
        >
          <Heart className={cn('w-4 h-4 transition-colors', inWishlist ? 'fill-gold-500 text-gold-500' : 'text-ink')} />
        </button>

        {/* Quick add */}
        {product.inStock && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); add(product, 1); }}
            className="absolute left-3 right-3 bottom-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-luxe bg-ink text-cream-50 text-[11px] uppercase tracking-luxe py-3 flex items-center justify-center gap-2 hover:bg-gold-500"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick add
          </button>
        )}
      </Link>

      <div className="mt-4 px-1">
        <p className="eyebrow mb-1">{product.collection}</p>
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-serif text-[17px] leading-tight">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <Price amount={product.price} compareAt={product.compareAt} className="text-[15px]" />
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
      </div>
    </article>
  );
}
