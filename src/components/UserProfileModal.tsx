import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User as UserIcon, 
  MapPin, 
  Package, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Mail, 
  Edit3, 
  Plus, 
  Trash2, 
  Compass, 
  FileText, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  Laptop, 
  Smartphone, 
  KeyRound, 
  LogOut,
  Camera,
  Sparkles,
  Calendar
} from 'lucide-react';
import { SavedAddress, OrderStatus } from '../types';

export const UserProfileModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    updateProfile, 
    addAddress, 
    deleteAddress, 
    setDefaultAddress, 
    orders, 
    openTrackOrder, 
    openReceipt, 
    cancelOrder, 
    refundOrder, 
    toggleTwoFactor, 
    changePassword, 
    logout,
    payOrderInstallment,
    formatPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'security'>('profile');

  // Edit Profile Form State
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  // Keep form inputs synced when user profile changes
  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
      setEditPhone(user.phone || '');
      setEditAvatar(user.avatar || '');
    }
  }, [user]);

  // Add Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newLabel, setNewLabel] = useState<'Home' | 'Office' | 'Apartment' | 'Other'>('Home');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZip, setNewZip] = useState('');

  // Password Change Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');

  // Order Status Filter
  const [orderFilter, setOrderFilter] = useState<'all' | OrderStatus>('all');

  if (activeModal !== 'user_profile' || !user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      avatar: editAvatar
    });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;
    addAddress({
      label: newLabel,
      fullName: user.name,
      phone: user.phone,
      street: newStreet,
      city: newCity || 'New York',
      state: newState || 'NY',
      zipCode: newZip || '10001',
      country: 'United States',
      isDefault: user.savedAddresses.length === 0,
      lat: 40.748817,
      lng: -73.985428
    });
    setShowAddressForm(false);
    setNewStreet('');
    setNewCity('');
    setNewZip('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (newPass.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match.');
      return;
    }
    changePassword(currentPass, newPass);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.orderStatus === orderFilter;
  });

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <h2 className="font-bold text-slate-900 text-base font-heading">{user.name}</h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Customer Account • Member since {user.joinedDate}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 gap-2 sm:gap-6 overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile Info', icon: UserIcon },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: user.savedAddresses.length },
            { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
            { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-100 text-indigo-700 font-bold' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: Profile Info */}
          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-150">
              
              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Profile Photo</label>
                <div className="flex items-center gap-3">
                  {avatarOptions.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(av)}
                      className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${
                        editAvatar === av
                          ? 'border-indigo-600 ring-2 ring-indigo-500/30 scale-105'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={av} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                </div>

                {/* Google Connected Account Info Card */}
                <div className="p-4 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border border-blue-200/80 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900">Google Authentication</p>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                          Connected
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {user.authProvider === 'google' 
                          ? `Authenticated via Google (${user.email})` 
                          : `Link or switch to a Google account for 1-click access`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal('auth')}
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs transition-colors shrink-0"
                  >
                    Switch Google Account
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Saved Delivery Locations</h3>
                  <p className="text-xs text-slate-500">Manage where your marketplace parcels get delivered</p>
                </div>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddressForm ? 'Cancel' : 'Add Address'}</span>
                </button>
              </div>

              {/* Add Address Form */}
              {showAddressForm && (
                <form onSubmit={handleCreateAddress} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">New Address Details</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Label</label>
                      <select
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
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
                        placeholder="10001"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
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
                      placeholder="e.g. 742 Evergreen Terrace, Apt 4B"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">City</label>
                      <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="New York"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">State</label>
                      <input
                        type="text"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value)}
                        placeholder="NY"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    Save Address
                  </button>
                </form>
              )}

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between ${
                      addr.isDefault
                        ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-800">{addr.fullName}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{addr.street}</p>
                      <p className="text-xs text-slate-500">{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{addr.phone}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-indigo-600 hover:text-indigo-700 font-bold"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-600 ml-auto flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Order History */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Order Status Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: 'All Orders' },
                  { id: 'out_for_delivery', label: 'In Transit / Live' },
                  { id: 'delivered', label: 'Delivered' },
                  { id: 'cancelled', label: 'Cancelled' },
                  { id: 'refunded', label: 'Refunded' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      orderFilter === st.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              {filteredOrders.length > 0 ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-slate-900">{order.orderNumber}</span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              order.orderStatus === 'out_for_delivery'
                                ? 'bg-emerald-100 text-emerald-700 animate-pulse'
                                : order.orderStatus === 'delivered'
                                ? 'bg-blue-100 text-blue-700'
                                : order.orderStatus === 'cancelled'
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {order.orderStatus.replace(/_/g, ' ').toUpperCase()}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            Placed on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                          </span>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-base font-extrabold text-slate-900">{formatPrice(order.total, order.currency || 'USD')}</span>
                          <span className="text-[11px] text-slate-400 block capitalize">
                            Via {order.paymentMethod}
                          </span>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="space-y-2">
                        {order.items.map((it) => (
                          <div key={it.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={it.product.images[0]}
                                alt={it.product.name}
                                referrerPolicy="no-referrer"
                                className="w-9 h-9 rounded-lg object-cover bg-slate-100"
                              />
                              <div>
                                <span className="font-bold text-slate-800 line-clamp-1">{it.product.name}</span>
                                <span className="text-[10px] text-slate-400">Qty: {it.quantity}</span>
                              </div>
                            </div>
                            <span className="font-bold text-slate-800">{formatPrice(it.unitPrice * it.quantity, order.currency || 'USD')}</span>
                          </div>
                        ))}
                      </div>

                      {/* Installment Plan Status Card (If Order is BNPL) */}
                      {order.installmentDetails && (
                        <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-xl p-3 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-indigo-950 flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                              {order.installmentDetails.provider} ({order.installmentDetails.planTitle})
                            </span>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              order.installmentDetails.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-indigo-100 text-indigo-800'
                            }`}>
                              {order.installmentDetails.status === 'completed'
                                ? 'Fully Paid'
                                : `${order.installmentDetails.paidInstallments}/${order.installmentDetails.installmentsCount} Paid`}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                            {order.installmentDetails.schedule.map((item) => (
                              <div
                                key={item.number}
                                className={`p-1.5 rounded-lg border text-center ${
                                  item.status === 'paid'
                                    ? 'bg-white border-emerald-300 text-emerald-900'
                                    : 'bg-white/80 border-slate-200 text-slate-700'
                                }`}
                              >
                                <span className="text-[9px] text-slate-400 block">#{item.number}</span>
                                <span className="font-extrabold text-[11px] block">{formatPrice(item.amount, order.currency || 'USD')}</span>
                                <span className={`text-[9px] font-bold block ${item.status === 'paid' ? 'text-emerald-600' : 'text-slate-500'}`}>
                                  {item.status === 'paid' ? 'Paid' : item.dueDate}
                                </span>
                              </div>
                            ))}
                          </div>

                          {order.installmentDetails.status === 'active' && (
                            <div className="flex items-center justify-between pt-1 border-t border-indigo-100/80 text-[11px]">
                              <span className="text-slate-600">
                                Remaining Balance: <strong className="text-indigo-900">{formatPrice(order.installmentDetails.remainingAmount, order.currency || 'USD')}</strong>
                              </span>
                              {(() => {
                                const nextDue = order.installmentDetails.schedule.find((s) => s.status === 'pending');
                                if (!nextDue) return null;
                                return (
                                  <button
                                    type="button"
                                    onClick={() => payOrderInstallment(order.id, nextDue.number)}
                                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-[10px] shadow-2xs"
                                  >
                                    Pay Next Split ({formatPrice(nextDue.amount, order.currency || 'USD')})
                                  </button>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openReceipt(order.id)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Receipt</span>
                          </button>

                          {order.orderStatus !== 'cancelled' && order.orderStatus !== 'refunded' && (
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 font-bold text-xs rounded-xl transition-colors"
                            >
                              Cancel Order
                            </button>
                          )}
                        </div>

                        {order.orderStatus !== 'cancelled' && (
                          <button
                            onClick={() => openTrackOrder(order.id)}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Compass className="w-4 h-4" />
                            <span>Track Order Map</span>
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs bg-slate-50 rounded-2xl">
                  No orders found under this filter.
                </div>
              )}

            </div>
          )}

          {/* TAB 4: Security & 2FA */}
          {activeTab === 'security' && (
            <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-150">
              
              {/* 2FA Toggle Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-xs text-slate-900">Two-Factor Authentication (2FA)</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Require a 6-digit code upon logging in to protect unauthorized purchases.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleTwoFactor}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    user.securitySettings.twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      user.securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Password Change Form */}
              <form onSubmit={handleChangePassword} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <h4 className="font-bold text-xs text-slate-900">Change Account Password</h4>
                </div>

                {passError && (
                  <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200 font-medium">
                    {passError}
                  </p>
                )}

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="At least 6 chars"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Update Password
                </button>
              </form>

              {/* Active Sessions & Logged in devices */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active Login Devices & Sessions
                </h4>
                <div className="space-y-2">
                  {user.securitySettings.activeSessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {sess.device.includes('iPhone') ? (
                          <Smartphone className="w-4 h-4 text-slate-600" />
                        ) : (
                          <Laptop className="w-4 h-4 text-slate-600" />
                        )}
                        <div>
                          <span className="font-bold text-slate-800 block">{sess.device}</span>
                          <span className="text-[10px] text-slate-400">
                            {sess.browser} • {sess.location} (IP: {sess.ip})
                          </span>
                        </div>
                      </div>

                      {sess.isCurrent ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Current Device
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">{sess.lastActive}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
