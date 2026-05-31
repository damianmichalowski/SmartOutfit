import type { DemoStep } from '../types';

export const demoSteps: DemoStep[] = [
  {
    id: 'intro',
    title: 'Welcome to SmartOutfit',
    description: 'The virtual wardrobe is ready. Let\'s build a complete business meeting outfit step by step.',
    highlightTarget: 'product-catalog',
    durationMs: 2500,
    action: { type: 'NONE' },
  },
  {
    id: 'select-jacket',
    title: 'Step 1: Choose a Jacket',
    description: 'The customer selects a beige business jacket from the virtual wardrobe.',
    highlightTarget: 'product-catalog',
    durationMs: 3000,
    action: {
      type: 'SELECT_PRODUCT',
      productId: 'beige-business-jacket',
      toastText: 'Beige Business Jacket added to outfit',
    },
  },
  {
    id: 'select-trousers',
    title: 'Step 2: Add Elegant Trousers',
    description: 'Pairing with tailored black trousers for a sharp, professional look.',
    highlightTarget: 'product-catalog',
    durationMs: 3000,
    action: {
      type: 'SELECT_PRODUCT',
      productId: 'black-tailored-trousers',
      toastText: 'Black Tailored Trousers added — Fit confidence: 92%',
    },
  },
  {
    id: 'select-shoes',
    title: 'Step 3: Complete with Shoes',
    description: 'Leather loafers complete the base outfit with an elevated finish.',
    highlightTarget: 'product-catalog',
    durationMs: 3000,
    action: {
      type: 'SELECT_PRODUCT',
      productId: 'leather-loafers',
      toastText: 'Leather Loafers added — Base outfit complete',
    },
  },
  {
    id: 'ask-ai',
    title: 'Step 4: Ask the AI Stylist',
    description: 'The customer asks for a professional styling recommendation.',
    highlightTarget: 'ai-chat',
    durationMs: 4000,
    action: {
      type: 'ASK_AI',
      userMessage: 'Find an outfit for a business meeting.',
    },
  },
  {
    id: 'apply-ai',
    title: 'Step 5: Apply AI Suggestion',
    description: 'One click applies the AI\'s recommendation — adding a shirt and watch.',
    highlightTarget: 'ai-chat',
    durationMs: 3000,
    action: {
      type: 'APPLY_AI',
      productIds: ['white-minimal-shirt', 'silver-watch'],
      toastText: 'AI suggestion applied — Outfit complete',
    },
  },
  {
    id: 'ai-suggests-trench',
    title: 'Step 6: AI Recommends a Final Layer',
    description: 'The AI stylist suggests a camel trench coat to complete the business commute look.',
    highlightTarget: 'ai-chat',
    durationMs: 3000,
    action: { type: 'NONE' },
  },
  {
    id: 'save-trench-outfit',
    title: 'Step 7: Apply & Save Complete Look',
    description: 'Trench coat added via AI suggestion. The full 6-piece outfit is saved as "Business Meeting Look".',
    highlightTarget: 'virtual-model',
    durationMs: 2500,
    action: {
      type: 'SAVE_OUTFIT',
      toastText: 'Saved as "Business Meeting Look"',
    },
  },
  {
    id: 'add-to-cart',
    title: 'Step 8: Add Full Look to Cart',
    description: 'The customer adds all 6 items to cart in one action. Cart drawer opens.',
    highlightTarget: 'virtual-model',
    durationMs: 3000,
    action: {
      type: 'ADD_TO_CART',
      toastText: 'Full outfit added to cart — Ready to purchase',
    },
  },
  {
    id: 'complete',
    title: 'Demo Complete',
    description: 'SmartOutfit helped the customer build, validate, and buy a complete outfit.',
    highlightTarget: '',
    durationMs: 0,
    action: { type: 'SHOW_COMPLETE' },
  },
];
