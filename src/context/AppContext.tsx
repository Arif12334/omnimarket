import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Product, 
  CartItem, 
  PromoCode, 
  Order, 
  FilterState, 
  CategorySlug, 
  SavedAddress,
  SavedPaymentCard,
  PaymentMethodType,
  ShippingMethod,
  OrderStatus,
  InstallmentDetails,
  Wishlist,
  WishlistItem
} from '../types';
import { 
  PRODUCTS, 
  DEFAULT_USER, 
  PROMO_CODES, 
  INITIAL_SAMPLE_ORDER, 
  SHIPPING_METHODS,
  SAMPLE_DRIVER 
} from '../data/mockData';
import { enrichProductWithAmazonFeatures } from '../utils/amazonUtils';

export type ModalType = 
  | 'auth' 
  | 'product_details' 
  | 'cart_drawer' 
  | 'checkout' 
  | 'order_receipt' 
  | 'delivery_tracker' 
  | 'user_profile' 
  | 'address_manager' 
  | 'password_reset' 
  | 'prime_modal'
  | 'rufus_ai_modal'
  | 'deal_hub_modal'
  | 'location_modal'
  | 'wishlist_modal'
  | null;

export interface ToastInfo {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  // User Authentication & Profile
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  loginWithOAuth: (provider: 'google' | 'apple', profile?: { name?: string; email?: string; avatar?: string }) => Promise<boolean>;
  loginWithGoogle: (profile?: { name?: string; email?: string; avatar?: string }) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  updateAddress: (id: string, address: Partial<SavedAddress>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentCard: (card: Omit<SavedPaymentCard, 'id'>) => void;
  deletePaymentCard: (id: string) => void;
  toggleTwoFactor: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;

  // Amazon Prime
  isPrimeMember: boolean;
  togglePrimeMembership: () => void;
  activatePrimeTrial: () => void;

  // Delivery Location
  selectedZipCode: string;
  selectedCity: string;
  updateDeliveryLocation: (zip: string, city: string) => void;

  // Products & Filtering
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  selectedCategory: CategorySlug | 'all';
  setSelectedCategory: (cat: CategorySlug | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  addReview: (productId: string, rating: number, comment: string) => void;
  
  // Cart & Discounts
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, variations?: Record<string, string>, isSubscription?: boolean, subscriptionFrequency?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartItemCount: number;

  // Amazon Wishlists
  wishlists: Wishlist[];
  addToWishlist: (product: Product, wishlistId?: string, note?: string) => void;
  removeFromWishlist: (wishlistId: string, productId: string) => void;
  createWishlist: (name: string, isPublic?: boolean) => void;
  deleteWishlist: (wishlistId: string) => void;

  // Amazon Saved For Later
  savedForLaterItems: CartItem[];
  saveForLater: (cartItemId: string) => void;
  moveToCartFromSaved: (item: CartItem) => void;
  removeSavedForLater: (cartItemId: string) => void;

  // Amazon Browsing History
  browsingHistory: Product[];
  recordProductView: (product: Product) => void;
  clearBrowsingHistory: () => void;

  // Fast 1-Click Amazon Actions
  buyNow: (product: Product, color?: string, variations?: Record<string, string>) => void;
  addBundleToCart: (bundleProducts: Product[]) => void;
  addSubscriptionToCart: (product: Product, frequency: string, color?: string) => void;

  // Orders & Live Tracking
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createOrder: (params: {
    address: SavedAddress;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethodType;
    paymentDetails: Order['paymentDetails'];
    installmentDetails?: InstallmentDetails;
    notes?: string;
  }) => Promise<Order>;
  cancelOrder: (orderId: string) => void;
  refundOrder: (orderId: string) => void;
  payOrderInstallment: (orderId: string, installmentNumber: number) => void;
  
  // Modals & Navigation
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  authModalTab: 'login' | 'signup' | 'forgot_password';
  setAuthModalTab: (tab: 'login' | 'signup' | 'forgot_password') => void;
  openProductDetails: (product: Product) => void;
  openTrackOrder: (orderId?: string) => void;
  openTrackProduct: (productOrId: Product | string) => void;
  openReceipt: (orderId: string) => void;
  openCheckout: () => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const initialFilterState: FilterState = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 3000,
  condition: 'all',
  minRating: 0,
  inStockOnly: false,
  brand: 'all',
  location: 'all',
  sortBy: 'popular',
  primeOnly: false,
  dealsOnly: false,
  subscribeAndSaveOnly: false,
  bestSellersOnly: false
};

const INITIAL_WISHLISTS: Wishlist[] = [
  {
    id: 'wl-1',
    name: 'My Shopping Wishlist',
    isDefault: true,
    isPublic: true,
    createdAt: 'Aug 2026',
    items: [
      {
        id: 'wli-1',
        productId: 'prod-1',
        product: PRODUCTS[0],
        addedAt: 'Yesterday',
        priority: 'High',
        note: 'Upgrade phone for photography'
      },
      {
        id: 'wli-2',
        productId: 'prod-2',
        product: PRODUCTS[1],
        addedAt: '3 days ago',
        priority: 'Medium',
        note: 'Noise cancellation for daily commute'
      }
    ]
  },
  {
    id: 'wl-2',
    name: 'Tech & Gaming Setup',
    isDefault: false,
    isPublic: false,
    createdAt: 'Aug 2026',
    items: []
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persisted user & orders from localStorage if available
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_user');
      return saved ? JSON.parse(saved) : { ...DEFAULT_USER, isPrimeMember: true };
    } catch {
      return { ...DEFAULT_USER, isPrimeMember: true };
    }
  });

  // Prime status state
  const [isPrimeMember, setIsPrimeMember] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_prime');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Location selector state
  const [selectedZipCode, setSelectedZipCode] = useState<string>('10001');
  const [selectedCity, setSelectedCity] = useState<string>('New York, NY');

  // Enriched products catalog with full Amazon features
  const [products, setProducts] = useState<Product[]>(() => {
    return PRODUCTS.map((p) => enrichProductWithAmazonFeatures(p, PRODUCTS));
  });

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_saved_for_later');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlists, setWishlists] = useState<Wishlist[]>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_wishlists');
      return saved ? JSON.parse(saved) : INITIAL_WISHLISTS;
    } catch {
      return INITIAL_WISHLISTS;
    }
  });

  const [browsingHistory, setBrowsingHistory] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_history');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return PRODUCTS.filter((p) => ids.includes(p.id)).slice(0, 10);
      }
      return [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]];
    } catch {
      return [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('omnimarket_orders');
      return saved ? JSON.parse(saved) : [INITIAL_SAMPLE_ORDER];
    } catch {
      return [INITIAL_SAMPLE_ORDER];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_SAMPLE_ORDER);

  // Modals & Navigation
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup' | 'forgot_password'>('login');

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('omnimarket_prime', JSON.stringify(isPrimeMember));
    } catch (e) {
      console.error(e);
    }
  }, [isPrimeMember]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('omnimarket_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('omnimarket_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('omnimarket_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('omnimarket_saved_for_later', JSON.stringify(savedForLaterItems));
    } catch (e) {
      console.error(e);
    }
  }, [savedForLaterItems]);

  useEffect(() => {
    try {
      localStorage.setItem('omnimarket_wishlists', JSON.stringify(wishlists));
    } catch (e) {
      console.error(e);
    }
  }, [wishlists]);

  useEffect(() => {
    try {
      localStorage.setItem('omnimarket_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const loginWithEmail = async (email: string, _pass: string): Promise<boolean> => {
    // Check if there is saved registered user data in localStorage
    let existingProfile: Partial<UserProfile> = {};
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('omnimarket_registered_users') || '{}');
      if (registeredUsers[email.toLowerCase()]) {
        existingProfile = registeredUsers[email.toLowerCase()];
      }
    } catch (e) {
      console.error(e);
    }

    const defaultName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      ...existingProfile,
      id: existingProfile.id || `usr-${Date.now()}`,
      email: email || DEFAULT_USER.email,
      name: existingProfile.name || defaultName || DEFAULT_USER.name,
      authProvider: 'email',
      isPrimeMember: existingProfile.isPrimeMember ?? true
    };
    setUser(loggedUser);
    showToast('Welcome back!', `Signed in as ${loggedUser.email}`, 'success');
    setActiveModal(null);
    return true;
  };

  const loginWithPhone = async (phone: string, _otp: string): Promise<boolean> => {
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      phone: phone || DEFAULT_USER.phone,
      name: 'Mobile Customer',
      authProvider: 'phone'
    };
    setUser(loggedUser);
    showToast('Verification Successful', `Signed in with ${phone}`, 'success');
    setActiveModal(null);
    return true;
  };

  const loginWithOAuth = async (
    provider: 'google' | 'apple',
    profile?: { name?: string; email?: string; avatar?: string }
  ): Promise<boolean> => {
    const googleAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';
    const appleAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80';
    
    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      id: `oauth-${provider}-${Date.now()}`,
      name: profile?.name || (provider === 'google' ? 'Arif Ogunsheye' : 'Apple User'),
      email: profile?.email || (provider === 'google' ? 'arifogunsheye2@gmail.com' : 'user@icloud.com'),
      avatar: profile?.avatar || (provider === 'google' ? googleAvatar : appleAvatar),
      authProvider: provider,
      isPrimeMember: true
    };
    setUser(loggedUser);
    showToast('Signed in successfully', `Authenticated with ${provider === 'google' ? 'Google' : 'Apple'} account (${loggedUser.email})`, 'success');
    setActiveModal(null);
    return true;
  };

  const loginWithGoogle = async (
    profile?: { name?: string; email?: string; avatar?: string }
  ): Promise<boolean> => {
    return loginWithOAuth('google', profile || {
      name: 'Arif Ogunsheye',
      email: 'arifogunsheye2@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    });
  };

  const signup = async (name: string, email: string, phone: string, _pass: string): Promise<boolean> => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Valued Shopper',
      email: email.trim(),
      phone: phone.trim() || DEFAULT_USER.phone,
      authProvider: 'email',
      isPrimeMember: true,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    // Persist to registered users store for easy subsequent logins
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('omnimarket_registered_users') || '{}');
      registeredUsers[email.toLowerCase()] = newUser;
      localStorage.setItem('omnimarket_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error(e);
    }

    setUser(newUser);
    showToast('Account Created!', `Welcome to OmniMarket, ${newUser.name}! Enjoy Prime 1-Day benefits.`, 'success');
    setActiveModal(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Signed Out', 'You have been safely logged out', 'info');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...data });
    showToast('Profile Updated', 'Your profile details have been saved', 'success');
  };

  const addAddress = (addrData: Omit<SavedAddress, 'id'>) => {
    if (!user) return;
    const newAddr: SavedAddress = {
      ...addrData,
      id: `addr-${Date.now()}`
    };
    const updated = addrData.isDefault 
      ? user.savedAddresses.map((a) => ({ ...a, isDefault: false })) 
      : [...user.savedAddresses];
    setUser({
      ...user,
      savedAddresses: [...updated, newAddr]
    });
    showToast('Address Added', `${newAddr.label} address saved`, 'success');
  };

  const updateAddress = (id: string, addrData: Partial<SavedAddress>) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.map((a) => a.id === id ? { ...a, ...addrData } : a)
    });
    showToast('Address Updated', 'Changes saved successfully', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.filter((a) => a.id !== id)
    });
    showToast('Address Removed', 'Address deleted from profile', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedAddresses: user.savedAddresses.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    });
    showToast('Default Address Changed', 'Default shipping address updated', 'success');
  };

  const addPaymentCard = (cardData: Omit<SavedPaymentCard, 'id'>) => {
    if (!user) return;
    const newCard: SavedPaymentCard = {
      ...cardData,
      id: `card-${Date.now()}`
    };
    setUser({
      ...user,
      savedPaymentCards: [...user.savedPaymentCards, newCard]
    });
    showToast('Card Added', `Card ending in ${newCard.last4} saved`, 'success');
  };

  const deletePaymentCard = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      savedPaymentCards: user.savedPaymentCards.filter((c) => c.id !== id)
    });
    showToast('Card Removed', 'Card deleted from payment methods', 'info');
  };

  const toggleTwoFactor = () => {
    if (!user) return;
    const nextState = !user.securitySettings.twoFactorEnabled;
    setUser({
      ...user,
      securitySettings: {
        ...user.securitySettings,
        twoFactorEnabled: nextState
      }
    });
    showToast(
      nextState ? '2FA Enabled' : '2FA Disabled',
      nextState ? 'Two-factor authentication is now protecting your account' : 'Two-factor authentication turned off',
      nextState ? 'success' : 'info'
    );
  };

  const changePassword = (_oldPass: string, _newPass: string): boolean => {
    if (!user) return false;
    setUser({
      ...user,
      securitySettings: {
        ...user.securitySettings,
        passwordLastChanged: new Date().toISOString().split('T')[0]
      }
    });
    showToast('Password Changed', 'Your security credentials were updated', 'success');
    return true;
  };

  // Product reviews
  const addReview = (productId: string, rating: number, comment: string) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      userName: user ? user.name : 'Verified Customer',
      userAvatar: user ? user.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      rating,
      date: 'Just now',
      comment,
      verifiedPurchase: true,
      helpfulCount: 0
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvg = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: parseFloat(newAvg)
          };
        }
        return p;
      })
    );

    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          reviews: [newReview, ...prev.reviews],
          reviewCount: prev.reviews.length + 1
        };
      });
    }

    showToast('Review Submitted', 'Thank you for sharing your feedback!', 'success');
  };

  // Prime handlers
  const togglePrimeMembership = () => {
    const nextState = !isPrimeMember;
    setIsPrimeMember(nextState);
    if (user) {
      setUser({ ...user, isPrimeMember: nextState });
    }
    showToast(
      nextState ? 'Prime Membership Active' : 'Prime Inactive',
      nextState ? 'Enjoy FREE One-Day Delivery, Exclusive Lightning Deals & Video' : 'Switched to Standard Shipping mode',
      nextState ? 'success' : 'info'
    );
  };

  const activatePrimeTrial = () => {
    setIsPrimeMember(true);
    if (user) {
      setUser({ ...user, isPrimeMember: true, primePlan: 'trial' });
    }
    showToast('Prime 30-Day Free Trial Started!', 'Enjoy FREE 1-Day shipping and exclusive savings!', 'success');
  };

  // Delivery Location
  const updateDeliveryLocation = (zip: string, city: string) => {
    setSelectedZipCode(zip);
    setSelectedCity(city);
    showToast('Delivery Address Updated', `Delivering to ${city} ${zip}`, 'success');
  };

  // Wishlist Handlers
  const addToWishlist = (product: Product, wishlistId?: string, note?: string) => {
    setWishlists((prev) => {
      const targetId = wishlistId || prev[0]?.id || 'wl-1';
      return prev.map((wl) => {
        if (wl.id === targetId) {
          const alreadyExists = wl.items.some((item) => item.productId === product.id);
          if (alreadyExists) return wl;
          const newItem: WishlistItem = {
            id: `wli-${Date.now()}`,
            productId: product.id,
            product,
            addedAt: 'Just now',
            priority: 'Medium',
            note
          };
          return { ...wl, items: [newItem, ...wl.items] };
        }
        return wl;
      });
    });
    showToast('Saved to Wishlist', `${product.name} added to your list`, 'success');
  };

  const removeFromWishlist = (wishlistId: string, productId: string) => {
    setWishlists((prev) =>
      prev.map((wl) => {
        if (wl.id === wishlistId) {
          return {
            ...wl,
            items: wl.items.filter((item) => item.productId !== productId)
          };
        }
        return wl;
      })
    );
    showToast('Item Removed', 'Removed from your shopping list', 'info');
  };

  const createWishlist = (name: string, isPublic = true) => {
    const newWl: Wishlist = {
      id: `wl-${Date.now()}`,
      name: name || 'New Wishlist',
      isDefault: false,
      isPublic,
      createdAt: 'Just now',
      items: []
    };
    setWishlists((prev) => [...prev, newWl]);
    showToast('Wishlist Created', `Created list "${newWl.name}"`, 'success');
  };

  const deleteWishlist = (wishlistId: string) => {
    setWishlists((prev) => prev.filter((wl) => wl.id !== wishlistId));
    showToast('List Deleted', 'Wishlist removed', 'info');
  };

  // Saved For Later Handlers
  const saveForLater = (cartItemId: string) => {
    const item = cartItems.find((ci) => ci.id === cartItemId);
    if (!item) return;
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
    setSavedForLaterItems((prev) => {
      const exists = prev.some((si) => si.id === cartItemId);
      return exists ? prev : [item, ...prev];
    });
    showToast('Saved for Later', `${item.product.name} moved to saved items`, 'info');
  };

  const moveToCartFromSaved = (item: CartItem) => {
    setSavedForLaterItems((prev) => prev.filter((si) => si.id !== item.id));
    setCartItems((prev) => {
      const exists = prev.find((ci) => ci.id === item.id);
      if (exists) {
        return prev.map((ci) => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci);
      }
      return [...prev, item];
    });
    showToast('Moved to Cart', `${item.product.name} is back in your cart`, 'success');
  };

  const removeSavedForLater = (cartItemId: string) => {
    setSavedForLaterItems((prev) => prev.filter((si) => si.id !== cartItemId));
    showToast('Removed', 'Item removed from saved list', 'info');
  };

  // Browsing History Handlers
  const recordProductView = (product: Product) => {
    setBrowsingHistory((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 12);
      try {
        localStorage.setItem('omnimarket_history', JSON.stringify(updated.map((p) => p.id)));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearBrowsingHistory = () => {
    setBrowsingHistory([]);
    try {
      localStorage.removeItem('omnimarket_history');
    } catch (e) {
      console.error(e);
    }
    showToast('History Cleared', 'Your browsing history was erased', 'info');
  };

  // Cart operations
  const addToCart = (
    product: Product, 
    quantity = 1, 
    color?: string, 
    variations?: Record<string, string>,
    isSubscription = false,
    subscriptionFrequency?: string
  ) => {
    const variationKey = variations ? JSON.stringify(variations) : '';
    const subKey = isSubscription ? `sub-${subscriptionFrequency}` : '';
    const cartItemId = `${product.id}-${color || 'default'}-${variationKey}-${subKey}`;
    const unitPrice = isSubscription 
      ? Number((product.price * 0.9).toFixed(2)) 
      : product.price;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedColor: color || (product.colors ? product.colors[0].name : undefined),
          selectedVariation: variations,
          unitPrice,
          isSubscription,
          subscriptionFrequency
        };
        return [...prev, newItem];
      }
    });

    showToast(
      isSubscription ? 'Subscribed & Saved (10% OFF)!' : 'Added to Cart',
      `${product.name} (x${quantity})${isSubscription ? ` • Renews every ${subscriptionFrequency}` : ''}`,
      'success'
    );
  };

  // Fast 1-Click Buy Now
  const buyNow = (product: Product, color?: string, variations?: Record<string, string>) => {
    addToCart(product, 1, color, variations);
    setActiveModal('checkout');
  };

  // Add Complete Bundle to Cart (Frequently Bought Together)
  const addBundleToCart = (bundleProducts: Product[]) => {
    bundleProducts.forEach((prod) => {
      addToCart(prod, 1);
    });
    showToast('Bundle Added to Cart', `Added ${bundleProducts.length} items to your cart with bundle savings!`, 'success');
  };

  // Subscribe and Save helper
  const addSubscriptionToCart = (product: Product, frequency: string, color?: string) => {
    addToCart(product, 1, color, undefined, true, frequency);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item Removed', 'Product removed from your cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try SAVE20 or FLASH50.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Order subtotal must be at least $${found.minOrder} to use ${found.code}.`
      };
    }
    setAppliedPromo(found);
    showToast('Promo Code Applied!', found.description, 'success');
    return { success: true, message: `Promo code ${found.code} applied!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Code Removed', '', 'info');
  };

  // Calculations
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      cartDiscount = (cartSubtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.discountType === 'fixed') {
      cartDiscount = Math.min(appliedPromo.value, cartSubtotal);
    }
  }

  const cartTax = (cartSubtotal - cartDiscount) * 0.0825; // standard 8.25% tax

  // Create new order
  const createOrder = async (params: {
    address: SavedAddress;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethodType;
    paymentDetails: Order['paymentDetails'];
    installmentDetails?: InstallmentDetails;
    notes?: string;
  }): Promise<Order> => {
    const deliveryFee = params.shippingMethod.price;
    const finalTax = (cartSubtotal - cartDiscount) * 0.0825;
    const total = Math.max(0, cartSubtotal - cartDiscount + deliveryFee + finalTax);

    const now = new Date();
    const orderNumber = `OMNI-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Calculate realistic delivery checkpoints and route
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: now.toISOString(),
      items: [...cartItems],
      subtotal: cartSubtotal,
      deliveryFee,
      discountAmount: cartDiscount,
      tax: finalTax,
      total: total,
      promoCodeApplied: appliedPromo?.code,
      deliveryAddress: params.address,
      shippingMethod: params.shippingMethod,
      paymentMethod: params.paymentMethod,
      paymentDetails: params.paymentDetails,
      paymentStatus: 'successful',
      orderStatus: 'out_for_delivery',
      estimatedDeliveryDate: params.shippingMethod.id === 'same_day' 
        ? 'Today within 2-3 hours' 
        : params.shippingMethod.estimatedDays,
      driver: SAMPLE_DRIVER,
      storeLocation: {
        lat: 40.758896,
        lng: -73.985130,
        name: 'OmniMarket Central Hub, Times Sq'
      },
      customerLocation: {
        lat: params.address.lat || 40.748817,
        lng: params.address.lng || -73.985428,
        name: `${params.address.label} (${params.address.street})`
      },
      courierLocation: {
        lat: 40.7562,
        lng: -73.9852
      },
      routePath: [
        [40.758896, -73.985130],
        [40.757100, -73.985180],
        [40.756200, -73.985200],
        [40.753500, -73.985250],
        [40.751200, -73.985330],
        [params.address.lat || 40.748817, params.address.lng || -73.985428]
      ],
      checkpoints: [
        {
          id: `cp-1-${Date.now()}`,
          status: 'placed',
          title: params.paymentMethod === 'installments' 
            ? 'Installment Plan Active (Payment 1 Received)' 
            : 'Order Confirmed & Payment Received',
          description: params.paymentMethod === 'installments'
            ? `Paid down payment via ${params.installmentDetails?.provider || 'OmniFlex'} (Ref: ${params.paymentDetails.referenceId})`
            : `Paid via ${params.paymentMethod.toUpperCase()} (Ref: ${params.paymentDetails.referenceId})`,
          timestamp: 'Just now',
          completed: true,
          current: false,
          locationName: 'OmniMarket Gateway'
        },
        {
          id: `cp-2-${Date.now()}`,
          status: 'processing',
          title: 'Packed & Dispatched',
          description: 'Package ready and inspected by fulfillment center',
          timestamp: 'Just now',
          completed: true,
          current: false,
          locationName: 'Central Fulfillment Hub'
        },
        {
          id: `cp-3-${Date.now()}`,
          status: 'out_for_delivery',
          title: 'Assigned to Driver & En Route',
          description: `Courier ${SAMPLE_DRIVER.name} is on the way`,
          timestamp: 'Active Now',
          completed: false,
          current: true,
          locationName: 'En Route to Delivery Address'
        },
        {
          id: `cp-4-${Date.now()}`,
          status: 'delivered',
          title: 'Delivery Handover',
          description: 'Doorstep verification & handover',
          timestamp: 'Est. in 30 mins',
          completed: false,
          current: false,
          locationName: `${params.address.street}`
        }
      ],
      installmentDetails: params.installmentDetails,
      notes: params.notes
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    return newOrder;
  };

  const payOrderInstallment = (orderId: string, installmentNumber: number) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId && o.installmentDetails) {
          const now = new Date();
          const updatedInstallments = o.installmentDetails.installments.map((inst) => {
            if (inst.number === installmentNumber) {
              return {
                ...inst,
                status: 'paid' as const,
                paidAt: now.toISOString(),
                transactionRef: `TXN-INST-${Math.floor(100000 + Math.random() * 900000)}`
              };
            }
            return inst;
          });

          const remaining = updatedInstallments
            .filter((i) => i.status !== 'paid')
            .reduce((sum, i) => sum + i.amount, 0);

          const nextPending = updatedInstallments.find((i) => i.status !== 'paid');

          const updatedDetails: InstallmentDetails = {
            ...o.installmentDetails,
            remainingBalance: Math.max(0, parseFloat(remaining.toFixed(2))),
            installments: updatedInstallments,
            nextPaymentDate: nextPending ? nextPending.dueDate : 'All Installments Settled!'
          };

          const updatedOrder: Order = {
            ...o,
            installmentDetails: updatedDetails
          };

          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder(updatedOrder);
          }

          return updatedOrder;
        }
        return o;
      })
    );

    showToast(
      'Installment Paid Early',
      `Installment #${installmentNumber} payment was processed successfully!`,
      'success'
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: 'cancelled' as OrderStatus,
            paymentStatus: 'cancelled'
          };
        }
        return o;
      })
    );
    showToast('Order Cancelled', 'Your order has been cancelled and refunded to original payment method', 'info');
  };

  const refundOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: 'refunded' as OrderStatus,
            paymentStatus: 'refunded'
          };
        }
        return o;
      })
    );
    showToast('Refund Processed', 'Refund confirmation sent to your email', 'success');
  };

  // Modals & Navigation helpers
  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal('product_details');
  };

  const openTrackOrder = (orderId?: string) => {
    if (orderId) {
      const found = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
      if (found) {
        setActiveOrder(found);
        setActiveModal('delivery_tracker');
        return;
      }
    }
    
    // If no orderId or not found, use first active order or initial sample order
    if (orders.length > 0) {
      setActiveOrder(orders[0]);
    } else {
      setActiveOrder(INITIAL_SAMPLE_ORDER);
    }
    setActiveModal('delivery_tracker');
  };

  const openTrackProduct = (productOrId: Product | string) => {
    let targetProduct: Product | undefined;
    
    if (typeof productOrId === 'string') {
      // Check if string is an order ID or order number first
      const matchedOrder = orders.find((o) => o.id === productOrId || o.orderNumber === productOrId);
      if (matchedOrder) {
        setActiveOrder(matchedOrder);
        setActiveModal('delivery_tracker');
        return;
      }
      targetProduct = products.find((p) => p.id === productOrId || p.slug === productOrId);
    } else {
      targetProduct = productOrId;
    }

    if (!targetProduct) {
      targetProduct = products[0];
    }

    // Check if an existing order has this product
    const existingOrder = orders.find((o) => o.items.some((i) => i.productId === targetProduct!.id));
    if (existingOrder) {
      setActiveOrder(existingOrder);
      setActiveModal('delivery_tracker');
      return;
    }

    // Otherwise generate a live telemetry tracking simulation order for this product
    const hubLat = 40.758896 + (Math.sin(targetProduct.id.length) * 0.006);
    const hubLng = -73.985130 + (Math.cos(targetProduct.id.length) * 0.006);
    const destLat = 40.748817;
    const destLng = -73.985428;

    const midLat1 = hubLat - (hubLat - destLat) * 0.3;
    const midLng1 = hubLng - (hubLng - destLng) * 0.3 + 0.001;
    const midLat2 = hubLat - (hubLat - destLat) * 0.6;
    const midLng2 = hubLng - (hubLng - destLng) * 0.6 - 0.001;

    const simulatedOrder: Order = {
      id: `trk-prod-${targetProduct.id}`,
      orderNumber: `TRK-${targetProduct.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      items: [
        {
          id: `item-${targetProduct.id}`,
          productId: targetProduct.id,
          product: targetProduct,
          quantity: 1,
          unitPrice: targetProduct.price
        }
      ],
      subtotal: targetProduct.price,
      deliveryFee: 9.99,
      discountAmount: targetProduct.discountPercentage ? (targetProduct.price * targetProduct.discountPercentage / 100) : 0,
      tax: targetProduct.price * 0.08,
      total: targetProduct.price + 9.99 + (targetProduct.price * 0.08),
      deliveryAddress: user?.savedAddresses[0] || DEFAULT_USER.savedAddresses[0],
      shippingMethod: SHIPPING_METHODS[2],
      paymentMethod: 'card',
      paymentDetails: {
        brand: 'Verified Dispatch',
        last4: '9921',
        referenceId: `REF-${Math.floor(100000 + Math.random() * 900000)}`
      },
      paymentStatus: 'successful',
      orderStatus: 'out_for_delivery',
      estimatedDeliveryDate: 'Today (Live GPS Dispatched)',
      driver: SAMPLE_DRIVER,
      storeLocation: {
        lat: hubLat,
        lng: hubLng,
        name: `${targetProduct.seller.name} Hub (${targetProduct.location || 'Central Warehouse'})`
      },
      customerLocation: {
        lat: destLat,
        lng: destLng,
        name: `${user?.name || 'Customer'} (742 Evergreen Terrace)`
      },
      courierLocation: {
        lat: midLat2,
        lng: midLng2
      },
      routePath: [
        [hubLat, hubLng],
        [midLat1, midLng1],
        [midLat2, midLng2],
        [destLat + 0.0015, destLng - 0.0005],
        [destLat, destLng]
      ],
      checkpoints: [
        {
          id: 'cp-p-1',
          status: 'placed',
          title: 'Direct Product Dispatch Initiated',
          description: `${targetProduct.name} assigned to rapid fulfillment`,
          timestamp: '35 mins ago',
          completed: true,
          current: false,
          locationName: targetProduct.seller.name
        },
        {
          id: 'cp-p-2',
          status: 'processing',
          title: 'Quality Inspected & Barcode Scanned',
          description: 'Package boxed with tamper-proof security tape',
          timestamp: '20 mins ago',
          completed: true,
          current: false,
          locationName: `${targetProduct.location || 'Central Hub'} Fulfillment Bay 3`
        },
        {
          id: 'cp-p-3',
          status: 'shipped',
          title: 'Courier Handover & Departure',
          description: `Dispatched with courier ${SAMPLE_DRIVER.name}`,
          timestamp: '10 mins ago',
          completed: true,
          current: false,
          locationName: 'Express Departure Lane'
        },
        {
          id: 'cp-p-4',
          status: 'out_for_delivery',
          title: 'Live GPS Telemetry In-Transit',
          description: 'Courier is currently navigating on primary delivery corridor',
          timestamp: 'Active Now',
          completed: false,
          current: true,
          locationName: 'En Route to Doorstep'
        },
        {
          id: 'cp-p-5',
          status: 'delivered',
          title: 'Doorstep Arrival & Handover',
          description: 'Signature or contactless drop at designated address',
          timestamp: 'Est. in 15 mins',
          completed: false,
          current: false,
          locationName: 'Recipient Address'
        }
      ],
      notes: 'Priority dispatch. Handle with care.'
    };

    setActiveOrder(simulatedOrder);
    setActiveModal('delivery_tracker');
  };

  const openReceipt = (orderId: string) => {
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setActiveOrder(found);
      setActiveModal('order_receipt');
    }
  };

  const openCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Cart is Empty', 'Add items to your cart before proceeding to checkout', 'info');
      return;
    }
    setActiveModal('checkout');
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const selectedCategory = filterState.category;
  const setSelectedCategory = (cat: CategorySlug | 'all') => {
    setFilterState((prev) => ({ ...prev, category: cat }));
  };

  const searchQuery = filterState.search;
  const setSearchQuery = (q: string) => {
    setFilterState((prev) => ({ ...prev, search: q }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithEmail,
        loginWithPhone,
        loginWithOAuth,
        loginWithGoogle,
        signup,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        addPaymentCard,
        deletePaymentCard,
        toggleTwoFactor,
        changePassword,

        isPrimeMember,
        togglePrimeMembership,
        activatePrimeTrial,

        selectedZipCode,
        selectedCity,
        updateDeliveryLocation,

        products,
        filterState,
        setFilterState,
        resetFilters,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        addReview,

        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartItemCount,

        wishlists,
        addToWishlist,
        removeFromWishlist,
        createWishlist,
        deleteWishlist,

        savedForLaterItems,
        saveForLater,
        moveToCartFromSaved,
        removeSavedForLater,

        browsingHistory,
        recordProductView,
        clearBrowsingHistory,

        buyNow,
        addBundleToCart,
        addSubscriptionToCart,

        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        cancelOrder,
        refundOrder,
        payOrderInstallment,

        activeModal,
        setActiveModal,
        authModalTab,
        setAuthModalTab,
        openProductDetails,
        openTrackOrder,
        openTrackProduct,
        openReceipt,
        openCheckout,

        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
