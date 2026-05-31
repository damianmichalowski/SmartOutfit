interface Props {
  onStartDemo: () => void;
  onExploreManually: () => void;
}

export default function DemoLanding({ onStartDemo, onExploreManually }: Props) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-beige-light opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-camel opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-beige opacity-20 blur-2xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto animate-fade-in">
        {/* Logo area */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-espresso flex items-center justify-center">
              <span className="text-cream text-lg font-serif font-bold">S</span>
            </div>
            <span className="text-espresso font-serif text-2xl font-bold tracking-wide">SmartOutfit</span>
          </div>
        </div>

        {/* Tagline */}
        <h1 className="font-serif text-5xl font-bold text-espresso mb-4 leading-tight">
          AI-Powered Virtual<br />Styling for Fashion
        </h1>
        <p className="text-warm-brown text-lg font-light mb-3 leading-relaxed">
          Let customers build complete outfits, preview how they look, and get
          personalized AI styling advice — all before they buy.
        </p>
        <p className="text-camel text-sm font-medium tracking-widest uppercase mb-12">
          Demo Scenario: Business Meeting Outfit
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={onStartDemo}
            className="px-10 py-4 bg-espresso text-cream font-semibold rounded-lg hover:bg-warm-brown transition-all duration-300 shadow-lg hover:shadow-xl text-base tracking-wide hover:-translate-y-0.5"
          >
            ▶ Start Demo
          </button>
          <button
            onClick={onExploreManually}
            className="px-10 py-4 border-2 border-espresso text-espresso font-semibold rounded-lg hover:bg-espresso hover:text-cream transition-all duration-300 text-base tracking-wide"
          >
            Explore Manually
          </button>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
          {[
            { icon: '🪞', label: 'Virtual Try-On', desc: 'Preview outfits before purchase' },
            { icon: '🤖', label: 'AI Stylist', desc: 'Personalized recommendations' },
            { icon: '📦', label: 'Fewer Returns', desc: 'Better fit confidence' },
          ].map(item => (
            <div key={item.label} className="bg-off-white rounded-xl p-4 border border-beige-light">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-espresso text-sm mb-1">{item.label}</div>
              <div className="text-warm-brown text-xs">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-6 text-center text-warm-brown text-xs opacity-50 tracking-widest uppercase">
        Premium Fashion Technology Demo
      </div>
    </div>
  );
}
