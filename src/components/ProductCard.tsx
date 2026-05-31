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
      className={`w-full text-left rounded-xl p-3 border-2 transition-all duration-300 relative ${
        isSelected
          ? 'border-camel bg-beige-light shadow-md'
          : 'border-beige-light bg-off-white hover:border-beige hover:shadow-sm'
      } ${isHighlighted ? 'animate-highlight-pulse' : ''}`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-camel rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 ${
          isSelected ? 'bg-beige' : 'bg-cream-dark'
        }`}>
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-espresso text-xs leading-tight mb-0.5 truncate">{product.name}</div>
          <div className="text-warm-brown text-xs mb-1">{product.category} · {product.color}</div>
          <div className="font-bold text-espresso text-sm">${product.price}</div>
        </div>
      </div>
    </button>
  );
}
