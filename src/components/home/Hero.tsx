'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1800&q=85';

export default function Hero() {
  return (
    <section className="relative h-[88svh] min-h-[640px] max-h-[920px] overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_IMAGE}
          alt="A model wearing INKINDI gold jewelry"
          priority
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/15 to-ink/55" />
      </motion.div>

      <div className="relative h-full container-luxe flex flex-col justify-end pb-20 lg:pb-28 text-cream-50">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-cream-50/80 mb-6"
        >
          Spring Edit · The Lumière Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="display-1 max-w-3xl text-balance"
        >
          Adornment
          <span className="italic font-light"> for the modern muse.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-cream-50/80 leading-relaxed"
        >
          Hand-finished necklaces, earrings, rings and bracelets — designed in Paris,
          inspired by African heritage, made for the woman who carries hers forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/shop" className="btn-light group">
            Shop the collection <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/about" className="text-[12px] uppercase tracking-luxe text-cream-50/80 link-luxe hover:text-cream-50">
            Discover INKINDI
          </Link>
        </motion.div>
      </div>

      {/* Decorative scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream-50/70 text-[10px] uppercase tracking-luxe"
      >
        <span className="block w-px h-10 bg-cream-50/50 mx-auto mb-2 animate-pulse" />
        Scroll
      </motion.div>
    </section>
  );
}
