'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart, cartSubtotal } from '@/store/cart';
import { useCurrency } from '@/store/currency';
import { formatPrice } from '@/lib/currency';

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const code = useCurrency((s) => s.code);

  const subtotal = cartSubtotal(lines);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-ink/40 z-50"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-cream-50 flex flex-col shadow-soft"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <h2 className="font-serif text-lg">Your Bag</h2>
                <span className="text-ink/50 text-sm">({lines.length})</span>
              </div>
              <button onClick={close} aria-label="Close bag"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <p className="font-serif text-2xl mb-3">Your bag is quiet.</p>
                  <p className="lead mb-8 max-w-xs">
                    Begin with a piece that feels like you. Best sellers are a fine place to start.
                  </p>
                  <Link href="/shop" onClick={close} className="btn-primary">Discover the shop</Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/5">
                  {lines.map((l) => (
                    <li key={l.productId} className="flex gap-4 py-5">
                      <Link href={`/product/${l.slug}`} onClick={close} className="relative w-20 h-24 bg-cream-100 shrink-0">
                        <Image src={l.image} alt={l.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${l.slug}`} onClick={close} className="font-serif text-[15px] line-clamp-2">
                          {l.name}
                        </Link>
                        <p className="text-[13px] text-ink/60 mt-1">{formatPrice(l.price, code)}</p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-ink/10">
                            <button
                              aria-label="Decrease"
                              className="w-7 h-7 grid place-items-center hover:bg-cream-100"
                              onClick={() => setQty(l.productId, l.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[13px]">{l.quantity}</span>
                            <button
                              aria-label="Increase"
                              className="w-7 h-7 grid place-items-center hover:bg-cream-100"
                              onClick={() => setQty(l.productId, l.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(l.productId)}
                            className="text-[11px] uppercase tracking-luxe text-ink/50 hover:text-ink ml-auto"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink/5 px-6 py-5 space-y-4 bg-cream-100/40">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] uppercase tracking-luxe text-ink/60">Subtotal</span>
                  <span className="font-serif text-2xl">{formatPrice(subtotal, code)}</span>
                </div>
                <p className="text-[12px] text-ink/55">
                  Shipping and taxes calculated at checkout. Complimentary worldwide shipping over $200.
                </p>
                <Link href="/cart" onClick={close} className="btn-ghost w-full">View bag</Link>
                <Link href="/cart#checkout" onClick={close} className="btn-primary w-full">Secure checkout</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
