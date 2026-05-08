'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, Lock, Tag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart, cartSubtotal } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import { formatPrice } from '@/lib/currency';
import FadeIn from '@/components/motion/FadeIn';

const PROMOS: Record<string, number> = {
  WELCOME10: 0.1,
  KIGALI25: 0.25,
};

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const code = useCurrency((s) => s.code);

  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const subtotal = cartSubtotal(lines);
  const discount = appliedPromo ? subtotal * PROMOS[appliedPromo] : 0;
  const shipping = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 25;
  const total = subtotal - discount + shipping;

  function applyPromo(e: React.FormEvent) {
    e.preventDefault();
    const c = promo.trim().toUpperCase();
    if (PROMOS[c]) {
      setAppliedPromo(c);
      setPromoMsg(`${Math.round(PROMOS[c] * 100)}% off applied — welcome.`);
    } else {
      setAppliedPromo(null);
      setPromoMsg('That code is not valid. Try WELCOME10.');
    }
  }

  if (lines.length === 0) {
    return (
      <section className="container-luxe py-32 text-center">
        <FadeIn>
          <p className="eyebrow mb-3">Your Bag</p>
          <h1 className="display-1 mb-6">Your bag is quiet.</h1>
          <p className="lead max-w-xl mx-auto">
            Begin with a piece that feels like you. Our best sellers, hand-finished and
            ready to ship within 48 hours, are a fine place to start.
          </p>
          <Link href="/shop" className="btn-primary mt-10">Discover the shop</Link>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="container-luxe pt-12 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        <FadeIn>
          <p className="eyebrow mb-3">Your Bag</p>
          <h1 className="display-2 mb-2">Review your selection.</h1>
          <p className="text-ink-muted mb-10">{lines.length} {lines.length === 1 ? 'piece' : 'pieces'}</p>
        </FadeIn>

        <ul className="border-y border-ink/10 divide-y divide-ink/10">
          {lines.map((l) => (
            <li key={l.productId} className="grid grid-cols-[100px_1fr_auto] sm:grid-cols-[120px_1fr_auto] gap-5 py-6">
              <Link href={`/product/${l.slug}`} className="relative w-[100px] h-[120px] sm:w-[120px] sm:h-[150px] bg-cream-100">
                <Image src={l.image} alt={l.name} fill sizes="120px" className="object-cover" />
              </Link>
              <div>
                <Link href={`/product/${l.slug}`} className="font-serif text-lg leading-tight">{l.name}</Link>
                <p className="text-[13px] text-ink/60 mt-1.5">{formatPrice(l.price, code)}</p>

                <div className="flex items-center gap-4 mt-5">
                  <div className="inline-flex items-center border border-ink/15">
                    <button onClick={() => setQty(l.productId, l.quantity - 1)} className="w-8 h-8 grid place-items-center hover:bg-cream-100"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-9 text-center text-[13px]">{l.quantity}</span>
                    <button onClick={() => setQty(l.productId, l.quantity + 1)} className="w-8 h-8 grid place-items-center hover:bg-cream-100"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button onClick={() => remove(l.productId)} aria-label="Remove" className="text-ink/50 hover:text-ink">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="font-serif text-lg self-start">{formatPrice(l.price * l.quantity, code)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center">
          <Link href="/shop" className="text-[12px] uppercase tracking-luxe link-luxe">Continue shopping</Link>
          <button onClick={clear} className="text-[12px] uppercase tracking-luxe text-ink/55 hover:text-ink">
            Clear bag
          </button>
        </div>
      </div>

      {/* Summary */}
      <aside className="lg:col-span-4 lg:sticky lg:top-32 self-start" id="checkout">
        <FadeIn delay={0.1}>
          <div className="bg-cream-100 p-8">
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

            <form onSubmit={applyPromo} className="mb-6">
              <label className="eyebrow flex items-center gap-2 mb-2"><Tag className="w-3.5 h-3.5" /> Promo code</label>
              <div className="flex">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Try WELCOME10"
                  className="flex-1 bg-transparent border-b border-ink/20 px-0 py-2.5 text-[14px] focus:outline-none focus:border-gold-500"
                />
                <button type="submit" className="text-[11px] uppercase tracking-luxe text-ink/70 hover:text-ink ml-3">
                  Apply
                </button>
              </div>
              {promoMsg && <p className="text-[12px] mt-2 text-ink/65">{promoMsg}</p>}
            </form>

            <div className="space-y-3 text-[14px] py-5 border-y border-ink/10">
              <Row label="Subtotal" value={formatPrice(subtotal, code)} />
              {discount > 0 && <Row label={`Promo (${appliedPromo})`} value={`− ${formatPrice(discount, code)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? 'Complimentary' : formatPrice(shipping, code)} />
              <Row label="Estimated tax" value="Calculated at checkout" muted />
            </div>

            <div className="flex items-baseline justify-between py-5">
              <span className="font-serif text-xl">Total</span>
              <span className="font-serif text-3xl">{formatPrice(total, code)}</span>
            </div>

            <button
              type="button"
              onClick={() => alert('Checkout integration coming soon. Stripe + Flutterwave will be wired here.')}
              className="btn-primary w-full mb-3"
            >
              <Lock className="w-3.5 h-3.5" /> Secure checkout
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[11px] text-ink/45 text-center leading-relaxed">
              Payments by Stripe, PayPal, Klarna, MTN MoMo & Airtel Money (coming soon).
              All transactions encrypted end-to-end.
            </p>
          </div>
        </FadeIn>
      </aside>
    </section>
  );
}

function Row({ label, value, accent, muted }: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-ink/55' : ''}>{label}</span>
      <span className={accent ? 'text-gold-500' : muted ? 'text-ink/55' : ''}>{value}</span>
    </div>
  );
}
