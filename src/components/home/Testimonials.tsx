'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';
import Rating from '@/components/ui/Rating';
import FadeIn from '@/components/motion/FadeIn';

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="container-luxe py-24 lg:py-32 text-center">
      <FadeIn className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">In Their Words</p>
        <h2 className="display-2 text-balance mb-12">
          The women of <span className="italic font-light">INKINDI.</span>
        </h2>

        <Quote className="mx-auto w-8 h-8 text-gold-400 mb-8 rotate-180" />

        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Rating value={t.rating} className="justify-center mb-6" />
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-[28px] leading-snug text-balance max-w-2xl mx-auto">
                “{t.body}”
              </blockquote>
              <figcaption className="mt-8 text-[12px] uppercase tracking-luxe text-ink/55">
                {t.author} <span className="mx-2 opacity-40">·</span> {t.location}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`w-8 h-px transition-colors ${idx === i ? 'bg-ink' : 'bg-ink/15'}`}
            />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
