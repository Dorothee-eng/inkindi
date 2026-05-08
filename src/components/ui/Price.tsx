'use client';

import { useCurrency } from '@/store/currency';
import { formatPrice } from '@/lib/currency';
import { cn } from '@/lib/utils';

export default function Price({
  amount,
  compareAt,
  className,
}: {
  amount: number;
  compareAt?: number;
  className?: string;
}) {
  const code = useCurrency((s) => s.code);
  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span>{formatPrice(amount, code)}</span>
      {compareAt && compareAt > amount && (
        <span className="text-[12px] line-through text-ink/40">{formatPrice(compareAt, code)}</span>
      )}
    </span>
  );
}
