import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Zap, 
  Clock, 
  Sparkles, 
  ShoppingCart, 
  Tag, 
  Check, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeBadge } from './PrimeBadge';
import { CategorySlug } from '../types';

export const DealsHubModal: React.FC = () => {
  const { activeModal, setActiveModal, products, addToCart, openProductDetails, isPrimeMember, formatPrice } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (activeModal !== 'deal_hub_modal') return null;

  const dealProducts = products.filter((p) => p.isFlashSale || (p.discountPercentage && p.discountPercentage > 15));
  
  const filteredDeals = selectedCategory === 'all'
    ? dealProducts
    : dealProducts.filter((p) => p.category === selectedCategory);

  const featuredDeal = dealProducts[0] || products[0];

  const categories = [
    { slug: 'all', label: 'All Deals' },
    { slug: 'electronics', label: 'Electronics & Audio' },
    { slug: 'phones', label: 'Smartphones & Tablets' },
    { slug: 'computers', label: 'Computers & Gaming' },
    { slug: 'fashion', label: 'Fashion & Apparel' },
    { slug: 'home-appliances', label: 'Home & Kitchen' },
    { slug: 'beauty', label: 'Beauty & Wellness' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white p-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-md">
              <Flame className="w-6 h-6 fill-amber-300 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white tracking-tight">Today's Lightning Deals</h2>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Up to 40% OFF
                </span>
              </div>
              <p className="text-xs text-rose-100">Limited-time promotional discounts with instant Prime 1-Day shipping</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-rose-200 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.slug
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Deals Hub Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Featured Deal of the Day Banner */}
          {featuredDeal && selectedCategory === 'all' && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl text-white p-5 sm:p-6 relative overflow-hidden border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    Deal of the Day
                  </span>
                  <PrimeBadge size="sm" />
                </div>
                <h3 
                  onClick={() => openProductDetails(featuredDeal)}
                  className="text-lg sm:text-xl font-black text-white hover:text-amber-300 cursor-pointer transition-colors"
                >
                  {featuredDeal.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {featuredDeal.description}
                </p>

                <div className="flex items-baseline gap-3 pt-2 flex-wrap">
                  <span className="text-2xl font-black text-amber-400">
                    {formatPrice(featuredDeal.price)}
                  </span>
                  {featuredDeal.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(featuredDeal.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-md border border-red-800">
                    Save {featuredDeal.discountPercentage}%
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => addToCart(featuredDeal, 1)}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Claim Deal</span>
                  </button>
                  <button
                    onClick={() => openProductDetails(featuredDeal)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <img
                src={featuredDeal.images[0]}
                alt={featuredDeal.name}
                onClick={() => openProductDetails(featuredDeal)}
                className="w-48 h-48 rounded-xl object-cover border border-white/10 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          )}

          {/* Deals Grid with Amazon Lightning Claim Bar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500" />
                <span>Active Lightning Deals ({filteredDeals.length})</span>
              </h3>
              <span className="text-xs text-slate-500">Deals refresh every few hours</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredDeals.map((p) => {
                const claimed = p.lightningDealClaimedPercentage || 74;
                return (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative mb-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          onClick={() => openProductDetails(p)}
                          className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-95"
                        />
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-sm shadow-sm">
                          {p.discountPercentage}% OFF
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{p.brand}</span>
                        <PrimeBadge size="sm" />
                      </div>

                      <h4
                        onClick={() => openProductDetails(p)}
                        className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer"
                      >
                        {p.name}
                      </h4>

                      <div className="flex items-baseline gap-2 mt-2 flex-wrap">
                        <span className="text-base font-black text-slate-900">{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>

                      {/* Amazon Lightning Claim Bar */}
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                          <span>{claimed}% Claimed</span>
                          <span className="text-red-600 flex items-center gap-0.5 font-bold">
                            <Clock className="w-3 h-3" /> Ends soon
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all"
                            style={{ width: `${claimed}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(p, 1)}
                      className="mt-4 w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add Deal to Cart</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
