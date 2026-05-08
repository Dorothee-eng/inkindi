import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'INKINDI is a modern luxury jewelry house designed in Paris and rooted in African heritage — empowering women through quiet, considered pieces built to be passed down.',
};

const values = [
  {
    title: 'Empowering women',
    body:
      'We design for the woman who owns her room without raising her voice. Every piece is built to be worn for decades — at the boardroom, at her wedding, at her daughter’s.',
  },
  {
    title: 'Modern African luxury',
    body:
      'We borrow from Imigongo geometry, Ankole horn silhouettes, the negative space of Kuba cloth — and distill them into objects fluent in the language of international luxury.',
  },
  {
    title: 'Ethically sourced',
    body:
      'Recycled gold, conflict-free stones, traceable supply. We refuse to choose between elegance and conscience, because our customer would not.',
  },
  {
    title: 'Built to last',
    body:
      'Every Inkindi piece is hallmarked, hand-finished, and covered by a lifetime craftsmanship warranty. We design heirlooms, not impulse buys.',
  },
];

const milestones = [
  { year: '2026', title: 'INKINDI launches online', body: 'A debut of four collections — Lumière, Inkindi Heritage, Céleste, Maison Rose.' },
  { year: '2026', title: 'Nairobi pop-up', body: 'A four-week residency at our retail partner in Westlands.' },
  { year: '2027', title: 'Kigali flagship', body: 'Our first boutique opens in the Kigali Heights district.' },
  { year: '2028', title: 'Pan-African expansion', body: 'Boutiques in Lagos, Nairobi and Johannesburg, with on-the-ground fulfilment.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[68svh] min-h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1800&q=85"
          alt="An Inkindi atelier table with pearls and tools"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-ink/30 to-ink/65" />
        <div className="relative h-full container-luxe flex flex-col justify-end pb-20 text-cream-50">
          <FadeIn>
            <p className="eyebrow text-cream-50/80 mb-5">Our Story</p>
            <h1 className="display-1 max-w-3xl text-balance">
              For the woman who carries her heritage <span className="italic font-light">forward.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-luxe py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14">
        <FadeIn className="lg:col-span-5">
          <p className="eyebrow mb-3">Manifesto</p>
          <h2 className="display-2 text-balance">
            Quiet pieces<br />
            <span className="italic font-light">for women who are anything but.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} className="lg:col-span-7 space-y-5 text-ink-muted leading-relaxed text-[16px]">
          <p>
            INKINDI was founded in Paris in 2026 by a team that grew up between Kigali, Lagos
            and Brussels. We had the same wardrobe gap our customer has: jewelry that looks
            and feels like the international houses we admire — Cartier, Boucheron,
            Pomellato — but speaks our language. Pieces that reference Imigongo and Ndebele
            without resorting to costume.
          </p>
          <p>
            We work with a small atelier outside Paris, with goldsmiths who have spent
            decades at storied houses. Our stones are sourced through partners certified by
            the Responsible Jewellery Council, and we publish our supply chain in detail
            because our customer asks — and because we are proud of it.
          </p>
          <p>
            We are building INKINDI to scale: from our online launch into a Kigali flagship
            in 2027, then Lagos, Nairobi and Johannesburg. Our promise is the same on every
            continent. Hand-finished. Hallmarked. Made to be inherited.
          </p>
        </FadeIn>
      </section>

      {/* Values */}
      <section id="craftsmanship" className="bg-cream-100 grain">
        <div className="container-luxe py-24">
          <FadeIn className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-3">Our Values</p>
            <h2 className="display-2">Four principles, every piece.</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <article className="bg-cream-50 p-8 lg:p-10 h-full">
                  <h3 className="font-serif text-2xl mb-3">{v.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{v.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="container-luxe py-24 lg:py-32">
        <FadeIn className="max-w-2xl mb-14">
          <p className="eyebrow mb-3">Roadmap</p>
          <h2 className="display-2 text-balance">From Paris atelier to a pan-African house.</h2>
        </FadeIn>
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-300/60 to-transparent" />
          {milestones.map((m, i) => (
            <FadeIn key={m.title} delay={i * 0.08}>
              <div>
                <span className="block w-3 h-3 rounded-full bg-gold-400 mb-6" />
                <p className="font-serif text-3xl mb-2">{m.year}</p>
                <h3 className="font-serif text-lg mb-2">{m.title}</h3>
                <p className="text-[14px] text-ink-muted leading-relaxed">{m.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="sustainability" className="bg-ink text-cream-50">
        <div className="container-luxe py-24 text-center">
          <FadeIn>
            <p className="eyebrow text-gold-300 mb-3">Join Us Early</p>
            <h2 className="display-2 text-cream-50 max-w-3xl mx-auto text-balance">
              Be one of the first women to wear INKINDI.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="btn-light">Shop the collection</Link>
              <Link href="/contact" className="text-[12px] uppercase tracking-luxe text-cream-50/80 link-luxe">
                Get in touch →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
