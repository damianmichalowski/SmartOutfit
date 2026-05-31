import type { AppState } from '../types';
import { demoSteps } from '../data/demoSteps';

interface Props {
  state: AppState;
  onNextStep: () => void;
  onPrevStep: () => void;
  onPauseResume: () => void;
  onResetDemo: () => void;
  onRestartDemo: () => void;
}

export default function DemoGuidePanel({ state, onNextStep, onPrevStep, onPauseResume, onResetDemo, onRestartDemo }: Props) {
  const { currentDemoStep, isDemoRunning, isDemoPaused, isDemoComplete } = state;
  const step = demoSteps[currentDemoStep];
  const progress = ((currentDemoStep) / (demoSteps.length - 1)) * 100;

  if (!isDemoRunning && !isDemoComplete) return null;

  if (isDemoComplete) {
    return (
      <div className="bg-espresso text-cream rounded-xl p-5 mb-4 animate-fade-in">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">✨</div>
          <div className="font-serif text-lg font-bold mb-1">Demo Complete</div>
          <p className="text-beige text-xs leading-relaxed">
            SmartOutfit helped the customer build, validate and buy a full outfit.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            'Better shopping experience',
            'Easier size decisions',
            'Fewer returns',
            'Higher engagement',
          ].map(val => (
            <div key={val} className="bg-warm-brown/40 rounded-lg p-2 text-center">
              <span className="text-xs text-beige-light">✓ {val}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRestartDemo}
            className="flex-1 py-2 bg-camel text-white text-sm font-semibold rounded-lg hover:bg-warm-brown transition-colors"
          >
            ↺ Restart
          </button>
          <button
            onClick={onResetDemo}
            className="flex-1 py-2 border border-beige text-beige text-sm font-medium rounded-lg hover:bg-warm-brown/30 transition-colors"
          >
            Explore Manually
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-espresso text-cream rounded-xl p-4 mb-4">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-beige mb-1">
          <span className="font-medium tracking-wide">DEMO GUIDE</span>
          <span>{currentDemoStep + 1} / {demoSteps.length}</span>
        </div>
        <div className="w-full h-1.5 bg-warm-brown/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-camel rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step info */}
      <div className="mb-3">
        <div className="font-semibold text-sm mb-1">{step?.title}</div>
        <p className="text-beige text-xs leading-relaxed">{step?.description}</p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={onPrevStep}
          disabled={currentDemoStep === 0}
          className="p-2 border border-warm-brown/60 rounded-lg text-beige text-xs hover:border-beige disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous step"
        >
          ←
        </button>
        <button
          onClick={onPauseResume}
          className="flex-1 py-2 bg-camel/80 hover:bg-camel text-white text-xs font-semibold rounded-lg transition-colors"
        >
          {isDemoPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <button
          onClick={onNextStep}
          className="p-2 border border-warm-brown/60 rounded-lg text-beige text-xs hover:border-beige transition-colors"
          title="Next step"
        >
          →
        </button>
      </div>
    </div>
  );
}
