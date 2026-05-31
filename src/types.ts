export type ProductCategory = 'Jackets' | 'Shirts' | 'Trousers' | 'Shoes' | 'Accessories' | 'Casual' | 'Dresses';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  size: string;
  color: string;
  description: string;
  tags: string[];
  emoji: string;
  layer: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface AiMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  highlightTarget: string;
  durationMs: number;
  action: DemoAction;
}

export type DemoAction =
  | { type: 'SELECT_PRODUCT'; productId: string; toastText: string }
  | { type: 'ASK_AI'; userMessage: string }
  | { type: 'APPLY_AI'; productIds: string[]; toastText: string }
  | { type: 'SAVE_OUTFIT'; toastText: string }
  | { type: 'ADD_TO_CART'; toastText: string }
  | { type: 'SHOW_COMPLETE' }
  | { type: 'NONE' };

export interface AppState {
  screen: 'landing' | 'workspace';
  selectedProducts: Product[];
  aiMessages: AiMessage[];
  savedOutfitsCount: number;
  cartItems: CartItem[];
  isCartOpen: boolean;
  activeHighlight: string;
  toastMessage: string | null;
  currentDemoStep: number;
  isDemoRunning: boolean;
  isDemoPaused: boolean;
  isDemoComplete: boolean;
  isAiTyping: boolean;
  activeCategory: ProductCategory | 'All';
}
