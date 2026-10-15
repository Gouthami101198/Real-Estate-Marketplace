import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Trash2, 
  Scale, 
  Building2, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';

export const WishlistPage = () => {
  const { 
    savedProperties, 
    savedPropertyIds, 
    navigateTo, 
    setIsCompareModalOpen,
    showToast,
    formatPrice
  } = useRealEstate();

  // Calculate total portfolio value for properties for sale
  const totalPortfolioValue = savedProperties
    .filter((p) => p.listingType === 'For Sale')
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-gold-400 text-gold-400" />
              <span>Private Saved Portfolio</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Curated Saved Residences
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Your personal shortlist of exceptional architectural compounds and investment opportunities in India.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <div className="bg-navy-900/90 border border-gold-500/30 rounded-2xl p-4 sm:p-5 text-right backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Total Portfolio Asset Value
              </span>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">
                {formatPrice(totalPortfolioValue)}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {savedProperties.length} estates saved
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {savedProperties.length === 0 ? (
          <div className="bg-white dark:bg-navy-900 rounded-3xl p-16 text-center border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-5 max-w-xl mx-auto my-12 transition-colors">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
              Your Saved Portfolio is Empty
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              You haven't saved any estates yet. Explore our ultra-luxury residences and tap the heart icon to curate your personal acquisition shortlist.
            </p>

            <button
              onClick={() => navigateTo('listings')}
              className="px-6 py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore Prime Portfolios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <p>
                Displaying <strong className="text-navy-950 dark:text-white font-semibold">{savedProperties.length}</strong> saved residences
              </p>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="text-xs font-semibold text-navy-950 dark:text-gold-300 hover:text-gold-600 dark:hover:text-gold-200 flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-gold-500" />
                <span>Open Comparison Tool</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {savedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
