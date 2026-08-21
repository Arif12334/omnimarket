import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Gift, Flame, Trophy, Check, ArrowRight, Share2, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WHEEL_PRIZES } from '../data/temuData';
import { WheelPrize } from '../types';

export const TemuSpinWheelModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    spinsRemaining,
    spinLuckyWheel,
    walletCredit,
    formatPrice,
    openCouponBundle,
    showToast
  } = useApp();

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelPrize | null>(null);
  const [showPrizeWin, setShowPrizeWin] = useState(false);

  if (activeModal !== 'spin_wheel_modal') return null;

  const handleSpin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowPrizeWin(false);
    setWonPrize(null);

    // Random prize index
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const prize = WHEEL_PRIZES[prizeIndex];

    // Calculate rotation angle
    // Each segment is 360 / 8 = 45 deg
    const segmentAngle = 360 / WHEEL_PRIZES.length;
    const targetOffset = 360 - (prizeIndex * segmentAngle + segmentAngle / 2);
    const totalRotation = rotation + 360 * 5 + targetOffset - (rotation % 360);

    setRotation(totalRotation);

    setTimeout(async () => {
      setIsSpinning(false);
      const resultingPrize = await spinLuckyWheel();
      setWonPrize(resultingPrize || prize);
      setShowPrizeWin(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }, 4000);
  };

  const handleClaimAndClose = () => {
    setShowPrizeWin(false);
    setActiveModal(null);
    if (wonPrize?.type.includes('bundle')) {
      openCouponBundle();
    }
  };

  const handleShareForBonus = () => {
    showToast('🎉 +2 Free Spins Added!', 'Shared bonus spins unlocked! Good luck on your next lucky spin!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-orange-600 via-amber-600 to-amber-700 rounded-3xl shadow-2xl border-4 border-yellow-300 text-white overflow-hidden p-4 sm:p-6 text-center">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-300 text-slate-950 rounded-full font-black text-xs uppercase tracking-wider shadow-md mb-2 animate-bounce">
          <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
          OMNIMARKET LUCKY SPIN & WIN
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-yellow-100 tracking-tight drop-shadow-md">
          WIN UP TO $200 COUPON BUNDLE!
        </h2>
        <p className="text-xs sm:text-sm text-yellow-100/90 max-w-xs mx-auto mt-1">
          Spin the wheel for guaranteed instant store credit, 90% coupons & free gifts!
        </p>

        {/* The Spinning Wheel Arena */}
        <div className="relative my-6 flex items-center justify-center">
          {/* Outer Lights Ring */}
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-300 to-yellow-600 p-3 shadow-2xl border-4 border-yellow-200 flex items-center justify-center relative">
            
            {/* Top Indicator Arrow / Flapper */}
            <div className="absolute -top-3 z-30 transform -translate-x-1/2 left-1/2">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-yellow-300 filter drop-shadow-md" />
            </div>

            {/* Rotating SVG Wheel */}
            <div
              className="w-full h-full rounded-full overflow-hidden relative shadow-inner transition-all duration-[4000ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {WHEEL_PRIZES.map((prize, index) => {
                  const numSlices = WHEEL_PRIZES.length;
                  const angle = 360 / numSlices;
                  const startAngle = index * angle;
                  const endAngle = startAngle + angle;

                  const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                  return (
                    <path
                      key={prize.id}
                      d={pathData}
                      fill={prize.color}
                      stroke="#FFFFFF"
                      strokeWidth="0.8"
                    />
                  );
                })}
              </svg>

              {/* Labels on each slice */}
              {WHEEL_PRIZES.map((prize, index) => {
                const angle = (360 / WHEEL_PRIZES.length) * index + 360 / (2 * WHEEL_PRIZES.length);
                return (
                  <div
                    key={`label-${prize.id}`}
                    className="absolute inset-0 flex items-center justify-end pr-3 select-none pointer-events-none"
                    style={{
                      transformOrigin: '50% 50%',
                      transform: `rotate(${angle}deg)`
                    }}
                  >
                    <div className="text-[10px] sm:text-[11px] font-black text-white text-right leading-tight max-w-[85px] drop-shadow-sm flex items-center gap-1">
                      <span>{prize.label}</span>
                      <span>{prize.icon}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Central Spin Trigger Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-slate-950 font-black hover:scale-105 active:scale-95 disabled:opacity-80 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-red-600 animate-spin" />
              <span className="text-sm sm:text-base font-black tracking-tight leading-tight">
                {isSpinning ? 'SPINNING' : 'SPIN'}
              </span>
              <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-full mt-0.5">
                {spinsRemaining > 0 ? `${spinsRemaining} Left` : 'Free Spin'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer Controls & Wallet Stats */}
        <div className="bg-black/30 backdrop-blur-xs rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs mb-3">
          <div className="text-left">
            <span className="text-yellow-200 text-[10px] block">Your OmniMarket Wallet:</span>
            <span className="text-base font-black text-white">{formatPrice(walletCredit)}</span>
          </div>

          <button
            onClick={handleShareForBonus}
            className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Get +2 Spins</span>
          </button>
        </div>

        {/* Instant Win Modal Overlay */}
        {showPrizeWin && wonPrize && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-yellow-400 text-slate-950 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce mb-3">
              {wonPrize.icon}
            </div>

            <div className="text-xs font-black text-amber-400 uppercase tracking-widest">
              CONGRATULATIONS! YOU WON:
            </div>
            <h3 className="text-3xl font-black text-white mt-1 mb-2">
              {wonPrize.label}
            </h3>
            <p className="text-sm text-yellow-100 max-w-xs mb-6">
              {wonPrize.sublabel}. Reward has been credited immediately to your account!
            </p>

            <div className="flex flex-col w-full gap-2 max-w-xs">
              <button
                onClick={handleClaimAndClose}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim & Use Discount</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setShowPrizeWin(false);
                  if (spinsRemaining > 0) handleSpin();
                }}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Spin Again ({spinsRemaining} Remaining)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
