import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building2, 
  Heart, 
  Scale, 
  User, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const MobileBottomNav = () => {
  const { 
    currentView, 
    navigateTo, 
    savedPropertyIds, 
    comparePropertyIds, 
    setIsCompareModalOpen, 
    user, 
    openAuthModal 
  } = useRealEstate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => navigateTo('home') },
    { id: 'listings', label: 'Residences', icon: Building2, onClick: () => navigateTo('listings') },
    { id: 'enclaves', label: 'Enclaves', icon: MapPin, onClick: () => navigateTo('enclaves') },
    { 
      id: 'wishlist', 
      label: 'Saved', 
      icon: Heart, 
      badge: savedPropertyIds.length,
      onClick: () => navigateTo('wishlist') 
    },
    { 
      id: 'compare', 
      label: 'Compare', 
      icon: Scale, 
      badge: comparePropertyIds.length,
      onClick: () => setIsCompareModalOpen(true) 
    },
    { 
      id: 'account', 
      label: user ? user.name.split(' ')[0] : 'Sign In', 
      icon: User, 
      onClick: () => user ? navigateTo('wishlist') : openAuthModal('login') 
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 dark:bg-navy-950/98 backdrop-blur-xl border-t border-gold-500/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto grid grid-cols-6 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive 
                  ? 'text-gold-400 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400 scale-110' : ''} transition-transform`} />
                {Boolean(item.badge && item.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2 bg-gold-500 text-navy-950 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveIndicator"
                  className="absolute bottom-0 w-6 h-0.5 bg-gold-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
