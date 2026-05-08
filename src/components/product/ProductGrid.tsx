"use client"
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

export default function ProductGrid({
  products,
  className,
  cols = 4,
}: {
  products: Product[];
  className?: string;
  cols?: 2 | 3 | 4;
}) {
  const gridCols =
    cols === 4
      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : cols === 3
      ? 'grid-cols-2 md:grid-cols-3'
      : 'grid-cols-2';

  return (
    <div className={cn('grid gap-x-5 gap-y-12 sm:gap-x-7', gridCols, className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
