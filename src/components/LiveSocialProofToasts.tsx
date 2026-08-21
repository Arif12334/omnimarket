import React, { useState, useEffect } from 'react';
import { Flame, Zap, Gift, X } from 'lucide-react';
import { LIVE_SOCIAL_PROOF_STREAM } from '../data/temuData';
import { useApp } from '../context/AppContext';

export const LiveSocialProofToasts: React.FC = () => {
  const { openSpinWheel, openPriceSlash } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_SOCIAL_PROOF_STREAM.length);
        setIsVisible(true);
      }, 500);
    }, 8500);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentItem = LIVE_SOCIAL_PROOF_STREAM[currentIndex];

  const handleClick = () => {
    if (currentItem.action.includes('slashed')) {
      openPriceSlash();
    } else {
      openSpinWheel();
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-30 max-w-xs sm:max-w-sm transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 relative group">
        <img
          src={currentItem.avatar}
          alt={currentItem.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shrink-0"
        />

        <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white truncate">{currentItem.name}</span>
            <span className="text-[10px] text-slate-400 truncate">• {currentItem.city}</span>
          </div>

          <p className="text-[11px] text-amber-300 font-medium line-clamp-1 mt-0.5">
            {currentItem.action}
          </p>

          <div className="flex items-center gap-1.5 mt-0.5 text-[10px]">
            <span className="bg-red-500/30 text-red-300 font-bold px-1.5 py-0.2 rounded">
              Saved {currentItem.saved}
            </span>
            <span className="text-slate-400">{currentItem.time}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
