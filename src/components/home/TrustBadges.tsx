import { Plane, ShieldCheck, Sparkles, Recycle } from 'lucide-react';
import FadeIn from '@/components/motion/FadeIn';

const items = [
  {
    Icon: Plane,
    title: 'Worldwide Shipping',
    body: 'Complimentary on orders over $200. Tracked, insured, signature-required.',
  },
  {
    Icon: ShieldCheck,
    title: 'Lifetime Warranty',
    body: 'Every Inkindi piece is hallmarked and covered by our lifetime craftsmanship guarantee.',
  },
  {
    Icon: Sparkles,
    title: 'Hand-Finished',
    body: 'Each piece passes through twelve sets of hands, in a Paris atelier.',
  },
  {
    Icon: Recycle,
    title: 'Ethically Sourced',
    body: 'Recycled gold, conflict-free stones, traceable from mine to atelier.',
  },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-ink/10 bg-cream-50">
      <div className="container-luxe py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {items.map(({ Icon, title, body }, i) => (
          <FadeIn key={title} delay={i * 0.06}>
            <div className="flex flex-col items-center text-center px-2">
              <Icon className="w-6 h-6 text-gold-500 mb-3" strokeWidth={1.4} />
              <h3 className="font-serif text-[17px] mb-1.5">{title}</h3>
              <p className="text-[12.5px] text-ink-muted leading-relaxed max-w-[28ch]">{body}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
