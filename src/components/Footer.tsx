import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setSelectedCategory } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 mt-16 border-t border-slate-800">
      
      {/* Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Live GPS Delivery</h4>
              <p className="text-[11px] text-slate-400">Track couriers in real-time on interactive maps</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Buyer Protection</h4>
              <p className="text-[11px] text-slate-400">100% money-back guarantee on verified goods</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">30-Day Free Returns</h4>
              <p className="text-[11px] text-slate-400">Hassle-free doorstep pickup & instant refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-400">Instant in-app courier & marketplace support</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
              OM
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white font-heading">
              Omni<span className="text-indigo-400">Market</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed pr-4">
            The next-generation product marketplace with instant doorstep dispatch, multi-method payment settlement, and real-time courier telemetry tracking.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>450 Lexington Ave, New York, NY 10017</span>
          </div>
        </div>

        {/* Categories Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Marketplace Departments</h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Account & Orders</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span className="hover:text-white cursor-pointer">Track Your Package</span></li>
            <li><span className="hover:text-white cursor-pointer">Order Receipts</span></li>
            <li><span className="hover:text-white cursor-pointer">Saved Addresses</span></li>
            <li><span className="hover:text-white cursor-pointer">2FA Security</span></li>
            <li><span className="hover:text-white cursor-pointer">Seller Directory</span></li>
          </ul>
        </div>

        {/* Newsletter & Promo Column */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Flash Deals</h4>
          <p className="text-xs text-slate-400">
            Subscribe for exclusive 50% discount vouchers delivered straight to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
            />
            <button className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} OmniMarket Inc. All rights reserved. Secure marketplace platform.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-slate-400 cursor-pointer">Security Certifications</span>
        </div>
      </div>

    </footer>
  );
};
