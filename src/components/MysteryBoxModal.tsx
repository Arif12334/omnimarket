import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Gift, Flame, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChestState {
  id: number;
  opened: boolean;
  prize: string;
  value: number;
  type: 'credit' | 'gift' | 'voucher';
}

const INITIAL_CHESTS: ChestState[] = [
  { id: 1, opened: false, prize: '$35.00 Instant Wallet Credit', value: 35, type: 'credit' },
  { id: 2, opened: false, prize: 'Free Wireless Bluetooth Speaker', value: 45, type: 'gift' },
  { id: 3, opened: false, prize: '90% OFF Site-wide Super Coupon', value: 50, type: 'voucher' }
];

export const MysteryBoxModal: React.FC = () => {
  const { activeModal, setActiveModal, addWalletCredit, formatPrice, showToast } = useApp();
  const [chests, setChests] = useState<ChestState[]>(INITIAL_CHESTS);
  const [openedChest, setOpenedChest] = useState<ChestState | null>(null);

  if (activeModal !== 'mystery_box_modal') return null;

  const handleOpenChest = (chest: ChestState) => {
    if (chest.opened) return;

    setChests((prev) =>
      prev.map((c) => (c.id === chest.id ? { ...c, opened: true } : c))
    );
    setOpenedChest(chest);

    if (chest.type === 'credit') {
      addWalletCredit(chest.value, 'Mystery Box Reward');
    } else {
      showToast(`🎁 You unlocked: ${chest.prize}!`, 'Reward credited to your OmniMarket account.', 'success');
    }

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleReset = () => {
    setChests(INITIAL_CHESTS);
    setOpenedChest(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-purple-700 via-pink-600 to-amber-600 rounded-3xl shadow-2xl border-4 border-yellow-300 text-white overflow-hidden p-4 sm:p-6 text-center">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-300 text-slate-950 rounded-full font-black text-xs uppercase tracking-wider shadow-md mb-2 animate-bounce">
          <Gift className="w-4 h-4 text-purple-700 fill-purple-700" />
          OMNIMARKET MYSTERY TREASURE CHEST
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-yellow-100 tracking-tight">
          PICK A MYSTERY BOX TO OPEN!
        </h2>
        <p className="text-xs sm:text-sm text-pink-100 max-w-xs mx-auto mt-1">
          Every box contains a verified surprise reward up to $50.00!
        </p>

        {/* 3 Interactive Treasure Boxes */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6">
          {chests.map((chest) => (
            <button
              key={chest.id}
              onClick={() => handleOpenChest(chest)}
              disabled={chest.opened}
              className={`relative p-3 sm:p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                chest.opened
                  ? 'bg-yellow-300 text-slate-950 border-white shadow-xl scale-105'
                  : 'bg-black/30 text-white border-yellow-300/60 hover:border-yellow-300 hover:scale-105 hover:bg-black/40 shadow-md'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-2 filter drop-shadow-md animate-pulse">
                {chest.opened ? '🎉' : '🎁'}
              </div>
              <span className="text-xs font-black">
                {chest.opened ? 'OPENED' : `Box #${chest.id}`}
              </span>
              <span className="text-[10px] text-yellow-200 mt-0.5">
                {chest.opened ? 'Claimed' : 'Tap to Open'}
              </span>
            </button>
          ))}
        </div>

        {/* Prize Reveal Area */}
        {openedChest && (
          <div className="bg-black/40 backdrop-blur-xs rounded-2xl p-4 border border-white/20 animate-in zoom-in-95 duration-150 mb-4">
            <div className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
              YOUR UNLOCKED REWARD:
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              {openedChest.prize}
            </h3>
            <p className="text-xs text-pink-200 mt-1">
              Reward has been automatically credited to your active wallet!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="flex-1 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-xl text-xs shadow-lg transition-colors cursor-pointer"
          >
            Claim & Return to Shop
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chests</span>
          </button>
        </div>
      </div>
    </div>
  );
};
