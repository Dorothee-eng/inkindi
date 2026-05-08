import Image from 'next/image';
import Link from 'next/link';
import { COLLECTIONS } from '@/data/products';
import FadeIn from '@/components/motion/FadeIn';

export default function FeaturedCollections() {
  return (
    <section className="container-luxe py-24 lg:py-32">
      <FadeIn className="max-w-3xl mx-auto text-center mb-16">
        <p className="eyebrow mb-4">Featured Collections</p>
        <h2 className="display-2 text-balance">
          Four worlds, one signature.
        </h2>
        <p className="lead mt-5">
          Every collection begins with a feeling: light, heritage, romance, devotion. Pieces
          that pass through generations and never lose their language.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
        {COLLECTIONS.map((c, i) => (
          <FadeIn key={c.id} delay={i * 0.08}>
            <Link
              href={`/shop?collection=${c.slug}`}
              className="group block relative overflow-hidden bg-cream-100 aspect-[3/4]"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-cream-50">
                <p className="eyebrow text-cream-50/80 mb-2">{c.tagline}</p>
                <h3 className="font-serif text-2xl mb-1">{c.name}</h3>
                <p className="text-[13px] text-cream-50/75 leading-relaxed line-clamp-2 max-w-[26ch]">
                  {c.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-gold-200 group-hover:text-gold-300 transition-colors">
                  Discover →
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
