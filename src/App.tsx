import { useState, useEffect } from 'react';
import { AgeGate } from './components/AgeGate';
import { Header } from './components/Header';
import { ProductFilters } from './components/ProductFilters';
import type { FilterType } from './components/ProductFilters';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import type { Product } from './types';

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [currentView, setCurrentView] = useState<'catalog' | 'admin-login' | 'admin-dashboard'>('catalog');
  
  // Load products state from localStorage (or fallback to INITIAL_PRODUCTS)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('catalog_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing catalog_products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Keep localStorage in sync with products state changes
  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('catalog_products', JSON.stringify(updatedProducts));
  };

  // Age gate state sync
  useEffect(() => {
    const verified = localStorage.getItem('age_verified') === 'true';
    setAgeVerified(verified);
  }, []);

  // Simple Router sync using URL hash if the user reloads or navigates
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        const isAdminLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
        setCurrentView(isAdminLoggedIn ? 'admin-dashboard' : 'admin-login');
      } else {
        setCurrentView('catalog');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial run
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter State
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoOpenOrder, setAutoOpenOrder] = useState(false);

  // Filter products matching active status and current category
  const filteredProducts = products.filter((p) => {
    // Hide inactive products in catalog view (but show all in admin dashboard)
    if (!p.active) return false;

    // Filter by Brand or Stock status
    const totalStock = p.flavors.reduce((acc, f) => acc + (f.active ? f.stock : 0), 0);
    const isOutOfStock = totalStock === 0;

    switch (currentFilter) {
      case 'lost-mary':
        return p.brand.toLowerCase() === 'lost mary';
      case 'ignite':
        return p.brand.toLowerCase() === 'ignite';
      case 'elfbar':
        return p.brand.toLowerCase() === 'elfbar';
      case 'available':
        return !isOutOfStock;
      case 'out-of-stock':
        return isOutOfStock;
      case 'all':
      default:
        return true;
    }
  });

  const handleAdminClick = () => {
    if (currentView === 'catalog') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
    }
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_logged_in', 'true');
    setCurrentView('admin-dashboard');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    window.location.hash = '#/';
  };

  const handleSelectProduct = (product: Product, autoOpen: boolean) => {
    setSelectedProduct(product);
    setAutoOpenOrder(autoOpen);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 flex flex-col justify-between selection:bg-neon-purple selection:text-white">
      {/* Age verification gate overlay */}
      {!ageVerified && <AgeGate onVerify={() => setAgeVerified(true)} />}

      <div className="flex-grow">
        {/* Header Branding */}
        <Header
          onAdminClick={handleAdminClick}
          isAdmin={currentView === 'admin-dashboard'}
        />

        {/* Dynamic Views */}
        {currentView === 'catalog' && (
          <main className="py-6 animate-fade-in">

            {/* Filters */}
            <ProductFilters
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
              productsCount={filteredProducts.length}
            />

            {/* Products Grid */}
            <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={handleSelectProduct}
                />
              ))}
            </div>
          </main>
        )}

        {currentView === 'admin-login' && (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => {
              window.location.hash = '#/';
            }}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            products={products}
            onUpdateProducts={handleUpdateProducts}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Product Flavor Selector Dialog Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        autoOpenOrder={autoOpenOrder}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
