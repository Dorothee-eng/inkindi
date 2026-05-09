import type { MetadataRoute } from 'next';
import { PRODUCTS, COLLECTIONS } from '@/data/products';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://inkindi.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticRoutes = ['', '/shop', '/about', '/contact', '/wishlist', '/account'].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${SITE}/product/${p.slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const collectionRoutes = COLLECTIONS.map((c) => ({
    url: `${SITE}/shop?collection=${c.slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...collectionRoutes];
}
