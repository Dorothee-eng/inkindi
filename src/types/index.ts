export type Category = 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'accessories';

export type Material = 'gold' | 'silver' | 'rose-gold' | 'pearl' | 'diamond' | 'gemstone';

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  price: number;
  compareAt?: number;
  currency: 'USD';
  images: string[];
  description: string;
  details: string[];
  materials: Material[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimited?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  body: string;
}

export interface CurrencyCode {
  code: 'USD' | 'EUR' | 'GBP' | 'RWF' | 'KES' | 'NGN' | 'ZAR';
}

export interface Locale {
  code: 'en' | 'fr' | 'rw' | 'sw';
  label: string;
}
