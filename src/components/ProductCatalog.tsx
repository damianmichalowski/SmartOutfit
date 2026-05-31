import type { Product, ProductCategory, AppState } from '../types';
import { products } from '../data/products';
import { demoSteps } from '../data/demoSteps';
import ProductCard from './ProductCard';

const categories: (ProductCategory | 'All')[] = ['All', 'Jackets', 'Shirts', 'Trousers', 'Shoes', 'Accessories', 'Casual', 'Dresses'];

interface Props {
  state: AppState;
  onToggleProduct: (product: Product) => void;
  onSetCategory: (cat: ProductCategory | 'All') => void;
}

export default function ProductCatalog({ state, onToggleProduct, onSetCategory }: Props) {
  const { selectedProducts, activeHighlight, activeCategory, currentDemoStep, isDemoRunning } = state;

  const isHighlighted = activeHighlight === 'product-catalog' && isDemoRunning;

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const getDemoHighlightedId = (): string | null => {
    if (!isDemoRunning) return null;
    const step = demoSteps[currentDemoStep];
    if (step?.action?.type === 'SELECT_PRODUCT') return step.action.productId;
    return null;
  };

  const highlightedProductId = getDemoHighlightedId();

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'ring-2 ring-camel ring-offset-2 rounded-xl' : ''}`}>
      <div className="px-4 pt-4 pb-2">
        <h2 className="font-serif text-base font-bold text-espresso mb-3">Virtual Wardrobe</h2>

        {/* Category tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSetCategory(cat)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-espresso text-cream'
                  : 'bg-cream-dark text-warm-brown hover:bg-beige'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-2 pt-2">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProducts.some(p => p.id === product.id)}
              isHighlighted={highlightedProductId === product.id}
              onToggle={onToggleProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
