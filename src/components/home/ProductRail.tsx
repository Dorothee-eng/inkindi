import Link from 'next/link';
import type { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import FadeIn from '@/components/motion/FadeIn';

export default function ProductRail({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel = 'View all',
  products,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  ctaHref: string;
  ctaLabel?: string;
  products: Product[];
}) {
  return (
    <section className="container-luxe py-20 lg:py-28">
      <FadeIn className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="display-2 text-balance">{title}</h2>
          {description && <p className="lead mt-4">{description}</p>}
        </div>
        <Link href={ctaHref} className="link-luxe text-[12px] uppercase tracking-luxe self-start lg:self-end">
          {ctaLabel} →
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProductGrid products={products} />
      </FadeIn>
    </section>
  );
}
