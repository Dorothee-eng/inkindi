'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y, on: true });
  }

  return (
    <div className="grid grid-cols-[80px_1fr] gap-3 lg:gap-5 items-start">
      {/* Thumbs */}
      <div className="flex flex-col gap-2 lg:gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={cn(
              'relative w-[68px] h-[84px] lg:w-[80px] lg:h-[100px] overflow-hidden border transition-all',
              active === i ? 'border-ink' : 'border-transparent hover:border-ink/30',
            )}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div
        ref={ref}
        className="relative aspect-[4/5] bg-cream-100 overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setZoom((z) => ({ ...z, on: true }))}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className={cn(
            'object-cover transition-transform duration-200',
            zoom.on ? 'scale-150' : 'scale-100',
          )}
          style={zoom.on ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
      </div>
    </div>
  );
}
