import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Share2, 
  Lock, 
  Globe, 
  ExternalLink, 
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrimeBadge } from './PrimeBadge';

export const WishlistModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    wishlists, 
    removeFromWishlist, 
    createWishlist, 
    deleteWishlist, 
    addToCart,
    openProductDetails,
    showToast 
  } = useApp();

  const [activeListId, setActiveListId] = useState<string>(wishlists[0]?.id || 'wl-1');
  const [newListName, setNewListName] = useState('');
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (activeModal !== 'wishlist_modal') return null;

  const currentList = wishlists.find((wl) => wl.id === activeListId) || wishlists[0];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createWishlist(newListName.trim());
    setNewListName('');
    setIsCreatingList(false);
  };

  const handleShareList = () => {
    setCopiedLink(true);
    showToast('Share Link Copied', 'Amazon Wishlist link copied to your clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleMoveAllToCart = () => {
    if (!currentList || currentList.items.length === 0) return;
    currentList.items.forEach((item) => {
      addToCart(item.product, 1);
    });
    showToast('All Items Added to Cart', `Added ${currentList.items.length} items to your cart!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Your Amazon Wishlists & Registries</span>
              </h2>
              <p className="text-xs text-slate-400">Save items for later, track price drops, and share with friends</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlists Tab Selector Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2">
            {wishlists.map((wl) => (
              <button
                key={wl.id}
                onClick={() => setActiveListId(wl.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeListId === wl.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{wl.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeListId === wl.id ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {wl.items.length}
                </span>
              </button>
            ))}

            <button
              onClick={() => setIsCreatingList(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-dashed border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 transition-colors flex items-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create a List</span>
            </button>
          </div>

          {currentList && currentList.items.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShareList}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share List'}</span>
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {/* Create List Form Modal / Strip */}
        {isCreatingList && (
          <form
            onSubmit={handleCreateList}
            className="p-4 bg-amber-50/70 border-b border-amber-200 flex items-center gap-3 animate-in fade-in duration-150"
          >
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="e.g., Birthday Wishlist, Living Room Upgrade, Books to Read"
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white border border-amber-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shadow-xs"
            >
              Create List
            </button>
            <button
              type="button"
              onClick={() => setIsCreatingList(false)}
              className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </form>
        )}

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!currentList || currentList.items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click the heart icon on any product card or details page to add items to this list.
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="mt-5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Explore Today's Deals
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentList.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onClick={() => openProductDetails(item.product)}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0 cursor-pointer hover:opacity-90"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {item.product.brand}
                        </span>
                        {item.priority && (
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            item.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {item.priority} Priority
                          </span>
                        )}
                      </div>

                      <h4
                        onClick={() => openProductDetails(item.product)}
                        className="text-xs sm:text-sm font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                      >
                        {item.product.name}
                      </h4>

                      <div className="flex items-center gap-2.5 mt-1">
                        <span className="text-sm font-black text-slate-900">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <PrimeBadge size="sm" />
                      </div>

                      {item.note && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          "{item.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                    <button
                      onClick={() => removeFromWishlist(currentList.id, item.productId)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(item.product, 1);
                      }}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {currentList && wishlists.length > 1 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>List created {currentList.createdAt}</span>
            <button
              onClick={() => deleteWishlist(currentList.id)}
              className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete this list</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
