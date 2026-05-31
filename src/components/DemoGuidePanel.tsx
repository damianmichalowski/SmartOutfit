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
  const progress = (currentDemoStep / (demoSteps.length - 1)) * 100;

  if (!isDemoRunning && !isDemoComplete) return null;

  if (isDemoComplete) {
    return (
      <div className="bg-espresso text-cream animate-fade-in flex-shrink-0">
        <div className="px-6 py-5">
          <p className="label-micro text-camel mb-1" style={{ letterSpacing: '0.18em' }}>Demo Complete</p>
          <h3 className="font-display text-2xl font-light mb-4">SmartOutfit delivered results.</h3>

          <div className="grid grid-cols-2 gap-2 mb-5">
            {[
              { metric: '–40%', label: 'Returns' },
              { metric: '+28%', label: 'Conversion' },
              { metric: '92%', label: 'Fit confidence' },
              { metric: '4.8★', label: 'Satisfaction' },
            ].map(item => (
              <div key={item.label} className="border border-white/10 px-3 py-2.5">
                <div className="font-display text-xl font-light text-camel">{item.metric}</div>
                <div className="label-micro text-cream/50 mt-0.5" style={{ letterSpacing: '0.12em' }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onRestartDemo}
              className="flex-1 py-2.5 bg-camel text-white label-micro hover:bg-camel-dark transition-colors"
              style={{ letterSpacing: '0.15em' }}
            >
              Restart Demo
            </button>
            <button
              onClick={onResetDemo}
              className="flex-1 py-2.5 border border-white/20 text-cream/70 label-micro hover:border-white/40 hover:text-cream transition-colors"
              style={{ letterSpacing: '0.15em' }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-espresso text-cream flex-shrink-0">
      {/* Progress bar */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-camel transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-6 py-4 flex items-center gap-6">
        {/* Step info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-0.5">
            <span className="label-micro text-camel" style={{ letterSpacing: '0.18em' }}>
              Step {currentDemoStep + 1} / {demoSteps.length}
            </span>
          </div>
          <div className="font-display text-base font-light truncate">{step?.title}</div>
          <p className="font-sans text-cream/50 leading-snug mt-0.5 truncate" style={{ fontSize: '0.65rem' }}>
            {step?.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onPrevStep}
            disabled={currentDemoStep === 0}
            className="w-7 h-7 border border-white/15 flex items-center justify-center text-cream/60 hover:border-white/30 hover:text-cream disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            style={{ fontSize: '0.7rem' }}
          >
            ←
          </button>
          <button
            onClick={onPauseResume}
            className="px-4 h-7 bg-camel/80 hover:bg-camel text-white label-micro transition-colors"
            style={{ letterSpacing: '0.12em' }}
          >
            {isDemoPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onNextStep}
            className="w-7 h-7 border border-white/15 flex items-center justify-center text-cream/60 hover:border-white/30 hover:text-cream transition-all"
            style={{ fontSize: '0.7rem' }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
