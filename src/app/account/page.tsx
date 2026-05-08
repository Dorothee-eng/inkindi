"use client";
import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings } from 'lucide-react';
import FadeIn from '@/components/motion/FadeIn';

export const metadata: Metadata = {
  title: 'Account',
  description: 'Sign in to your INKINDI account to track orders, manage your addresses, and view your wishlist.',
};

const cards = [
  { Icon: Package, title: 'Orders', body: 'Track current orders and revisit your history.', href: '#' },
  { Icon: Heart, title: 'Wishlist', body: 'Saved pieces and back-in-stock notifications.', href: '/wishlist' },
  { Icon: MapPin, title: 'Addresses', body: 'Saved shipping and billing addresses.', href: '#' },
  { Icon: Settings, title: 'Preferences', body: 'Language, currency and communication.', href: '#' },
];

export default function AccountPage() {
  return (
    <section className="container-luxe pt-12 pb-24">
      <FadeIn className="max-w-xl mb-12">
        <p className="eyebrow mb-3 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Account</p>
        <h1 className="display-2 text-balance">Welcome back.</h1>
        <p className="lead mt-4">
          Sign in to access your orders, wishlist and saved addresses. The full account
          experience — including order tracking, lifetime warranty registration and
          private collection previews — launches with our checkout in 2026.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="bg-cream-100 p-8 lg:p-10 max-w-md mb-14">
          <h2 className="font-serif text-xl mb-5">Sign in</h2>
          <form className="space-y-5">
            <div>
              <label className="eyebrow block mb-2">Email</label>
              <input type="email" placeholder="you@example.com" className="input-luxe" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="input-luxe" />
            </div>
            <button
              type="button"
              onClick={() => alert('Authentication is wired in the next sprint (NextAuth + magic links).')}
              className="btn-primary w-full"
            >
              Sign in
            </button>
            <p className="text-[12px] text-ink/55 text-center">
              New to Inkindi? <Link href="#" className="link-luxe">Create an account</Link>
            </p>
          </form>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="font-serif text-2xl mb-6">When you are signed in</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="block bg-cream-100 p-6 hover:bg-cream-200 transition-colors"
            >
              <Icon className="w-5 h-5 text-gold-500 mb-4" strokeWidth={1.4} />
              <h3 className="font-serif text-[17px] mb-1">{title}</h3>
              <p className="text-[12.5px] text-ink-muted leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
