'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'necklaces', label: 'Necklaces' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'rings', label: 'Rings' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'accessories', label: 'Accessories' },
];

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'New arrivals' },
  { value: 'best', label: 'Best sellers' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

const PRICES = [
  { value: 'all', label: 'All prices' },
  { value: '0-300', label: 'Under $300' },
  { value: '300-700', label: '$300 — $700' },
  { value: '700-1500', label: '$700 — $1,500' },
  { value: '1500-99999', label: '$1,500+' },
];

export default function ProductFilters({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = useMemo(
    () => ({
      category: params.get('category') ?? 'all',
      sort: params.get('sort') ?? 'featured',
      price: params.get('price') ?? 'all',
      q: params.get('q') ?? '',
    }),
    [params],
  );

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === 'all' || value === 'featured' || value === '') next.delete(key);
    else next.set(key, value);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }

  return (
    <div className="border-y border-ink/10 py-5 mb-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Categories */}
        <div className="flex items-center gap-1 overflow-x-auto -mx-1 px-1 no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setParam('category', c.value)}
              className={cn(
                'whitespace-nowrap text-[12px] uppercase tracking-luxe px-3.5 py-1.5 transition-colors',
                current.category === c.value
                  ? 'bg-ink text-cream-50'
                  : 'text-ink/60 hover:text-ink',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[12px] text-ink/45 hidden sm:inline">{total} pieces</span>

          <div className="flex items-center gap-2">
            <label className="text-[11px] uppercase tracking-luxe text-ink/55">Price</label>
            <select
              value={current.price}
              onChange={(e) => setParam('price', e.target.value)}
              className="bg-transparent border-b border-ink/20 text-[13px] py-1 pr-6 focus:outline-none focus:border-gold-500"
            >
              {PRICES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] uppercase tracking-luxe text-ink/55">Sort</label>
            <select
              value={current.sort}
              onChange={(e) => setParam('sort', e.target.value)}
              className="bg-transparent border-b border-ink/20 text-[13px] py-1 pr-6 focus:outline-none focus:border-gold-500"
            >
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
