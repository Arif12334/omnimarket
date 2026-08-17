import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Shirt, 
  Home, 
  Sparkles, 
  ShoppingBag, 
  Watch,
  ArrowRight
} from 'lucide-react';
import { CategorySlug } from '../types';

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Watch':
        return <Watch className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-heading">
            Popular Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Explore millions of items across verified departments
          </p>
        </div>

        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Grid of category tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.slug;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug as CategorySlug)}
              className={`group flex flex-col items-center p-3 sm:p-4 rounded-2xl border text-center transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-[1.02]'
                  : 'bg-white hover:bg-indigo-50/50 text-slate-700 border-slate-200/90 hover:border-indigo-300 shadow-xs'
              }`}
              id={`cat-card-${category.slug}`}
            >
              {/* Category Image / Icon container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${
                isSelected 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-indigo-600 group-hover:bg-indigo-100'
              }`}>
                {getCategoryIcon(category.iconName)}
              </div>

              <span className={`text-xs font-bold leading-snug line-clamp-1 ${
                isSelected ? 'text-white' : 'text-slate-900 group-hover:text-indigo-600'
              }`}>
                {category.name}
              </span>

              <span className={`text-[10px] mt-1 font-medium ${
                isSelected ? 'text-indigo-100' : 'text-slate-400'
              }`}>
                {category.itemCount.toLocaleString()}+ items
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
