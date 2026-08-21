import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_CURRENCIES, formatCurrency, convertFromUSD } from '../data/currencies';
import { CurrencyCode, CurrencyConfig } from '../types';
import { 
  Coins, 
  X, 
  Search, 
  Check, 
  Globe2, 
  ArrowRightLeft, 
  Sparkles, 
  TrendingUp,
  DollarSign,
  Info
} from 'lucide-react';

const REGIONS = ['All Regions', 'Americas', 'Europe', 'Asia Pacific', 'Middle East & Africa'] as const;

export const CurrencyModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    selectedCurrency, 
    setSelectedCurrency, 
    showToast,
    cartSubtotal 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [previewUSDAmount, setPreviewUSDAmount] = useState<number>(100);

  const filteredCurrencies = useMemo(() => {
    let list = SUPPORTED_CURRENCIES;

    if (selectedRegion !== 'All Regions') {
      list = list.filter((c) => c.region === selectedRegion);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.symbol.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedRegion]);

  const handleSelectCurrency = (currency: CurrencyConfig) => {
    setSelectedCurrency(currency.code);
    showToast(
      'success',
      `Currency Updated to ${currency.name} (${currency.code})`,
      `All product prices, cart totals, and checkout payments will now be displayed in ${currency.symbol} ${currency.code}.`
    );
    setActiveModal(null);
  };

  if (activeModal !== 'currency_modal') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white tracking-tight">
                  Select Store Currency
                </h2>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  24 Global Currencies
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Browse catalog, checkout, and pay with flexible global payment conversion
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close currency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Conversion Banner */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-b border-slate-800 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300">
              Active Currency:{' '}
              <strong className="text-amber-300 font-bold">
                {SUPPORTED_CURRENCIES.find((c) => c.code === selectedCurrency)?.flag}{' '}
                {selectedCurrency} ({SUPPORTED_CURRENCIES.find((c) => c.code === selectedCurrency)?.symbol})
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">$100 USD =</span>
            <span className="text-amber-400 font-black">
              {formatCurrency(100, selectedCurrency, { showCode: true })}
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by currency name, code (e.g. EUR, NGN, GBP, CAD), or symbol..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Currencies Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {filteredCurrencies.map((curr) => {
              const isCurrent = curr.code === selectedCurrency;
              const convertedPreview = formatCurrency(50, curr.code);

              return (
                <button
                  key={curr.code}
                  onClick={() => handleSelectCurrency(curr)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer group ${
                    isCurrent
                      ? 'bg-amber-400/10 border-amber-400 text-white shadow-md ring-1 ring-amber-400/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/80 text-slate-300'
                  }`}
                  id={`currency-option-${curr.code}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0 leading-none">{curr.flag}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">
                          {curr.code}
                        </span>
                        <span className="text-xs text-amber-400/90 font-mono font-bold bg-slate-900 px-1.5 py-0.2 rounded border border-slate-700">
                          {curr.symbol}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {curr.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        $50 USD ≈ <span className="text-slate-300 font-semibold">{convertedPreview}</span>
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center">
                    {isCurrent ? (
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-slate-700 group-hover:border-amber-400/60" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredCurrencies.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Coins className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <p className="text-sm font-bold text-white">No currencies found</p>
              <p className="text-xs mt-1">Try clearing your search query or selecting "All Regions".</p>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Exchange rates are dynamically updated with zero international conversion surcharges.</span>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
