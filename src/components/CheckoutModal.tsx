import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Plus, 
  AlertCircle, 
  Loader2, 
  Copy, 
  Check,
  Calendar,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SHIPPING_METHODS } from '../data/mockData';
import { SavedAddress, ShippingMethod, PaymentMethodType, InstallmentPlanType } from '../types';
import { getInstallmentPlans, generateInstallmentSchedule, createInstallmentDetails } from '../utils/installmentUtils';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    cartItems, 
    cartSubtotal, 
    cartDiscount, 
    appliedPromo, 
    createOrder,
    addAddress,
    showToast
  } = useApp();

  if (activeModal !== 'checkout') return null;

  // Selected Address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    return user?.savedAddresses?.[0]?.id || 'addr-default';
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('New York');
  const [newState, setNewState] = useState('NY');
  const [newZip, setNewZip] = useState('10001');
  const [newLabel, setNewLabel] = useState<'Home' | 'Office' | 'Apartment' | 'Other'>('Home');

  // Selected Shipping Method
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[2]); // Same-day courier default for tracking demo

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('installments');

  // Installment (Pay Little by Little) State
  const [selectedInstallmentPlan, setSelectedInstallmentPlan] = useState<InstallmentPlanType>('pay_in_4');
  const [installmentProvider, setInstallmentProvider] = useState<'OmniFlex 0%' | 'Klarna' | 'Affirm' | 'Afterpay'>('OmniFlex 0%');
  const [installmentCardLast4, setInstallmentCardLast4] = useState('4242');
  const [installmentCardExpiry, setInstallmentCardExpiry] = useState('08/28');
  const [installmentCardCvv, setInstallmentCardCvv] = useState('888');
  const [agreedToBnplTerms, setAgreedToBnplTerms] = useState(true);

  // Card details (Tokenized client-side simulation)
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardHolder, setCardHolder] = useState(user?.name ? user.name.toUpperCase() : 'ARIF OGUNSHTEYE');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [saveCard, setSaveCard] = useState(true);

  // Mobile Money details
  const [momoProvider, setMomoProvider] = useState<'mpesa' | 'mtn' | 'airtel' | 'orange'>('mpesa');
  const [momoPhone, setMomoPhone] = useState(user?.phone || '+1 (555) 234-8901');

  // Bank Transfer details
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Delivery Instructions note
  const [deliveryNotes, setDeliveryNotes] = useState('Please leave in front of apartment door if not answering.');

  // Order processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Active address object
  const currentAddress: SavedAddress = user?.savedAddresses?.find((a) => a.id === selectedAddressId) || {
    id: 'addr-temp',
    label: newLabel,
    fullName: user?.name || 'Customer',
    phone: user?.phone || '+1 555-0199',
    street: newStreet || '742 Evergreen Terrace, Apt 4B',
    city: newCity || 'New York',
    state: newState || 'NY',
    zipCode: newZip || '10001',
    country: 'United States',
    isDefault: true,
    lat: 40.748817,
    lng: -73.985428
  };

  // Financials
  const deliveryFee = selectedShipping.price;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const tax = taxableAmount * 0.0825;
  const finalTotal = taxableAmount + deliveryFee + tax;

  // Active Installment Plans calculation
  const availableInstallmentPlans = getInstallmentPlans(finalTotal);
  const activePlanOption = availableInstallmentPlans.find((p) => p.id === selectedInstallmentPlan) || availableInstallmentPlans[0];
  const activeSchedule = generateInstallmentSchedule(selectedInstallmentPlan, finalTotal);
  const downPaymentAmount = activeSchedule[0]?.amount || finalTotal;
  const remainingInstallmentBalance = finalTotal - downPaymentAmount;

  const copyVirtualBank = () => {
    navigator.clipboard?.writeText('9948-2849-1102');
    setCopiedAccount(true);
    showToast('Bank Account Copied', '9948 2849 1102 copied to clipboard', 'info');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    const addr = {
      label: newLabel,
      fullName: user?.name || 'Customer',
      phone: user?.phone || '+1 555-0199',
      street: newStreet,
      city: newCity,
      state: newState,
      zipCode: newZip,
      country: 'United States',
      isDefault: false,
      lat: 40.748817,
      lng: -73.985428
    };
    addAddress(addr);
    setShowNewAddressForm(false);
    setNewStreet('');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Simulate secure transaction tokenization & gateway response
      await new Promise((resolve) => setTimeout(resolve, 1600));

      const refId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

      let paymentDetails: any = {
        referenceId: refId
      };

      let installmentDetails = undefined;

      if (paymentMethod === 'installments') {
        installmentDetails = createInstallmentDetails(
          selectedInstallmentPlan,
          finalTotal,
          installmentProvider,
          installmentCardLast4,
          'Visa'
        );
        paymentDetails = {
          ...paymentDetails,
          provider: `${installmentProvider} (${activePlanOption.title})`,
          last4: installmentCardLast4,
          brand: 'Visa',
          planType: selectedInstallmentPlan,
          downPayment: downPaymentAmount,
          installmentsCount: installmentDetails.installmentsCount
        };
      } else if (paymentMethod === 'card') {
        const cleanCard = cardNumber.replace(/\s+/g, '');
        paymentDetails = {
          ...paymentDetails,
          brand: cleanCard.startsWith('4') ? 'Visa' : cleanCard.startsWith('5') ? 'Mastercard' : 'Amex',
          last4: cleanCard.slice(-4) || '4242'
        };
      } else if (paymentMethod === 'mobile_money') {
        paymentDetails = {
          ...paymentDetails,
          provider: momoProvider.toUpperCase(),
          phone: momoPhone
        };
      } else if (paymentMethod === 'bank_transfer') {
        paymentDetails = {
          ...paymentDetails,
          bankName: 'OmniMarket Virtual Clearing Bank',
          accountNumber: '9948-2849-1102'
        };
      } else if (paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') {
        paymentDetails = {
          ...paymentDetails,
          provider: paymentMethod === 'apple_pay' ? 'Apple Pay (Biometric Encrypted)' : 'Google Pay (Encrypted Token)'
        };
      } else if (paymentMethod === 'cod') {
        paymentDetails = {
          ...paymentDetails,
          provider: 'Cash on Delivery (Pay upon delivery arrival)'
        };
      }

      const order = await createOrder({
        address: currentAddress,
        shippingMethod: selectedShipping,
        paymentMethod,
        paymentDetails,
        installmentDetails,
        notes: deliveryNotes
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }

      setIsProcessing(false);
      showToast('Order Placed Successfully!', `Order #${order.orderNumber} is confirmed and packed`, 'success');
      setActiveModal('order_receipt');
    } catch (err) {
      setIsProcessing(false);
      showToast('Payment Failed', 'Please verify your payment credentials and retry', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base font-heading">Secure One-Page Checkout</h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Protected by 256-Bit SSL Encryption
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Checkout Steps (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Step 1: Delivery Address */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Delivery Address</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showNewAddressForm ? 'Cancel' : 'Add New Address'}</span>
                  </button>
                </div>

                {/* Saved addresses picker */}
                {!showNewAddressForm ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {user?.savedAddresses && user.savedAddresses.length > 0 ? (
                      user.savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => setSelectedAddressId(addr.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedAddressId === addr.id
                              ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                              : 'bg-white/60 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mt-1 font-medium">{addr.street}</p>
                          <p className="text-[11px] text-slate-400">{addr.city}, {addr.state} {addr.zipCode}</p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
                        Default address: 742 Evergreen Terrace, Apt 4B, New York, NY 10001
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleAddNewAddress} className="bg-white p-4 rounded-xl border border-indigo-100 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Address Label</label>
                        <select
                          value={newLabel}
                          onChange={(e) => setNewLabel(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                        >
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Zip Code</label>
                        <input
                          type="text"
                          value={newZip}
                          onChange={(e) => setNewZip(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Street Address</label>
                      <input
                        type="text"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        placeholder="e.g. 120 Broadway St, Apt 5A"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">City</label>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">State</label>
                        <input
                          type="text"
                          value={newState}
                          onChange={(e) => setNewState(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Save & Use Address
                    </button>
                  </form>
                )}
              </div>

              {/* Step 2: Shipping Method */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">Shipping Speed & Delivery</h3>
                </div>

                <div className="space-y-2.5 mt-3">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setSelectedShipping(method)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedShipping.id === method.id
                          ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          checked={selectedShipping.id === method.id}
                          onChange={() => setSelectedShipping(method)}
                          className="accent-indigo-600"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{method.name}</span>
                            {method.badge && (
                              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                                method.id === 'same_day' 
                                  ? 'bg-emerald-100 text-emerald-700 animate-pulse' 
                                  : 'bg-indigo-100 text-indigo-700'
                              }`}>
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">{method.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-900">
                          {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                        </span>
                        <span className="text-[10px] text-slate-400 block">{method.estimatedDays}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Payment System */}
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">Payment Method</h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Tokenized Security
                  </span>
                </div>

                {/* Payment Type Selection Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {[
                    { id: 'installments', label: 'Pay in Splits', icon: Calendar, badge: '0% APR' },
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone },
                    { id: 'bank_transfer', label: 'Bank Transfer', icon: Building2 },
                    { id: 'apple_pay', label: 'Apple Pay', icon: Wallet },
                    { id: 'cod', label: 'Cash on Deliv.', icon: Banknote },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentMethodType)}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all relative ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20 ring-2 ring-indigo-500/20'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {m.badge && (
                          <span className={`absolute -top-2 right-1 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                            isSelected ? 'bg-amber-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {m.badge}
                          </span>
                        )}
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-bold leading-tight">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sub-Panel: Installment Payments ("Pay Little by Little") */}
                {paymentMethod === 'installments' && (
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-indigo-200 shadow-xs space-y-4 animate-in fade-in duration-150">
                    {/* Header with BNPL Provider Select */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            Pay Little by Little (Flexible Installments)
                          </span>
                          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                            0% Interest • No Fees
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Instant pre-approval with zero credit score impact. Ships immediately!
                        </p>
                      </div>

                      {/* Providers */}
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        {[
                          { id: 'OmniFlex 0%', label: 'OmniFlex' },
                          { id: 'Klarna', label: 'Klarna' },
                          { id: 'Affirm', label: 'Affirm' },
                          { id: 'Afterpay', label: 'Afterpay' },
                        ].map((prov) => (
                          <button
                            key={prov.id}
                            type="button"
                            onClick={() => setInstallmentProvider(prov.id as any)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              installmentProvider === prov.id
                                ? 'bg-white text-indigo-600 shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {prov.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 1: Select Plan Option */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-2">
                        1. Choose Your Payment Schedule:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {availableInstallmentPlans.map((plan) => {
                          const isPlanSelected = selectedInstallmentPlan === plan.id;
                          return (
                            <button
                              key={plan.id}
                              type="button"
                              onClick={() => setSelectedInstallmentPlan(plan.id)}
                              className={`p-3 rounded-xl border text-left transition-all relative ${
                                isPlanSelected
                                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20'
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                              }`}
                            >
                              {plan.recommended && (
                                <span className="absolute -top-2 right-2 bg-indigo-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full shadow-2xs">
                                  Recommended
                                </span>
                              )}
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">{plan.title}</span>
                              </div>
                              <div className="text-base font-extrabold text-indigo-600 mt-1">
                                ${plan.installmentAmount.toFixed(2)}
                                <span className="text-[10px] font-medium text-slate-500 ml-1">{plan.periodLabel}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                                <span>{plan.installmentsCount} payments</span>
                                <span className="text-emerald-600 font-bold">0% APR</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Payment Schedule Timeline Breakdown */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          2. Installment Schedule Breakdown ({activeSchedule.length} payments)
                        </span>
                        <span className="text-[11px] font-bold text-indigo-600">
                          Total: ${finalTotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {activeSchedule.map((item) => {
                          const isFirst = item.number === 1;
                          return (
                            <div
                              key={item.number}
                              className={`p-2.5 rounded-xl border transition-all ${
                                isFirst
                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                  : 'bg-white text-slate-800 border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold ${isFirst ? 'text-indigo-100' : 'text-slate-400'}`}>
                                  Payment #{item.number}
                                </span>
                                {isFirst && (
                                  <span className="text-[9px] font-extrabold bg-amber-400 text-slate-950 px-1 py-0.2 rounded">
                                    Due Today
                                  </span>
                                )}
                              </div>
                              <div className={`text-sm font-extrabold mt-0.5 ${isFirst ? 'text-white' : 'text-slate-900'}`}>
                                ${item.amount.toFixed(2)}
                              </div>
                              <div className={`text-[10px] mt-0.5 truncate ${isFirst ? 'text-indigo-200 font-medium' : 'text-slate-500'}`}>
                                {item.dueDate}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Due Today Highlight Callout */}
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-emerald-900">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            You only pay <strong>${downPaymentAmount.toFixed(2)} today</strong>. We dispatch your full order right away!
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Card Setup for Future Scheduled Auto-Debits */}
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-2">
                        3. Card for Down Payment & Automatic Scheduled Deductions:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2 relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => {
                              setCardNumber(e.target.value);
                              setInstallmentCardLast4(e.target.value.replace(/\s+/g, '').slice(-4) || '4242');
                            }}
                            placeholder="4242 •••• •••• 4242"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                          />
                          <span className="absolute right-2.5 top-2.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            VISA
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={installmentCardExpiry}
                            onChange={(e) => setInstallmentCardExpiry(e.target.value)}
                            placeholder="08/28"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-900"
                          />
                          <input
                            type="password"
                            maxLength={4}
                            value={installmentCardCvv}
                            onChange={(e) => setInstallmentCardCvv(e.target.value)}
                            placeholder="CVV"
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-900"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 cursor-pointer mt-2.5">
                        <input
                          type="checkbox"
                          checked={agreedToBnplTerms}
                          onChange={(e) => setAgreedToBnplTerms(e.target.checked)}
                          className="w-3.5 h-3.5 accent-indigo-600 rounded"
                        />
                        <span className="text-[11px] text-slate-600 font-medium">
                          I agree to automatic recurring debits for remaining installments. Early payoff is 100% free anytime.
                        </span>
                      </label>
                    </div>

                  </div>
                )}

                {/* Sub-Panel: Credit / Debit Card Form */}
                {paymentMethod === 'card' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-indigo-600"
                        />
                        <div className="absolute right-2.5 top-2.5 flex items-center gap-1">
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            VISA
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono text-slate-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Full name as printed on card"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 uppercase font-medium"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-3.5 h-3.5 accent-indigo-600 rounded"
                      />
                      <span className="text-[11px] text-slate-600 font-medium">Save card securely for future purchases</span>
                    </label>
                  </div>
                )}

                {/* Sub-Panel: Mobile Money */}
                {paymentMethod === 'mobile_money' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
                    <div className="flex gap-2">
                      {[
                        { id: 'mpesa', label: 'M-Pesa' },
                        { id: 'mtn', label: 'MTN MoMo' },
                        { id: 'airtel', label: 'Airtel Money' },
                        { id: 'orange', label: 'Orange Money' },
                      ].map((prov) => (
                        <button
                          key={prov.id}
                          type="button"
                          onClick={() => setMomoProvider(prov.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            momoProvider === prov.id
                              ? 'bg-amber-500 text-slate-950 border-amber-500'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {prov.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Registered Mobile Phone</label>
                      <input
                        type="tel"
                        value={momoPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-mono"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        A push prompt authorization will appear on your phone upon clicking Place Order.
                      </p>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Bank Transfer */}
                {paymentMethod === 'bank_transfer' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-150 text-xs">
                    <p className="text-slate-600">Transfer total amount to this dedicated virtual account:</p>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">OmniMarket Virtual Bank</span>
                        <span className="font-bold text-sm text-slate-900">9948 2849 1102</span>
                      </div>
                      <button
                        type="button"
                        onClick={copyVirtualBank}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100 text-xs font-bold text-indigo-600 flex items-center gap-1"
                      >
                        {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAccount ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-Panel: Apple / Google Pay */}
                {(paymentMethod === 'apple_pay' || paymentMethod === 'google_pay') && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center space-y-2 animate-in fade-in duration-150">
                    <p className="text-xs text-slate-700 font-medium">
                      One-touch biometric authorization ready via {paymentMethod === 'apple_pay' ? 'Apple Pay Touch ID' : 'Google Pay'}.
                    </p>
                  </div>
                )}

                {/* Sub-Panel: COD */}
                {paymentMethod === 'cod' && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 animate-in fade-in duration-150">
                    <p className="font-bold text-slate-900">Cash on Delivery</p>
                    <p className="text-slate-500">
                      Please have the exact cash amount ready for the delivery driver upon arrival.
                    </p>
                  </div>
                )}

                {/* Delivery Notes */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Ring apartment bell 4B or leave with doorman"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>

              </div>

            </div>

            {/* Right: Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-4 sticky top-4">
                <h3 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                  Order Summary ({cartItems.length} items)
                </h3>

                {/* Mini Item List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate max-w-[170px]">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="truncate">
                          <span className="font-bold text-slate-800 truncate block">{item.product.name}</span>
                          <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals Calculation */}
                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo ({appliedPromo?.code})</span>
                      <span>-${cartDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery ({selectedShipping.name})</span>
                    <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Sales Tax (8.25%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Order Value</span>
                    <span className="text-slate-900 text-base">${finalTotal.toFixed(2)}</span>
                  </div>

                  {paymentMethod === 'installments' && (
                    <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl p-3 space-y-1.5 mt-2 text-xs">
                      <div className="flex justify-between text-indigo-950 font-bold">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          Due Today (1st Split):
                        </span>
                        <span className="text-indigo-600 font-black text-sm">${downPaymentAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px]">
                        <span>Remaining {activeSchedule.length - 1} Payments:</span>
                        <span className="font-semibold">${remainingInstallmentBalance.toFixed(2)} total</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Place Order CTA */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer"
                  id="checkout-place-order-btn"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing & Authorizing Order...</span>
                    </div>
                  ) : paymentMethod === 'installments' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>Pay ${downPaymentAmount.toFixed(2)} Today & Place Order</span>
                      </div>
                      <span className="text-[10px] font-medium text-indigo-200">
                        {activePlanOption.title} • 0% APR • Ships immediately
                      </span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span>Pay ${finalTotal.toFixed(2)} & Place Order</span>
                    </div>
                  )}
                </button>

                <div className="text-[10px] text-slate-400 text-center font-medium leading-tight">
                  By clicking Place Order you agree to OmniMarket terms and privacy policies.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
