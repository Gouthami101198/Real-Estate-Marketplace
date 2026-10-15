import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  X,
  Sparkles,
  Minus
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const DeviceViewportSwitcher = () => {
  const { 
    viewportMode, 
    setViewportMode, 
    isViewportSwitcherOpen, 
    setIsViewportSwitcherOpen 
  } = useRealEstate();

  const [isMinimized, setIsMinimized] = useState(false);

  // If closed by user, don't render anything to keep the view 100% clean and unobstructed
  if (!isViewportSwitcherOpen) {
    return null;
  }

  const viewports = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'tablet', label: 'Tablet (768px)', icon: Tablet },
    { id: 'mobile', label: 'Mobile (390px)', icon: Smartphone }
  ];

  // Minimized compact floating badge (safely pinned in bottom-left corner away from toasts and center drawers)
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-20 left-4 lg:bottom-6 lg:left-6 z-[9999] flex items-center gap-1 bg-navy-950/95 border border-gold-500/50 rounded-full p-1 shadow-2xl backdrop-blur-xl"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="px-2.5 py-1.5 rounded-full text-gold-300 flex items-center gap-1.5 text-xs font-bold transition-all hover:text-white"
          title="Expand Viewport Switcher"
        >
          <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
            {viewportMode === 'desktop' && <Monitor className="w-3 h-3" />}
            {viewportMode === 'tablet' && <Tablet className="w-3 h-3" />}
            {viewportMode === 'mobile' && <Smartphone className="w-3 h-3" />}
          </div>
          <span className="capitalize text-[11px] font-semibold text-slate-200">
            {viewportMode}
          </span>
          <span className="text-[10px] text-gold-400/80 font-mono">▾</span>
        </button>

        <button
          onClick={() => setIsViewportSwitcherOpen(false)}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Dismiss Viewport Bar"
        >
          <X className="w-3 h-3" />
        </button>
      </motion.div>
    );
  }

  // Expanded floating switcher toolbar (docked neatly in the bottom-left corner)
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      className="fixed bottom-20 left-4 lg:bottom-6 lg:left-6 z-[9999] flex items-center gap-1.5 p-1.5 rounded-2xl bg-navy-950/95 border border-gold-500/40 shadow-[0_16px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
    >
      <div className="flex items-center gap-1.5 px-2 text-gold-400 hidden sm:flex">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
          Device:
        </span>
      </div>

      <div className="flex items-center gap-1">
        {viewports.map((vp) => {
          const Icon = vp.icon;
          const isActive = viewportMode === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() => setViewportMode(vp.id)}
              className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'text-navy-950 font-bold shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeViewportPill"
                  className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
              <span className="relative z-10">{vp.label}</span>
            </button>
          );
        })}
      </div>

      {/* Minimize Button */}
      <button
        onClick={() => setIsMinimized(true)}
        className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
        title="Minimize"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      {/* Close / Dismiss Button */}
      <button
        onClick={() => setIsViewportSwitcherOpen(false)}
        className="p-1.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        title="Dismiss Viewport Bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
