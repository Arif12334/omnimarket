import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  User as UserIcon, 
  Sparkles, 
  ChevronDown, 
  X, 
  Compass, 
  ShieldCheck, 
  PackageCheck, 
  LogOut, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Tag,
  Zap,
  Heart,
  Flame,
  Bot,
  Store
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { CategorySlug } from '../types';
import { PrimeBadge } from './PrimeBadge';

export const Navbar: React.FC = () => {
  const { 
    user, 
    cartItemCount, 
    cartSubtotal, 
    activeModal,
    setActiveModal, 
    orders, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    products, 
    openProductDetails,
    openTrackOrder,
    logout,
    isPrimeMember,
    wishlists,
    selectedZipCode,
    selectedCity
  } = useApp();

  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Active delivery order for instant tracker beacon
  const activeDeliveryOrder = orders.find(
    (o) => o.orderStatus === 'out_for_delivery' || o.orderStatus === 'processing' || o.orderStatus === 'shipped'
  );

  const totalWishlistItems = wishlists.reduce((sum, wl) => sum + wl.items.length, 0);

  // Autocomplete matching
  const matchingProducts = searchQuery.trim().length > 0 
    ? products.filter((p) => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const popularSearches = ['OLED 4K TV', '5G Smartphone', 'Espresso Machine', 'Wireless Headphones', 'Noise Cancelling'];

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Bar with Amazon Prime and Delivery Location */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Amazon Deliver To Location Selector */}
            <button
              onClick={() => setActiveModal('location_modal')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer group"
              id="deliver-to-location-btn"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <div className="text-left leading-tight">
                <span className="hidden sm:inline text-[10px] text-slate-400 block -mb-0.5">Deliver to</span>
                <span className="font-bold text-white max-w-[150px] truncate text-[11px] block">
                  {selectedCity} {selectedZipCode}
                </span>
              </div>
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            {/* Amazon Prime Hub trigger */}
            <button
              onClick={() => setActiveModal('prime_modal')}
              className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-900 transition-colors"
            >
              <PrimeBadge size="sm" />
              <span className="text-[11px] text-slate-300">
                {isPrimeMember ? (
                  <span className="text-emerald-400 font-semibold">FREE 1-Day Delivery Active</span>
                ) : (
                  <span className="text-amber-300 font-semibold underline underline-offset-2">Try 30 Days Free</span>
                )}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Today's Deals Trigger */}
            <button
              onClick={() => setActiveModal('deal_hub_modal')}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors text-[11px]"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Today's Deals</span>
            </button>

            {/* Amazon Rufus AI Trigger */}
            <button
              onClick={() => setActiveModal('rufus_ai_modal')}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-indigo-600 hover:from-amber-300 hover:to-indigo-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow-xs text-[11px] transition-all hover:scale-105"
              id="rufus-ai-nav-btn"
            >
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>Ask Rufus AI</span>
            </button>

            {/* Top Bar Add Market Trigger (Adults > 20) */}
            <button
              onClick={() => setActiveModal('add_market_modal')}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-400 font-bold transition-colors text-[11px]"
              id="top-bar-add-market-link"
              title="Add New Market Storefront (Adults 21+)"
            >
              <Store className="w-3.5 h-3.5 text-amber-400" />
              <span>Add Market (21+)</span>
            </button>

            {/* Header Top Bar Quick Sign In link when not logged in */}
            {!user ? (
              <button
                onClick={() => setActiveModal('auth')}
                className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-400 font-bold transition-colors text-[11px]"
                id="top-bar-sign-in-link"
              >
                <UserIcon className="w-3 h-3 text-amber-400" />
                <span>Hello, Sign in</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal('user_profile')}
                className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-400 font-medium transition-colors text-[11px]"
              >
                <span className="text-slate-400">Hi,</span>
                <span className="font-bold text-white truncate max-w-[80px]">{user.name.split(' ')[0]}</span>
              </button>
            )}

            {/* Quick Live Tracking Button if active delivery exists */}
            {activeDeliveryOrder && (
              <button
                onClick={() => openTrackOrder(activeDeliveryOrder.id)}
                className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px]">Live GPS Tracking</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              id="app-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-black tracking-tight text-slate-900 block font-heading">
                    Omni<span className="text-amber-500">Prime</span>
                  </span>
                  <span className="text-[10px] bg-slate-900 text-amber-300 font-black px-1.5 py-0.2 rounded">.market</span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block -mt-1">
                  Amazon-Speed Global Hub
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar with Department Selector & Autocomplete */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl hidden md:block">
            <div className={`relative flex items-center w-full rounded-xl border bg-slate-50/80 transition-all ${
              searchFocused 
                ? 'border-amber-500 ring-3 ring-amber-500/15 bg-white shadow-md' 
                : 'border-slate-300 hover:border-slate-400'
            }`}>
              
              {/* Category Picker Dropdown in Search Bar */}
              <div className="relative border-r border-slate-200">
                <button
                  type="button"
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap bg-slate-100 rounded-l-xl"
                  id="search-category-dropdown"
                >
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {selectedCategory === 'all' 
                      ? 'All Departments' 
                      : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Category'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {categoryMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors ${
                        selectedCategory === 'all' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      All Departments
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center justify-between ${
                          selectedCategory === cat.slug ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search Amazon products, brands, tech, deals..."
                  className="w-full bg-transparent px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  id="main-search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-slate-400 hover:text-slate-600 mr-2 rounded-full hover:bg-slate-200"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <button 
                type="button"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-r-xl transition-colors flex items-center justify-center m-[1px]"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </button>
            </div>

            {/* Autocomplete Dropdown Popover */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {searchQuery.trim().length === 0 ? (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                      Trending on Amazon
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 px-1">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setSearchFocused(false);
                          }}
                          className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Search className="w-3 h-3 text-slate-400" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-semibold text-slate-400 px-2 py-1">
                      Matching Products ({matchingProducts.length})
                    </div>
                    {matchingProducts.length > 0 ? (
                      <div className="divide-y divide-slate-100 mt-1">
                        {matchingProducts.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              openProductDetails(prod);
                              setSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{prod.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-extrabold text-slate-900">${prod.price.toFixed(2)}</span>
                                <PrimeBadge size="sm" />
                                <span className="text-[11px] text-slate-400 capitalize">{prod.brand}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-slate-500 text-xs">
                        No products found matching "{searchQuery}". Try browsing by category.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: Wishlist, Returns & Orders, User Profile, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">

            {/* Add Market / Storefront Hub Trigger (Adults 21+) */}
            <button
              onClick={() => setActiveModal('add_market_modal')}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xs transition-all border border-amber-400/80 hover:shadow-md cursor-pointer group active:scale-95"
              id="header-add-market-btn"
              title="Add New Market Storefront (Adults > 20 / 21+ Only)"
            >
              <Store className="w-4 h-4 text-slate-950 shrink-0" />
              <span className="hidden md:inline font-black">Add Market</span>
              <span className="bg-slate-950 text-amber-400 text-[9px] font-black px-1.5 py-0.2 rounded-full">
                21+
              </span>
            </button>
            
            {/* Amazon Wishlist Trigger */}
            <button
              onClick={() => setActiveModal('wishlist_modal')}
              className="relative flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 font-semibold text-xs border border-slate-200 transition-colors shadow-2xs"
              id="wishlists-nav-btn"
              title="View your saved Wishlists"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="hidden lg:inline font-bold">Wishlist</span>
              {totalWishlistItems > 0 && (
                <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Returns & Orders */}
            <button
              onClick={() => {
                if (user) {
                  setActiveModal('user_profile');
                } else {
                  setActiveModal('auth');
                }
              }}
              className="text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all hidden sm:block"
              id="returns-orders-btn"
            >
              <span className="text-[10px] text-slate-400 block leading-tight font-medium">Returns</span>
              <span className="text-xs font-bold text-slate-900 block leading-tight">& Orders</span>
            </button>

            {/* User Account / Profile Dropdown */}
            <div ref={userMenuRef} className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all focus:outline-none"
                  id="user-account-btn"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/30"
                  />
                  <div className="text-left hidden lg:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight max-w-[90px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-tight">Account & Lists</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                </button>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Amazon style Hello, Sign In */}
                  <button
                    onClick={() => setActiveModal('auth')}
                    className="text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all hidden xl:block"
                    id="hello-signin-nav-btn"
                  >
                    <span className="text-[10px] text-slate-400 block leading-tight font-medium">Hello, sign in</span>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Account & Lists</span>
                  </button>

                  {/* Sign in with Google Button */}
                  <button
                    onClick={() => setActiveModal('auth')}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-bold text-xs shadow-2xs transition-colors"
                    id="google-quick-nav-btn"
                    title="Sign in with Google"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                    <span className="hidden sm:inline">Sign in with Google</span>
                    <span className="sm:hidden">Google</span>
                  </button>

                  {/* Primary Sign In Button */}
                  <button
                    onClick={() => setActiveModal('auth')}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer"
                    id="header-sign-in-btn"
                  >
                    <UserIcon className="w-4 h-4 text-slate-950" />
                    <span>Sign In</span>
                  </button>
                </div>
              )}

              {/* User Dropdown Menu */}
              {userMenuOpen && user && (
                <div className="absolute right-0 top-full mt-2 w-68 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      {user.authProvider === 'google' ? (
                        <span className="inline-flex items-center gap-1 text-[9px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded-full border border-blue-200">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                          </svg>
                          Google
                        </span>
                      ) : (
                        <PrimeBadge size="sm" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="flex items-center justify-between mt-2">
                      <PrimeBadge size="sm" />
                      <span className="text-[10px] text-emerald-600 font-semibold">Verified Member</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveModal('user_profile');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-medium flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <PackageCheck className="w-4 h-4 text-slate-400" />
                        <span>Your Orders & BNPL</span>
                      </div>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {orders.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveModal('wishlist_modal');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-rose-600 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Your Wishlists & Lists</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveModal('prime_modal');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>Prime Membership Hub</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveModal('add_market_modal');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-700 font-medium flex items-center justify-between transition-colors"
                      id="dropdown-add-market-btn"
                    >
                      <div className="flex items-center gap-2.5">
                        <Store className="w-4 h-4 text-amber-500" />
                        <span>Add New Market</span>
                      </div>
                      <span className="bg-amber-100 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        21+
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (orders.length > 0) {
                          openTrackOrder(orders[0].id);
                        } else {
                          setActiveModal('user_profile');
                        }
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <Compass className="w-4 h-4 text-indigo-500" />
                      <span>Live Delivery Tracking</span>
                    </button>

                    {/* Google Switch Account Button */}
                    <button
                      onClick={() => {
                        setActiveModal('auth');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                      </svg>
                      <span>Switch / Sign in with Google</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Trigger Button */}
            <button
              onClick={() => setActiveModal('cart_drawer')}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 px-3.5 py-2 rounded-xl shadow-md transition-all font-black"
              id="shopping-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-slate-950" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-900 text-amber-400 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] text-slate-800 uppercase font-bold block leading-none">Cart</span>
                <span className="text-xs font-black text-slate-950 block leading-tight">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center w-full rounded-xl border border-slate-300 bg-slate-50/90">
            <Search className="w-4 h-4 text-slate-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon products, brands, tech..."
              className="w-full bg-transparent px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 mr-2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Subnav Strip with Amazon Quick Links */}
      <div className="border-t border-slate-200/80 bg-slate-100/70 overflow-x-auto scrollbar-none px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setActiveModal('deal_hub_modal')}
              className="px-3 py-1 rounded-lg text-xs font-black whitespace-nowrap bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 flex items-center gap-1"
            >
              <Flame className="w-3 h-3" />
              <span>Today's Deals</span>
            </button>

            <button
              onClick={() => setActiveModal('prime_modal')}
              className="px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1"
            >
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Prime Video & Delivery</span>
            </button>

            <button
              onClick={() => setActiveModal('wishlist_modal')}
              className="px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap bg-white text-slate-700 hover:bg-slate-200 border border-slate-200 flex items-center gap-1"
            >
              <Heart className="w-3 h-3 text-rose-500" />
              <span>Registry & Lists</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-600 shrink-0">
            <span className="text-emerald-600 flex items-center gap-1 font-black">
              <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              FREE Prime Shipping over $25
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

