import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Star, 
  Check, 
  ChevronDown,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { ProductCondition, CategorySlug } from '../types';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    filterState, 
    setFilterState, 
    resetFilters, 
    selectedCategory, 
    setSelectedCategory 
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands and locations for dynamic filter options
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.location))).sort();
  }, [products]);

  // Filter & Sort computation
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filterState.category !== 'all' && product.category !== filterState.category) {
        return false;
      }

      // Search keyword filter
      if (filterState.search.trim().length > 0) {
        const query = filterState.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // Price filter
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }

      // Condition filter
      if (filterState.condition !== 'all' && product.condition !== filterState.condition) {
        return false;
      }

      // Rating filter
      if (filterState.minRating > 0 && product.rating < filterState.minRating) {
        return false;
      }

      // In Stock filter
      if (filterState.inStockOnly && product.stockCount <= 0) {
        return false;
      }

      // Brand filter
      if (filterState.brand !== 'all' && product.brand !== filterState.brand) {
        return false;
      }

      // Location filter
      if (filterState.location !== 'all' && product.location !== filterState.location) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'popular':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });
  }, [products, filterState]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterState.category !== 'all') count++;
    if (filterState.search.trim().length > 0) count++;
    if (filterState.minPrice > 0 || filterState.maxPrice < 3000) count++;
    if (filterState.condition !== 'all') count++;
    if (filterState.minRating > 0) count++;
    if (filterState.inStockOnly) count++;
    if (filterState.brand !== 'all') count++;
    if (filterState.location !== 'all') count++;
    return count;
  }, [filterState]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="product-marketplace-section">
      
      {/* Header bar with count & sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
              {filterState.category === 'all' 
                ? 'All Products' 
                : CATEGORIES.find((c) => c.slug === filterState.category)?.name || 'Products'}
            </h2>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
              {filteredProducts.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing verified marketplace listings with doorstep delivery guarantee
          </p>
        </div>

        {/* Filter Drawer Toggle & Sort Dropdown */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <span className="text-[11px] font-semibold text-slate-400">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              id="sort-select"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount %</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-3">
          <span className="text-xs text-slate-400 font-semibold">Active Filters:</span>

          {filterState.search && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              Query: "{filterState.search}"
              <button onClick={() => setFilterState((p) => ({ ...p, search: '' }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {filterState.category !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              Category: {filterState.category}
              <button onClick={() => setSelectedCategory('all')}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {(filterState.minPrice > 0 || filterState.maxPrice < 3000) && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              ${filterState.minPrice} - ${filterState.maxPrice}
              <button onClick={() => setFilterState((p) => ({ ...p, minPrice: 0, maxPrice: 3000 }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {filterState.condition !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              Condition: {filterState.condition}
              <button onClick={() => setFilterState((p) => ({ ...p, condition: 'all' }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {filterState.minRating > 0 && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              {filterState.minRating}★ & up
              <button onClick={() => setFilterState((p) => ({ ...p, minRating: 0 }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {filterState.inStockOnly && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              In Stock Only
              <button onClick={() => setFilterState((p) => ({ ...p, inStockOnly: false }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          {filterState.brand !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-indigo-200">
              Brand: {filterState.brand}
              <button onClick={() => setFilterState((p) => ({ ...p, brand: 'all' }))}>
                <X className="w-3 h-3 text-indigo-500 hover:text-indigo-800" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-2 underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset All
          </button>
        </div>
      )}

      {/* Main Container: Filter Sidebar (left) + Products Grid (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900">Filters</h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-slate-400 hover:text-rose-600 font-semibold transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Department / Category Filter */}
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                Department
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    filterState.category === 'all'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>All Departments</span>
                  <span className="text-[10px] text-slate-400">{products.length}</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      filterState.category === cat.slug
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {products.filter((p) => p.category === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Price Range
                </label>
                <span className="text-xs font-bold text-indigo-600">
                  ${filterState.minPrice} - ${filterState.maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="50"
                value={filterState.maxPrice}
                onChange={(e) => setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                <span>$0</span>
                <span>$1,500</span>
                <span>$3,000+</span>
              </div>
            </div>

            {/* Condition Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                Condition
              </label>
              <div className="space-y-1.5">
                {(['all', 'New', 'Refurbished', 'Open Box'] as (ProductCondition | 'all')[]).map((cond) => (
                  <label
                    key={cond}
                    className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-indigo-600"
                  >
                    <input
                      type="radio"
                      name="condition"
                      checked={filterState.condition === cond}
                      onChange={() => setFilterState((prev) => ({ ...prev, condition: cond }))}
                      className="accent-indigo-600"
                    />
                    <span className="capitalize">{cond === 'all' ? 'Any Condition' : cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                Customer Rating
              </label>
              <div className="space-y-1.5">
                {[
                  { stars: 4.5, label: '4.5 & up (Top Rated)' },
                  { stars: 4.0, label: '4.0 & up' },
                  { stars: 3.0, label: '3.0 & up' },
                  { stars: 0, label: 'All Ratings' }
                ].map((item) => (
                  <button
                    key={item.stars}
                    onClick={() => setFilterState((prev) => ({ ...prev, minRating: item.stars }))}
                    className={`w-full flex items-center justify-between text-xs px-2 py-1 rounded-md transition-colors ${
                      filterState.minRating === item.stars
                        ? 'bg-amber-50 text-amber-900 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {item.stars > 0 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                      <span>{item.label}</span>
                    </div>
                    {filterState.minRating === item.stars && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 block mb-2 uppercase tracking-wider text-[11px]">
                Brand
              </label>
              <select
                value={filterState.brand}
                onChange={(e) => setFilterState((prev) => ({ ...prev, brand: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-600"
              >
                <option value="all">All Brands</option>
                {uniqueBrands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Availability Toggle */}
            <div className="pt-4 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-slate-800">In Stock Only</span>
                <input
                  type="checkbox"
                  checked={filterState.inStockOnly}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* Product Cards Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                We couldn't find any products matching your active filters. Try adjusting price bounds, condition or resetting filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto ml-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Department */}
              <div className="mt-4">
                <label className="text-xs font-bold text-slate-900 block mb-2">Department</label>
                <select
                  value={filterState.category}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-900 block mb-1">
                  Max Price: ${filterState.maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filterState.maxPrice}
                  onChange={(e) => setFilterState((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Condition */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-900 block mb-2">Condition</label>
                <div className="space-y-1">
                  {(['all', 'New', 'Refurbished', 'Open Box'] as any[]).map((cond) => (
                    <label key={cond} className="flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="radio"
                        name="mobile-cond"
                        checked={filterState.condition === cond}
                        onChange={() => setFilterState((p) => ({ ...p, condition: cond }))}
                        className="accent-indigo-600"
                      />
                      <span>{cond === 'all' ? 'All Conditions' : cond}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
