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
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'outline outline-1 outline-camel outline-offset-2' : ''}`}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-sand flex-shrink-0">
        <p className="label-micro mb-1">Virtual Wardrobe</p>
        <h2 className="font-display text-xl font-light text-espresso">Collection</h2>
      </div>

      {/* Category tabs */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0">
        <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onSetCategory(cat)}
              className={`flex-shrink-0 transition-all duration-200 ${
                activeCategory === cat
                  ? 'label-micro text-espresso border-b border-espresso pb-0.5'
                  : 'label-micro text-brown-muted hover:text-espresso pb-0.5 border-b border-transparent'
              }`}
              style={{ letterSpacing: '0.12em' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 pt-2">
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
