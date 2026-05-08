'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart, cartCount } from '@/store/cart';
import { useWishlist } from '@/store/wishlist';
import CurrencySelector from '@/components/ui/CurrencySelector';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Necklaces', href: '/shop?category=necklaces' },
  { label: 'Earrings', href: '/shop?category=earrings' },
  { label: 'Rings', href: '/shop?category=rings' },
  { label: 'Bracelets', href: '/shop?category=bracelets' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartLines = useCart((s) => s.lines);
  const openCart = useCart((s) => s.open);
  const wishlistIds = useWishlist((s) => s.ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500 ease-luxe',
        scrolled ? 'bg-cream-50/85 backdrop-blur-md border-b border-ink/5 shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="container-luxe flex items-center justify-between h-[68px] lg:h-[88px]">
        {/* Mobile: menu */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 -ml-2"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop primary nav (left) */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-luxe">
          {NAV.slice(0, 5).map((n) => (
            <Link key={n.href} href={n.href} className="link-luxe text-ink/80 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Wordmark */}
        <Link href="/" aria-label="INKINDI home" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-display text-[26px] sm:text-[28px] lg:text-[32px] tracking-[0.4em] text-ink">
            INKINDI
          </span>
        </Link>

        {/* Right cluster */}
        <div className="flex items-center gap-1 sm:gap-3">
          <nav className="hidden lg:flex items-center gap-7 text-[12px] uppercase tracking-luxe mr-2">
            <Link href="/about" className="link-luxe text-ink/80 hover:text-ink">About</Link>
            <Link href="/contact" className="link-luxe text-ink/80 hover:text-ink">Contact</Link>
          </nav>
          <div className="hidden md:block"><CurrencySelector /></div>
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2 hover:text-gold-500 transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <Link href="/account" aria-label="Account" className="hidden sm:inline-flex p-2 hover:text-gold-500 transition-colors">
            <User className="w-[18px] h-[18px]" />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-gold-500 transition-colors">
            <Heart className="w-[18px] h-[18px]" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-cream-50 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative p-2 hover:text-gold-500 transition-colors"
          >
            <ShoppingBag className="w-[18px] h-[18px]" />
            {cartCount(cartLines) > 0 && (
              <motion.span
                key={cartCount(cartLines)}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-gold-500 text-cream-50 text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
              >
                {cartCount(cartLines)}
              </motion.span>
            )}
          </button>
        </div>
      </div>

      {/* Search panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-cream-50 border-b border-ink/5"
          >
            <form
              className="container-luxe py-6"
              action="/shop"
              onSubmit={() => setSearchOpen(false)}
            >
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-ink/40" />
                <input
                  name="q"
                  autoFocus
                  placeholder="Search necklaces, rings, collections…"
                  className="input-luxe border-none text-lg"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-[11px] uppercase tracking-luxe text-ink/60 hover:text-ink"
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-ink/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[88%] max-w-sm bg-cream-50 z-50 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-ink/5">
                <span className="font-display text-xl tracking-[0.4em]">INKINDI</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl py-3 border-b border-ink/5 hover:text-gold-500 transition-colors"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                  className="mt-6 text-[12px] uppercase tracking-luxe text-ink/70"
                >
                  Wishlist ({wishlistIds.length})
                </Link>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="text-[12px] uppercase tracking-luxe text-ink/70 mt-2"
                >
                  Account
                </Link>
                <div className="mt-8"><CurrencySelector /></div>
              </nav>
              <div className="p-6 border-t border-ink/5 text-[12px] text-ink/60">
                Designed in Paris · Crafted with African heritage
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
