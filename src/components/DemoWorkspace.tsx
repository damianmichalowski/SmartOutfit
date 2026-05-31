import type { AppState, Product, ProductCategory } from '../types';
import DemoHeader from './DemoHeader';
import DemoGuidePanel from './DemoGuidePanel';
import ProductCatalog from './ProductCatalog';
import VirtualModel from './VirtualModel';
import AiStylistChat from './AiStylistChat';
import CartDrawer from './CartDrawer';

interface Props {
  state: AppState;
  onToggleProduct: (product: Product) => void;
  onSendMessage: (text: string) => void;
  onApplyAiSuggestion: () => void;
  onSaveOutfit: () => void;
  onAddToCart: () => void;
  onCloseCart: () => void;
  onPauseResume: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onResetDemo: () => void;
  onRestartDemo: () => void;
  onStartDemo: () => void;
  onSetCategory: (cat: ProductCategory | 'All') => void;
}

export default function DemoWorkspace({
  state,
  onToggleProduct,
  onSendMessage,
  onApplyAiSuggestion,
  onSaveOutfit,
  onAddToCart,
  onCloseCart,
  onPauseResume,
  onNextStep,
  onPrevStep,
  onResetDemo,
  onRestartDemo,
  onStartDemo,
  onSetCategory,
}: Props) {
  return (
    <div className="h-screen flex flex-col bg-cream overflow-hidden">
      <DemoHeader
        state={state}
        onStartDemo={onStartDemo}
        onPauseResume={onPauseResume}
        onResetDemo={onResetDemo}
        onOpenCart={() => state.isCartOpen ? onCloseCart() : onAddToCart()}
      />

      <div className="flex-1 overflow-hidden p-4 gap-4 flex">
        {/* Left: Virtual Wardrobe */}
        <div className="w-[260px] flex-shrink-0 bg-off-white rounded-2xl border border-beige-light overflow-hidden flex flex-col shadow-sm">
          <ProductCatalog
            state={state}
            onToggleProduct={onToggleProduct}
            onSetCategory={onSetCategory}
          />
        </div>

        {/* Center: Virtual Model */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Demo guide panel at the top */}
          <DemoGuidePanel
            state={state}
            onNextStep={onNextStep}
            onPrevStep={onPrevStep}
            onPauseResume={onPauseResume}
            onResetDemo={onResetDemo}
            onRestartDemo={onRestartDemo}
          />

          <div className="flex-1 bg-off-white rounded-2xl border border-beige-light overflow-hidden shadow-sm">
            <VirtualModel
              state={state}
              onSaveOutfit={onSaveOutfit}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>

        {/* Right: AI Stylist */}
        <div className="w-[280px] flex-shrink-0 bg-off-white rounded-2xl border border-beige-light overflow-hidden flex flex-col shadow-sm">
          <AiStylistChat
            state={state}
            onSendMessage={onSendMessage}
            onApplyAiSuggestion={onApplyAiSuggestion}
          />
        </div>
      </div>

      <CartDrawer
        items={state.cartItems}
        isOpen={state.isCartOpen}
        onClose={onCloseCart}
      />
    </div>
  );
}
