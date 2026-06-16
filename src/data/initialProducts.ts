import type { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'lost-mary-35k',
    name: 'Lost Mary 35K Puffs',
    brand: 'Lost Mary',
    puffs: '35.000 puffs',
    price: 135,
    active: true,
    image: 'lost-mary-35k',
    flavors: [
      { name: 'Morango com Melancia', stock: 15, active: true },
      { name: 'Uva Ice', stock: 12, active: true },
      { name: 'Blue Razz Ice', stock: 10, active: true },
      { name: 'Morango com Kiwi', stock: 8, active: true },
    ],
  },
  {
    id: 'ignite-v6-600',
    name: 'Ignite 600 Puffs (V6)',
    brand: 'Ignite',
    puffs: '600 puffs',
    price: 60,
    active: true,
    image: 'ignite-v6-600',
    flavors: [
      { name: 'Morango Guava Ice', stock: 10, active: true },
      { name: 'Blueberry Ice', stock: 14, active: true },
      { name: 'Blueberry Raspberry', stock: 12, active: true },
    ],
  },
  {
    id: 'elfbar-10k',
    name: 'Elfbar 10K Puffs',
    brand: 'Elfbar',
    puffs: '10.000 puffs',
    price: 100,
    active: true,
    image: 'elfbar-10k',
    flavors: [
      { name: 'Admiration Blue', stock: 8, active: true },
      { name: 'Blue Razz Ice', stock: 10, active: true },
    ],
  },
  {
    id: 'elfbar-15k',
    name: 'Elfbar 15K Puffs',
    brand: 'Elfbar',
    puffs: '15.000 puffs',
    price: 115,
    active: true,
    image: 'elfbar-15k',
    flavors: [
      { name: 'Kiwi Passion Fruit Guava', stock: 12, active: true },
    ],
  },
];
