import React, { useState, useEffect } from 'react';
import { X, MessageSquare, AlertCircle } from 'lucide-react';
import type { Product, Flavor } from '../types';
import { WHATSAPP_NUMBER } from '../config';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  autoOpenOrder?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  autoOpenOrder = false,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear selections when product changes
  useEffect(() => {
    setSelectedFlavor(null);
    setErrorMsg(null);
  }, [product]);

  // Premium UX: Auto select flavor if it's the only one available
  useEffect(() => {
    if (isOpen && product && autoOpenOrder) {
      const activeAvailableFlavors = product.flavors.filter((f) => f.active && f.stock > 0);
      if (activeAvailableFlavors.length === 1) {
        setSelectedFlavor(activeAvailableFlavors[0]);
      }
    }
  }, [isOpen, product, autoOpenOrder]);

  if (!isOpen || !product) return null;

  const activeFlavors = product.flavors.filter((f) => f.active);

  const handleOrder = () => {
    if (!selectedFlavor) {
      setErrorMsg('Selecione um sabor para continuar.');
      return;
    }

    if (selectedFlavor.stock === 0) {
      setErrorMsg('Este sabor está esgotado.');
      return;
    }

    setErrorMsg(null);

    const messageText = `Olá, vim pelo catálogo e quero pedir:\n\nProduto: ${product.name}\nSabor: ${selectedFlavor.name}\nPreço: R$ ${product.price}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  const handleSelectFlavor = (flavor: Flavor) => {
    if (flavor.stock === 0) return;
    setSelectedFlavor(flavor);
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md glass-premium rounded-3xl overflow-hidden border border-neon-purple/20 shadow-2xl flex flex-col max-h-[85vh] shadow-neon-purple/5">
        {/* Subtle neon border top */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-neon-purple/30" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/5 hover:bg-neon-purple/20 border border-white/10 hover:border-neon-purple/30 text-gray-400 hover:text-white transition-all cursor-pointer active:scale-90"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Brand & Title */}
          <div className="text-center mb-6">
            <span className="text-[10px] text-neon-purple font-bold uppercase tracking-widest">
              {product.brand} • {product.puffs}
            </span>
            <h2 className="font-display font-black text-xl md:text-2xl text-white mt-1 uppercase">
              {product.name}
            </h2>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <span className="text-gray-500 text-xs font-semibold">Preço:</span>
              <span className="text-2xl font-extrabold text-white font-display text-glow-light">
                R$ {product.price}
              </span>
            </div>
          </div>

          {/* Flavor Selection */}
          <div className="mb-6">
            <h4 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-between">
              <span>Escolha o Sabor</span>
              <span className="text-[9px] text-gray-500 normal-case font-normal">
                Selecione um
              </span>
            </h4>

            {activeFlavors.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-500 border border-dashed border-neon-purple/20 rounded-2xl">
                Nenhum sabor disponível.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {activeFlavors.map((flavor) => {
                  const isSelected = selectedFlavor?.name === flavor.name;
                  const isSoldOut = flavor.stock === 0;

                  return (
                    <button
                      key={flavor.name}
                      onClick={() => handleSelectFlavor(flavor)}
                      disabled={isSoldOut}
                      className={`relative flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSoldOut
                          ? 'bg-black/20 border-white/5 text-gray-600 cursor-not-allowed opacity-40'
                          : isSelected
                          ? 'bg-neon-purple/10 border-neon-purple text-white shadow-md shadow-neon-purple/10'
                          : 'bg-white/5 border-white/5 hover:border-neon-purple/30 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                            isSoldOut
                              ? 'border-gray-800 bg-transparent'
                              : isSelected
                              ? 'border-neon-purple bg-neon-purple'
                              : 'border-gray-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-semibold text-xs md:text-sm">{flavor.name}</span>
                      </div>

                      <div>
                        {isSoldOut ? (
                          <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest bg-red-500/10 py-0.5 px-2 rounded-full border border-red-500/20">
                            Esgotado
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-gray-500 tracking-wider">
                            {flavor.stock} un
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold animate-shake">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleOrder}
            disabled={activeFlavors.length === 0}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold font-display tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeFlavors.length === 0
                ? 'bg-gray-800 text-gray-600 border border-transparent cursor-not-allowed'
                : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90 active:scale-[0.98] shadow-md shadow-neon-purple/20'
            }`}
          >
            <MessageSquare className="h-4.5 w-4.5" />
            Pedir no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};
