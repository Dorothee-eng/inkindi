import type { Metadata } from 'next';
import { PRODUCTS, COLLECTIONS } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import FadeIn from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Discover the full INKINDI collection — luxury necklaces, earrings, rings and bracelets, hand-finished in our Paris atelier.',
};

interface SP {
  category?: string;
  sort?: string;
  price?: string;
  q?: string;
  collection?: string;
}

export default function ShopPage({ searchParams }: { searchParams: SP }) {
  const { category, sort, price, q, collection } = searchParams;

  let products = [...PRODUCTS];

  if (category && category !== 'all') {
    products = products.filter((p) => p.category === category);
  }
  if (collection) {
    const col = COLLECTIONS.find((c) => c.slug === collection);
    if (col) products = products.filter((p) => p.collection === col.name);
  }
  if (q) {
    const term = q.toLowerCase();
    products = products.filter((p) =>
      [p.name, p.description, p.collection].some((x) => x.toLowerCase().includes(term)),
    );
  }
  if (price && price !== 'all') {
    const [lo, hi] = price.split('-').map(Number);
    products = products.filter((p) => p.price >= lo && p.price <= hi);
  }

  switch (sort) {
    case 'price-asc': products.sort((a, b) => a.price - b.price); break;
    case 'price-desc': products.sort((a, b) => b.price - a.price); break;
    case 'new': products.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
    case 'best':
    case 'trending':
      products.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    default: break;
  }

  const heroCollection = collection ? COLLECTIONS.find((c) => c.slug === collection) : null;

  return (
    <>
      <section className="container-luxe pt-12 lg:pt-16 pb-2">
        <FadeIn>
          <p className="eyebrow mb-3">{heroCollection ? heroCollection.tagline : 'The Maison'}</p>
          <h1 className="display-1 text-balance max-w-4xl">
            {heroCollection ? heroCollection.name : 'The full collection.'}
          </h1>
          <p className="lead mt-5 max-w-xl">
            {heroCollection
              ? heroCollection.description
              : 'Hand-finished pieces designed in Paris, inspired by African heritage. Each piece is hallmarked and presented in our signature cream box.'}
          </p>
        </FadeIn>
      </section>

      <section className="container-luxe pb-24 pt-10">
        <ProductFilters total={products.length} />
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl mb-3">No pieces found.</p>
            <p className="lead max-w-md mx-auto">
              Try removing a filter or exploring another collection. Our atelier ships new
              pieces every month.
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </section>
    </>
  );
}
