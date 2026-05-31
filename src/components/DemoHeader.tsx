import type { AppState } from '../types';

interface Props {
  state: AppState;
  onStartDemo: () => void;
  onResetDemo: () => void;
  onOpenCart: () => void;
}

export default function DemoHeader({ state, onStartDemo, onResetDemo, onOpenCart }: Props) {
  const { isDemoRunning, savedOutfitsCount, cartItems } = state;

  return (
    <header className="bg-cream border-b border-sand px-8 h-14 flex items-center justify-between flex-shrink-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo/logo.png" alt="SmartOutfit" className="h-7 w-auto flex-shrink-0" />
        <span className="font-display text-base font-light tracking-[0.1em] uppercase text-espresso">
          SmartOutfit
        </span>
        {isDemoRunning && (
          <span className="ml-3 px-2.5 py-0.5 rounded-full"
                style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B8845A', background: 'rgba(184,132,90,0.12)' }}>
            Demo
          </span>
        )}
      </div>

      {/* Center */}
      <div className="flex items-center gap-4">
        {!isDemoRunning ? (
          <button
            onClick={onStartDemo}
            className="bg-espresso text-cream hover:bg-brown-deep transition-colors"
            style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.5rem 1.25rem' }}
          >
            Start Demo
          </button>
        ) : (
          <button
            onClick={onResetDemo}
            style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8B6651' }}
            className="hover:text-espresso transition-colors"
          >
            Exit Demo
          </button>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {savedOutfitsCount > 0 && (
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B6651' }}>
              {savedOutfitsCount} saved
            </span>
          </div>
        )}

        <button onClick={onOpenCart} className="relative flex items-center gap-2 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
               className="text-espresso group-hover:text-camel transition-colors">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-camel text-white rounded-full flex items-center justify-center"
                  style={{ fontSize: '0.5rem' }}>
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
