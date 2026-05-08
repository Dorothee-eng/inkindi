import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import FadeIn from '@/components/motion/FadeIn';

const SHOTS = [
  '1599643477877-530eb83abc8e',
  '1611652022419-a9419f74343d',
  '1602173574767-37ac01994b2a',
  '1605100804763-247f67b3557e',
  '1561828995-aa79a2db86dd',
  '1535632787350-4e68ef0ac584',
];

export default function SocialGallery() {
  return (
    <section className="bg-ink text-cream-50">
      <div className="container-luxe py-24 lg:py-32">
        <FadeIn className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-3 text-gold-300">@inkindi</p>
          <h2 className="display-2 text-cream-50 text-balance">
            Worn by you.
            <span className="italic font-light"> Tagged by us.</span>
          </h2>
          <p className="mt-5 text-cream-50/75 leading-relaxed">
            Tag <span className="text-gold-300">@inkindi</span> on Instagram & TikTok for a
            chance to be featured in our next campaign.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
          {SHOTS.map((id, i) => (
            <FadeIn key={id} delay={i * 0.05}>
              <a
                href="https://instagram.com/inkindi"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square overflow-hidden bg-ink-soft"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`}
                  alt={`INKINDI customer feature ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-1000 ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-cream-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link href="https://instagram.com/inkindi" className="btn-light">
            Follow on Instagram
          </Link>
          <Link href="https://tiktok.com/@inkindi" className="text-[12px] uppercase tracking-luxe text-cream-50/80 link-luxe">
            Watch on TikTok →
          </Link>
        </div>
      </div>
    </section>
  );
}
