import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Gift, Check, Clock, Sparkles, Flame, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TEMU_COUPON_BUNDLES, TEMU_VIP_200_BUNDLES } from '../data/temuData';
import { CouponBundleItem } from '../types';

export const CouponBundleModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    claimedBundles,
    claimBundle,
    claimAllBundles,
    applyPromoCode,
    formatPrice,
    cartSubtotal,
    setActiveModal: setAppModal
  } = useApp();

  const [activeTier, setActiveTier] = useState<'standard' | 'vip'>('standard');

  if (activeModal !== 'coupon_bundle_modal') return null;

  const currentList = activeTier === 'standard' ? TEMU_COUPON_BUNDLES : TEMU_VIP_200_BUNDLES;

  const handleClaimAll = () => {
    claimAllBundles(currentList);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleApplyToCart = (coupon: CouponBundleItem) => {
    claimBundle(coupon);
    applyPromoCode(coupon.code);
    setActiveModal('cart_drawer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-amber-600 via-orange-600 to-amber-700 rounded-3xl shadow-2xl border-4 border-yellow-300 text-white overflow-hidden p-4 sm:p-6">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-300 text-slate-950 rounded-full font-black text-xs uppercase tracking-wider shadow-md mb-2 animate-bounce">
            <Gift className="w-4 h-4 text-orange-600 fill-orange-600" />
            OMNIMARKET EXCLUSIVE COUPON VAULT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-yellow-100 tracking-tight">
            CLAIM YOUR $100+ COUPON BUNDLE!
          </h2>
          <p className="text-xs sm:text-sm text-yellow-100/90 max-w-md mx-auto mt-1">
            Stackable discounts across all marketplace categories with 0% hidden fees.
          </p>

          {/* Tier Switcher */}
          <div className="inline-flex p-1 bg-black/40 rounded-xl border border-white/20 my-3">
            <button
              onClick={() => setActiveTier('standard')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTier === 'standard'
                  ? 'bg-yellow-300 text-slate-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              $100 Starter Bundle (4 Vouchers)
            </button>
            <button
              onClick={() => setActiveTier('vip')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                activeTier === 'vip'
                  ? 'bg-yellow-300 text-slate-950 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              👑 $200 VIP Super Pack
            </button>
          </div>
        </div>

        {/* Coupon Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
          {currentList.map((coupon) => {
            const isClaimed = claimedBundles.some((b) => b.id === coupon.id);
            const isEligibleForCart = cartSubtotal >= coupon.minSpend;

            return (
              <div
                key={coupon.id}
                className="bg-white text-slate-900 rounded-2xl p-3.5 shadow-lg border-2 border-dashed border-amber-400 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Left decorative circle cutout */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-600 border-r-2 border-dashed border-amber-400" />
                {/* Right decorative circle cutout */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-orange-600 border-l-2 border-dashed border-amber-400" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-red-600">
                      {formatPrice(coupon.discountAmount)} OFF
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full">
                      Min. {formatPrice(coupon.minSpend)}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 mt-1">{coupon.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{coupon.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-slate-400">
                    <Tag className="w-3 h-3 text-amber-500" />
                    <span>{coupon.code}</span>
                  </div>

                  {isClaimed ? (
                    <button
                      onClick={() => handleApplyToCart(coupon)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Check className="w-3 h-3" />
                      <span>Use in Cart</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => claimBundle(coupon)}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Claim</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Claim All Button */}
        <div className="mt-4">
          <button
            onClick={handleClaimAll}
            className="w-full py-3.5 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 hover:from-yellow-200 hover:to-amber-300 text-slate-950 font-black rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
          >
            <Gift className="w-5 h-5 text-red-600" />
            <span>CLAIM ALL 4 COUPONS TO WALLET (1-CLICK)</span>
          </button>
        </div>

        {/* Guarantees */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-yellow-100/80 mt-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-yellow-300" />
            Valid for 48 Hours
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Instant Cart Auto-Apply
          </span>
        </div>
      </div>
    </div>
  );
};
