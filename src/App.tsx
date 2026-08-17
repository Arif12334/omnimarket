import React from 'react';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/Toast';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroBanners } from './components/HeroBanners';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { DeliveryTrackerModal } from './components/DeliveryTrackerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { PrimeModal } from './components/PrimeModal';
import { RufusAiModal } from './components/RufusAiModal';
import { DealsHubModal } from './components/DealsHubModal';
import { DeliveryLocationModal } from './components/DeliveryLocationModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        {/* Global Toast System */}
        <ToastContainer />

        {/* Global Sticky Navigation */}
        <Navbar />

        {/* Categories Bar */}
        <CategoryNav />

        {/* Main Content Arena */}
        <main className="flex-1 space-y-2">
          {/* Flash Deals, Promo Carousel & Highlights */}
          <HeroBanners />

          {/* Product Marketplace & Filters & Catalog Grid */}
          <ProductGrid />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailsModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderReceiptModal />
        <DeliveryTrackerModal />
        <UserProfileModal />
        <AuthModal />
        <PrimeModal />
        <RufusAiModal />
        <DealsHubModal />
        <DeliveryLocationModal />
        <WishlistModal />
      </div>
    </AppProvider>
  );
}

