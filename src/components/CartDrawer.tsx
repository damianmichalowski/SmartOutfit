import type { CartItem } from '../types';

interface Props {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ items, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-off-white z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-beige-light flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-espresso">Shopping Cart</h2>
            <p className="text-warm-brown text-sm">{items.length} items</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center text-espresso hover:bg-beige transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-warm-brown">
              <div className="text-4xl mb-3">🛍</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 border border-beige-light">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cream-dark flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-espresso text-sm">{item.name}</div>
                    <div className="text-warm-brown text-xs mb-1">{item.category} · Size {item.size}</div>
                    <div className="text-xs text-warm-brown">{item.color}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-espresso font-serif">${item.price}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-beige-light bg-off-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-warm-brown text-sm">Subtotal</span>
              <span className="font-bold text-espresso font-serif text-lg">${total}</span>
            </div>
            <div className="text-xs text-warm-brown mb-4">Free shipping · Estimated delivery 3-5 days</div>
            <button className="w-full py-3.5 bg-espresso text-cream font-semibold rounded-xl hover:bg-warm-brown transition-colors text-sm tracking-wide">
              Proceed to Checkout
            </button>
            <button className="w-full py-2 mt-2 text-warm-brown text-sm hover:text-espresso transition-colors">
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
