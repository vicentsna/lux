import React, { useRef, useState } from 'react';
import { Eye, ShoppingCart, Sparkles, AlertTriangle } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product, autoOpenOrder: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({
    transform: 'translate3d(0px, 0px, 0px) scale(1)',
    filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.7))',
  });
  const [imageError, setImageError] = useState(false);

  // Check overall stock levels
  const totalStock = product.flavors.reduce((acc, flavor) => acc + (flavor.active ? flavor.stock : 0), 0);
  const isOutOfStock = totalStock === 0;

  // Premium Parallax 3D Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    const rotateX = -dy * 6; // Max 6 deg rotation on Y-axis (vertical tilt)
    const rotateY = dx * 6;  // Max 6 deg rotation on X-axis (horizontal tilt)

    // Translate the product image in the opposite direction for parallax depth
    const imgX = dx * 10; 
    const imgY = dy * 10;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: 'transform 0.1s ease-out',
    });

    setImageStyle({
      transform: `translate3d(${imgX}px, ${imgY}px, 30px) scale(1.06)`,
      filter: `drop-shadow(${-imgX}px ${-imgY + 12}px 20px rgba(0,0,0,0.85))`,
      transition: 'transform 0.1s ease-out, filter 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.4s ease-out',
    });

    setImageStyle({
      transform: 'translate3d(0px, 0px, 0px) scale(1)',
      filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.7))',
      transition: 'transform 0.4s ease-out, filter 0.4s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="group relative w-full rounded-3xl p-[1px] bg-gradient-to-b from-neon-purple/15 to-neon-pink/5 border border-neon-purple/10 hover:border-neon-purple/30 transition-[border-color,box-shadow,background-color] duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden active:scale-95 cursor-pointer touch-action-manipulation hover:shadow-[0_0_25px_rgba(217,0,255,0.15)]"
      onClick={() => onSelectProduct(product, false)}
    >
      {/* Subtle purple reflective background hover sweep */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
      />

      {/* Out of Stock banner */}
      {isOutOfStock && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 py-1 px-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
          <AlertTriangle className="h-3 w-3" />
          Esgotado
        </div>
      )}

      {/* Puffs count badge */}
      {!isOutOfStock && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 py-1 px-2.5 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="h-3 w-3 text-neon-pink" />
          {product.puffs}
        </div>
      )}

      {/* Main content container */}
      <div className="p-6 flex flex-col flex-grow items-center text-center">
        {/* Product image wrapper - styled as a solid black display case with minimized padding */}
        <div className="relative w-full h-48 flex items-center justify-center mb-5 overflow-hidden rounded-2xl bg-black border border-white/5 p-1">
          {!imageError ? (
            <img
              src={`/products/${product.image}.png`}
              alt={product.name}
              style={imageStyle}
              className="w-full h-full max-h-46 object-contain p-0.5 transition-all duration-300 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback illustration with purple neon theme */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-14 h-22 rounded-lg bg-gradient-to-tr from-neon-purple/10 to-neon-pink/5 border border-neon-purple/20 flex flex-col items-center justify-between p-2 shadow-inner group-hover:border-neon-purple/40 transition-colors">
                <div className="w-5 h-2.5 rounded bg-neon-purple/20" />
                <div className="w-8 h-12 rounded bg-black/60 border border-neon-purple/10 flex items-center justify-center text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                  {product.brand}
                </div>
                <div className="w-4 h-1 rounded-full bg-neon-pink/30" />
              </div>
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="w-full">
          <span className="text-[10px] text-neon-purple font-bold uppercase tracking-widest block mb-1">
            {product.brand}
          </span>
          <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 tracking-tight group-hover:text-white transition-colors uppercase">
            {product.name}
          </h3>

          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-500 text-xs font-semibold">R$</span>
            <span className="text-2xl font-extrabold text-white font-display text-glow-light">
              {product.price}
            </span>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product, false);
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 text-gray-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
        >
          <Eye className="h-4 w-4" />
          Sabores
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isOutOfStock) return;
            onSelectProduct(product, true);
          }}
          disabled={isOutOfStock}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isOutOfStock
              ? 'bg-gray-800/40 text-gray-600 border border-transparent cursor-not-allowed'
              : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-neon-purple/15'
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          Pedir
        </button>
      </div>
    </div>
  );
};
