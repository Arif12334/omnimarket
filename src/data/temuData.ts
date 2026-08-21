import { CouponBundleItem, WheelPrize, SlashItem } from '../types';

export const TEMU_COUPON_BUNDLES: CouponBundleItem[] = [
  {
    id: 'cb-1',
    code: 'OMNI100-A',
    discountAmount: 10,
    minSpend: 20,
    title: '$10 OFF on orders over $20',
    description: 'Valid across all categories, no restrictions.',
    expiresInHours: 24,
    isClaimed: false
  },
  {
    id: 'cb-2',
    code: 'OMNI100-B',
    discountAmount: 25,
    minSpend: 50,
    title: '$25 OFF on orders over $50',
    description: 'Instant 50% discount boost on electronics, fashion & home.',
    expiresInHours: 24,
    isClaimed: false
  },
  {
    id: 'cb-3',
    code: 'OMNI100-C',
    discountAmount: 30,
    minSpend: 75,
    title: '$30 OFF on orders over $75',
    description: 'Super saver for multi-item cart purchases.',
    expiresInHours: 48,
    isClaimed: false
  },
  {
    id: 'cb-4',
    code: 'OMNI100-D',
    discountAmount: 35,
    minSpend: 100,
    title: '$35 OFF on orders over $100',
    description: 'Maximum tier bundle voucher with 0% fees.',
    expiresInHours: 48,
    isClaimed: false
  }
];

export const TEMU_VIP_200_BUNDLES: CouponBundleItem[] = [
  {
    id: 'vip-1',
    code: 'OMNI-VIP-A',
    discountAmount: 20,
    minSpend: 40,
    title: '$20 OFF on orders over $40',
    description: 'VIP Gold exclusive discount.',
    expiresInHours: 72,
    isClaimed: false
  },
  {
    id: 'vip-2',
    code: 'OMNI-VIP-B',
    discountAmount: 40,
    minSpend: 80,
    title: '$40 OFF on orders over $80',
    description: 'VIP super tier saving on verified items.',
    expiresInHours: 72,
    isClaimed: false
  },
  {
    id: 'vip-3',
    code: 'OMNI-VIP-C',
    discountAmount: 60,
    minSpend: 120,
    title: '$60 OFF on orders over $120',
    description: 'Applies automatically to bulk & bundle carts.',
    expiresInHours: 72,
    isClaimed: false
  },
  {
    id: 'vip-4',
    code: 'OMNI-VIP-D',
    discountAmount: 80,
    minSpend: 160,
    title: '$80 OFF on orders over $160',
    description: 'Huge 50% discount savings ceiling.',
    expiresInHours: 72,
    isClaimed: false
  }
];

export const WHEEL_PRIZES: WheelPrize[] = [
  {
    id: 'wp-1',
    label: '$100 Bundle',
    sublabel: '4x Super Coupons',
    type: 'bundle_100',
    color: '#FF6B00',
    textColor: '#FFFFFF',
    value: 100,
    icon: '🎁'
  },
  {
    id: 'wp-2',
    label: '90% OFF',
    sublabel: 'Flash Voucher',
    type: 'discount_90',
    color: '#E11D48',
    textColor: '#FFFFFF',
    value: 90,
    icon: '⚡'
  },
  {
    id: 'wp-3',
    label: '$20 Credit',
    sublabel: 'Instant Cash',
    type: 'credit_20',
    color: '#059669',
    textColor: '#FFFFFF',
    value: 20,
    icon: '💵'
  },
  {
    id: 'wp-4',
    label: 'Free Earbuds',
    sublabel: 'Claim for $0.00',
    type: 'free_gift',
    color: '#7C3AED',
    textColor: '#FFFFFF',
    value: 49.99,
    icon: '🎧'
  },
  {
    id: 'wp-5',
    label: '$200 VIP Pack',
    sublabel: 'Gold Tier',
    type: 'bundle_200',
    color: '#D97706',
    textColor: '#FFFFFF',
    value: 200,
    icon: '👑'
  },
  {
    id: 'wp-6',
    label: 'Mystery Box',
    sublabel: 'Surprise Reward',
    type: 'mystery_box',
    color: '#DB2777',
    textColor: '#FFFFFF',
    value: 35,
    icon: '📦'
  },
  {
    id: 'wp-7',
    label: '$50 Credit',
    sublabel: 'Store Wallet',
    type: 'credit_50',
    color: '#0D9488',
    textColor: '#FFFFFF',
    value: 50,
    icon: '💎'
  },
  {
    id: 'wp-8',
    label: '50% OFF',
    sublabel: 'Site-wide Coupon',
    type: 'discount_50',
    color: '#4F46E5',
    textColor: '#FFFFFF',
    value: 50,
    icon: '🔥'
  }
];

export const LIVE_SOCIAL_PROOF_STREAM = [
  { id: 'sp-1', name: 'Sophia R.', city: 'Los Angeles, CA', action: 'slashed 4K Action Camera to $0.00', saved: '$79.99', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', time: '4s ago' },
  { id: 'sp-2', name: 'Marcus T.', city: 'Austin, TX', action: 'won $100 Coupon Bundle on Lucky Wheel', saved: '$100.00', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', time: '11s ago' },
  { id: 'sp-3', name: 'Elena K.', city: 'Chicago, IL', action: 'bought Smart Watch Ultra with 90% OFF', saved: '$68.50', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', time: '19s ago' },
  { id: 'sp-4', name: 'David L.', city: 'Miami, FL', action: 'claimed Free Wireless ANC Earbuds ($0.00)', saved: '$49.99', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', time: '28s ago' },
  { id: 'sp-5', name: 'Jessica W.', city: 'Seattle, WA', action: 'unlocked $200 VIP Super Pack', saved: '$200.00', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', time: '35s ago' },
  { id: 'sp-6', name: 'Brandon M.', city: 'Denver, CO', action: 'slashed Ionic Hair Dryer to $0.00', saved: '$65.00', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', time: '44s ago' },
  { id: 'sp-7', name: 'Chloe N.', city: 'Atlanta, GA', action: 'opened Mystery Treasure Box ($35 Credit)', saved: '$35.00', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', time: '52s ago' }
];
