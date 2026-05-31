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
    <header className="bg-cream border-b border-sand px-8 h-14 flex items-center justify-between flex-shrink-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-espresso flex-shrink-0" />
        <span className="font-display text-base font-light tracking-[0.1em] uppercase text-espresso">
          SmartOutfit
        </span>
        {isDemoRunning && (
          <span className="ml-3 label-micro bg-camel/15 text-camel px-2.5 py-0.5 rounded-full"
                style={{ letterSpacing: '0.15em' }}>
            Live Demo
          </span>
        )}
      </div>

      {/* Center nav */}
      <div className="flex items-center gap-8">
        {!isDemoRunning ? (
          <button
            onClick={onStartDemo}
            className="label-micro bg-espresso text-cream px-5 py-2 hover:bg-brown-deep transition-colors"
            style={{ letterSpacing: '0.18em' }}
          >
            Start Demo
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={onPauseResume}
              className="label-micro text-espresso hover:text-camel transition-colors px-3 py-1.5 border border-sand hover:border-camel"
              style={{ letterSpacing: '0.15em' }}
            >
              {isDemoPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              onClick={onResetDemo}
              className="label-micro text-brown-muted hover:text-espresso transition-colors"
              style={{ letterSpacing: '0.15em' }}
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {savedOutfitsCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="label-micro">{savedOutfitsCount} saved</span>
            <div className="w-1 h-1 rounded-full bg-camel" />
          </div>
        )}

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
               className="text-espresso group-hover:text-camel transition-colors">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-camel text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: '0.5rem', fontFamily: 'DM Sans' }}>
              {cartItems.length}
            </span>
          )}
        </button>

        <div className="w-7 h-7 rounded-full bg-sand border border-beige flex items-center justify-center">
          <span className="font-display text-xs text-espresso">A</span>
        </div>
      </div>
    </header>
  );
}
