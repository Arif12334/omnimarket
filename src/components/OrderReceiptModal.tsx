import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Printer, 
  Compass, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Download, 
  ShieldCheck,
  Calendar,
  Share2,
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';

export const OrderReceiptModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    activeOrder, 
    openTrackOrder,
    payOrderInstallment
  } = useApp();

  if (activeModal !== 'order_receipt' || !activeOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const installments = activeOrder.installmentDetails;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm font-heading">Order Receipt & Invoice</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-500 hover:text-indigo-600 rounded-xl hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Receipt Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6" id="printable-receipt-area">
          
          {/* Order Header / Success Banner */}
          <div className="text-center pb-6 border-b border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Payment Successful • Order Confirmed
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-2">
              Thank you for your order!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              A copy of this receipt has been emailed to your account.
            </p>
          </div>

          {/* Key Reference Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Order Number</span>
              <span className="font-extrabold text-slate-900 font-mono text-xs">{activeOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
              <span className="font-bold text-slate-800">
                {new Date(activeOrder.date).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
              <span className="font-bold text-slate-800 capitalize">
                {activeOrder.paymentMethod.replace('_', ' ')}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Transaction Ref</span>
              <span className="font-mono text-slate-800 text-[11px] truncate block">
                {activeOrder.paymentDetails.referenceId}
              </span>
            </div>
          </div>

          {/* Delivery Address & QR Code */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/80">
            <div className="sm:col-span-8 space-y-1 text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" /> Delivery Destination
              </span>
              <p className="font-bold text-slate-800">{activeOrder.deliveryAddress.fullName}</p>
              <p className="text-slate-600">{activeOrder.deliveryAddress.street}</p>
              <p className="text-slate-500">
                {activeOrder.deliveryAddress.city}, {activeOrder.deliveryAddress.state} {activeOrder.deliveryAddress.zipCode}
              </p>
              <p className="text-slate-500">{activeOrder.deliveryAddress.phone}</p>
            </div>

            <div className="sm:col-span-4 flex flex-col items-center justify-center p-2 bg-white rounded-xl border border-slate-200 text-center">
              <div className="w-20 h-20 bg-slate-900 text-white rounded-lg flex items-center justify-center p-1">
                {/* Visual authentic QR Representation */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-white rounded">
                  <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                  <div className="w-3 h-3 bg-slate-900"></div>
                  <div className="w-3 h-3 bg-slate-300"></div>
                  <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                  <div className="w-3 h-3 bg-slate-900"></div>
                  <div className="w-3 h-3 bg-slate-200"></div>
                  <div className="w-3 h-3 bg-slate-900"></div>
                  <div className="w-3 h-3 bg-slate-300"></div>
                  <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                  <div className="w-3 h-3 bg-slate-900"></div>
                  <div className="w-3 h-3 bg-slate-900"></div>
                  <div className="w-3 h-3 bg-slate-900 rounded-xs"></div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1">Scan for Handover</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Purchased Items
            </h4>
            <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
              {activeOrder.items.map((item) => (
                <div key={item.id} className="p-3.5 bg-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div>
                      <h5 className="font-bold text-slate-900">{item.product.name}</h5>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor} • </span>}
                        <span>Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Installment Plan Breakdown (If Paid Little by Little) */}
          {installments && (
            <div className="bg-indigo-50/70 border border-indigo-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-indigo-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {installments.provider} • {installments.planTitle}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      0% APR Installment Financing • Auto-debiting from Card ending in {installments.autoDebitCardLast4}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    installments.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {installments.status === 'completed' ? 'Fully Paid Off' : `${installments.paidInstallments} of ${installments.installmentsCount} Paid`}
                  </span>
                </div>
              </div>

              {/* Installment Schedule Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {installments.schedule.map((item) => {
                  const isPaid = item.status === 'paid';
                  return (
                    <div
                      key={item.number}
                      className={`p-2.5 rounded-xl border flex flex-col justify-between ${
                        isPaid
                          ? 'bg-white border-emerald-300 shadow-2xs'
                          : 'bg-white/80 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500">Payment #{item.number}</span>
                        {isPaid ? (
                          <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                            Due
                          </span>
                        )}
                      </div>

                      <div className="my-1">
                        <span className="text-sm font-extrabold text-slate-900">${item.amount.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{item.dueDate}</span>
                      </div>

                      {!isPaid && (
                        <button
                          type="button"
                          onClick={() => payOrderInstallment(activeOrder.id, item.number)}
                          className="mt-1 w-full py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded-lg transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
                <span>
                  Paid so far: <strong className="text-emerald-700">${installments.paidAmount.toFixed(2)}</strong>
                </span>
                <span>
                  Remaining balance: <strong className="text-indigo-700">${installments.remainingAmount.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Pricing Calculation Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${activeOrder.subtotal.toFixed(2)}</span>
            </div>

            {activeOrder.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Promo</span>
                <span>-${activeOrder.discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee ({activeOrder.shippingMethod.name})</span>
              <span>{activeOrder.deliveryFee === 0 ? 'FREE' : `$${activeOrder.deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Estimated Sales Tax</span>
              <span>${activeOrder.tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>{installments ? 'Total Order Amount' : 'Total Paid'}</span>
              <span className="text-indigo-600 text-lg">${activeOrder.total.toFixed(2)}</span>
            </div>
            {installments && (
              <div className="flex justify-between text-xs text-emerald-700 font-bold">
                <span>Down payment charged at checkout</span>
                <span>${(installments.paidAmount).toFixed(2)}</span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs rounded-xl transition-colors"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => openTrackOrder(activeOrder.id)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all"
            id="receipt-track-order-btn"
          >
            <Compass className="w-4 h-4" />
            <span>Track Live Delivery on Map</span>
          </button>
        </div>

      </div>
    </div>
  );
};
