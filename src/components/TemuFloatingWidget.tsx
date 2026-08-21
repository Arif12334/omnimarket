import React, { useState } from 'react';
import { Gift, Zap, Swords, Sparkles, X, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TemuFloatingWidget: React.FC = () => {
  const {
    openSpinWheel,
    openPriceSlash,
    openCouponBundle,
    openMysteryBox,
    spinsRemaining,
    walletCredit,
    formatPrice
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Rewards Menu */}
      {isOpen && (
        <div className="mb-2 bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border-2 border-amber-400 w-56 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700">
            <span className="text-xs font-black text-amber-300">OMNIMARKET REWARDS</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                openSpinWheel();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-orange-600/30 hover:bg-orange-600/50 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>🎡</span>
                <span>Lucky Spin & Win</span>
              </span>
              <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                {spinsRemaining > 0 ? `${spinsRemaining} Free` : 'Spin'}
              </span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openPriceSlash();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>⚔️</span>
                <span>Slash to $0.00</span>
              </span>
              <span className="text-[10px] text-amber-400 font-extrabold">FREE</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openCouponBundle();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>🎁</span>
                <span>$100 Coupon Vault</span>
              </span>
              <span className="text-[10px] text-red-300 font-extrabold">Claim</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openMysteryBox();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span>📦</span>
                <span>Mystery Box</span>
              </span>
              <span className="text-[10px] text-purple-300 font-extrabold">Open</span>
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
            <span>Wallet Balance:</span>
            <span className="font-bold text-emerald-400">{formatPrice(walletCredit)}</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group flex items-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white rounded-full shadow-2xl border-2 border-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
      >
        <div className="relative">
          <Gift className="w-5 h-5 animate-bounce" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 border border-white text-white rounded-full text-[9px] flex items-center justify-center font-black animate-pulse">
            !
          </span>
        </div>

        <div className="text-left leading-none pr-1">
          <div className="text-[10px] font-black tracking-wider uppercase text-yellow-200">
            OMNI REWARDS
          </div>
          <div className="text-xs font-black text-white">
            WIN $100 & FREE GIFTS
          </div>
        </div>

        <ChevronUp className={`w-4 h-4 text-white/80 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
