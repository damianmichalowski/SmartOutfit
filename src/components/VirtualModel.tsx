import { useState, useEffect } from 'react';
import type { AppState } from '../types';

interface Props {
  state: AppState;
  onSaveOutfit: () => void;
  onAddToCart: () => void;
}

function getModelImage(state: AppState): string {
  const { selectedProducts, currentDemoStep, isDemoRunning } = state;
  const ids = selectedProducts.map(p => p.id);

  const hasJacket  = ids.includes('beige-business-jacket');
  const hasTrousers = ids.includes('black-tailored-trousers');
  const hasShoes   = ids.includes('leather-loafers');
  const hasShirt   = ids.includes('white-minimal-shirt');
  const hasWatch   = ids.includes('silver-watch');

  if (isDemoRunning) {
    if (currentDemoStep >= 5 || (hasShirt && hasWatch)) return '/models/model-business-complete.png';
    if (currentDemoStep >= 3 || (hasJacket && hasTrousers && hasShoes)) return '/models/model-jacket-trousers-shoes.png';
    if (currentDemoStep >= 2 || (hasJacket && hasTrousers)) return '/models/model-jacket-trousers.png';
    if (currentDemoStep >= 1 || hasJacket) return '/models/model-jacket.png';
  } else {
    if (hasShirt && hasWatch) return '/models/model-business-complete.png';
    if (hasJacket && hasTrousers && hasShoes) return '/models/model-jacket-trousers-shoes.png';
    if (hasJacket && hasTrousers) return '/models/model-jacket-trousers.png';
    if (hasJacket) return '/models/model-jacket.png';
  }

  return '/models/model-base.png';
}

export default function VirtualModel({ state, onSaveOutfit, onAddToCart }: Props) {
  const { selectedProducts, activeHighlight, isDemoRunning } = state;
  const isHighlighted = activeHighlight === 'virtual-model' && isDemoRunning;

  const targetImage = getModelImage(state);
  const [displayedImage, setDisplayedImage] = useState(targetImage);
  const [isImageVisible, setIsImageVisible] = useState(true);

  useEffect(() => {
    if (targetImage === displayedImage) return;
    setIsImageVisible(false);
    const t = setTimeout(() => {
      setDisplayedImage(targetImage);
      setIsImageVisible(true);
    }, 350);
    return () => clearTimeout(t);
  }, [targetImage, displayedImage]);

  const total = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const hasOutfit = selectedProducts.length > 0;

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'outline outline-1 outline-camel outline-offset-2' : ''}`}>
      {/* Header */}
      <div className="px-5 pt-5 pb-0 flex-shrink-0">
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className="label-micro mb-0.5">Virtual Try-On Preview</p>
            <h2 className="font-display text-xl font-light text-espresso">Your Look</h2>
          </div>
          {selectedProducts.length >= 3 && (
            <div className="bg-camel/10 border border-camel/30 px-2.5 py-1.5 animate-scale-in">
              <div className="label-micro text-camel" style={{ letterSpacing: '0.15em' }}>Fit: 92%</div>
            </div>
          )}
        </div>

        {/* Profile strip */}
        <div className="flex items-center gap-2 py-2 border-t border-sand mt-2">
          <div className="w-5 h-5 rounded-full bg-sand border border-beige flex items-center justify-center">
            <span className="font-display text-xs text-espresso" style={{ fontSize: '0.55rem' }}>A</span>
          </div>
          <span className="label-micro">Alex · 178 cm · Regular fit</span>
          <div className="ml-auto label-micro bg-espresso/8 px-2 py-0.5">Size M</div>
        </div>
      </div>

      {/* Model image — the visual centerpiece */}
      <div className="flex-1 mx-5 my-3 relative overflow-hidden flex items-center justify-center"
           style={{ background: 'linear-gradient(180deg, #F8F4EE 0%, #EDE5D5 100%)' }}>
        <img
          src={displayedImage}
          alt="Virtual model preview"
          className="w-full h-full object-contain transition-opacity duration-500"
          style={{ opacity: isImageVisible ? 1 : 0 }}
        />

        {/* Bottom gradient with selected items */}
        {hasOutfit && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/70 to-transparent px-4 pb-4 pt-12 animate-fade-in">
            <div className="flex flex-wrap gap-1.5">
              {selectedProducts.map(p => (
                <span
                  key={p.id}
                  className="bg-cream/90 text-espresso px-2 py-0.5 animate-fade-in"
                  style={{ fontSize: '0.55rem', fontFamily: 'DM Sans', letterSpacing: '0.08em' }}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Outfit summary & CTA */}
      <div className="px-5 pb-5 flex-shrink-0">
        {hasOutfit && (
          <div className="flex justify-between items-baseline mb-3 px-1">
            <span className="label-micro">{selectedProducts.length} piece{selectedProducts.length > 1 ? 's' : ''} selected</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-light text-espresso">${total}</span>
              <span className="label-micro">total</span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onSaveOutfit}
            disabled={!hasOutfit}
            className="flex-1 py-3 border border-espresso text-espresso label-micro hover:bg-espresso hover:text-cream transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.15em' }}
          >
            Save Outfit
          </button>
          <button
            onClick={onAddToCart}
            disabled={!hasOutfit}
            className="flex-1 py-3 bg-espresso text-cream label-micro hover:bg-brown-deep transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ letterSpacing: '0.15em' }}
          >
            Add Full Look
          </button>
        </div>
      </div>
    </div>
  );
}
