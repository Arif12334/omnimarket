import React from 'react';
import { Zap, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PrimeBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showDelivery?: boolean;
  deliveryTime?: string;
  onClick?: () => void;
}

export const PrimeBadge: React.FC<PrimeBadgeProps> = ({
  size = 'md',
  showDelivery = false,
  deliveryTime = 'Tomorrow',
  onClick
}) => {
  const { isPrimeMember, setActiveModal } = useApp();

  const handleBadgeClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      e.stopPropagation();
      setActiveModal('prime_modal');
    }
  };

  if (size === 'sm') {
    return (
      <div 
        onClick={handleBadgeClick}
        className="inline-flex items-center gap-1 cursor-pointer select-none group"
        title="Amazon Prime - FREE One-Day Delivery"
      >
        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-black tracking-tight px-1.5 py-0.5 rounded shadow-xs group-hover:brightness-110 flex items-center gap-0.5">
          <Zap className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
          <span>prime</span>
        </span>
        {showDelivery && (
          <span className="text-[11px] font-medium text-slate-600">
            {deliveryTime}
          </span>
        )}
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div 
        onClick={handleBadgeClick}
        className="inline-flex flex-col gap-1 cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white text-xs font-black tracking-wider px-2.5 py-1 rounded shadow-xs group-hover:brightness-110 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>prime</span>
          </span>
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
            FREE One-Day Delivery
          </span>
        </div>
        {showDelivery && (
          <span className="text-xs text-slate-600">
            Get it <strong className="text-emerald-700 font-semibold">{deliveryTime}</strong> with Prime
          </span>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={handleBadgeClick}
      className="inline-flex items-center gap-1.5 cursor-pointer select-none group"
      title="Amazon Prime Member Benefit"
    >
      <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[11px] font-black tracking-wider px-2 py-0.5 rounded-sm shadow-xs group-hover:brightness-110 flex items-center gap-0.5">
        <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
        <span>prime</span>
      </span>
      {showDelivery && (
        <span className="text-xs text-slate-700 font-medium">
          FREE <span className="font-bold text-slate-900">{deliveryTime}</span>
        </span>
      )}
    </div>
  );
};
