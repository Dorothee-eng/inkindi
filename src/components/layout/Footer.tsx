import Link from 'next/link';
import { Instagram, Twitter, Youtube } from 'lucide-react';

const cols = [
  {
    heading: 'Shop',
    links: [
      { label: 'Necklaces', href: '/shop?category=necklaces' },
      { label: 'Earrings', href: '/shop?category=earrings' },
      { label: 'Rings', href: '/shop?category=rings' },
      { label: 'Bracelets', href: '/shop?category=bracelets' },
      { label: 'Accessories', href: '/shop?category=accessories' },
      { label: 'Best Sellers', href: '/shop?sort=best' },
      { label: 'New Arrivals', href: '/shop?sort=new' },
    ],
  },
  {
    heading: 'Maison',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Craftsmanship', href: '/about#craftsmanship' },
      { label: 'Sustainability', href: '/about#sustainability' },
      { label: 'Press', href: '/about#press' },
      { label: 'Careers', href: '/about#careers' },
    ],
  },
  {
    heading: 'Care',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping', href: '/contact#shipping' },
      { label: 'Returns', href: '/contact#returns' },
      { label: 'Lifetime Warranty', href: '/contact#warranty' },
      { label: 'FAQ', href: '/contact#faq' },
      { label: 'Order Tracking', href: '/account' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream-50 mt-20">
      <div className="container-luxe py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-4">
            <Link href="/" className="font-display text-3xl tracking-[0.4em]">INKINDI</Link>
            <p className="mt-6 max-w-sm text-cream-50/70 leading-relaxed">
              A modern luxury jewelry house designing pieces of quiet confidence — for the
              woman who carries her heritage forward.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-luxe text-cream-50/50">
              Designed in Paris · Crafted with African heritage · Shipping worldwide
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a aria-label="Instagram" href="https://instagram.com" className="hover:text-gold-300 transition-colors">
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a aria-label="TikTok" href="https://tiktok.com" className="hover:text-gold-300 transition-colors">
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                  <path d="M16 3v3.5a4.5 4.5 0 0 0 4.5 4.5V14a7.5 7.5 0 0 1-4.5-1.5V17a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 13 17V3h3z" />
                </svg>
              </a>
              <a aria-label="Twitter" href="https://twitter.com" className="hover:text-gold-300 transition-colors">
                <Twitter className="w-[18px] h-[18px]" />
              </a>
              <a aria-label="YouTube" href="https://youtube.com" className="hover:text-gold-300 transition-colors">
                <Youtube className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {cols.map((col) => (
              <div key={col.heading}>
                <h4 className="font-serif text-base mb-5">{col.heading}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[13px] text-cream-50/70 hover:text-gold-300 transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="luxe-divider mt-14 opacity-30" />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] uppercase tracking-luxe text-cream-50/50">
          <p>© {new Date().getFullYear()} INKINDI. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact#privacy" className="hover:text-cream-50">Privacy</Link>
            <Link href="/contact#terms" className="hover:text-cream-50">Terms</Link>
            <Link href="/contact#cookies" className="hover:text-cream-50">Cookies</Link>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span className="opacity-70">Visa · Mastercard · Amex · PayPal · MTN MoMo · Airtel Money</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
