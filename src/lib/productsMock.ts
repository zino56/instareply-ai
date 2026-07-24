import type { Product } from '@/types';

export interface UiProduct extends Product {
  archived?: boolean;
  created_at?: string;
}

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

export const mockProducts: UiProduct[] = [
  {
    id: 'p1',
    title: 'Linen Set — Sand',
    description: 'Breathable two-piece linen set in warm sand. Fits true to size.',
    price: 89,
    category: 'Apparel',
    image_url:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=600&q=70',
    is_active: true,
    created_at: daysAgo(2),
  },
  {
    id: 'p2',
    title: 'Oversized Black Hoodie',
    description: 'Heavyweight 400gsm brushed cotton. Boxy fit, dropped shoulders.',
    price: 62,
    category: 'Apparel',
    image_url:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=70',
    is_active: true,
    created_at: daysAgo(5),
  },
  {
    id: 'p3',
    title: 'Ceramic Mug — Cream',
    description: 'Hand-thrown stoneware, 320ml. Dishwasher safe.',
    price: 18,
    category: 'Home',
    image_url:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=70',
    is_active: false,
    created_at: daysAgo(9),
  },
  {
    id: 'p4',
    title: 'Silk Scrunchie 3-Pack',
    description: 'Pure mulberry silk in dune, ivory, and clay.',
    price: 24,
    category: 'Accessories',
    image_url:
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=600&q=70',
    is_active: true,
    created_at: daysAgo(12),
  },
  {
    id: 'p5',
    title: 'Signature Tote',
    description: '',
    price: 45,
    category: 'Accessories',
    image_url: '',
    is_active: true,
    created_at: daysAgo(14),
  },
  {
    id: 'p6',
    title: 'Wool Cap — Charcoal',
    description: 'Ribbed merino wool cap, one size.',
    price: 32,
    category: 'Accessories',
    image_url:
      'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&w=600&q=70',
    is_active: true,
    created_at: daysAgo(20),
  },
  {
    id: 'p7',
    title: 'Studio Candle — Fig',
    description: 'Soy wax, 60h burn time. Notes of fig, cedar, moss.',
    price: 38,
    category: 'Home',
    image_url:
      'https://images.unsplash.com/photo-1608181831718-c9ffd8728d10?auto=format&fit=crop&w=600&q=70',
    is_active: false,
    archived: true,
    created_at: daysAgo(40),
  },
  {
    id: 'p8',
    title: 'Everyday Sneaker',
    description: 'Minimal leather sneaker with recycled rubber sole.',
    price: 128,
    category: 'Footwear',
    image_url:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=70',
    is_active: true,
    created_at: daysAgo(1),
  },
];
