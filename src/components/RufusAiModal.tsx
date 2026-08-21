import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  ExternalLink, 
  HelpCircle, 
  ThumbsUp, 
  ArrowRight,
  Flame,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askRufusAssistant } from '../utils/amazonUtils';
import { Product } from '../types';

interface Message {
  id: string;
  sender: 'rufus' | 'user';
  text: string;
  timestamp: string;
  citations?: string[];
  suggestedFollowUps?: string[];
  recommendedProducts?: Product[];
}

export const RufusAiModal: React.FC = () => {
  const { activeModal, setActiveModal, selectedProduct, products, openProductDetails, addToCart, formatPrice } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'init-1',
      sender: 'rufus',
      text: selectedProduct
        ? `Hi! I'm **Omni AI**, OmniMarket's AI Shopping Assistant. I've analyzed verified customer reviews, manufacturer specifications, and warranty details for **${selectedProduct.name}**. What would you like to know?`
        : `Hi! I'm **Omni AI**, your OmniMarket AI Shopping Assistant. I can help you find products, compare options, discover Lightning Deals, or summarize customer opinions. What are you looking for today?`,
      timestamp: 'Just now',
      suggestedFollowUps: selectedProduct
        ? [
            'What do customers say about battery & durability?',
            'What is included in the box?',
            'Compare with similar items in this category'
          ]
        : [
            'What are today’s top Lightning Deals?',
            'Recommend best-selling wireless headphones',
            'Find gift ideas under $100'
          ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (activeModal !== 'rufus_ai_modal') return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `msg-u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI response simulation with smart context engine
    setTimeout(() => {
      const response = askRufusAssistant(query, selectedProduct, products);
      const rufusMsg: Message = {
        id: `msg-r-${Date.now()}`,
        sender: 'rufus',
        text: response.answer,
        timestamp: 'Just now',
        citations: response.sourceCitations,
        suggestedFollowUps: response.suggestedFollowUps,
        recommendedProducts: response.recommendedProducts
      };
      setMessages((prev) => [...prev, rufusMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[640px] max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Rufus Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:px-6 flex items-center justify-between border-b border-indigo-900/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>Rufus</span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase">
                    Beta
                  </span>
                </h3>
                <span className="text-xs text-indigo-300 font-normal">Amazon Shopping AI</span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-xs">
                {selectedProduct ? `Inquiring about: ${selectedProduct.name}` : 'Marketplace Advisor'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Product Context Strip */}
        {selectedProduct && (
          <div className="bg-amber-50/80 border-b border-amber-200/60 px-4 py-2 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-7 h-7 rounded object-cover border border-amber-200 shrink-0"
              />
              <span className="font-semibold text-slate-800 truncate">{selectedProduct.name}</span>
              <span className="font-bold text-slate-900 shrink-0">{formatPrice(selectedProduct.price)}</span>
            </div>
            <button
              onClick={() => openProductDetails(selectedProduct)}
              className="text-amber-800 hover:text-amber-950 font-bold shrink-0 flex items-center gap-1 underline underline-offset-2"
            >
              View Listing
            </button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'rufus' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Citations if available */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Sources:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Recommended Products Carousel if returned */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      Suggested Products:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.recommendedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-2 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate text-xs">{p.name}</p>
                              <p className="font-bold text-slate-900 text-xs">{formatPrice(p.price)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              openProductDetails(p);
                            }}
                            className="p-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold shrink-0"
                            title="Inspect product"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested follow-ups */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-medium px-2.5 py-1 rounded-full border border-indigo-200 transition-colors text-left"
                      >
                        {prompt} →
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-xs px-4 py-3 text-xs flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px]">Rufus is reasoning...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                selectedProduct
                  ? `Ask Rufus anything about ${selectedProduct.brand}...`
                  : 'Ask Rufus: Compare items, find deals, ask about reviews...'
              }
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 text-xs sm:text-sm shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>Powered by Amazon Bedrock & Generative AI</span>
            <span>Accurate to catalog data</span>
          </div>
        </div>
      </div>
    </div>
  );
};
