import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CategorySlug, Market } from '../types';
import { 
  Store, 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Image as ImageIcon, 
  Plus, 
  Sparkles, 
  Building2, 
  Tag, 
  Package, 
  ArrowRight,
  Search,
  ExternalLink,
  SlidersHorizontal,
  BadgePercent,
  Check,
  UserCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

const BANNER_PRESETS = [
  {
    label: 'Modern Tech Store',
    url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&auto=format&fit=crop&q=80',
    category: 'electronics'
  },
  {
    label: 'Boutique Fashion Studio',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    category: 'fashion'
  },
  {
    label: 'Organic Farm & Grocery',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80',
    category: 'groceries'
  },
  {
    label: 'Smart Home & Living',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    category: 'home-appliances'
  },
  {
    label: 'Luxury Beauty Lounge',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
    category: 'beauty'
  }
];

const LOGO_PRESETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80'
];

export const AddMarketModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    isAdultVerified, 
    userAge, 
    verifyAdultAge, 
    markets, 
    addMarket, 
    addNewProduct,
    setSelectedCategory,
    setSearchQuery
  } = useApp();

  const [activeTab, setActiveTab] = useState<'create' | 'directory'>('create');

  // Age verification form state (For age > 20 requirement)
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState<number>(2000);
  const [birthMonth, setBirthMonth] = useState<number>(1);
  const [birthDay, setBirthDay] = useState<number>(15);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [ageVerificationError, setAgeVerificationError] = useState<string | null>(null);

  // Calculated age from birth year
  const calculatedAge = currentYear - birthYear;

  // New Market Form State
  const [marketName, setMarketName] = useState<string>('');
  const [category, setCategory] = useState<CategorySlug>('electronics');
  const [description, setDescription] = useState<string>('');
  const [locationCity, setLocationCity] = useState<string>('San Francisco, CA');
  const [address, setAddress] = useState<string>('750 Market Street, Suite 400');
  const [country, setCountry] = useState<string>('United States');
  const [phone, setPhone] = useState<string>('+1 (555) 349-8821');
  const [email, setEmail] = useState<string>(user?.email || 'merchant@market.com');
  const [bannerImage, setBannerImage] = useState<string>(BANNER_PRESETS[0].url);
  const [logoImage, setLogoImage] = useState<string>(LOGO_PRESETS[0]);
  const [openingHours, setOpeningHours] = useState<string>('8:00 AM - 9:00 PM (Daily)');
  const [tagInput, setTagInput] = useState<string>('Prime 1-Day, Verified Merchant, Fast Shipping');
  const [isAmazonFulfilled, setIsAmazonFulfilled] = useState<boolean>(true);

  // Optional initial product state
  const [includeFirstProduct, setIncludeFirstProduct] = useState<boolean>(true);
  const [prodTitle, setProdTitle] = useState<string>('');
  const [prodPrice, setProdPrice] = useState<string>('89.99');
  const [prodStock, setProdStock] = useState<string>('45');

  // Directory filter state
  const [directorySearch, setDirectorySearch] = useState<string>('');
  const [directoryCategory, setDirectoryCategory] = useState<string>('all');

  if (activeModal !== 'add_market_modal') return null;

  const handleVerifyAge = (e: React.FormEvent) => {
    e.preventDefault();
    setAgeVerificationError(null);

    if (!agreedToTerms) {
      setAgeVerificationError('Please certify that you are over 20 years old and agree to merchant policies.');
      return;
    }

    const birthDateString = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;
    const verified = verifyAdultAge(calculatedAge, birthDateString);

    if (!verified) {
      setAgeVerificationError(`Age Restriction: You must be strictly older than 20 years old to register a market (Current calculated age: ${calculatedAge}).`);
    }
  };

  const handleCreateMarket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketName.trim()) {
      alert('Please enter a valid market name.');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.slug === category);
    const tagsArray = tagInput.split(',').map((t) => t.trim()).filter(Boolean);

    const newMarket = addMarket({
      name: marketName.trim(),
      slug: marketName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      categoryName: catObj?.name || 'General Merchandise',
      description: description.trim() || `Official verified storefront for ${marketName}. Specializing in ${catObj?.name || 'premium goods'}.`,
      location: `${locationCity}, ${country}`,
      address: address.trim(),
      city: locationCity.trim(),
      country: country.trim(),
      phone: phone.trim(),
      email: email.trim(),
      bannerImage: bannerImage.trim() || BANNER_PRESETS[0].url,
      logoImage: logoImage.trim() || LOGO_PRESETS[0],
      totalProductsCount: includeFirstProduct && prodTitle.trim() ? 1 : 0,
      verifiedAdultOwner: true,
      ownerAge: userAge || calculatedAge || 25,
      ownerName: user?.name || 'Verified Adult Merchant',
      ownerEmail: user?.email || email.trim(),
      establishedYear: currentYear,
      openingHours: openingHours.trim(),
      isOpen: true,
      isAmazonFulfilled,
      tags: tagsArray.length > 0 ? tagsArray : ['Verified Merchant', 'Prime Fast Ship']
    });

    // If user specified an initial product, create it immediately
    if (includeFirstProduct && prodTitle.trim()) {
      addNewProduct({
        name: prodTitle.trim(),
        category,
        brand: marketName.trim(),
        price: parseFloat(prodPrice) || 49.99,
        originalPrice: (parseFloat(prodPrice) || 49.99) * 1.2,
        stockCount: parseInt(prodStock, 10) || 50,
        images: [logoImage || bannerImage],
        description: `Official launch item from ${marketName}. Handcrafted and quality guaranteed.`,
        location: locationCity,
        seller: {
          id: newMarket.id,
          name: newMarket.name,
          rating: 5.0,
          totalSales: 1,
          verified: true,
          responseTime: 'Within 1 hour',
          location: `${locationCity}, ${country}`,
          joinedDate: 'August 2026',
          isAmazonFulfilled
        }
      });
    }

    // Switch to directory to show the newly added market
    setActiveTab('directory');
  };

  const filteredMarkets = markets.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      m.location.toLowerCase().includes(directorySearch.toLowerCase()) ||
      m.description.toLowerCase().includes(directorySearch.toLowerCase());
    const matchesCat = directoryCategory === 'all' || m.category === directoryCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      id="add-market-modal-backdrop"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        id="add-market-modal-content"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 sm:px-7 sm:py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Marketplace Merchant Hub
                </h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  <ShieldCheck className="w-3 h-3" />
                  Adults 21+
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Register & launch digital marketplaces & multi-vendor storefronts
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            id="close-add-market-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs (if age is verified) */}
        {isAdultVerified && (
          <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-7 py-2.5 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'create'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
                id="tab-add-new-market"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Market</span>
              </button>

              <button
                onClick={() => setActiveTab('directory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'directory'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
                id="tab-market-directory"
              >
                <Building2 className="w-4 h-4" />
                <span>My Markets ({markets.length})</span>
              </button>

              <button
                onClick={() => setActiveModal('markets_directory_modal')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-all shadow-2xs"
                id="btn-open-global-1200-markets"
              >
                <Store className="w-4 h-4 text-amber-700" />
                <span>Global Markets Directory (1,250+)</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Adult Verified (Age {userAge || calculatedAge || '21+'})</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* STATE 1: AGE VERIFICATION GATE (Required for users not yet verified or age <= 20) */}
          {!isAdultVerified ? (
            <div className="max-w-xl mx-auto py-4 space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner border border-amber-200">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Adult Age Verification Required
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  In compliance with eCommerce merchant regulations and consumer protection policies, 
                  <strong> only verified adults older than 20 years (Age 21+)</strong> are authorized to register, own, and operate marketplace storefronts on OmniMarket.
                </p>
              </div>

              {/* Age Verification Card */}
              <form onSubmit={handleVerifyAge} className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 sm:p-6 text-left space-y-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                    Enter Your Date of Birth (Age &gt; 20 Check)
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Month</label>
                      <select
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(parseInt(e.target.value, 10))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="birth-month-select"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                          <option key={m} value={m}>
                            {new Date(2000, m - 1, 1).toLocaleString('default', { month: 'short' })} ({m})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Day</label>
                      <select
                        value={birthDay}
                        onChange={(e) => setBirthDay(parseInt(e.target.value, 10))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="birth-day-select"
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Birth Year</label>
                      <select
                        value={birthYear}
                        onChange={(e) => setBirthYear(parseInt(e.target.value, 10))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="birth-year-select"
                      >
                        {Array.from({ length: 80 }, (_, i) => currentYear - 14 - i).map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Age calculation feedback pill */}
                <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">Calculated Age:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-black ${calculatedAge > 20 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {calculatedAge} Years Old
                    </span>
                    {calculatedAge > 20 ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Eligible (21+)
                      </span>
                    ) : (
                      <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Under 21 (Restricted)
                      </span>
                    )}
                  </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer"
                    id="adult-agreement-checkbox"
                  />
                  <span>
                    I solemnly certify that I am at least 21 years of age (&gt; 20 years old), a legal adult authorized to register merchant stores and enter commercial agreements.
                  </span>
                </label>

                {/* Error Banner */}
                {ageVerificationError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 font-medium">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{ageVerificationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={calculatedAge <= 20}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    calculatedAge > 20
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer hover:scale-[1.01]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  id="confirm-age-verification-btn"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Adult Status &amp; Proceed to Market Creation</span>
                </button>
              </form>
            </div>
          ) : activeTab === 'create' ? (
            /* STATE 2: CREATE NEW MARKET FORM (Unlocked for Adults > 20) */
            <form onSubmit={handleCreateMarket} className="space-y-6" id="create-new-market-form">
              {/* Top Banner Notice */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-indigo-500/10 border border-amber-400/30 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
                    21+
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      Verified Adult Merchant Portal
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Your store will be featured across the OmniMarket catalog with full Prime integration.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                  Status: Approved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Basic Store Details */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Store className="w-4 h-4 text-amber-500" />
                    1. Storefront Identity
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Market / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Artisans &amp; High-Tech"
                      value={marketName}
                      onChange={(e) => setMarketName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                      id="market-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Market Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategorySlug)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                      id="market-category-select"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name} ({c.description})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Store Description &amp; Specialty
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe what makes your market unique, warranty policies, and key product offerings..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 resize-none"
                      id="market-description-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Store Tags (Comma separated)
                    </label>
                    <div className="relative">
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Fast Shipping, Eco-Friendly, Artisan, Verified"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="market-tags-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Location, Operating Hours & Contact */}
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    2. Location &amp; Contact Information
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City &amp; State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Austin, TX"
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="market-city-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="market-country-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 104 Main Street, Warehouse #2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                      id="market-address-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Business Phone
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl pl-8.5 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                          id="market-phone-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Operating Hours
                      </label>
                      <div className="relative">
                        <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={openingHours}
                          onChange={(e) => setOpeningHours(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl pl-8.5 pr-3 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                          id="market-hours-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Merchant Email
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-8.5 pr-3.5 py-2.5 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="market-email-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Branding Section */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                  3. Storefront Imagery &amp; Visual Brand
                </h3>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Select Quick Banner Preset or Provide Image URL
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {BANNER_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setBannerImage(preset.url)}
                        className={`relative rounded-xl overflow-hidden border-2 transition-all group text-left ${
                          bannerImage === preset.url ? 'border-amber-500 ring-2 ring-amber-400/50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-14 object-cover" 
                        />
                        <div className="p-1 text-[10px] font-bold text-slate-800 truncate bg-white">
                          {preset.label}
                        </div>
                        {bannerImage === preset.url && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <input
                    type="url"
                    placeholder="Or paste custom Banner Image URL..."
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-amber-400 mt-1"
                    id="market-banner-input"
                  />
                </div>
              </div>

              {/* Optional: Add Initial Product */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeFirstProduct}
                    onChange={(e) => setIncludeFirstProduct(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
                    id="include-first-product-checkbox"
                  />
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-amber-500" />
                    Launch Initial Product in this Market Storefront immediately
                  </span>
                </label>

                {includeFirstProduct && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="sm:col-span-1">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        First Product Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Signature Artisan Series 1"
                        value={prodTitle}
                        onChange={(e) => setProdTitle(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="first-product-title"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Selling Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="89.99"
                        value={prodPrice}
                        onChange={(e) => setProdPrice(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="first-product-price"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Initial Stock Units
                      </label>
                      <input
                        type="number"
                        placeholder="50"
                        value={prodStock}
                        onChange={(e) => setProdStock(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                        id="first-product-stock"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  id="publish-market-submit-btn"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>🚀 Publish &amp; Launch New Market</span>
                </button>
              </div>
            </form>
          ) : (
            /* STATE 3: BROWSE ACTIVE MARKETS DIRECTORY */
            <div className="space-y-5" id="markets-directory-view">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Search verified markets by name, location, or specialty..."
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                    id="market-search-input"
                  />
                </div>

                <select
                  value={directoryCategory}
                  onChange={(e) => setDirectoryCategory(e.target.value)}
                  className="w-full sm:w-auto bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  id="market-category-filter"
                >
                  <option value="all">All Market Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <button
                  onClick={() => setActiveTab('create')}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 rounded-2xl shrink-0 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Market</span>
                </button>
              </div>

              {/* Markets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMarkets.map((market) => (
                  <div
                    key={market.id}
                    className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group"
                    id={`market-card-${market.id}`}
                  >
                    {/* Market Banner Image */}
                    <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={market.bannerImage}
                        alt={market.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-amber-400" />
                          {market.city || market.location}
                        </span>
                        {market.verifiedAdultOwner && (
                          <span className="bg-emerald-500/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            Adult Verified
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={market.logoImage}
                            alt={market.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-md bg-white"
                          />
                          <div className="text-white drop-shadow-xs">
                            <h4 className="text-xs font-black leading-tight line-clamp-1">{market.name}</h4>
                            <span className="text-[10px] text-slate-200 font-medium">{market.categoryName}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market Details Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {market.description}
                      </p>

                      {/* Store Meta Info */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{market.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate">Owner (Age: {market.ownerAge}y)</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {market.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
                          <span>★ {market.rating.toFixed(1)}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({market.reviewCount} ratings)</span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCategory(market.category);
                            setSearchQuery(market.name);
                            setActiveModal(null);
                          }}
                          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-colors"
                        >
                          <span>Explore Catalog</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
