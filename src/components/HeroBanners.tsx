import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  Percent,
  Store,
  Globe
} from 'lucide-react';
import { CategorySlug } from '../types';

export const HeroBanners: React.FC = () => {
  const { setSelectedCategory, openProductDetails, products, applyPromoCode, setActiveModal, markets } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Live Flash Sale countdown calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bannerSlides = [
    {
      id: 'slide-1',
      title: 'Next-Gen Ultra Pro Max 5G Flagship',
      subtitle: 'OCTA-CORE AI ENGINE & 108MP PRO CAMERA',
      description: 'Experience 120Hz dynamic AMOLED smoothness with 65W hyper-charge. Limited stock available.',
      discount: '18% OFF',
      category: 'phones' as CategorySlug,
      buttonText: 'Shop Flagship Deals',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1000&auto=format&fit=crop&q=80',
      tag: 'NEW ARRIVAL',
      productId: 'prod-1'
    },
    {
      id: 'slide-2',
      title: 'ZenBook Aero 15.6" Ultra-Slim M3',
      subtitle: '3.2K OLED 120HZ & 32GB UNIFIED MEMORY',
      description: 'Engineered for creators, developers and power multitasking. 18-hour all-day battery.',
      discount: 'SAVE $200',
      category: 'computers' as CategorySlug,
      buttonText: 'Explore Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1000&auto=format&fit=crop&q=80',
      tag: 'PRO COMPUTING',
      productId: 'prod-3'
    },
    {
      id: 'slide-3',
      title: 'Italian Tailored Merino Wool Collection',
      subtitle: '100% MERINO WOOL & BEMBERG SILK LINING',
      description: 'Bespoke tailoring crafted in Milan. Modern luxury outerwear for every occasion.',
      discount: '32% OFF',
      category: 'fashion' as CategorySlug,
      buttonText: 'Browse Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&auto=format&fit=crop&q=80',
      tag: 'LUXURY ATELIER',
      productId: 'prod-4'
    }
  ];

  // Flash sale products
  const flashSaleProducts = products.filter((p) => p.isFlashSale).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6 space-y-6">
      
      {/* Grid: Main Banner Slider (2 cols) + Flash Sale Widget (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Hero Slider */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[380px] sm:min-h-[440px] flex flex-col justify-between shadow-xl border border-slate-800">
          
          {/* Background image overlay with gradient */}
          <div className="absolute inset-0 z-0">
            <img
              src={bannerSlides[currentSlide].image}
              alt={bannerSlides[currentSlide].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>

          {/* Slide Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-xl flex flex-col justify-center flex-1">
            <div className="inline-flex items-center gap-2 bg-indigo-600/90 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-3 w-fit shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              {bannerSlides[currentSlide].tag} • {bannerSlides[currentSlide].discount}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-heading text-white">
              {bannerSlides[currentSlide].title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide mt-2 uppercase text-indigo-300">
              {bannerSlides[currentSlide].subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md line-clamp-2">
              {bannerSlides[currentSlide].description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const targetProd = products.find((p) => p.id === bannerSlides[currentSlide].productId);
                  if (targetProd) {
                    openProductDetails(targetProd);
                  } else {
                    setSelectedCategory(bannerSlides[currentSlide].category);
                  }
                }}
                className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all"
                id={`hero-cta-btn-${currentSlide}`}
              >
                <span>{bannerSlides[currentSlide].buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => applyPromoCode('FLASH50')}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl backdrop-blur-xs border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Percent className="w-3.5 h-3.5 text-amber-400" />
                <span>Claim $50 Coupon</span>
              </button>
            </div>
          </div>

          {/* Slider navigation dots and arrows */}
          <div className="relative z-10 p-6 sm:px-10 flex items-center justify-between border-t border-white/10 bg-slate-950/40 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              {bannerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Flash Sale Deal Box */}
        <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-amber-600 text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
          
          {/* Top: Flash Sale header with live countdown */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs text-white animate-pulse">
                  <Flame className="w-5 h-5 fill-current text-amber-300" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight font-heading leading-tight">Flash Deals</h2>
                  <p className="text-[11px] text-rose-100 font-medium">Limited Quantity Discounts</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-rose-200 block">Ends In:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-xs mt-0.5">
                  <span className="bg-black/30 px-1.5 py-0.5 rounded text-white">{String(timeLeft.hours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="bg-black/30 px-1.5 py-0.5 rounded text-white">{String(timeLeft.minutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </div>
            </div>

            {/* Flash Sale Items List */}
            <div className="mt-5 space-y-3">
              {flashSaleProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => openProductDetails(prod)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3.5 cursor-pointer transition-all border border-white/15 group"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-white flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded mb-1">
                      -{prod.discountPercentage}% OFF
                    </span>
                    <h4 className="text-xs font-bold text-white truncate leading-snug">{prod.name}</h4>
                    
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-extrabold text-white">${prod.price.toFixed(2)}</span>
                      {prod.originalPrice && (
                        <span className="text-[11px] text-rose-200 line-through">${prod.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Stock status progress */}
                    <div className="mt-1.5">
                      <div className="flex items-center justify-between text-[10px] text-rose-100 font-semibold mb-0.5">
                        <span>{prod.stockCount} units left</span>
                        <span>Hot</span>
                      </div>
                      <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-300 h-full rounded-full"
                          style={{ width: `${Math.max(25, 100 - prod.stockCount * 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
            <span className="text-rose-100 font-medium">All flash deals include express shipping</span>
            <button
              onClick={() => setSelectedCategory('electronics')}
              className="font-bold underline hover:text-amber-200 text-white"
            >
              View all flash sales
            </button>
          </div>
        </div>

      </div>

      {/* Temu Interactive Gamification & Rewards Showcase Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Spin & Win */}
        <div
          onClick={() => setActiveModal('spin_wheel_modal')}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-2 border-yellow-300 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              DAILY LUCKY SPIN
            </span>
            <span className="text-2xl group-hover:rotate-45 transition-transform">🎡</span>
          </div>

          <div className="my-2">
            <h3 className="text-base font-black text-white leading-tight">
              Spin Wheel & Win $100
            </h3>
            <p className="text-xs text-yellow-100 mt-0.5">
              Guaranteed instant credit, 90% coupons & gifts!
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-yellow-200 pt-2 border-t border-white/20">
            <span>Spin for Free →</span>
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">HOT</span>
          </div>
        </div>

        {/* 2. Slash to $0 */}
        <div
          onClick={() => setActiveModal('price_slash_modal')}
          className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-2 border-yellow-300 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              SLASH IT TO $0.00
            </span>
            <span className="text-2xl group-hover:scale-125 transition-transform">⚔️</span>
          </div>

          <div className="my-2">
            <h3 className="text-base font-black text-white leading-tight">
              Group Slash: Get It FREE
            </h3>
            <p className="text-xs text-rose-100 mt-0.5">
              Slice prices with friends until cost reaches $0.00!
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-yellow-200 pt-2 border-t border-white/20">
            <span>Start Slashing →</span>
            <span className="text-emerald-300 font-extrabold">100% Free</span>
          </div>
        </div>

        {/* 3. $100 Coupon Vault */}
        <div
          onClick={() => setActiveModal('coupon_bundle_modal')}
          className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-2 border-amber-300 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              1-CLICK BUNDLE
            </span>
            <span className="text-2xl group-hover:rotate-12 transition-transform">🎁</span>
          </div>

          <div className="my-2">
            <h3 className="text-base font-black text-white leading-tight">
              $100 Coupon Pack Vault
            </h3>
            <p className="text-xs text-amber-100 mt-0.5">
              4 stackable vouchers automatically in your cart.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-yellow-200 pt-2 border-t border-white/20">
            <span>Claim 4 Vouchers →</span>
            <span className="text-yellow-300 font-bold">$100 Saved</span>
          </div>
        </div>

        {/* 4. Mystery Gift Box */}
        <div
          onClick={() => setActiveModal('mystery_box_modal')}
          className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-2xl p-4 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border-2 border-yellow-300 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="bg-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              SURPRISE GIFT
            </span>
            <span className="text-2xl group-hover:scale-125 transition-transform">📦</span>
          </div>

          <div className="my-2">
            <h3 className="text-base font-black text-white leading-tight">
              Open Mystery Chests
            </h3>
            <p className="text-xs text-purple-100 mt-0.5">
              Tap 1 of 3 treasure boxes to unlock instant rewards!
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-black text-yellow-200 pt-2 border-t border-white/20">
            <span>Open Mystery Box →</span>
            <span className="text-pink-200 font-extrabold">Instant Win</span>
          </div>
        </div>
      </div>

      {/* Global Markets Marketplace Showcase Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/70 border border-slate-800 hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg text-white transition-all">
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-white">
                Explore {markets.length.toLocaleString()}+ Verified Global Markets
              </h3>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live Directory
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Browse thousands of independent retail storefronts across New York, London, Tokyo, Paris, Berlin & 40+ international hubs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end shrink-0">
          <button
            onClick={() => setActiveModal('markets_directory_modal')}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            id="hero-open-markets-directory-btn"
          >
            <Globe className="w-4 h-4" />
            <span>Open Markets Directory</span>
          </button>

          <button
            onClick={() => setActiveModal('add_market_modal')}
            className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all"
            id="hero-add-market-btn"
          >
            <span>+ Create Market (21+)</span>
          </button>
        </div>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">Live Courier Tracking</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Interactive GPS map route</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">100% Authentic Products</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Verified seller guarantee</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">30-Day Easy Returns</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant refund processing</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 leading-tight">24/7 Dedicated Support</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Live agent & driver chat</p>
          </div>
        </div>
      </div>

    </section>
  );
};
