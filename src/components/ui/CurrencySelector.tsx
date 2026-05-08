'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CURRENCIES, type CurrencyCode } from '@/lib/currency';
import { useCurrency } from '@/store/currency';

export default function CurrencySelector() {
  const code = useCurrency((s) => s.code);
  const setCode = useCurrency((s) => s.setCode);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-luxe text-ink/70 hover:text-ink transition-colors px-2 py-1"
      >
        <span>{CURRENCIES[code].flag}</span>
        <span>{code}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[180px] bg-cream-50 border border-ink/5 shadow-soft z-50">
          {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
            <button
              key={c}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setCode(c); setOpen(false); }}
              className="w-full px-4 py-2.5 text-left text-[12px] uppercase tracking-luxe hover:bg-cream-100 flex items-center gap-2"
            >
              <span>{CURRENCIES[c].flag}</span>
              <span className="flex-1">{CURRENCIES[c].label}</span>
              <span className="text-ink/40">{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
