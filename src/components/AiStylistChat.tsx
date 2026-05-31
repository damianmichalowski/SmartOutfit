import { useState, useRef, useEffect } from 'react';
import type { AppState } from '../types';

const QUICK_PROMPTS = ['Business meeting', 'Weekend city walk', 'Date night'];

interface Props {
  state: AppState;
  onSendMessage: (text: string) => void;
  onApplyAiSuggestion: () => void;
}

export default function AiStylistChat({ state, onSendMessage, onApplyAiSuggestion }: Props) {
  const { aiMessages, isAiTyping, activeHighlight, isDemoRunning } = state;
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

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isHighlighted ? 'ring-2 ring-camel ring-offset-2 rounded-xl' : ''}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-beige-light">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-espresso flex items-center justify-center">
            <span className="text-cream text-xs font-serif font-bold">AI</span>
          </div>
          <div>
            <div className="font-serif font-bold text-espresso text-sm">AI Stylist</div>
            <div className="text-xs text-camel font-medium">Personal styling assistant</div>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {aiMessages.length === 0 && !isAiTyping && (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">👗</div>
            <p className="text-warm-brown text-sm">Ask your personal AI stylist for outfit advice</p>
          </div>
        )}

        {aiMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-espresso flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <span className="text-cream text-xs font-bold">AI</span>
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-espresso text-cream rounded-br-sm'
                  : 'bg-beige-light text-espresso rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isAiTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-espresso flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-cream text-xs font-bold">AI</span>
            </div>
            <div className="bg-beige-light rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-warm-brown animate-typing" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-warm-brown animate-typing" style={{ animationDelay: '200ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-warm-brown animate-typing" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        )}

        {/* Apply AI suggestion button */}
        {hasAiResponse && !isAiTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="ml-8">
              <button
                onClick={onApplyAiSuggestion}
                className="px-4 py-2 bg-camel text-white text-xs font-semibold rounded-xl hover:bg-warm-brown transition-colors shadow-sm"
              >
                ✨ Apply AI suggestion
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {aiMessages.length === 0 && (
        <div className="px-4 pb-2">
          <div className="flex gap-1.5 flex-wrap">
            {QUICK_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => onSendMessage(prompt)}
                className="px-3 py-1.5 bg-cream-dark text-espresso text-xs font-medium rounded-full hover:bg-beige transition-colors border border-beige-light"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-beige-light">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask your AI stylist..."
            className="flex-1 bg-off-white border border-beige-light rounded-xl px-3 py-2 text-xs text-espresso placeholder-warm-brown/50 focus:outline-none focus:border-camel transition-colors"
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 bg-espresso text-cream rounded-xl hover:bg-warm-brown transition-colors text-sm"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
