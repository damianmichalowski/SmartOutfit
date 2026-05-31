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

      {/* Demo guide — top bar, only when active */}
      <DemoGuidePanel
        state={state}
        onNextStep={onNextStep}
        onPrevStep={onPrevStep}
        onPauseResume={onPauseResume}
        onResetDemo={onResetDemo}
        onRestartDemo={onRestartDemo}
      />

      {/* Main 3-column layout */}
      <div className="flex-1 overflow-hidden flex gap-px bg-sand">
        {/* Left — product catalog */}
        <div className="w-64 flex-shrink-0 bg-cream-soft overflow-hidden flex flex-col">
          <ProductCatalog
            state={state}
            onToggleProduct={onToggleProduct}
            onSetCategory={onSetCategory}
          />
        </div>

        {/* Center — virtual model (widest) */}
        <div className="flex-1 min-w-0 bg-cream overflow-hidden flex flex-col">
          <VirtualModel
            state={state}
            onSaveOutfit={onSaveOutfit}
            onAddToCart={onAddToCart}
          />
        </div>

        {/* Right — AI stylist */}
        <div className="w-72 flex-shrink-0 bg-cream-soft overflow-hidden flex flex-col">
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
