import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Percent,
  Check,
  Coins,
  Gift
} from 'lucide-react';
import { PROMO_CODES } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    cartItems, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal, 
    cartDiscount, 
    cartTax, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode,
    openCheckout,
    formatPrice,
    selectedCurrency,
    currentCurrencyConfig,
    claimedBundles
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (activeModal !== 'cart_drawer') return null;

  const freeDeliveryThreshold = 50;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + (cartSubtotal >= freeDeliveryThreshold ? 0 : 4.99) + cartTax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const result = applyPromoCode(promoInput);
    if (!result.success) {
      setPromoError(result.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base font-heading">Shopping Cart</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 underline mr-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setActiveModal(null)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

            {/* Free Shipping Progress bar */}
        {cartItems.length > 0 && (
          <div className="bg-indigo-50/60 px-5 py-2.5 border-b border-indigo-100">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> Free Standard Delivery Unlocked!
                  </span>
                ) : (
                  <span>Add <strong className="text-indigo-600 font-bold">{formatPrice(remainingForFreeDelivery)}</strong> for Free Delivery</span>
                )}
              </span>
              <span className="text-[10px] text-indigo-600 font-bold">{Math.round(progressToFreeDelivery)}%</span>
            </div>
            <div className="w-full bg-indigo-200/70 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeDelivery}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 divide-y divide-slate-100">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="pt-3.5 first:pt-0 flex items-start gap-3.5">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 border border-slate-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                    {item.product.name}
                  </h4>

                  {/* Variation chips */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {item.selectedColor && (
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                        Color: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedVariation &&
                      Object.entries(item.selectedVariation).map(([k, v]) => (
                        <span key={k} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                          {k}: {v}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-xs font-extrabold text-slate-900">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>

                    {/* Quantity controller */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-slate-900 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm font-heading">Your Cart is Empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                Explore our marketplace items and flash deals to add products to your cart.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Browse Marketplace
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer: Promo & Calculations & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Coupon: {appliedPromo.code}</span>
                    <span className="text-[10px] text-emerald-600">(-{formatPrice(cartDiscount)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. FLASH50)"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium mt-1">{promoError}</p>
              )}
            </div>

            {/* OmniMarket Claimed Vouchers Quick Apply */}
            {claimedBundles.length > 0 && !appliedPromo && (
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between text-[11px] font-black text-amber-900 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-orange-600" />
                    <span>Your OmniMarket Vouchers ({claimedBundles.length})</span>
                  </span>
                  <span className="text-[10px] text-amber-700">1-Tap Apply</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                  {claimedBundles.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => applyPromoCode(b.code)}
                      className="px-2 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg text-[10px] font-bold text-slate-800 shrink-0 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-red-500" />
                      <span>{b.code} ({formatPrice(b.discountAmount)} off)</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Currency switcher inside cart */}
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200/90 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>Currency: <strong>{currentCurrencyConfig.flag} {selectedCurrency} ({currentCurrencyConfig.symbol.trim()})</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('currency_modal')}
                className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px] underline"
              >
                Change
              </button>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPrice(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {cartSubtotal >= freeDeliveryThreshold ? (
                    <strong className="text-emerald-600 font-bold">FREE</strong>
                  ) : (
                    formatPrice(4.99)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8.25%)</span>
                <span>{formatPrice(cartTax)}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total ({selectedCurrency})</span>
                <span className="text-base text-indigo-600 font-extrabold">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                setActiveModal('checkout');
              }}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              id="cart-checkout-cta"
            >
              <span>Secure Checkout ({formatPrice(finalTotal)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted 256-Bit SSL Checkout & Anti-Fraud Shield</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
