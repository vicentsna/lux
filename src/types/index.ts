export interface Flavor {
  name: string;
  stock: number; // Stock count
  active: boolean; // Managed by admin to enable/disable flavor
}

export interface Product {
  id: string;
  name: string;
  brand: string; // e.g. Ignite, Elfbar
  puffs: string; // e.g. "5.500 puffs"
  price: number;
  active: boolean; // Managed by admin to show/hide product
  image: string; // image name or key
  flavors: Flavor[];
}
