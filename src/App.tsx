import { useState, useCallback } from 'react';
import type { AppState, Product, AiMessage, CartItem } from './types';
import { products } from './data/products';
import { demoSteps } from './data/demoSteps';
import DemoLanding from './components/DemoLanding';
import DemoWorkspace from './components/DemoWorkspace';
import Toast from './components/Toast';

// ─── Deterministic demo state per step ───────────────────────────────────────
// Each entry defines exactly what the app should look like at that step.
// This makes prev/next reliable — no accumulated side effects.

const AI_RESPONSE =
  `For a business meeting, I'd keep the silhouette clean and confident: the beige jacket softens the look, while black tailored trousers add structure. Add the white minimal shirt and silver watch to make the outfit feel polished, professional and balanced.`;

const AI_USER: AiMessage = {
  id: 'demo-user',
  role: 'user',
  content: 'Find an outfit for a business meeting.',
  timestamp: new Date(),
};
const AI_BOT: AiMessage = {
  id: 'demo-bot',
  role: 'ai',
  content: AI_RESPONSE,
  timestamp: new Date(),
};

interface StepSnapshot {
  productIds: string[];
  aiMessages: AiMessage[];
  savedOutfitsCount: number;
  hasCart: boolean;
  isCartOpen: boolean;
  activeHighlight: string;
}

const STEP_SNAPSHOTS: StepSnapshot[] = [
  // 0 intro
  { productIds: [], aiMessages: [], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'product-catalog' },
  // 1 select jacket
  { productIds: ['beige-business-jacket'], aiMessages: [], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'product-catalog' },
  // 2 select trousers
  { productIds: ['beige-business-jacket', 'black-tailored-trousers'], aiMessages: [], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'product-catalog' },
  // 3 select shoes
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers'], aiMessages: [], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'product-catalog' },
  // 4 ask AI (user message sent, waiting for response)
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers'], aiMessages: [AI_USER], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'ai-chat' },
  // 5 AI responded + suggestion applied
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers', 'white-minimal-shirt', 'silver-watch'], aiMessages: [AI_USER, AI_BOT], savedOutfitsCount: 0, hasCart: false, isCartOpen: false, activeHighlight: 'ai-chat' },
  // 6 outfit saved
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers', 'white-minimal-shirt', 'silver-watch'], aiMessages: [AI_USER, AI_BOT], savedOutfitsCount: 1, hasCart: false, isCartOpen: false, activeHighlight: 'virtual-model' },
  // 7 added to cart
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers', 'white-minimal-shirt', 'silver-watch'], aiMessages: [AI_USER, AI_BOT], savedOutfitsCount: 1, hasCart: true, isCartOpen: true, activeHighlight: 'virtual-model' },
  // 8 demo complete
  { productIds: ['beige-business-jacket', 'black-tailored-trousers', 'leather-loafers', 'white-minimal-shirt', 'silver-watch'], aiMessages: [AI_USER, AI_BOT], savedOutfitsCount: 1, hasCart: true, isCartOpen: false, activeHighlight: '' },
];

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: AppState = {
  screen: 'landing',
  selectedProducts: [],
  aiMessages: [],
  savedOutfitsCount: 0,
  cartItems: [],
  isCartOpen: false,
  activeHighlight: '',
  toastMessage: null,
  currentDemoStep: 0,
  isDemoRunning: false,
  isDemoPaused: true,
  isDemoComplete: false,
  isAiTyping: false,
  activeCategory: 'All',
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [state, setState] = useState<AppState>(initialState);

  const showToast = useCallback((message: string) => {
    setState(s => ({ ...s, toastMessage: message }));
    setTimeout(() => setState(s => ({ ...s, toastMessage: null })), 3000);
  }, []);

  // Apply a deterministic snapshot for a given step index
  const goToStep = useCallback((n: number) => {
    const snap = STEP_SNAPSHOTS[n];
    if (!snap) return;

    const selected: Product[] = snap.productIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => Boolean(p));

    const cartItems: CartItem[] = snap.hasCart
      ? selected.map(p => ({ ...p, quantity: 1 }))
      : [];

    setState(s => ({
      ...s,
      currentDemoStep: n,
      selectedProducts: selected,
      aiMessages: snap.aiMessages,
      savedOutfitsCount: snap.savedOutfitsCount,
      cartItems,
      isCartOpen: snap.isCartOpen,
      activeHighlight: snap.activeHighlight,
      isDemoComplete: n === demoSteps.length - 1,
      isAiTyping: false,
      toastMessage: null,
    }));
  }, []);

  const startDemo = useCallback(() => {
    setState(s => ({
      ...s,
      screen: 'workspace',
      isDemoRunning: true,
      isDemoPaused: true,   // starts paused — user drives with Next
      isDemoComplete: false,
      currentDemoStep: 0,
      selectedProducts: [],
      aiMessages: [],
      savedOutfitsCount: 0,
      cartItems: [],
      isCartOpen: false,
      activeHighlight: STEP_SNAPSHOTS[0].activeHighlight,
      toastMessage: null,
    }));
  }, []);

  const nextStep = useCallback(() => {
    const next = Math.min(state.currentDemoStep + 1, demoSteps.length - 1);
    goToStep(next);
  }, [state.currentDemoStep, goToStep]);

  const prevStep = useCallback(() => {
    const prev = Math.max(0, state.currentDemoStep - 1);
    goToStep(prev);
  }, [state.currentDemoStep, goToStep]);

  const resetDemo = useCallback(() => {
    setState({
      ...initialState,
      screen: 'workspace',
    });
  }, []);

  const restartDemo = useCallback(() => {
    setState({
      ...initialState,
      screen: 'workspace',
      isDemoRunning: true,
      isDemoPaused: true,
    });
    goToStep(0);
  }, [goToStep]);

  const enterManually = useCallback(() => {
    setState(s => ({ ...s, screen: 'workspace', isDemoRunning: false }));
  }, []);

  // Manual (non-demo) actions
  const toggleProduct = useCallback((product: Product) => {
    setState(s => {
      const already = s.selectedProducts.find(p => p.id === product.id);
      return {
        ...s,
        selectedProducts: already
          ? s.selectedProducts.filter(p => p.id !== product.id)
          : [...s.selectedProducts, product],
      };
    });
  }, []);

  const sendUserMessage = useCallback((text: string) => {
    const userMsg: AiMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setState(s => ({ ...s, aiMessages: [...s.aiMessages, userMsg], isAiTyping: true }));
    setTimeout(() => {
      const botMsg: AiMessage = { id: (Date.now() + 1).toString(), role: 'ai', content: AI_RESPONSE, timestamp: new Date() };
      setState(s => ({ ...s, aiMessages: [...s.aiMessages, botMsg], isAiTyping: false }));
    }, 1400);
  }, []);

  const applyAiSuggestion = useCallback(() => {
    const ids = ['white-minimal-shirt', 'silver-watch'];
    setState(s => {
      const toAdd = ids
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => p !== undefined && !s.selectedProducts.some(sp => sp.id === p.id));
      return { ...s, selectedProducts: [...s.selectedProducts, ...toAdd] };
    });
    showToast('AI suggestion applied — Outfit complete');
  }, [showToast]);

  const saveOutfit = useCallback(() => {
    setState(s => ({ ...s, savedOutfitsCount: s.savedOutfitsCount + 1 }));
    showToast('Saved as "Business Meeting Look"');
  }, [showToast]);

  const addToCart = useCallback(() => {
    setState(s => ({
      ...s,
      cartItems: s.selectedProducts.map(p => ({ ...p, quantity: 1 })),
      isCartOpen: true,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {state.screen === 'landing' ? (
        <DemoLanding onStartDemo={startDemo} onExploreManually={enterManually} />
      ) : (
        <DemoWorkspace
          state={state}
          onToggleProduct={toggleProduct}
          onSendMessage={sendUserMessage}
          onApplyAiSuggestion={applyAiSuggestion}
          onSaveOutfit={saveOutfit}
          onAddToCart={addToCart}
          onCloseCart={() => setState(s => ({ ...s, isCartOpen: false }))}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          onResetDemo={resetDemo}
          onRestartDemo={restartDemo}
          onStartDemo={startDemo}
          onSetCategory={cat => setState(s => ({ ...s, activeCategory: cat }))}
        />
      )}
      <Toast message={state.toastMessage} />
    </div>
  );
}
