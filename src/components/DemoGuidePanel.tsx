import { useState, useRef, useEffect } from 'react';
import type { AppState } from '../types';
import { demoSteps } from '../data/demoSteps';

interface Props {
  state: AppState;
  onNextStep: () => void;
  onPrevStep: () => void;
  onResetDemo: () => void;
  onRestartDemo: () => void;
}

export default function DemoGuidePanel({ state, onNextStep, onPrevStep, onResetDemo, onRestartDemo }: Props) {
  const { currentDemoStep, isDemoRunning, isDemoComplete } = state;
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      setOffset({
        x: dragRef.current.ox + (e.clientX - dragRef.current.startX),
        y: dragRef.current.oy + (e.clientY - dragRef.current.startY),
      });
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offset?.x ?? rect.left, oy: offset?.y ?? rect.top };
    e.preventDefault();
  };

  if (!isDemoRunning) return null;

  const step = demoSteps[currentDemoStep];
  const isFirst = currentDemoStep === 0;
  const isLast = isDemoComplete || currentDemoStep === demoSteps.length - 1;
  const progress = (currentDemoStep / (demoSteps.length - 1)) * 100;

  const posStyle: React.CSSProperties = offset
    ? { left: offset.x, top: offset.y, bottom: 'auto', transform: 'none' }
    : {};

  return (
    <div
      ref={panelRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-fade-in"
      style={{ width: 'min(520px, calc(100vw - 2rem))', ...posStyle }}
    >
      <div className="bg-espresso text-cream shadow-luxury-lg select-none">
        {/* Progress bar — also drag handle */}
        <div
          className="h-0.5 bg-white/10 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
        >
          <div className="h-full bg-camel transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="px-3 py-2 flex items-center gap-3">
          {/* Drag grip + step info */}
          <div
            className="flex-1 min-w-0 flex items-center gap-2.5 cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" className="flex-shrink-0 opacity-25 hover:opacity-50 transition-opacity">
              <circle cx="2" cy="2" r="1.2"/><circle cx="6" cy="2" r="1.2"/>
              <circle cx="2" cy="6" r="1.2"/><circle cx="6" cy="6" r="1.2"/>
              <circle cx="2" cy="10" r="1.2"/><circle cx="6" cy="10" r="1.2"/>
            </svg>
            <span className="flex-shrink-0 font-sans text-white/40" style={{ fontSize: '0.55rem', letterSpacing: '0.12em' }}>
              {isLast ? '✓' : `${currentDemoStep + 1}/${demoSteps.length}`}
            </span>
            <span className="font-display font-light text-cream truncate" style={{ fontSize: '0.85rem' }}>
              {step?.title}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onPrevStep}
              disabled={isFirst}
              className="w-6 h-6 border border-white/15 flex items-center justify-center text-cream/60
                         hover:border-white/40 hover:text-cream disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            >
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 2L4 6l4 4"/>
              </svg>
            </button>

            {isLast ? (
              <div className="flex gap-1">
                <button onClick={onRestartDemo}
                  className="px-3 h-6 bg-camel/80 hover:bg-camel text-white font-sans font-medium transition-colors"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Restart
                </button>
                <button onClick={onResetDemo}
                  className="px-3 h-6 border border-white/15 hover:border-white/30 text-cream/70 hover:text-cream transition-colors"
                  style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Explore
                </button>
              </div>
            ) : (
              <button onClick={onNextStep}
                className="px-4 h-6 bg-camel hover:bg-camel-dark text-white font-sans font-medium transition-colors flex items-center gap-1"
                style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Next
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 2l4 4-4 4"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
