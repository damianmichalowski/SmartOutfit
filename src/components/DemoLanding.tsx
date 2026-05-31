interface Props {
  onStartDemo: () => void;
  onExploreManually: () => void;
}

export default function DemoLanding({ onStartDemo, onExploreManually }: Props) {
  return (
    <div className="min-h-screen bg-cream flex overflow-hidden">
      {/* Left — editorial content */}
      <div className="flex-1 flex flex-col justify-between px-16 py-12 z-10">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo/logo.png" alt="SmartOutfit" className="h-8 w-auto flex-shrink-0" />
            <span className="font-display text-lg font-light tracking-[0.12em] text-espresso uppercase">SmartOutfit</span>
          </div>
          <div className="flex gap-8">
            {['Collection', 'Styling', 'About'].map(l => (
              <span key={l} className="label-micro cursor-pointer hover:text-espresso transition-colors">{l}</span>
            ))}
          </div>
        </div>

        {/* Hero text */}
        <div className="max-w-xl animate-fade-in">
          <p className="label-micro mb-6">AI-Powered Virtual Styling</p>
          <h1 className="font-display font-light text-espresso leading-[1.06] mb-8"
              style={{ fontSize: '4.2rem', letterSpacing: '-0.01em' }}>
            Dress smarter<br />
            <em className="font-light not-italic text-brown-muted">before you buy.</em>
          </h1>
          <p className="font-sans font-light text-brown-muted text-base leading-relaxed mb-10 max-w-sm">
            SmartOutfit brings AI styling and virtual try-on into premium online fashion stores — helping customers build complete looks with confidence.
          </p>

          {/* CTA */}
          <div className="flex gap-4 items-center mb-14">
            <button onClick={onStartDemo} className="btn-primary">
              Start Demo
            </button>
            <button onClick={onExploreManually} className="btn-ghost">
              Explore
            </button>
          </div>

          {/* Micro labels */}
          <div className="flex gap-8">
            {[
              { label: 'Virtual Try-On', value: '5 steps' },
              { label: 'AI Styling', value: 'Instant' },
              { label: 'Fit Confidence', value: '92%' },
              { label: 'Returns', value: '–40%' },
            ].map(item => (
              <div key={item.label}>
                <div className="font-display text-xl font-light text-espresso">{item.value}</div>
                <div className="label-micro mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="label-micro">Premium Fashion Technology · Demo 2025</div>
      </div>

      {/* Right — editorial image */}
      <div className="w-[46%] flex-shrink-0 relative">
        <img
          src="/editorial/hero.png"
          alt="Fashion editorial"
          className="w-full h-full object-cover"
          onError={e => {
            const t = e.currentTarget;
            if (t.src.endsWith('.png')) t.src = '/editorial/hero.jpg';
            else if (t.src.endsWith('.jpg')) t.src = '/editorial/hero.jpeg';
          }}
        />
        {/* Gradient overlay left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/20 to-transparent pointer-events-none" />
        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream/60 to-transparent pointer-events-none" />

        {/* Floating badge */}
        <div className="absolute bottom-10 left-8 bg-off-white/90 backdrop-blur-sm px-5 py-4 shadow-luxury animate-fade-in"
             style={{ animationDelay: '0.4s' }}>
          <div className="label-micro mb-1">Business Meeting Look</div>
          <div className="font-display text-sm text-espresso">Selected by AI Stylist</div>
        </div>
      </div>
    </div>
  );
}
