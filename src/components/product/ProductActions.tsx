'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Minus, Plus, ShoppingBag, Truck, ShieldCheck, RotateCw } from 'lucide-react';
import type { Product } from '@/types';
import Price from '@/components/ui/Price';
import Rating from '@/components/ui/Rating';
import { useCart } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import { cn } from '@/lib/utils';

export default function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [openSec, setOpenSec] = useState<'details' | 'shipping' | 'returns' | null>('details');
  const add = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const ids = useWishlist((s) => s.ids);
  const inWishlist = ids.includes(product.id);

  return (
    <div>
      <p className="eyebrow mb-3">{product.collection}</p>
      <h1 className="font-serif text-3xl lg:text-[40px] leading-tight mb-4">{product.name}</h1>

      <div className="flex items-center gap-5 mb-6">
        <Price amount={product.price} compareAt={product.compareAt} className="text-2xl font-serif" />
        <span className="w-px h-5 bg-ink/15" />
        <Rating value={product.rating} count={product.reviewCount} />
      </div>

      <p className="lead mb-8 max-w-prose">{product.description}</p>

      {/* Stock + Quantity + Actions */}
      <div className="flex items-center gap-3 mb-3">
        <span className={cn(
          'inline-flex items-center gap-2 text-[12px] uppercase tracking-luxe',
          product.inStock ? 'text-emerald-700' : 'text-ink/50',
        )}>
          <span className={cn('w-1.5 h-1.5 rounded-full', product.inStock ? 'bg-emerald-600' : 'bg-ink/30')} />
          {product.inStock ? 'In stock — ships within 48 hours' : 'Currently sold out — join the waitlist'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <div className="inline-flex items-center border border-ink/20">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-11 h-12 grid place-items-center hover:bg-cream-100"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-[14px]">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="w-11 h-12 grid place-items-center hover:bg-cream-100"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => product.inStock && add(product, qty)}
          disabled={!product.inStock}
          className={cn(
            'btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed',
            product.inStock && 'hover:bg-gold-500',
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          {product.inStock ? 'Add to bag' : 'Notify me'}
        </motion.button>

        <button
          onClick={() => toggleWish(product.id)}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="btn-ghost px-4"
        >
          <Heart className={cn('w-4 h-4', inWishlist && 'fill-gold-500 text-gold-500')} />
        </button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        <Trust Icon={Truck} label="Worldwide shipping" />
        <Trust Icon={ShieldCheck} label="Lifetime warranty" />
        <Trust Icon={RotateCw} label="30-day returns" />
      </div>

      <div className="luxe-divider my-10" />

      {/* Accordions */}
      <div className="divide-y divide-ink/10 border-y border-ink/10">
        <Accordion
          open={openSec === 'details'}
          onToggle={() => setOpenSec(openSec === 'details' ? null : 'details')}
          title="Product details"
        >
          <ul className="space-y-2 list-disc pl-5 marker:text-gold-500">
            {product.details.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </Accordion>
        <Accordion
          open={openSec === 'shipping'}
          onToggle={() => setOpenSec(openSec === 'shipping' ? null : 'shipping')}
          title="Shipping & delivery"
        >
          <p className="mb-2">
            Complimentary express shipping on orders over $200, worldwide. Tracked, insured,
            signature-required. Most orders arrive within 3–5 business days outside Africa,
            5–8 business days within Africa.
          </p>
          <p>Coming soon: in-country fulfilment from Kigali for Rwanda, Kenya, Uganda and DRC.</p>
        </Accordion>
        <Accordion
          open={openSec === 'returns'}
          onToggle={() => setOpenSec(openSec === 'returns' ? null : 'returns')}
          title="Returns & warranty"
        >
          <p className="mb-2">
            30 days for a full refund or exchange on unworn pieces. Custom and engraved
            pieces are final sale. Every Inkindi piece is hallmarked and covered by our
            lifetime craftsmanship warranty.
          </p>
        </Accordion>
      </div>
    </div>
  );
}

function Trust({ Icon, label }: { Icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-1 py-3 bg-cream-100/60">
      <Icon className="w-4 h-4 text-gold-500" strokeWidth={1.5} />
      <span className="text-[10.5px] uppercase tracking-luxe text-ink/65">{label}</span>
    </div>
  );
}

function Accordion({
  open,
  onToggle,
  title,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-[17px]">{title}</span>
        <span className="text-ink/40 text-2xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pb-5 text-[14px] text-ink-muted leading-relaxed">{children}</div>}
    </div>
  );
}
