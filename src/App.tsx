import { useState, useCallback, useEffect, useRef } from 'react';
import type { AppState, Product, AiMessage, CartItem } from './types';
import { products } from './data/products';
import { demoSteps } from './data/demoSteps';
import DemoLanding from './components/DemoLanding';
import DemoWorkspace from './components/DemoWorkspace';
import Toast from './components/Toast';

const AI_RESPONSE = `For a business meeting, I recommend keeping the beige jacket, black tailored trousers and leather loafers. Add a white minimal shirt and a silver watch to make the outfit look clean, professional and balanced.`;

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
  isDemoPaused: false,
  isDemoComplete: false,
  isAiTyping: false,
  activeCategory: 'All',
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    setState(s => ({ ...s, toastMessage: message }));
    setTimeout(() => setState(s => ({ ...s, toastMessage: null })), 3500);
  }, []);

  const selectProduct = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    setState(s => {
      const already = s.selectedProducts.find(p => p.id === productId);
      if (already) return s;
      return { ...s, selectedProducts: [...s.selectedProducts, product] };
    });
  }, []);

  const toggleProduct = useCallback((product: Product) => {
    setState(s => {
      const already = s.selectedProducts.find(p => p.id === product.id);
      if (already) {
        return { ...s, selectedProducts: s.selectedProducts.filter(p => p.id !== product.id) };
      }
      return { ...s, selectedProducts: [...s.selectedProducts, product] };
    });
  }, []);

  const sendUserMessage = useCallback((text: string) => {
    const msg: AiMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setState(s => ({ ...s, aiMessages: [...s.aiMessages, msg], isAiTyping: true }));

    aiTimerRef.current = setTimeout(() => {
      const aiMsg: AiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: AI_RESPONSE,
        timestamp: new Date(),
      };
      setState(s => ({ ...s, aiMessages: [...s.aiMessages, aiMsg], isAiTyping: false }));
    }, 1400);
  }, []);

  const applyAiSuggestion = useCallback((productIds: string[], toastText: string) => {
    productIds.forEach(id => selectProduct(id));
    showToast(toastText);
  }, [selectProduct, showToast]);

  const saveOutfit = useCallback(() => {
    setState(s => ({ ...s, savedOutfitsCount: s.savedOutfitsCount + 1 }));
    showToast('Saved as "Business Meeting Look"');
  }, [showToast]);

  const addToCart = useCallback((productsToAdd?: Product[]) => {
    setState(s => {
      const items = productsToAdd || s.selectedProducts;
      const newItems: CartItem[] = items.map(p => ({ ...p, quantity: 1 }));
      return { ...s, cartItems: newItems, isCartOpen: true };
    });
  }, []);

  const executeStepAction = useCallback((stepIndex: number) => {
    const step = demoSteps[stepIndex];
    if (!step) return;

    const action = step.action;
    setState(s => ({ ...s, activeHighlight: step.highlightTarget }));

    switch (action.type) {
      case 'SELECT_PRODUCT':
        setTimeout(() => {
          selectProduct(action.productId);
          showToast(action.toastText);
        }, 800);
        break;
      case 'ASK_AI':
        setTimeout(() => {
          sendUserMessage(action.userMessage);
        }, 800);
        break;
      case 'APPLY_AI':
        setTimeout(() => {
          applyAiSuggestion(action.productIds, action.toastText);
        }, 800);
        break;
      case 'SAVE_OUTFIT':
        setTimeout(() => {
          saveOutfit();
        }, 800);
        break;
      case 'ADD_TO_CART':
        setTimeout(() => {
          setState(s => {
            const items: CartItem[] = s.selectedProducts.map(p => ({ ...p, quantity: 1 }));
            return { ...s, cartItems: items, isCartOpen: true };
          });
          showToast(action.toastText);
        }, 800);
        break;
      case 'SHOW_COMPLETE':
        setState(s => ({ ...s, isDemoComplete: true, isDemoRunning: false }));
        break;
    }
  }, [selectProduct, showToast, sendUserMessage, applyAiSuggestion, saveOutfit]);

  const advanceDemo = useCallback(() => {
    setState(s => {
      const next = s.currentDemoStep + 1;
      if (next >= demoSteps.length) {
        return { ...s, isDemoRunning: false, isDemoComplete: true };
      }
      return { ...s, currentDemoStep: next };
    });
  }, []);

  useEffect(() => {
    if (!state.isDemoRunning || state.isDemoPaused || state.isDemoComplete) return;
    const step = demoSteps[state.currentDemoStep];
    if (!step) return;

    executeStepAction(state.currentDemoStep);

    if (step.action.type === 'SHOW_COMPLETE') return;

    timerRef.current = setTimeout(() => {
      advanceDemo();
    }, step.durationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.isDemoRunning, state.isDemoPaused, state.currentDemoStep, state.isDemoComplete, executeStepAction, advanceDemo]);

  const startDemo = useCallback(() => {
    setState(s => ({
      ...s,
      screen: 'workspace',
      isDemoRunning: true,
      isDemoPaused: false,
      isDemoComplete: false,
      currentDemoStep: 0,
      selectedProducts: [],
      aiMessages: [],
      savedOutfitsCount: 0,
      cartItems: [],
      isCartOpen: false,
      activeHighlight: '',
    }));
  }, []);

  const enterManually = useCallback(() => {
    setState(s => ({ ...s, screen: 'workspace', isDemoRunning: false }));
  }, []);

  const pauseResumeDemo = useCallback(() => {
    setState(s => ({ ...s, isDemoPaused: !s.isDemoPaused }));
  }, []);

  const nextStep = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = state.currentDemoStep + 1;
    if (next >= demoSteps.length) {
      setState(s => ({ ...s, isDemoComplete: true, isDemoRunning: false }));
      return;
    }
    setState(s => ({ ...s, currentDemoStep: next, isDemoPaused: false }));
  }, [state.currentDemoStep]);

  const prevStep = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const prev = Math.max(0, state.currentDemoStep - 1);
    setState(s => ({ ...s, currentDemoStep: prev, isDemoPaused: true }));
  }, [state.currentDemoStep]);

  const resetDemo = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setState({
      ...initialState,
      screen: 'workspace',
    });
  }, []);

  const restartDemo = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setState({
      ...initialState,
      screen: 'workspace',
      isDemoRunning: true,
    });
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
          onApplyAiSuggestion={() => applyAiSuggestion(['white-minimal-shirt', 'silver-watch'], 'AI suggestion applied — Outfit complete')}
          onSaveOutfit={saveOutfit}
          onAddToCart={() => addToCart()}
          onCloseCart={() => setState(s => ({ ...s, isCartOpen: false }))}
          onPauseResume={pauseResumeDemo}
          onNextStep={nextStep}
          onPrevStep={prevStep}
          onResetDemo={resetDemo}
          onRestartDemo={restartDemo}
          onStartDemo={startDemo}
          onSetCategory={(cat) => setState(s => ({ ...s, activeCategory: cat }))}
        />
      )}
      <Toast message={state.toastMessage} />
    </div>
  );
}
