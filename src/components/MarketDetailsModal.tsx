import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Store, 
  X, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Zap, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  Calendar,
  ExternalLink,
  PlusCircle,
  Tag
} from 'lucide-react';
import { PrimeBadge } from './PrimeBadge';

export const MarketDetailsModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    selectedMarket, 
    products, 
    addToCart, 
    buyNow,
    openProductDetails 
  } = useApp();

  // Find products that match this market's category or seller name
  const storeProducts = useMemo(() => {
    if (!selectedMarket) return [];
    
    // First priority: matching category
    const categoryMatches = products.filter(p => p.category === selectedMarket.category);
    if (categoryMatches.length > 0) return categoryMatches;
    
    // Fallback to general products
    return products.slice(0, 8);
  }, [selectedMarket, products]);

  if (activeModal !== 'market_details_modal' || !selectedMarket) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setActiveModal('markets_directory_modal')}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 1,200+ Markets</span>
          </button>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Storefront Hero Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-slate-800">
            <img
              src={selectedMarket.bannerImage}
              alt={selectedMarket.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-end gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border-2 border-slate-700 overflow-hidden shadow-2xl shrink-0">
                  <img
                    src={selectedMarket.logoImage}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {selectedMarket.name}
                    </h1>
                    {selectedMarket.isAmazonFulfilled && (
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>Prime Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 flex items-center gap-2 mt-1">
                    <span className="text-amber-400 font-semibold">{selectedMarket.categoryName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {selectedMarket.city}, {selectedMarket.country}
                    </span>
                    <span>•</span>
                    <span>Est. {selectedMarket.establishedYear}</span>
                  </p>
                </div>
              </div>

              {/* Rating Pill */}
              <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shrink-0">
                <div className="flex items-center gap-1 text-amber-400 font-black text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedMarket.rating.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-slate-400 border-l border-slate-700 pl-2">
                  <span className="font-bold text-white">{selectedMarket.reviewCount.toLocaleString()}</span> reviews
                </div>
              </div>
            </div>
          </div>

          {/* Store Info & Merchant Bio Cards */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Merchant Verification Card */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Merchant Owner</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Owner:</span>
                    <span className="font-bold text-white">{selectedMarket.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Age Verification:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Adult Verified (Age {selectedMarket.ownerAge})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Merchant Status:</span>
                    <span className="text-amber-300 font-medium">Licensed Retailer</span>
                  </div>
                </div>
              </div>

              {/* Location & Hours */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Location & Hours</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 shrink-0">Address:</span>
                    <span className="font-medium text-white">{selectedMarket.address}, {selectedMarket.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 shrink-0">Hours:</span>
                    <span className="text-emerald-400 font-medium">{selectedMarket.openingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct Contact & Support */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>Direct Merchant Contact</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-mono text-slate-200">{selectedMarket.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-mono text-amber-300 truncate max-w-[170px]">{selectedMarket.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Description & Highlights */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                About this Storefront
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedMarket.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {selectedMarket.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5 text-amber-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Products from this Market */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Products from {selectedMarket.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Direct shipping with 30-day money-back guarantee
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400">
                  {storeProducts.length} Featured Items
                </span>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {storeProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between p-3 hover:border-amber-400/60 transition-all group"
                  >
                    <div>
                      {/* Product Image */}
                      <div 
                        onClick={() => openProductDetails(product)}
                        className="relative h-36 w-full bg-slate-900 rounded-lg overflow-hidden cursor-pointer mb-2.5"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {product.isPrimeEligible && (
                          <div className="absolute top-2 left-2">
                            <PrimeBadge size="sm" />
                          </div>
                        )}
                      </div>

                      {/* Product details */}
                      <h4 
                        onClick={() => openProductDetails(product)}
                        className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer"
                      >
                        {product.name}
                      </h4>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-amber-400">{product.rating}</span>
                        <span>({product.reviewCount})</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-850 flex items-center justify-between gap-2">
                      <div className="text-sm font-black text-white">
                        ${product.price.toFixed(2)}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-lg text-xs transition-colors"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => buyNow(product)}
                          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
