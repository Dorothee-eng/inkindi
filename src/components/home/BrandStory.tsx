import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/motion/FadeIn';

export default function BrandStory() {
  return (
    <section id="story" className="bg-cream-100 grain">
      <div className="container-luxe py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <FadeIn className="lg:col-span-6 relative aspect-[4/5] order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=80"
            alt="A studio detail of an INKINDI gold bangle"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="hidden md:block absolute -right-8 -bottom-8 bg-cream-50 p-6 max-w-[260px] shadow-soft">
            <p className="font-serif text-2xl leading-tight">
              <span className="italic">“Quiet pieces</span> for women who are anything but.”
            </p>
            <p className="mt-3 eyebrow text-ink/50">— Founder, INKINDI</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-6 order-1 lg:order-2">
          <p className="eyebrow mb-4">Our House</p>
          <h2 className="display-2 text-balance">
            Modern luxury,
            <br />
            <span className="italic font-light">rooted in African heritage.</span>
          </h2>
          <div className="mt-7 space-y-5 text-ink-muted leading-relaxed">
            <p>
              INKINDI is the Kinyarwanda word for <em>admirable</em>. It is also our promise:
              jewelry made not to be loud, but to be remembered. Every piece begins as a
              sketch in our Paris atelier and is finished by hand using ethically sourced gold,
              recycled silver and conflict-free stones.
            </p>
            <p>
              We design for the contemporary woman — confident, considered, multilingual,
              moving between Kigali and London, Lagos and New York. The pieces are quiet
              enough to wear every day, refined enough for the front row, and meaningful
              enough to pass down.
            </p>
            <p>
              We launched online in 2026, and we are building toward our first flagship
              boutique in Kigali — followed by Lagos, Nairobi and Johannesburg. Welcome,
              early. You will know our pieces by their finish.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <Stat label="Pieces hand-finished" value="100%" />
            <Stat label="Lifetime warranty" value="Always" />
            <Stat label="Countries shipped" value="46+" />
          </div>
          <Link href="/about" className="btn-ghost mt-10">Read our story</Link>
        </FadeIn>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-ink/15 pt-4">
      <p className="font-serif text-2xl">{value}</p>
      <p className="text-[11px] uppercase tracking-luxe text-ink/55 mt-1">{label}</p>
    </div>
  );
}
