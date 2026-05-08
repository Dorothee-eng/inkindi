'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import FadeIn from '@/components/motion/FadeIn';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="container-luxe py-24 lg:py-32">
      <div className="relative overflow-hidden bg-cream-100 px-6 sm:px-10 lg:px-20 py-16 lg:py-24 grain">
        <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block opacity-50 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(201,169,110,0.18), transparent 60%)' }} />
        <FadeIn className="relative max-w-2xl">
          <p className="eyebrow mb-3">The INKINDI Letter</p>
          <h2 className="display-2 text-balance">
            First looks.
            <span className="italic font-light"> Quiet invitations.</span>
          </h2>
          <p className="lead mt-5">
            Subscribe for early access to new collections, our Kigali boutique opening,
            and a complimentary $25 credit on your first order over $200.
          </p>

          {state === 'done' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex items-center gap-3 text-gold-500"
            >
              <Check className="w-5 h-5" />
              <span className="text-[14px]">You’re on the list. Welcome to the house.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg">
              <label className="sr-only" htmlFor="newsletter-email">Email</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-luxe sm:flex-1"
                autoComplete="email"
              />
              <button type="submit" disabled={state === 'loading'} className="btn-primary">
                {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          {state === 'error' && (
            <p className="mt-3 text-[12px] text-red-700">
              Something went wrong. Please try again in a moment.
            </p>
          )}
          <p className="mt-4 text-[11px] text-ink/45">
            By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
