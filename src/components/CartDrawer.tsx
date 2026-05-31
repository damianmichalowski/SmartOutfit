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
      <div className="fixed inset-0 bg-espresso/25 z-40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-96 bg-off-white z-50 flex flex-col animate-slide-in shadow-luxury-lg">
        {/* Header */}
        <div className="px-8 py-6 border-b border-sand flex justify-between items-start flex-shrink-0">
          <div>
            <p className="label-micro mb-0.5">Your Selection</p>
            <h2 className="font-display text-2xl font-light text-espresso">Shopping Bag</h2>
            <p className="label-micro mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-sand flex items-center justify-center text-espresso hover:bg-sand transition-colors mt-1"
            style={{ fontSize: '0.7rem' }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="label-micro mb-2">Empty bag</p>
              <p className="font-display text-lg font-light text-brown-muted">Add items to your bag</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 animate-fade-in">
                <div className="w-16 h-20 bg-sand overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="font-sans font-medium text-espresso text-xs">{item.name}</div>
                    <div className="label-micro mt-0.5">{item.color} · Size {item.size}</div>
                  </div>
                  <div className="font-display text-base text-espresso">${item.price}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-6 border-t border-sand flex-shrink-0 bg-off-white">
            <div className="flex justify-between items-baseline mb-1">
              <span className="label-micro">Subtotal</span>
              <span className="font-display text-2xl font-light text-espresso">${total}</span>
            </div>
            <p className="label-micro mb-6">Free shipping · Estimated 3–5 working days</p>

            <button className="w-full py-4 bg-espresso text-cream label-micro hover:bg-brown-deep transition-colors mb-2"
                    style={{ letterSpacing: '0.2em' }}>
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 label-micro text-brown-muted hover:text-espresso transition-colors"
              style={{ letterSpacing: '0.15em' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
