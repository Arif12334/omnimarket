import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CategorySlug, Market } from '../types';
import { 
  Store, 
  X, 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  Filter, 
  SlidersHorizontal,
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  PlusCircle,
  Globe,
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';

const CATEGORY_TABS: { slug: CategorySlug | 'all'; label: string }[] = [
  { slug: 'all', label: 'All Markets' },
  { slug: 'phones', label: 'Phones & Tablets' },
  { slug: 'electronics', label: 'Electronics & Audio' },
  { slug: 'computers', label: 'Computers & Laptops' },
  { slug: 'fashion', label: 'Fashion & Apparel' },
  { slug: 'home-appliances', label: 'Home Appliances' },
  { slug: 'beauty', label: 'Beauty & Skincare' },
  { slug: 'groceries', label: 'Groceries & Fresh' },
  { slug: 'accessories', label: 'Watches & Accessories' },
];

export const MarketsDirectoryModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    markets, 
    openMarketDetails 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'products' | 'reviews' | 'name' | 'newest'>('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Extract unique cities
  const uniqueCities = useMemo(() => {
    const citySet = new Set<string>();
    markets.forEach(m => {
      if (m.city) citySet.add(m.city);
    });
    return Array.from(citySet).sort();
  }, [markets]);

  // Filter and sort markets
  const filteredMarkets = useMemo(() => {
    let result = markets;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.ownerName.toLowerCase().includes(q) ||
        m.categoryName.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(m => m.category === selectedCategory);
    }

    // City
    if (selectedCity !== 'all') {
      result = result.filter(m => m.city === selectedCity);
    }

    // Prime
    if (primeOnly) {
      result = result.filter(m => m.isAmazonFulfilled);
    }

    // Open Now
    if (openOnly) {
      result = result.filter(m => m.isOpen);
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'products') return b.totalProductsCount - a.totalProductsCount;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [markets, searchQuery, selectedCategory, selectedCity, primeOnly, openOnly, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredMarkets.length / ITEMS_PER_PAGE) || 1;
  const paginatedMarkets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMarkets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMarkets, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll modal body to top
    const modalContent = document.getElementById('markets-modal-content');
    if (modalContent) modalContent.scrollTop = 0;
  };

  const handleCategorySelect = (slug: CategorySlug | 'all') => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  if (activeModal !== 'markets_directory_modal') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Global Markets Directory
                </h2>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {markets.length.toLocaleString()}+ Verified Stores
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore thousands of verified adult merchant storefronts across 40+ international cities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Add Market Button */}
            <button
              onClick={() => setActiveModal('add_market_modal')}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your Market (21+)</span>
            </button>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-3 space-y-3">
          {/* Search + Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            {/* Search input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by store name, merchant, city, category, or tag..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={selectedCity}
                  onChange={(e) => handleCitySelect(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                >
                  <option value="all">All Cities ({uniqueCities.length} Global Hubs)</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <div className="relative">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer appearance-none"
                >
                  <option value="rating">Sort: Highest Rating (★ 5.0)</option>
                  <option value="products">Sort: Most Catalog Items</option>
                  <option value="reviews">Sort: Most Customer Reviews</option>
                  <option value="newest">Sort: Newly Published</option>
                  <option value="name">Sort: Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pills & Quick Filter Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {/* Category horizontal scroll pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full sm:max-w-[70%]">
              {CATEGORY_TABS.map((tab) => {
                const isSelected = selectedCategory === tab.slug;
                return (
                  <button
                    key={tab.slug}
                    onClick={() => handleCategorySelect(tab.slug)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Quick toggles */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => {
                    setPrimeOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-slate-700 text-amber-400 focus:ring-0 w-3.5 h-3.5 bg-slate-950 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Prime 1-Day</span>
                </span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={openOnly}
                  onChange={(e) => {
                    setOpenOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-slate-700 text-amber-400 focus:ring-0 w-3.5 h-3.5 bg-slate-950 cursor-pointer"
                />
                <span className="text-emerald-400 font-medium">Open Now</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="bg-slate-950/60 px-5 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Showing <span className="font-bold text-white">{filteredMarkets.length.toLocaleString()}</span> stores
            {selectedCategory !== 'all' && <span> in <span className="text-amber-300 font-semibold">{CATEGORY_TABS.find(t => t.slug === selectedCategory)?.label}</span></span>}
            {selectedCity !== 'all' && <span> in <span className="text-amber-300 font-semibold">{selectedCity}</span></span>}
          </div>

          <div className="text-[11px] text-slate-400">
            Page <span className="font-bold text-white">{currentPage}</span> of {totalPages}
          </div>
        </div>

        {/* Markets Cards Grid */}
        <div 
          id="markets-modal-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
        >
          {paginatedMarkets.length === 0 ? (
            <div className="py-16 text-center">
              <Store className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No markets matched your filters</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Try searching for another city, clearing your filter tags, or browsing all categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCity('all');
                  setPrimeOnly(false);
                  setOpenOnly(false);
                }}
                className="mt-4 bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl hover:bg-amber-300 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedMarkets.map((market) => (
                <div
                  key={market.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 rounded-2xl overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-xl hover:shadow-amber-400/5 hover:-translate-y-0.5"
                  id={`mkt-card-${market.id}`}
                >
                  {/* Cover Banner */}
                  <div className="relative h-28 w-full bg-slate-800 overflow-hidden">
                    <img
                      src={market.bannerImage}
                      alt={market.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Top status badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="bg-slate-900/90 backdrop-blur-xs text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-400/30 flex items-center gap-1">
                        <Store className="w-3 h-3" />
                        <span>{market.categoryName}</span>
                      </span>

                      {market.isAmazonFulfilled && (
                        <span className="bg-blue-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                          <span>Prime Direct</span>
                        </span>
                      )}
                    </div>

                    {/* Logo Avatar */}
                    <div className="absolute -bottom-3 left-3 w-10 h-10 rounded-xl bg-slate-900 border-2 border-slate-700 overflow-hidden shadow-md">
                      <img
                        src={market.logoImage}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 pt-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Title & Rating */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {market.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 px-1.5 py-0.5 rounded text-[11px] font-black shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{market.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Location & Established */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{market.city}, {market.country}</span>
                        <span className="text-slate-600">•</span>
                        <span className="shrink-0 text-slate-400">Est. {market.establishedYear}</span>
                      </div>

                      {/* Verified Adult Owner Badge */}
                      <div className="flex items-center gap-1.5 mt-2 bg-slate-900/90 border border-slate-800 rounded-lg px-2 py-1 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 truncate">
                          Merchant: <span className="font-semibold text-white">{market.ownerName}</span>
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0">
                          Verified 21+
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {market.description}
                      </p>
                    </div>

                    {/* Footer & Action */}
                    <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-400">
                        <span className="font-bold text-amber-400">{market.totalProductsCount}</span> products in stock
                      </div>

                      <button
                        onClick={() => openMarketDetails(market)}
                        className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
                        id={`btn-open-store-${market.id}`}
                      >
                        <span>Visit Storefront</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Showing <span className="font-bold text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
              <span className="font-bold text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredMarkets.length)}</span> of{' '}
              <span className="font-bold text-white">{filteredMarkets.length.toLocaleString()}</span> stores
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Number Pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                  let p = currentPage;
                  if (currentPage <= 3) p = idx + 1;
                  else if (currentPage >= totalPages - 2) p = totalPages - 4 + idx;
                  else p = currentPage - 2 + idx;

                  if (p < 1 || p > totalPages) return null;
                  const isCurrent = p === currentPage;

                  return (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
