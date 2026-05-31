import type { AppState } from '../types';

interface Props {
  state: AppState;
  onStartDemo: () => void;
  onPauseResume: () => void;
  onResetDemo: () => void;
  onOpenCart: () => void;
}

export default function DemoHeader({ state, onStartDemo, onPauseResume, onResetDemo, onOpenCart }: Props) {
  const { isDemoRunning, isDemoPaused, savedOutfitsCount, cartItems } = state;

  return (
    <header className="bg-off-white border-b border-beige-light px-6 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-espresso flex items-center justify-center flex-shrink-0">
          <span className="text-cream text-sm font-serif font-bold">S</span>
        </div>
        <span className="font-serif text-xl font-bold text-espresso tracking-wide">SmartOutfit</span>
        {isDemoRunning && (
          <span className="ml-2 px-2 py-0.5 bg-camel text-white text-xs font-semibold rounded-full tracking-wide">
            DEMO
          </span>
        )}
      </div>

      {/* Demo controls */}
      <div className="flex items-center gap-2">
        {!isDemoRunning ? (
          <button
            onClick={onStartDemo}
            className="px-4 py-1.5 bg-espresso text-cream text-sm font-semibold rounded-lg hover:bg-warm-brown transition-colors"
          >
            ▶ Start Demo
          </button>
        ) : (
          <>
            <button
              onClick={onPauseResume}
              className="px-3 py-1.5 border border-espresso text-espresso text-sm font-medium rounded-lg hover:bg-espresso hover:text-cream transition-colors"
            >
              {isDemoPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              onClick={onResetDemo}
              className="px-3 py-1.5 text-warm-brown text-sm font-medium hover:text-espresso transition-colors"
            >
              ↺ Reset
            </button>
          </>
        )}
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-4">
        {/* Saved outfits */}
        <div className="flex items-center gap-1.5 text-warm-brown">
          <span className="text-sm">🗂</span>
          <span className="text-sm font-medium">{savedOutfitsCount}</span>
          <span className="text-xs text-warm-brown hidden sm:inline">saved</span>
        </div>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-1.5 text-espresso hover:text-camel transition-colors"
        >
          <span className="text-lg">🛍</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-camel text-white text-xs font-bold rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center text-espresso font-semibold text-sm">
          A
        </div>
      </div>
    </header>
  );
}
