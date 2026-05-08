import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Rating({
  value,
  count,
  size = 14,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center" aria-label={`${value} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              width={size}
              height={size}
              className={filled ? 'fill-gold-400 text-gold-400' : 'text-ink/15'}
              strokeWidth={1.4}
            />
          );
        })}
      </div>
      {count !== undefined && (
        <span className="text-[12px] text-ink/55">({count})</span>
      )}
    </div>
  );
}
