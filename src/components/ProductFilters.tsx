import React from 'react';

export type FilterType = 'all' | 'lost-mary' | 'ignite' | 'elfbar' | 'available' | 'out-of-stock';

interface ProductFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  productsCount: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  currentFilter,
  onFilterChange,
  productsCount,
}) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'lost-mary', label: 'Lost Mary' },
    { value: 'ignite', label: 'Ignite' },
    { value: 'elfbar', label: 'Elfbar' },
    { value: 'available', label: 'Disponíveis' },
    { value: 'out-of-stock', label: 'Esgotados' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 mb-6">
      {/* Category Pills container */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {filters.map((filter) => {
          const isActive = currentFilter === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`py-2 px-5 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-300 active:scale-95 cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white border-transparent font-bold shadow-[0_0_15px_rgba(217,0,255,0.35)]'
                  : 'bg-white/5 text-gray-400 border-neon-purple/10 hover:border-neon-purple/30 hover:text-white hover:bg-neon-purple/5'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="text-center mt-4 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
        Exibindo {productsCount} {productsCount === 1 ? 'produto' : 'produtos'}
      </div>
    </div>
  );
};
