import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Check, 
  Truck, 
  Building, 
  Home, 
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateDeliveryETA } from '../utils/amazonUtils';

export const DeliveryLocationModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    selectedZipCode, 
    selectedCity, 
    updateDeliveryLocation,
    isPrimeMember 
  } = useApp();

  const [inputZip, setInputZip] = useState(selectedZipCode);
  const eta = calculateDeliveryETA(selectedZipCode, isPrimeMember);

  if (activeModal !== 'location_modal') return null;

  const popularLocations = [
    { zip: '10001', city: 'New York, NY', state: 'NY' },
    { zip: '90001', city: 'Los Angeles, CA', state: 'CA' },
    { zip: '60601', city: 'Chicago, IL', state: 'IL' },
    { zip: '94103', city: 'San Francisco, CA', state: 'CA' },
    { zip: '33101', city: 'Miami, FL', state: 'FL' },
    { zip: '98101', city: 'Seattle, WA', state: 'WA' },
    { zip: '75001', city: 'Dallas, TX', state: 'TX' }
  ];

  const handleApplyZip = (zip: string, city: string) => {
    updateDeliveryLocation(zip, city);
    setActiveModal(null);
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = inputZip.trim();
    if (!cleanZip) return;
    const found = popularLocations.find((l) => l.zip === cleanZip);
    const city = found ? found.city : `Zipcode ${cleanZip}`;
    handleApplyZip(cleanZip, city);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/20 text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Choose your location</h3>
              <p className="text-xs text-slate-400">Delivery options and speeds may vary for different locations</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Active Speed Preview */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
            <Truck className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">{eta.label}</span>
              <span className="text-slate-600">
                Order within <strong className="text-blue-700 font-semibold">{eta.cutoffRemaining}</strong> for fastest delivery.
              </span>
            </div>
          </div>

          {/* User Saved Addresses */}
          {user && user.savedAddresses.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Your Saved Addresses
              </label>
              <div className="space-y-2">
                {user.savedAddresses.map((addr) => {
                  const isSelected = selectedZipCode === addr.zipCode;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleApplyZip(addr.zipCode, `${addr.city}, ${addr.state}`)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                          {addr.label === 'Home' ? <Home className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">{addr.label}</span>
                            <span className="text-xs text-slate-500 truncate">• {addr.fullName}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{addr.street}, {addr.city} {addr.zipCode}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enter ZIP Code form */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Enter a US ZIP Code
            </label>
            <form onSubmit={handleZipSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputZip}
                onChange={(e) => setInputZip(e.target.value)}
                placeholder="e.g. 10001"
                maxLength={5}
                className="flex-1 px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Apply
              </button>
            </form>
          </div>

          {/* Popular Cities */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Or pick a major metropolitan hub
            </label>
            <div className="grid grid-cols-2 gap-2">
              {popularLocations.map((loc) => (
                <button
                  key={loc.zip}
                  onClick={() => handleApplyZip(loc.zip, loc.city)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    selectedZipCode === loc.zip
                      ? 'border-blue-600 bg-blue-50 font-bold text-blue-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold">{loc.city}</div>
                  <div className="text-[10px] text-slate-400">Zip: {loc.zip}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
