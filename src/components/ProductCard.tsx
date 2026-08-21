import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  ShoppingBag, 
  CheckCircle2, 
  MapPin, 
  Eye, 
  Zap,
  Truck,
  Heart,
  Award,
  Sparkles,
  Flame
} from 'lucide-react';
import { PrimeBadge } from './PrimeBadge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetails, 
    addToCart, 
    openCheckout, 
    openTrackProduct,
    wishlists,
    addToWishlist,
    removeFromWishlist,
    isPrimeMember,
    selectedCity,
    formatPrice
  } = useApp();

  const isSavedInWishlist = wishlists.some((wl) => wl.items.some((i) => i.productId === product.id));
  const primaryWishlistId = wishlists[0]?.id || 'wl-1';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    openCheckout();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSavedInWishlist) {
      removeFromWishlist(primaryWishlistId, product.id);
    } else {
      addToWishlist(product, primaryWishlistId);
    }
  };

  return (
    <div
      onClick={() => openProductDetails(product)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
      id={`product-card-${product.id}`}
    >
      {/* Top Media & Badges */}
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Left Badges: Amazon's Choice / Best Seller / Discount */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.amazonChoiceTag ? (
            <span className="bg-slate-950 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 border-l-2 border-amber-400">
              <span className="text-amber-400 font-black">Amazon's</span>
              <span>Choice</span>
            </span>
          ) : product.isBestSeller ? (
            <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              Best Seller
            </span>
          ) : product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded shadow-sm">
              -{product.discountPercentage}% OFF
            </span>
          ) : null}

          {product.isFlashSale && (
            <span className="bg-red-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
              <Flame className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
              <span>Deal</span>
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 items-end">
          <button
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
              isSavedInWishlist
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            title={isSavedInWishlist ? 'Remove from Wishlist' : 'Add to Amazon Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isSavedInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-amber-600" /> Inspect Listing
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 text-[11px]">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount?.toLocaleString()})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          {/* Temu Lightning Deal Claim Bar & Social Proof */}
          {(product.isLightningDeal || product.isFlashSale) && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-red-600 flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-red-600" />
                  {product.lightningDealClaimedPercentage || 84}% Claimed
                </span>
                <span className="text-slate-400">
                  {product.stockCount && product.stockCount < 10 ? `Only ${product.stockCount} left!` : '1.2k+ sold'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-red-600 rounded-full"
                  style={{ width: `${product.lightningDealClaimedPercentage || 84}%` }}
                />
              </div>
            </div>
          )}

          {/* Amazon Prime & Delivery ETA */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <PrimeBadge size="sm" showDelivery deliveryTime={product.deliveryEstimate || 'Tomorrow, 8 AM - 12 PM'} />
            </div>
            <p className="text-[11px] text-slate-500">
              Ships to <strong className="text-slate-700">{selectedCity}</strong> • <span className="text-emerald-600 font-semibold">Free Returns</span>
            </p>
          </div>

          {/* Subscribe & Save Badge if eligible */}
          {product.isSubscribeEligible && (
            <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <span>Save 10% with Subscribe & Save</span>
            </div>
          )}
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-base sm:text-lg font-black text-slate-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.price >= 35 && (
              <p className="text-[10px] text-slate-600 font-semibold flex items-center gap-1 mt-0.5">
                <span>or 4x {formatPrice(product.price / 4)} split</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors shadow-xs"
              title="Add to Cart"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <button
              onClick={handleBuyNow}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-colors whitespace-nowrap shadow-xs"
            >
              1-Click Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
