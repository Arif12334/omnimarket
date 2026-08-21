export type CategorySlug = 
  | 'electronics' 
  | 'fashion' 
  | 'phones' 
  | 'computers' 
  | 'home-appliances' 
  | 'beauty' 
  | 'groceries' 
  | 'accessories';

export type ProductCondition = 'New' | 'Refurbished' | 'Open Box';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
  image: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface ProductVariation {
  name: string; // e.g. 'Size' or 'Storage'
  options: string[]; // e.g. ['64GB', '128GB', '256GB'] or ['S', 'M', 'L', 'XL']
}

export interface ProductQA {
  id: string;
  question: string;
  asker: string;
  answer: string;
  answerer: string;
  date: string;
  votes: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  customerImages?: string[];
  headline?: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  responseTime: string;
  location: string;
  joinedDate: string;
  isAmazonFulfilled?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stockCount: number;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string;
  condition: ProductCondition;
  location: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  images: string[];
  colors?: ColorOption[];
  variations?: ProductVariation[];
  seller: SellerInfo;
  reviews: Review[];
  deliveryEstimateDays: number;
  isFeatured?: boolean;
  isRecommended?: boolean;
  tags: string[];
  // Amazon-Specific Features
  isPrimeEligible?: boolean;
  primeDeliveryTime?: string; // e.g. "Tomorrow 8 AM"
  amazonChoiceTag?: string; // "Overall Pick", "Amazon's Choice", "Best Seller", "#1 New Release"
  isLightningDeal?: boolean;
  lightningDealClaimedPercentage?: number; // e.g. 78 (%)
  lightningDealEndsAt?: string;
  subscribeAndSave?: {
    eligible: boolean;
    discountPercentage: number; // e.g. 10 or 15
    defaultFrequencyMonths: number;
  };
  frequentlyBoughtTogetherIds?: string[];
  compareProductIds?: string[];
  aiReviewSummary?: {
    sentiment: string;
    pros: string[];
    cons: string[];
    summaryText: string;
    customerSayTags: string[];
  };
  qaList?: ProductQA[];
}

export interface CartItem {
  id: string; // generated unique cart key
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariation?: Record<string, string>;
  unitPrice: number;
  isSubscription?: boolean;
  subscriptionFrequency?: string; // e.g. "Every 1 Month (Save 10%)"
  savedForLater?: boolean;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
  priority: 'Low' | 'Medium' | 'High';
  note?: string;
}

export interface Wishlist {
  id: string;
  name: string;
  isDefault?: boolean;
  isPublic: boolean;
  items: WishlistItem[];
  createdAt: string;
}

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Office' | 'Apartment' | 'Other';
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  lat: number;
  lng: number;
}

export interface SavedPaymentCard {
  id: string;
  cardHolder: string;
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expMonth: string;
  expYear: string;
  isDefault: boolean;
}

export interface SecuritySession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'sms' | 'authenticator_app' | 'email';
  passwordLastChanged: string;
  activeSessions: SecuritySession[];
  loginNotifications: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  authProvider: 'email' | 'phone' | 'google' | 'apple';
  savedAddresses: SavedAddress[];
  savedPaymentCards: SavedPaymentCard[];
  securitySettings: UserSecuritySettings;
  joinedDate: string;
  // Amazon Features
  isPrimeMember?: boolean;
  primePlan?: 'monthly' | 'annual' | 'trial';
  primeExpiryDate?: string;
  wishlists?: Wishlist[];
  savedForLaterItems?: CartItem[];
  browsingHistory?: string[]; // list of product IDs
  selectedZipCode?: string;
  selectedCity?: string;
  // Adult Age Verification (21+ for Market Creation)
  age?: number;
  birthDate?: string;
  isAgeVerifiedAdult?: boolean;
  ownedMarketIds?: string[];
}

export interface Market {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  description: string;
  location: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  bannerImage: string;
  logoImage: string;
  rating: number;
  reviewCount: number;
  totalProductsCount: number;
  verifiedAdultOwner: boolean;
  ownerAge: number;
  ownerName: string;
  ownerEmail?: string;
  establishedYear: number;
  openingHours: string;
  isOpen: boolean;
  isAmazonFulfilled?: boolean;
  tags: string[];
  createdAt: string;
}

export type PaymentMethodType = 
  | 'card' 
  | 'installments'
  | 'mobile_money' 
  | 'bank_transfer' 
  | 'apple_pay' 
  | 'google_pay' 
  | 'cod';

export type InstallmentPlanType = 
  | 'pay_in_4' 
  | 'monthly_3' 
  | 'monthly_6' 
  | 'monthly_12' 
  | 'weekly_8';

export interface InstallmentScheduleItem {
  number: number;
  dueDate: string;
  amount: number;
  status: 'paid' | 'scheduled' | 'processing';
  paidAt?: string;
  transactionRef?: string;
}

export interface InstallmentDetails {
  planType: InstallmentPlanType;
  planName: string;
  provider: 'OmniFlex 0%' | 'Klarna' | 'Afterpay' | 'Affirm' | 'PayPal Pay in 4';
  totalAmount: number;
  downPaymentToday: number;
  remainingBalance: number;
  installmentsCount: number;
  installments: InstallmentScheduleItem[];
  nextPaymentDate: string;
  autoDebitCardLast4: string;
  autoDebitBrand: string;
  apr: number;
}

export type PaymentStatus = 
  | 'pending' 
  | 'successful' 
  | 'failed' 
  | 'refunded' 
  | 'cancelled';

export type OrderStatus = 
  | 'placed' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface ShippingMethod {
  id: 'standard' | 'express' | 'same_day';
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
  badge?: string;
}

export interface DeliveryDriver {
  id: string;
  name: string;
  photo: string;
  phone: string;
  vehicleType: 'Motorcycle' | 'Van' | 'Electric Scooter';
  vehiclePlate: string;
  rating: number;
  completedDeliveries: number;
}

export interface TrackingCheckpoint {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
  locationName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  tax: number;
  total: number;
  promoCodeApplied?: string;
  deliveryAddress: SavedAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  paymentDetails: {
    brand?: string;
    last4?: string;
    phone?: string;
    provider?: string;
    bankName?: string;
    accountNumber?: string;
    referenceId: string;
  };
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  estimatedDeliveryDate: string;
  driver?: DeliveryDriver;
  storeLocation: { lat: number; lng: number; name: string };
  customerLocation: { lat: number; lng: number; name: string };
  courierLocation: { lat: number; lng: number };
  routePath: [number, number][];
  checkpoints: TrackingCheckpoint[];
  installmentDetails?: InstallmentDetails;
  notes?: string;
  currency?: CurrencyCode;
}

export type CurrencyCode =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'CAD'
  | 'AUD'
  | 'CNY'
  | 'INR'
  | 'NGN'
  | 'BRL'
  | 'AED'
  | 'SAR'
  | 'CHF'
  | 'ZAR'
  | 'SGD'
  | 'MXN'
  | 'KRW'
  | 'TRY'
  | 'KES'
  | 'GHS'
  | 'PHP'
  | 'IDR'
  | 'SEK'
  | 'NZD';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateAgainstUSD: number;
  symbolPosition: 'before' | 'after';
  decimals: number;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia Pacific' | 'Middle East & Africa';
  popular?: boolean;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrder: number;
  description: string;
}

export interface CouponBundleItem {
  id: string;
  code: string;
  discountAmount: number;
  minSpend: number;
  title: string;
  description: string;
  expiresInHours: number;
  isClaimed: boolean;
}

export interface WheelPrize {
  id: string;
  label: string;
  sublabel: string;
  type: 'bundle_100' | 'discount_50' | 'free_gift' | 'credit_20' | 'discount_90' | 'credit_50' | 'bundle_200' | 'mystery_box';
  color: string;
  textColor: string;
  value: number;
  icon: string;
}

export interface SlashHistoryItem {
  id: string;
  user: string;
  amount: number;
  time: string;
  avatar: string;
}

export interface SlashItem {
  id: string;
  productId: string;
  product: Product;
  originalPrice: number;
  currentPrice: number;
  targetPrice: number; // 0
  slashedAmount: number;
  slashPercentage: number;
  slashesCount: number;
  expiresAt: string;
  status: 'active' | 'completed' | 'claimed';
  slashHistory: SlashHistoryItem[];
}

export interface FilterState {
  search: string;
  category: CategorySlug | 'all';
  minPrice: number;
  maxPrice: number;
  condition: ProductCondition | 'all';
  minRating: number;
  inStockOnly: boolean;
  brand: string;
  location: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
  // Amazon & Temu Advanced Filters
  primeOnly?: boolean;
  dealsOnly?: boolean;
  subscribeAndSaveOnly?: boolean;
  bestSellersOnly?: boolean;
  under5Only?: boolean;
  slashDealsOnly?: boolean;
}
