import type { AppState } from '../types';

interface Props {
  state: AppState;
  onSaveOutfit: () => void;
  onAddToCart: () => void;
}

const LAYER_ORDER = [4, 3, 2, 1, 0, 5];

export default function VirtualModel({ state, onSaveOutfit, onAddToCart }: Props) {
  const { selectedProducts, activeHighlight, isDemoRunning } = state;
  const isHighlighted = activeHighlight === 'virtual-model' && isDemoRunning;

  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const hasOutfit = selectedProducts.length > 0;

  const sortedProducts = [...selectedProducts].sort((a, b) => {
    return LAYER_ORDER.indexOf(a.layer) - LAYER_ORDER.indexOf(b.layer);
  });

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'ring-2 ring-camel ring-offset-2 rounded-xl' : ''}`}>
      {/* User profile card */}
      <div className="mx-4 mt-4 mb-3 bg-off-white rounded-xl p-3 border border-beige-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-espresso font-bold font-serif text-lg">
            A
          </div>
          <div>
            <div className="font-semibold text-espresso text-sm">Alex</div>
            <div className="text-warm-brown text-xs">178 cm · Regular fit</div>
          </div>
          <div className="ml-auto text-right">
            <div className="bg-espresso text-cream text-xs font-semibold px-2 py-0.5 rounded-full">Size M</div>
          </div>
        </div>
      </div>

      {/* Model preview */}
      <div className="flex-1 mx-4 bg-off-white rounded-2xl border border-beige-light overflow-hidden relative flex flex-col">
        {/* Fit badge */}
        {selectedProducts.length >= 3 && (
          <div className="absolute top-3 right-3 z-10 bg-espresso text-cream text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg animate-fade-in">
            Fit confidence: 92%
          </div>
        )}

        {/* Recommended size */}
        {hasOutfit && (
          <div className="absolute top-3 left-3 z-10 bg-camel/90 text-white text-xs font-medium px-2.5 py-1 rounded-full animate-fade-in">
            Recommended size: M
          </div>
        )}

        {/* Model silhouette */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 px-4">
          {!hasOutfit ? (
            <div className="text-center">
              <div className="w-28 h-52 mx-auto mb-4 relative">
                {/* Body silhouette */}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-2">
                  {/* Head */}
                  <div className="w-10 h-10 rounded-full bg-beige-light border-2 border-beige mb-1" />
                  {/* Body */}
                  <div className="w-16 h-24 bg-beige-light border-2 border-beige rounded-t-lg" />
                  {/* Legs */}
                  <div className="flex gap-1 mt-0.5">
                    <div className="w-7 h-16 bg-beige-light border-2 border-beige rounded-b-lg" />
                    <div className="w-7 h-16 bg-beige-light border-2 border-beige rounded-b-lg" />
                  </div>
                </div>
              </div>
              <p className="text-warm-brown text-sm">Select items to build your outfit</p>
            </div>
          ) : (
            <div className="w-full max-w-[180px] mx-auto">
              {/* Dressed model */}
              <div className="relative mx-auto w-28 h-52 mb-4">
                {/* Head */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-beige border-2 border-camel/30 flex items-center justify-center font-serif font-bold text-espresso text-sm">
                  A
                </div>
                {/* Body with outfit items */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-24 bg-cream-dark border-2 border-beige rounded-t-lg flex flex-col items-center justify-center gap-0.5">
                  {sortedProducts.filter(p => p.layer >= 2).map(p => (
                    <span key={p.id} className="text-base animate-fade-in">{p.emoji}</span>
                  ))}
                </div>
                {/* Legs */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className="w-7 h-16 bg-cream-dark border-2 border-beige rounded-b-lg flex items-center justify-center">
                    {sortedProducts.find(p => p.layer === 1) && (
                      <span className="text-xs">{sortedProducts.find(p => p.layer === 1)?.emoji}</span>
                    )}
                  </div>
                  <div className="w-7 h-16 bg-cream-dark border-2 border-beige rounded-b-lg" />
                </div>
                {/* Shoes */}
                {sortedProducts.find(p => p.layer === 0) && (
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    <span className="text-base animate-fade-in">{sortedProducts.find(p => p.layer === 0)?.emoji}</span>
                  </div>
                )}
              </div>

              {/* Selected items list */}
              <div className="space-y-1 mt-8">
                {sortedProducts.map(p => (
                  <div key={p.id} className="flex items-center gap-2 bg-cream rounded-lg px-2 py-1 animate-fade-in">
                    <span className="text-sm">{p.emoji}</span>
                    <span className="text-xs text-espresso font-medium truncate">{p.name}</span>
                    <span className="ml-auto text-xs text-camel font-semibold">${p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Outfit summary & actions */}
      <div className="mx-4 my-3 space-y-2">
        {hasOutfit && (
          <div className="bg-beige-light rounded-xl p-3 flex justify-between items-center">
            <div>
              <div className="text-xs text-warm-brown mb-0.5">{selectedProducts.length} items selected</div>
              <div className="font-bold text-espresso text-lg font-serif">${total}</div>
            </div>
            <div className="text-xs text-warm-brown text-right">
              <div>Free shipping</div>
              <div>30-day returns</div>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={onSaveOutfit}
            disabled={!hasOutfit}
            className="flex-1 py-2.5 border-2 border-espresso text-espresso text-sm font-semibold rounded-xl hover:bg-espresso hover:text-cream transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            🗂 Save Outfit
          </button>
          <button
            onClick={onAddToCart}
            disabled={!hasOutfit}
            className="flex-1 py-2.5 bg-espresso text-cream text-sm font-semibold rounded-xl hover:bg-warm-brown transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            🛍 Add Full Look
          </button>
        </div>
      </div>
    </div>
  );
}
