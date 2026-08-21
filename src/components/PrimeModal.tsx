import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  Truck, 
  Film, 
  Music, 
  ShoppingBag, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrimeModal: React.FC = () => {
  const { activeModal, setActiveModal, isPrimeMember, togglePrimeMembership, activatePrimeTrial, formatPrice } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly' | 'student'>('annual');

  if (activeModal !== 'prime_modal') return null;

  const benefits = [
    {
      icon: Truck,
      color: 'bg-blue-50 text-blue-600',
      title: 'FREE One-Day & Same-Day Delivery',
      desc: 'No minimum order required on millions of eligible items delivered directly to your doorstep.'
    },
    {
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600',
      title: '30-Minute Early Access to Lightning Deals',
      desc: 'Snag top deals before they sell out during Prime Day and daily flash sales.'
    },
    {
      icon: Film,
      color: 'bg-indigo-50 text-indigo-600',
      title: 'Prime Video Streaming',
      desc: 'Watch award-winning Amazon Originals, blockbuster movies, and live sports in 4K HDR.'
    },
    {
      icon: ShoppingBag,
      color: 'bg-emerald-50 text-emerald-600',
      title: 'Subscribe & Save Extra 15%',
      desc: 'Automate everyday essentials like groceries, coffee, and household goods at steep discounts.'
    },
    {
      icon: Music,
      color: 'bg-rose-50 text-rose-600',
      title: 'Amazon Music & Podcasts',
      desc: 'Enjoy 100 million songs ad-free and top podcast series with unlimited skips.'
    },
    {
      icon: CreditCard,
      color: 'bg-purple-50 text-purple-600',
      title: '5% Back with Prime Visa',
      desc: 'Earn 5% back on all Amazon.com and Whole Foods Market purchases with no annual fee.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Amazon Prime gradient */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-black tracking-widest px-3 py-1 rounded-sm shadow-md">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>PRIME</span>
            </span>
            {isPrimeMember && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Member
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
            Fast, Free Delivery & Exclusive Entertainment
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-lg">
            Join over 200 million members enjoying lightning-fast shipping, early deal drops, and unlimited streaming.
          </p>

          {/* Membership Status Switcher */}
          <div className="mt-5 flex flex-wrap items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
            <div className="flex-1 min-w-[180px]">
              <div className="text-xs text-slate-300">Your Current Status:</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                {isPrimeMember ? (
                  <span className="text-emerald-400">Prime Member (Free One-Day Active)</span>
                ) : (
                  <span className="text-slate-300">Standard Customer</span>
                )}
              </div>
            </div>
            <button
              onClick={togglePrimeMembership}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isPrimeMember 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md'
              }`}
            >
              {isPrimeMember ? 'Switch to Standard Mode (Demo)' : 'Activate Prime Mode'}
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Included with your Prime Membership
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg ${b.color} shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{b.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Plans */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Choose your plan (Cancel anytime)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div 
                onClick={() => setSelectedPlan('annual')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center relative ${
                  selectedPlan === 'annual' 
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Best Value
                </span>
                <div className="text-xs font-bold text-slate-900 mt-1">Annual</div>
                <div className="text-base font-black text-slate-900 mt-1">{formatPrice(139)}<span className="text-xs font-normal text-slate-500">/yr</span></div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Save {formatPrice(40.88)}/yr</div>
              </div>

              <div 
                onClick={() => setSelectedPlan('monthly')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                  selectedPlan === 'monthly' 
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Monthly</div>
                <div className="text-base font-black text-slate-900 mt-1">{formatPrice(14.99)}<span className="text-xs font-normal text-slate-500">/mo</span></div>
                <div className="text-[10px] text-slate-500 mt-0.5">Flexible billing</div>
              </div>

              <div 
                onClick={() => setSelectedPlan('student')}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-center ${
                  selectedPlan === 'student' 
                    ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Prime Student</div>
                <div className="text-base font-black text-slate-900 mt-1">{formatPrice(7.49)}<span className="text-xs font-normal text-slate-500">/mo</span></div>
                <div className="text-[10px] text-blue-600 font-semibold mt-0.5">6 Months Free</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>30-day free trial. Automatic renewal at plan rate. Cancel anytime online.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                activatePrimeTrial();
                setActiveModal(null);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all text-center"
            >
              Start 30-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
