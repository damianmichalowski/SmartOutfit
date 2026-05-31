import type { Product } from '../types';

interface Props {
  product: Product;
  isSelected: boolean;
  isHighlighted: boolean;
  onToggle: (product: Product) => void;
}

export default function ProductCard({ product, isSelected, isHighlighted, onToggle }: Props) {
  return (
    <button
      onClick={() => onToggle(product)}
      className={`w-full text-left transition-all duration-400 product-card-hover group relative ${
        isHighlighted ? 'demo-highlight' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-sand aspect-[3/4] mb-2.5 ${
        isSelected ? 'ring-1 ring-camel ring-offset-1' : ''
      }`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
          loading="lazy"
        />

        {/* Selected overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-espresso/8 flex items-end justify-end p-2 animate-fade-in">
            <div className="w-5 h-5 bg-camel flex items-center justify-center">
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Hover dim */}
        <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/4 transition-all duration-300 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="px-0.5">
        <div className="flex justify-between items-start gap-2">
          <div className="font-sans text-xs font-medium text-espresso leading-snug">
            {product.name}
          </div>
          <div className="font-display text-sm text-espresso flex-shrink-0">
            ${product.price}
          </div>
        </div>
        <div className="label-micro mt-0.5">{product.color} · {product.size}</div>
      </div>
    </button>
  );
}
