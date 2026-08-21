import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Gift, Award, ShieldCheck, Clock, Flame, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TemuTopMarquee: React.FC = () => {
  const { openSpinWheel, openPriceSlash, openCouponBundle, openMysteryBox, spinsRemaining } = useApp();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-xs select-none sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Temu Lightning Sale Countdown */}
        <div className="flex items-center gap-2 font-bold tracking-wide">
          <span className="flex items-center gap-1 bg-black/25 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-amber-200 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            MEGA FLASH SALE
          </span>
          <span className="hidden sm:inline text-white/90">Up to 90% OFF + 100% Free Shipping</span>
          
          {/* Ticking Timer */}
          <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md font-mono text-[11px] font-black text-amber-300 shadow-inner">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:
              {String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Center/Right: Quick Interactive Rewards Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={openSpinWheel}
            className="flex items-center gap-1 px-2.5 py-1 bg-white text-orange-600 hover:bg-amber-50 rounded-full font-black text-[11px] shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <span>🎡 Spin & Win $100</span>
            {spinsRemaining > 0 && (
              <span className="w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-black">
                {spinsRemaining}
              </span>
            )}
          </button>

          <button
            onClick={openPriceSlash}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full font-black text-[11px] shadow-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <Zap className="w-3 h-3 fill-amber-950" />
            <span>Slash to $0</span>
          </button>

          <button
            onClick={openCouponBundle}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-black/30 hover:bg-black/40 text-amber-200 rounded-full font-bold text-[11px] border border-amber-300/30 transition-colors cursor-pointer"
          >
            <Gift className="w-3 h-3" />
            <span>$100 Coupon Pack</span>
          </button>

          <button
            onClick={openMysteryBox}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 bg-black/30 hover:bg-black/40 text-white rounded-full font-bold text-[11px] border border-white/20 transition-colors cursor-pointer"
          >
            <span>🎁 Mystery Box</span>
          </button>
        </div>

        {/* Guarantees & Close */}
        <div className="hidden xl:flex items-center gap-3 text-[11px] text-white/90">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            90-Day Free Returns
          </span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-yellow-300" />
            Price Match Guarantee
          </span>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-white/70 hover:text-white p-0.5 hover:bg-black/20 rounded transition-colors"
          title="Dismiss top bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
