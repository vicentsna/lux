import React, { useState } from 'react';
import { LogOut, Plus, Minus, Search, ToggleLeft, ToggleRight, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import type { Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (updatedProducts: Product[]) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  onLogout,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Filter products by search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triggerSaveToast = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  // Toggle active/inactive for a product
  const toggleProductActive = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, active: !p.active };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  // Update product price
  const updateProductPrice = (productId: string, amount: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const newPrice = Math.max(0, p.price + amount);
        return { ...p, price: newPrice };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  // Update product image key
  const updateProductImage = (productId: string, imageKey: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, image: imageKey };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  // Toggle active/inactive for a specific flavor
  const toggleFlavorActive = (productId: string, flavorName: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const updatedFlavors = p.flavors.map((f) => {
          if (f.name === flavorName) {
            return { ...f, active: !f.active };
          }
          return f;
        });
        return { ...p, flavors: updatedFlavors };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  // Update stock for a specific flavor
  const updateFlavorStock = (productId: string, flavorName: string, amount: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const updatedFlavors = p.flavors.map((f) => {
          if (f.name === flavorName) {
            const newStock = Math.max(0, f.stock + amount);
            return { ...f, stock: newStock };
          }
          return f;
        });
        return { ...p, flavors: updatedFlavors };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  // Fast direct input change handlers
  const handlePriceInputChange = (productId: string, value: string) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return;
    const updated = products.map((p) => {
      if (p.id === productId) {
        return { ...p, price: Math.max(0, parsed) };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  const handleStockInputChange = (productId: string, flavorName: string, value: string) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return;
    const updated = products.map((p) => {
      if (p.id === productId) {
        const updatedFlavors = p.flavors.map((f) => {
          if (f.name === flavorName) {
            return { ...f, stock: Math.max(0, parsed) };
          }
          return f;
        });
        return { ...p, flavors: updatedFlavors };
      }
      return p;
    });
    onUpdateProducts(updated);
    triggerSaveToast();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold font-display shadow-lg animate-fade-in text-xs uppercase tracking-wider shadow-neon-purple/20">
          <CheckCircle2 className="h-4 w-4" />
          Alterações salvas
        </div>
      )}

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#08020f] border border-neon-purple/20 rounded-3xl p-5 shadow-[0_0_20px_rgba(217,0,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#040008] p-0.5 flex items-center justify-center border border-neon-purple/30 shadow-[0_0_10px_rgba(217,0,255,0.3)]">
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 rounded-full object-contain" />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-neon-purple" />
              Painel do Vendedor
            </h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Configuração Rápida</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 text-gray-300 hover:text-white hover:bg-neon-purple/10 text-xs font-semibold cursor-pointer active:scale-95 transition-all uppercase tracking-wider"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar produto..."
          className="w-full bg-white/5 border border-white/10 focus:border-neon-purple rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 text-sm focus:outline-none transition-all focus:ring-1 focus:ring-neon-purple"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-600 font-semibold border border-dashed border-neon-purple/20 rounded-3xl text-sm">
            Nenhum produto correspondente encontrado.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`glass-premium rounded-3xl border transition-all duration-300 p-5 md:p-6 ${
                product.active
                  ? 'border-neon-purple/10'
                  : 'border-red-500/10 opacity-50 bg-black/40'
              }`}
            >
              {/* Product Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neon-purple/10 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-neon-purple font-bold uppercase tracking-widest">
                      {product.brand} • {product.puffs}
                    </span>
                    {!product.active && (
                      <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        Inativo
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-black text-base text-white mt-0.5 uppercase tracking-wide">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  {/* Price adjustment widget */}
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">
                      Preço (R$)
                    </span>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                      <button
                        onClick={() => updateProductPrice(product.id, -5)}
                        className="p-1 rounded text-gray-400 hover:text-neon-purple cursor-pointer hover:bg-neon-purple/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handlePriceInputChange(product.id, e.target.value)}
                        className="w-10 bg-transparent text-center font-display font-extrabold text-xs text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => updateProductPrice(product.id, 5)}
                        className="p-1 rounded text-gray-400 hover:text-neon-purple cursor-pointer hover:bg-neon-purple/10"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold">
                      Imagem
                    </span>
                    <select
                      value={product.image}
                      onChange={(e) => updateProductImage(product.id, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl py-1.5 px-2 text-[10px] font-semibold text-white focus:outline-none focus:border-neon-purple cursor-pointer max-w-[100px]"
                    >
                      <option value="lost-mary-35k" className="bg-[#08020f] text-white">Lost Mary 35K</option>
                      <option value="ignite-v6-600" className="bg-[#08020f] text-white">Ignite V6 600</option>
                      <option value="elfbar-10k" className="bg-[#08020f] text-white">Elfbar 10K</option>
                      <option value="elfbar-15k" className="bg-[#08020f] text-white">Elfbar 15K</option>
                    </select>
                  </div>

                  {/* Active Toggle Switch */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 font-bold">
                      Exibir
                    </span>
                    <button
                      onClick={() => toggleProductActive(product.id)}
                      className={`text-2xl transition-colors cursor-pointer ${
                        product.active ? 'text-neon-purple' : 'text-gray-700'
                      }`}
                    >
                      {product.active ? (
                        <ToggleRight className="h-8 w-8" />
                      ) : (
                        <ToggleLeft className="h-8 w-8" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Flavor stock rows */}
              <div>
                <h4 className="text-[9px] text-neon-purple uppercase tracking-widest mb-3 font-black">
                  Sabores e Estoque
                </h4>
                
                <div className="space-y-2">
                  {product.flavors.map((flavor) => (
                    <div
                      key={flavor.name}
                      className={`flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border transition-all ${
                        flavor.active ? 'border-neon-purple/5' : 'border-red-500/10 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-gray-300">
                          {flavor.name}
                        </span>
                        {!flavor.active && (
                          <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-1 py-0.2 rounded font-bold uppercase">
                            Off
                          </span>
                        )}
                        {flavor.active && flavor.stock === 0 && (
                          <span className="text-[8px] bg-red-500/10 text-red-400 border border-red-500/25 px-1 py-0.2 rounded font-bold uppercase">
                            Zero
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Stock Quantity Stepper */}
                        <div className="flex items-center bg-black/40 border border-white/5 rounded-lg p-0.5">
                          <button
                            onClick={() => updateFlavorStock(product.id, flavor.name, -1)}
                            className="p-1 rounded text-gray-500 hover:text-white cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            value={flavor.stock}
                            onChange={(e) => handleStockInputChange(product.id, flavor.name, e.target.value)}
                            className="w-8 bg-transparent text-center font-semibold text-[11px] text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateFlavorStock(product.id, flavor.name, 1)}
                            className="p-1 rounded text-gray-500 hover:text-white cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Flavor Active Toggle */}
                        <button
                          onClick={() => toggleFlavorActive(product.id, flavor.name)}
                          className={`text-xl transition-colors cursor-pointer ${
                            flavor.active ? 'text-neon-purple' : 'text-gray-700'
                          }`}
                        >
                          {flavor.active ? (
                            <ToggleRight className="h-7 w-7" />
                          ) : (
                            <ToggleLeft className="h-7 w-7" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
