import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Share2, 
  Heart, 
  ChevronRight,
  ChevronDown,
  Sparkles,
  MessageSquare,
  Send,
  Info,
  Compass,
  Navigation,
  Layers,
  CreditCard,
  Calendar,
  Check,
  Award,
  Flame,
  Bot,
  HelpCircle,
  Package,
  Repeat,
  Plus
} from 'lucide-react';
import L from 'leaflet';
import { getInstallmentPlans, generateInstallmentSchedule } from '../utils/installmentUtils';
import { InstallmentPlanType, Product } from '../types';
import { PrimeBadge } from './PrimeBadge';

export const ProductDetailsModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    setActiveModal, 
    addToCart, 
    openCheckout, 
    addReview,
    openTrackOrder,
    openTrackProduct,
    orders,
    user,
    isPrimeMember,
    selectedZipCode,
    selectedCity,
    wishlists,
    addToWishlist,
    removeFromWishlist,
    products,
    addBundleToCart,
    addSubscriptionToCart,
    showToast
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState(selectedZipCode || '10001');
  const [calculatedDeliveryDate, setCalculatedDeliveryDate] = useState('Tomorrow, 8 AM - 12 PM');
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'compare' | 'map' | 'specs' | 'reviews'>('overview');

  // Amazon Subscribe & Save mode
  const [purchaseMode, setPurchaseMode] = useState<'one_time' | 'subscription'>('one_time');
  const [subFrequency, setSubFrequency] = useState<string>('every_1_month');

  // Pay Little by Little (Installment Calculator) State
  const [showBnplCalculator, setShowBnplCalculator] = useState(false);
  const [selectedBnplPlanType, setSelectedBnplPlanType] = useState<InstallmentPlanType>('pay_in_4');

  // Product Delivery Route Map State
  const productMapContainerRef = useRef<HTMLDivElement>(null);
  const productMapInstanceRef = useRef<L.Map | null>(null);
  const [transitDistance, setTransitDistance] = useState('3.8');
  const [transitDuration, setTransitDuration] = useState('25 mins');

  // Review Form
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Q&A search and ask state
  const [qaSearchQuery, setQaSearchQuery] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [userQuestionsList, setUserQuestionsList] = useState<{ id: string; question: string; answer: string; author: string; votes: number }[]>([]);

  // Wishlist state
  const isSavedInWishlist = wishlists.some((wl) => wl.items.some((i) => i.productId === selectedProduct?.id));
  const primaryWishlistId = wishlists[0]?.id || 'wl-1';

  // Sync state when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedColor(selectedProduct.colors && selectedProduct.colors.length > 0 ? selectedProduct.colors[0].name : '');
      const initial: Record<string, string> = {};
      if (selectedProduct.variations) {
        selectedProduct.variations.forEach((v) => {
          initial[v.name] = v.options[0];
        });
      }
      setSelectedVariations(initial);
      setQuantity(1);
      setShowBnplCalculator(false);
      setShowReviewForm(false);
      setPurchaseMode('one_time');
      setPostalCode(selectedZipCode || '10001');
    }
  }, [selectedProduct, selectedZipCode]);

  // Frequently Bought Together Bundle products
  const bundleItems: Product[] = selectedProduct?.frequentlyBoughtTogetherIds
    ? products.filter((p) => selectedProduct.frequentlyBoughtTogetherIds?.includes(p.id))
    : products.filter((p) => p.category === selectedProduct?.category && p.id !== selectedProduct?.id).slice(0, 2);

  const allBundleProducts = selectedProduct ? [selectedProduct, ...bundleItems] : [];
  const bundleTotalPrice = allBundleProducts.reduce((sum, p) => sum + p.price, 0);

  // Comparison products
  const comparisonProducts = selectedProduct
    ? [selectedProduct, ...products.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 3)]
    : [];

  // Initialize and update Product Leaflet Map when map tab is selected or active
  useEffect(() => {
    if (!selectedProduct || activeTab !== 'map' || !productMapContainerRef.current) return;

    // Clean up previous instance
    if (productMapInstanceRef.current) {
      productMapInstanceRef.current.remove();
      productMapInstanceRef.current = null;
    }

    const hubLat = 40.758896;
    const hubLng = -73.985130;
    
    // Slight variation based on postal code
    const zipNum = parseInt(postalCode.replace(/\D/g, '')) || 10001;
    const offsetLat = ((zipNum % 100) - 50) * 0.0008;
    const offsetLng = ((zipNum % 70) - 35) * 0.0008;
    const destLat = 40.748817 + offsetLat;
    const destLng = -73.985428 + offsetLng;

    const centerLat = (hubLat + destLat) / 2;
    const centerLng = (hubLng + destLng) / 2;

    const map = L.map(productMapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Warehouse Hub Marker
    const hubIcon = L.divIcon({
      className: 'custom-prod-hub-pin',
      html: `
        <div style="background-color: #0f172a; color: white; padding: 5px 9px; border-radius: 10px; font-weight: 800; font-size: 10px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap;">
          <span>🏬 Amazon Hub</span>
        </div>
      `,
      iconSize: [100, 28],
      iconAnchor: [50, 14]
    });

    // Destination Pin
    const destIcon = L.divIcon({
      className: 'custom-prod-dest-pin',
      html: `
        <div style="background-color: #f59e0b; color: #0f172a; padding: 5px 9px; border-radius: 10px; font-weight: 900; font-size: 10px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 10px rgba(245,158,11,0.4); border: 2px solid white; white-space: nowrap;">
          <span>📍 Deliver (${postalCode})</span>
        </div>
      `,
      iconSize: [105, 28],
      iconAnchor: [52, 14]
    });

    L.marker([hubLat, hubLng], { icon: hubIcon }).addTo(map);
    L.marker([destLat, destLng], { icon: destIcon }).addTo(map);

    // Route polyline
    const polyline = L.polyline(
      [
        [hubLat, hubLng],
        [(hubLat + destLat) / 2 + 0.002, (hubLng + destLng) / 2 - 0.003],
        [destLat, destLng]
      ],
      { color: '#f59e0b', weight: 4, opacity: 0.85, dashArray: '8, 8' }
    ).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    productMapInstanceRef.current = map;

    return () => {
      if (productMapInstanceRef.current) {
        productMapInstanceRef.current.remove();
        productMapInstanceRef.current = null;
      }
    };
  }, [selectedProduct, activeTab, postalCode]);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    if (purchaseMode === 'subscription') {
      addSubscriptionToCart(selectedProduct, subFrequency);
    } else {
      addToCart(selectedProduct, quantity, selectedColor, selectedVariations);
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    if (purchaseMode === 'subscription') {
      addSubscriptionToCart(selectedProduct, subFrequency);
    } else {
      addToCart(selectedProduct, quantity, selectedColor, selectedVariations);
    }
    setActiveModal('checkout');
  };

  const handleToggleWishlist = () => {
    if (!selectedProduct) return;
    if (isSavedInWishlist) {
      removeFromWishlist(primaryWishlistId, selectedProduct.id);
    } else {
      addToWishlist(selectedProduct, primaryWishlistId);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !reviewComment.trim()) return;
    addReview(selectedProduct.id, reviewRating, reviewComment.trim());
    setReviewComment('');
    setShowReviewForm(false);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setUserQuestionsList((prev) => [
      {
        id: `q-${Date.now()}`,
        question: userQuestion.trim(),
        answer: 'Verified Seller: Thank you for your question! Yes, this product meets all standard manufacturer specifications and includes our 1-year replacement warranty.',
        author: user ? user.name : 'Amazon Customer',
        votes: 1
      },
      ...prev
    ]);
    showToast('Question Submitted', 'Your question has been posted to verified customers and seller!', 'success');
    setUserQuestion('');
  };

  const handleAddBundle = () => {
    if (allBundleProducts.length === 0) return;
    addBundleToCart(allBundleProducts);
  };

  const handleZipCheck = () => {
    if (postalCode.trim().length >= 4) {
      setCalculatedDeliveryDate(`Guaranteed Prime One-Day delivery to ${postalCode}`);
      const dist = (2.5 + (parseInt(postalCode.slice(-2)) || 10) * 0.08).toFixed(1);
      setTransitDistance(dist);
      setTransitDuration(`${Math.round(parseFloat(dist) * 6 + 10)} mins`);
    }
  };

  const handleLaunchOrderTracking = () => {
    if (!selectedProduct) return;
    openTrackProduct(selectedProduct);
  };

  if (!selectedProduct) return null;

  // Combine product mock QA with user posted QA
  const allQA = [...userQuestionsList, ...(selectedProduct.qaList || [])];
  const filteredQA = qaSearchQuery.trim()
    ? allQA.filter((q) => q.question.toLowerCase().includes(qaSearchQuery.toLowerCase()) || q.answer.toLowerCase().includes(qaSearchQuery.toLowerCase()))
    : allQA;

  const subscriptionPrice = selectedProduct.price * 0.9;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header Breadcrumbs Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-hidden truncate">
            <span>Amazon</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="capitalize font-semibold text-slate-700">{selectedProduct.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[200px] text-slate-900 font-bold">{selectedProduct.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModal('rufus_ai_modal')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-indigo-600 hover:from-amber-300 hover:to-indigo-500 text-slate-950 font-black px-3 py-1 rounded-full text-xs shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Rufus AI</span>
            </button>

            <button
              onClick={() => {
                setSelectedProduct(null);
                setActiveModal(null);
              }}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 3-Column Layout for Amazon Product Page (Images | Middle Specs | Right Buy Box) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Image Gallery (4 cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 shadow-inner group">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {selectedProduct.amazonChoiceTag && (
                    <span className="bg-slate-950 text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-sm border-l-2 border-amber-400">
                      <span className="text-amber-400 font-black">Amazon's</span> Choice
                    </span>
                  )}
                  {selectedProduct.discountPercentage && selectedProduct.discountPercentage > 0 && (
                    <span className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-sm">
                      -{selectedProduct.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails Row */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                        activeImageIndex === idx
                          ? 'border-amber-500 ring-2 ring-amber-500/20 scale-105'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* AI-Generated Review Summary snippet */}
              {selectedProduct.aiReviewSummary && (
                <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Customers say (AI Summary)</span>
                  </div>
                  <p className="text-[11px] text-slate-700 leading-relaxed italic">
                    "{selectedProduct.aiReviewSummary.summary}"
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedProduct.aiReviewSummary.pros.slice(0, 2).map((pro, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Middle Column: Details, Brand, Options & Specs (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-amber-700">
                    Brand: {selectedProduct.brand}
                  </span>
                  <span>ASIN: B0{selectedProduct.id.replace(/\D/g, '').padEnd(6, '9')}</span>
                </div>

                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {selectedProduct.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60 text-amber-800 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-blue-700 hover:text-blue-900 font-medium underline"
                  >
                    {selectedProduct.reviewCount?.toLocaleString()} ratings
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => setActiveTab('qa')}
                    className="text-xs text-blue-700 hover:text-blue-900 font-medium underline"
                  >
                    {allQA.length} answered questions
                  </button>
                </div>
              </div>

              {/* Price Details */}
              <div className="border-t border-b border-slate-100 py-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-slate-900">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-sm text-slate-400 line-through">
                      ${selectedProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.discountPercentage && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      Save {selectedProduct.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Prime Badge */}
                <div className="mt-2">
                  <PrimeBadge size="md" showDelivery deliveryTime={calculatedDeliveryDate} />
                </div>
              </div>

              {/* Pay Little by Little (Flexible Installments & BNPL Widget) */}
              <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-blue-50/60 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900">Pay Little by Little: </span>
                      <span className="text-slate-700">4 payments of ${(selectedProduct.price / 4).toFixed(2)} at 0% APR</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowBnplCalculator(!showBnplCalculator)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold underline"
                  >
                    {showBnplCalculator ? 'Hide' : 'Details'}
                  </button>
                </div>

                {showBnplCalculator && (
                  <div className="mt-3 pt-2.5 border-t border-indigo-100 space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {getInstallmentPlans(selectedProduct.price).slice(0, 4).map((plan) => (
                        <div key={plan.id} className="p-2 bg-white rounded-lg border border-slate-200 text-xs">
                          <div className="font-bold text-slate-800">{plan.title}</div>
                          <div className="font-black text-indigo-600 mt-0.5">${plan.installmentAmount.toFixed(2)}</div>
                          <div className="text-[10px] text-slate-500">{plan.periodLabel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Color Options */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-slate-900 block mb-1.5">
                    Color: <span className="text-slate-700 font-medium">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c.name);
                          if (c.imageIndex !== undefined && selectedProduct.images[c.imageIndex]) {
                            setActiveImageIndex(c.imageIndex);
                          }
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold transition-all ${
                          selectedColor === c.name
                            ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variations */}
              {selectedProduct.variations && selectedProduct.variations.map((v) => (
                <div key={v.name}>
                  <label className="text-xs font-bold text-slate-900 block mb-1.5">
                    {v.name}: <span className="text-slate-700 font-medium">{selectedVariations[v.name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariations((prev) => ({ ...prev, [v.name]: opt }))}
                        className={`px-3 py-1 rounded-lg border text-xs font-bold transition-all ${
                          selectedVariations[v.name] === opt
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Key Bullet Points */}
              {selectedProduct.highlights && (
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-900">About this item</h4>
                  <ul className="space-y-1">
                    {selectedProduct.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Amazon Buy Box (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
                
                {/* One-time vs Subscribe & Save Options */}
                {selectedProduct.isSubscribeEligible && (
                  <div className="space-y-2">
                    <label 
                      onClick={() => setPurchaseMode('one_time')}
                      className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                        purchaseMode === 'one_time' ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input type="radio" checked={purchaseMode === 'one_time'} onChange={() => setPurchaseMode('one_time')} />
                        <span className="font-bold text-slate-900">One-time purchase</span>
                      </div>
                      <span className="font-black text-slate-900">${selectedProduct.price.toFixed(2)}</span>
                    </label>

                    <label 
                      onClick={() => setPurchaseMode('subscription')}
                      className={`p-2.5 rounded-xl border cursor-pointer flex flex-col gap-2 text-xs transition-all ${
                        purchaseMode === 'subscription' ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <input type="radio" checked={purchaseMode === 'subscription'} onChange={() => setPurchaseMode('subscription')} />
                          <span className="font-bold text-emerald-800 flex items-center gap-1">
                            <Repeat className="w-3.5 h-3.5" />
                            <span>Subscribe & Save</span>
                          </span>
                        </div>
                        <span className="font-black text-emerald-700">${subscriptionPrice.toFixed(2)}</span>
                      </div>

                      {purchaseMode === 'subscription' && (
                        <div className="pt-2 border-t border-amber-200/60 text-xs">
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">Deliver Frequency:</label>
                          <select
                            value={subFrequency}
                            onChange={(e) => setSubFrequency(e.target.value)}
                            className="w-full p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                          >
                            <option value="every_2_weeks">Every 2 weeks</option>
                            <option value="every_1_month">Every 1 month (Most popular)</option>
                            <option value="every_2_months">Every 2 months</option>
                            <option value="every_3_months">Every 3 months</option>
                          </select>
                        </div>
                      )}
                    </label>
                  </div>
                )}

                {/* Deliver To Location */}
                <div className="text-xs space-y-1">
                  <div className="text-slate-500">Deliver to:</div>
                  <button
                    onClick={() => setActiveModal('location_modal')}
                    className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{selectedCity} {selectedZipCode}</span>
                  </button>
                </div>

                {/* Stock Status */}
                <div>
                  <span className="text-sm font-black text-emerald-600 block">
                    In Stock ({selectedProduct.stockCount} available)
                  </span>
                  <span className="text-[11px] text-slate-500">Ships from Amazon Fulfillment Network</span>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Quantity:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="p-1.5 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold"
                  >
                    {[1, 2, 3, 4, 5, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>

                {/* Amazon Buy Box Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    id="modal-buybox-add-to-cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{purchaseMode === 'subscription' ? 'Set Up Subscription' : 'Add to Cart'}</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                    id="modal-buybox-buy-now"
                  >
                    <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>1-Click Buy Now</span>
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    className={`w-full py-2 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                      isSavedInWishlist
                        ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSavedInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{isSavedInWishlist ? 'In your Wishlist ✓' : 'Add to Wishlist'}</span>
                  </button>
                </div>

                {/* Meta details */}
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span>Ships from</span>
                    <span className="font-semibold text-slate-800">Amazon.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sold by</span>
                    <span className="font-semibold text-slate-800">{selectedProduct.seller.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Returns</span>
                    <span className="font-semibold text-slate-800">30-day refund/replacement</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment</span>
                    <span className="font-semibold text-emerald-600">Secure transaction</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Frequently Bought Together Bundle Section */}
          {bundleItems.length > 0 && (
            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-500" />
                <span>Frequently Bought Together</span>
              </h3>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-3">
                  {allBundleProducts.map((p, idx) => (
                    <React.Fragment key={p.id}>
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-[140px]">{p.name}</p>
                          <p className="text-xs font-black text-slate-900">${p.price.toFixed(2)}</p>
                        </div>
                      </div>
                      {idx < allBundleProducts.length - 1 && (
                        <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Total price for all 3:</span>
                    <span className="text-lg font-black text-slate-900">${bundleTotalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleAddBundle}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap"
                  >
                    Add all 3 to Cart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Tabs Bar */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3 sm:gap-6 border-b border-slate-200 pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'qa' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Customer Q&A ({allQA.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('compare')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'compare' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare with Similar</span>
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'map' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Fulfillment & Route Map</span>
              </button>

              <button
                onClick={() => setActiveTab('specs')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap ${
                  activeTab === 'specs' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Specifications
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs sm:text-sm font-bold pb-2 transition-colors whitespace-nowrap ${
                  activeTab === 'reviews' ? 'text-slate-950 border-b-2 border-amber-500 -mb-[9px]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Reviews ({selectedProduct.reviews.length})
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="py-5 space-y-4 animate-in fade-in duration-150">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {selectedProduct.highlights && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Highlights</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProduct.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Q&A Section */}
            {activeTab === 'qa' && (
              <div className="py-5 space-y-5 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={qaSearchQuery}
                      onChange={(e) => setQaSearchQuery(e.target.value)}
                      placeholder="Have a question? Search answers, warranty, specs..."
                      className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    onClick={() => setActiveModal('rufus_ai_modal')}
                    className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shrink-0"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask Rufus AI Instantly</span>
                  </button>
                </div>

                {/* Ask new question box */}
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Ask verified owners and the seller a question..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={!userQuestion.trim()}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg disabled:opacity-50"
                  >
                    Post Question
                  </button>
                </form>

                {/* List of Q&A */}
                <div className="space-y-3">
                  {filteredQA.map((item) => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="font-black text-slate-900 text-xs shrink-0">Question:</span>
                        <span className="font-bold text-xs text-slate-800">{item.question}</span>
                      </div>
                      <div className="flex items-start gap-2 pl-4 border-l-2 border-amber-400">
                        <span className="font-black text-amber-700 text-xs shrink-0">Answer:</span>
                        <span className="text-xs text-slate-700">{item.answer}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                        <span>By {item.author || 'Amazon Customer'}</span>
                        <span className="text-slate-500 font-semibold">{item.votes || 5} people found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Comparison Table */}
            {activeTab === 'compare' && (
              <div className="py-5 overflow-x-auto animate-in fade-in duration-150">
                <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3 text-left w-36">Product</th>
                      {comparisonProducts.map((p) => (
                        <th key={p.id} className="p-3 text-center min-w-[150px]">
                          <img src={p.images[0]} alt={p.name} className="w-16 h-16 rounded-lg object-cover mx-auto mb-1 border border-slate-200" />
                          <span className="truncate block font-bold text-slate-900">{p.name}</span>
                          {p.id === selectedProduct.id && (
                            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded mt-0.5 inline-block">This Item</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Price</td>
                      {comparisonProducts.map((p) => (
                        <td key={p.id} className="p-3 text-center font-black text-slate-900">${p.price.toFixed(2)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Customer Rating</td>
                      {comparisonProducts.map((p) => (
                        <td key={p.id} className="p-3 text-center">
                          <span className="font-bold text-amber-600">★ {p.rating}</span> ({p.reviewCount})
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Prime Eligible</td>
                      {comparisonProducts.map((p) => (
                        <td key={p.id} className="p-3 text-center">
                          <PrimeBadge size="sm" />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-700">Condition</td>
                      {comparisonProducts.map((p) => (
                        <td key={p.id} className="p-3 text-center">{p.condition}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 4: Map */}
            {activeTab === 'map' && (
              <div className="py-5 space-y-4 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-amber-600" />
                      <span>Amazon Fulfillment Center to Doorstep Route</span>
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Origin: <strong>{selectedProduct.hubLocation}</strong> • Destination Zip: <strong>{postalCode}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] text-slate-400 block font-semibold">Distance</span>
                      <strong className="text-slate-900">{transitDistance} miles</strong>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] text-slate-400 block font-semibold">Est. Courier Transit</span>
                      <strong className="text-emerald-600">{transitDuration}</strong>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[320px] bg-slate-100">
                  <div ref={productMapContainerRef} className="w-full h-full" id="product-delivery-leaflet-map" />
                </div>
              </div>
            )}

            {/* Tab 5: Specs */}
            {activeTab === 'specs' && (
              <div className="py-5 animate-in fade-in duration-150">
                <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                  {Object.entries(selectedProduct.specs).map(([key, val], idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3 text-xs bg-white even:bg-slate-50">
                      <span className="font-bold text-slate-600">{key}</span>
                      <span className="col-span-2 text-slate-900 font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Reviews */}
            {activeTab === 'reviews' && (
              <div className="py-5 space-y-6 animate-in fade-in duration-150">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center sm:text-left">
                      <span className="text-3xl font-extrabold text-slate-900 font-heading">
                        {selectedProduct.rating}
                      </span>
                      <span className="text-xs text-slate-400"> / 5.0</span>
                      <div className="flex items-center gap-1 text-amber-500 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 pl-4 border-l border-slate-200">
                      <p className="font-bold text-slate-800">100% Verified Amazon Buyer Ratings</p>
                      <p className="text-[11px]">Calculated from authenticated delivery receipts</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{showReviewForm ? 'Cancel Review' : 'Write a Customer Review'}</span>
                  </button>
                </div>

                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">Share your product feedback</h4>
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">Your Rating:</label>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">Review Comments:</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="What did you like or dislike about this product?"
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500 min-h-[80px]"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Review
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {selectedProduct.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.userAvatar}
                            alt={rev.userName}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">{rev.userName}</span>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>

                      {rev.verifiedPurchase && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-700 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Verified Purchase</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
