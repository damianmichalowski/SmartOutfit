import { useState, useRef, useEffect } from 'react';
import type { AppState } from '../types';

const QUICK_PROMPTS = ['Business meeting', 'Weekend city walk', 'Date night'];

interface Props {
  state: AppState;
  onSendMessage: (text: string) => void;
  onApplyAiSuggestion: () => void;
  onApplyTrenchSuggestion: () => void;
}

export default function AiStylistChat({ state, onSendMessage, onApplyAiSuggestion, onApplyTrenchSuggestion }: Props) {
  const { aiMessages, isAiTyping, activeHighlight, isDemoRunning, selectedProducts } = state;
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isHighlighted = activeHighlight === 'ai-chat' && isDemoRunning;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, isAiTyping]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    onSendMessage(text);
  };

  const hasAiResponse = aiMessages.some(m => m.role === 'ai');
  const hasTrenchMessage = aiMessages.some(m => m.id === 'demo-bot-2');
  const shirtWatchApplied = selectedProducts.some(p => p.id === 'white-minimal-shirt') && selectedProducts.some(p => p.id === 'silver-watch');
  const trenchApplied = selectedProducts.some(p => p.id === 'trench-coat');
  const showOutfitApply = hasAiResponse && !shirtWatchApplied && !isAiTyping;
  const showTrenchApply = hasTrenchMessage && !trenchApplied && !isAiTyping;

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'outline outline-1 outline-camel outline-offset-2' : ''}`}>
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-sand flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="label-micro mb-0.5">Personal</p>
            <h2 className="font-display text-xl font-light text-espresso">AI Stylist</h2>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="label-micro">Online</span>
          </div>
        </div>
        <p className="label-micro mt-1.5" style={{ letterSpacing: '0.08em', fontSize: '0.58rem' }}>
          Curated recommendations for your occasion
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {aiMessages.length === 0 && !isAiTyping && (
          <div className="py-8 text-center">
            <div className="w-10 h-10 bg-sand mx-auto mb-3 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brown-muted">
                <path d="M12 2a10 10 0 1 0 10 10"/>
                <path d="M18 14v4h4"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <p className="label-micro">Ask your personal stylist for outfit advice</p>
          </div>
        )}

        {aiMessages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'ai' && (
              <div className="w-6 h-6 bg-espresso flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <span className="text-cream" style={{ fontSize: '0.45rem', fontFamily: 'DM Sans', letterSpacing: '0.05em', fontWeight: 500 }}>AI</span>
              </div>
            )}
            <div className={`max-w-[85%] px-3.5 py-2.5 font-sans font-light leading-relaxed ${
              msg.role === 'user'
                ? 'bg-espresso text-cream text-xs'
                : 'bg-sand text-espresso text-xs border-l-2 border-camel/40'
            }`}
            style={{ fontSize: '0.72rem' }}>
              {msg.content}
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-6 h-6 bg-espresso flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-cream" style={{ fontSize: '0.45rem', fontFamily: 'DM Sans', letterSpacing: '0.05em' }}>AI</span>
            </div>
            <div className="bg-sand px-4 py-3 flex items-center">
              <div className="dot-typing flex gap-1">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        {showOutfitApply && (
          <div className="pl-8 animate-fade-in">
            <button
              onClick={onApplyAiSuggestion}
              className="w-full py-2.5 bg-camel text-cream label-micro hover:bg-camel-dark transition-colors"
              style={{ letterSpacing: '0.15em' }}
            >
              Apply Outfit Suggestion
            </button>
          </div>
        )}

        {showTrenchApply && (
          <div className="pl-8 animate-fade-in">
            <button
              onClick={onApplyTrenchSuggestion}
              className="w-full py-2.5 bg-espresso/80 text-cream label-micro hover:bg-espresso transition-colors border border-camel/30"
              style={{ letterSpacing: '0.15em' }}
            >
              Add Trench Coat
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {aiMessages.length === 0 && (
        <div className="px-5 pb-3 flex-shrink-0">
          <p className="label-micro mb-2">Occasions</p>
          <div className="flex flex-col gap-1.5">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => onSendMessage(prompt)}
                className="text-left px-3 py-2.5 bg-cream-soft border border-sand hover:border-camel hover:bg-beige-light transition-all duration-200 flex justify-between items-center group"
              >
                <span className="font-sans text-espresso" style={{ fontSize: '0.72rem' }}>{prompt}</span>
                <span className="label-micro text-brown-muted group-hover:text-camel transition-colors">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 pb-5 pt-3 border-t border-sand flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI stylist…"
            className="flex-1 bg-cream-soft border border-sand px-3 py-2.5 font-sans text-espresso placeholder-brown-muted/50 focus:outline-none focus:border-camel transition-colors"
            style={{ fontSize: '0.72rem' }}
          />
          <button
            onClick={handleSend}
            className="px-3 bg-espresso text-cream hover:bg-brown-deep transition-colors"
          >
            <span style={{ fontSize: '0.8rem' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
