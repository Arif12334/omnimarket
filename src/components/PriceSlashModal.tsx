import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Zap, Swords, Flame, Sparkles, Users, Gift, ArrowRight, Share2, Check, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SlashItem } from '../types';

export const PriceSlashModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    slashItems,
    performSlash,
    claimSlashedItem,
    formatPrice,
    openProductDetails,
    showToast
  } = useApp();

  const [selectedItemId, setSelectedItemId] = useState<string>(slashItems[0]?.id || '');
  const [isSlashing, setIsSlashing] = useState(false);
  const [lastSlashAmount, setLastSlashAmount] = useState<number | null>(null);

  if (activeModal !== 'price_slash_modal') return null;

  const currentItem = slashItems.find((item) => item.id === selectedItemId) || slashItems[0];
  if (!currentItem) return null;

  const handleSlash = () => {
    if (isSlashing) return;
    setIsSlashing(true);

    const result = performSlash(currentItem.id);
    setLastSlashAmount(result.amount);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setIsSlashing(false);
      if (result.isComplete) {
        showToast('🎯 Slashed to $0.00!', 'You successfully reduced the price to FREE! Claim it now!', 'success');
        try {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 }
          });
        } catch (e) {}
      }
    }, 600);
  };

  const handleBoostInvite = () => {
    const friendNames = ['Mia C.', 'Noah B.', 'Liam T.', 'Emma W.'];
    const randomFriend = friendNames[Math.floor(Math.random() * friendNames.length)];
    const result = performSlash(currentItem.id);
    showToast(`⚡ ${randomFriend} helped you slash!`, `Reduced price by ${formatPrice(result.amount)}!`, 'success');
  };

  const isFree = currentItem.currentPrice <= 0 || currentItem.status === 'completed' || currentItem.status === 'claimed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-red-600 via-orange-600 to-amber-700 rounded-3xl shadow-2xl border-4 border-yellow-300 text-white overflow-hidden p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-300 text-slate-950 rounded-full font-black text-xs uppercase tracking-wider shadow-md mb-2 animate-pulse">
            <Swords className="w-4 h-4 text-red-600 fill-red-600" />
            OMNIMARKET SLASH IT TO $0.00
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-yellow-100 tracking-tight">
            SLASH THE PRICE DOWN TO FREE!
          </h2>
          <p className="text-xs sm:text-sm text-yellow-100/90 max-w-md mx-auto mt-1">
            Tap to slice off dollars with friends until the price reaches $0.00!
          </p>
        </div>

        {/* Product Selector Carousel / Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 my-4">
          {slashItems.map((item) => {
            const isSelected = item.id === currentItem.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={`p-1.5 rounded-xl border-2 transition-all flex flex-col items-center cursor-pointer ${
                  isSelected
                    ? 'bg-yellow-300 text-slate-950 border-white scale-105 shadow-md'
                    : 'bg-black/30 text-white/90 border-white/20 hover:border-white/50'
                }`}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <span className="text-[10px] font-bold truncate max-w-[65px] mt-1">
                  {item.product.name}
                </span>
                <span className="text-[10px] font-black text-amber-200">
                  {item.currentPrice <= 0 ? 'FREE' : formatPrice(item.currentPrice)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Active Slasher Stage */}
        <div className="bg-black/35 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={currentItem.product.images[0]}
              alt={currentItem.product.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border-2 border-yellow-300 shrink-0 shadow-lg"
            />

            <div className="flex-1 text-center sm:text-left min-w-0">
              <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-md uppercase">
                {currentItem.slashPercentage}% Slashed
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white truncate mt-1">
                {currentItem.product.name}
              </h3>

              <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
                <span className="text-2xl font-black text-yellow-300">
                  {currentItem.currentPrice <= 0 ? '$0.00 (FREE)' : formatPrice(currentItem.currentPrice)}
                </span>
                <span className="text-xs text-white/60 line-through">
                  {formatPrice(currentItem.originalPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-300">
                  Save {formatPrice(currentItem.slashedAmount)}
                </span>
              </div>

              {/* Progress Bar towards $0 */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] font-bold text-yellow-200 mb-1">
                  <span>Progress to $0.00</span>
                  <span>{currentItem.slashPercentage}% Claimed</span>
                </div>
                <div className="w-full h-3.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-300 via-amber-400 to-red-500 rounded-full transition-all duration-500 relative"
                    style={{ width: `${Math.max(8, currentItem.slashPercentage)}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 animate-ping rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Slash Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
            {isFree ? (
              <button
                onClick={() => {
                  claimSlashedItem(currentItem.id);
                  setActiveModal(null);
                }}
                disabled={currentItem.status === 'claimed'}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Gift className="w-5 h-5" />
                <span>{currentItem.status === 'claimed' ? 'Already Claimed' : 'CLAIM ITEM FOR $0.00 NOW!'}</span>
              </button>
            ) : (
              <button
                onClick={handleSlash}
                disabled={isSlashing}
                className="w-full py-3.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-slate-950 font-black rounded-xl text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Swords className={`w-5 h-5 text-red-600 ${isSlashing ? 'animate-spin' : ''}`} />
                <span>{isSlashing ? 'SLASHING...' : '⚔️ SLASH IT NOW!'}</span>
              </button>
            )}

            <button
              onClick={handleBoostInvite}
              className="w-full py-3.5 bg-black/40 hover:bg-black/60 text-yellow-300 font-bold rounded-xl text-sm border border-yellow-300/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Invite Friends for +$15 Boost</span>
            </button>
          </div>
        </div>

        {/* Live Slash Activity Feed */}
        <div className="mt-4 bg-black/25 rounded-2xl p-3 border border-white/10">
          <div className="flex items-center justify-between text-xs font-bold text-yellow-200 mb-2">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              Live Slash Contributors
            </span>
            <span className="text-[10px] text-white/70">{currentItem.slashesCount} Slashes Made</span>
          </div>

          <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1 text-xs">
            {currentItem.slashHistory.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between bg-white/10 px-2.5 py-1.5 rounded-lg text-white text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <img src={s.avatar} alt={s.user} className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-semibold">{s.user}</span>
                  <span className="text-[10px] text-white/60">• {s.time}</span>
                </div>
                <span className="font-black text-amber-300">
                  Slashed -{formatPrice(s.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
