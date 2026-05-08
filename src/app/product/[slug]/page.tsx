import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductGrid from '@/components/product/ProductGrid';
import Rating from '@/components/ui/Rating';
import FadeIn from '@/components/motion/FadeIn';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description,
    openGraph: {
      title: p.name,
      description: p.description,
      images: [{ url: p.images[0], width: 1200, height: 1500, alt: p.name }],
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();
  const related = getRelatedProducts(product.slug, 4);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-luxe pt-8 text-[12px] uppercase tracking-luxe text-ink/50 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-ink">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink capitalize">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="container-luxe pt-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <FadeIn duration={1}>
          <ProductGallery images={product.images} alt={product.name} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <ProductActions product={product} />
        </FadeIn>
      </section>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="bg-cream-100">
          <div className="container-luxe py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="eyebrow mb-3">Reviews</p>
                <h2 className="display-2 mb-6">{product.rating.toFixed(1)} <span className="text-ink/40">/ 5</span></h2>
                <Rating value={product.rating} count={product.reviewCount} />
                <p className="mt-6 text-ink/60 text-[14px]">
                  Inkindi customers share what makes our pieces feel different.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-8">
                {product.reviews.map((r) => (
                  <article key={r.id} className="bg-cream-50 p-6">
                    <Rating value={r.rating} className="mb-3" />
                    <h3 className="font-serif text-lg mb-2">{r.title}</h3>
                    <p className="text-[14px] text-ink-muted leading-relaxed">{r.body}</p>
                    <p className="mt-4 text-[11px] uppercase tracking-luxe text-ink/40">
                      {r.author} · {new Date(r.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="container-luxe py-20 lg:py-28">
          <FadeIn className="text-center mb-14">
            <p className="eyebrow mb-3">You May Also Love</p>
            <h2 className="display-2">Pieces that pair beautifully.</h2>
          </FadeIn>
          <ProductGrid products={related} />
        </section>
      )}

      {/* JSON-LD Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.images,
            description: product.description,
            brand: { '@type': 'Brand', name: 'INKINDI' },
            sku: product.id,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: product.price,
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          }),
        }}
      />
    </>
  );
}
