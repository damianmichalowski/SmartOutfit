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

  if (!isDemoRunning) return null;

  const step = demoSteps[currentDemoStep];
  const isFirst = currentDemoStep === 0;
  const isLast = isDemoComplete || currentDemoStep === demoSteps.length - 1;
  const progress = (currentDemoStep / (demoSteps.length - 1)) * 100;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fade-in"
         style={{ width: 'min(680px, calc(100vw - 3rem))' }}>
      <div className="bg-espresso text-cream shadow-luxury-lg">
        {/* Progress bar */}
        <div className="h-0.5 bg-white/10">
          <div
            className="h-full bg-camel transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-6 py-4 flex items-center gap-5">
          {/* Step info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="label-micro text-camel" style={{ color: '#B8845A', letterSpacing: '0.18em' }}>
                {isLast ? 'Demo Complete' : `Step ${currentDemoStep + 1} / ${demoSteps.length}`}
              </span>
            </div>
            <div className="font-display font-light text-cream leading-snug truncate"
                 style={{ fontSize: '0.95rem' }}>
              {step?.title}
            </div>
            <p className="font-sans font-light text-cream/50 truncate mt-0.5"
               style={{ fontSize: '0.65rem' }}>
              {step?.description}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Prev */}
            <button
              onClick={onPrevStep}
              disabled={isFirst}
              className="w-8 h-8 border border-white/15 flex items-center justify-center
                         text-cream/60 hover:border-white/40 hover:text-cream
                         disabled:opacity-20 disabled:cursor-not-allowed transition-all"
              title="Previous step"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M8 2L4 6l4 4"/>
              </svg>
            </button>

            {/* Next / Finish */}
            {isLast ? (
              <div className="flex gap-2">
                <button
                  onClick={onRestartDemo}
                  className="px-4 h-8 bg-camel/80 hover:bg-camel text-white font-sans font-medium transition-colors"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  Restart
                </button>
                <button
                  onClick={onResetDemo}
                  className="px-4 h-8 border border-white/15 hover:border-white/30 text-cream/70 hover:text-cream font-sans font-medium transition-colors"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  Explore
                </button>
              </div>
            ) : (
              <button
                onClick={onNextStep}
                className="px-5 h-8 bg-camel hover:bg-camel-dark text-white font-sans font-medium
                           transition-colors flex items-center gap-2"
                style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase' }}
              >
                Next step
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
