import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useRealEstate();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center justify-between gap-3 ${
              toast.type === 'gold'
                ? 'bg-navy-900/95 text-white border-gold-400/40 shadow-gold-glow/20'
                : toast.type === 'info'
                ? 'bg-navy-950/95 text-slate-200 border-white/20'
                : 'bg-navy-900/95 text-white border-emerald-500/40'
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === 'gold' ? (
                <div className="w-8 h-8 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              ) : toast.type === 'info' ? (
                <div className="w-8 h-8 rounded-xl bg-slate-700/50 text-slate-300 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <p className="text-xs sm:text-sm font-medium leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
