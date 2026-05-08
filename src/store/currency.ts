'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CurrencyCode } from '@/lib/currency';

interface CurrencyState {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
}

export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      code: 'USD',
      setCode: (code) => set({ code }),
    }),
    { name: 'inkindi-currency', storage: createJSONStorage(() => localStorage) },
  ),
);
