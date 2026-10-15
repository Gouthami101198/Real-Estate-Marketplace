import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Car
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const TourModal = () => {
  const { isTourModalOpen, tourProperty, closeTourModal, showToast } = useRealEstate();

  const [tourType, setTourType] = useState('In-Person Viewing'); // 'In-Person Viewing' | '4K Live Video Tour'
  const [selectedDate, setSelectedDate] = useState('2026-10-18');
  const [selectedTime, setSelectedTime] = useState('Golden Hour Sunset (5:30 PM)');
  const [guestName, setGuestName] = useState('Eleanor Vance');
  const [guestEmail, setGuestEmail] = useState('eleanor.vance@auragroup.com');
  const [guestPhone, setGuestPhone] = useState('+1 (310) 892-4410');
  const [needsChauffeur, setNeedsChauffeur] = useState(true);
  const [isScheduled, setIsScheduled] = useState(false);

  if (!isTourModalOpen || !tourProperty) return null;

  const handleConfirmTour = (e) => {
    e.preventDefault();
    setIsScheduled(true);
    showToast(
      `Private viewing confirmed for ${tourProperty.title} on ${selectedDate} at ${selectedTime}`,
      'gold'
    );
    setTimeout(() => {
      setIsScheduled(false);
      closeTourModal();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-white dark:bg-navy-900 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 transition-colors"
        >
          {/* Header */}
          <div className="p-6 bg-navy-950 text-white flex items-center justify-between border-b border-gold-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-400/40 text-gold-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">
                  Schedule Private Viewing
                </h3>
                <p className="text-xs text-slate-300 truncate max-w-xs">
                  {tourProperty.title}
                </p>
              </div>
            </div>

            <button
              onClick={closeTourModal}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleConfirmTour} className="p-6 space-y-5">
            
            {/* Tour Type Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTourType('In-Person Viewing')}
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  tourType === 'In-Person Viewing'
                    ? 'bg-navy-900 dark:bg-gold-500/20 border-navy-900 dark:border-gold-500/40 text-gold-300 dark:text-gold-300 shadow-md'
                    : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-gold-400'
                }`}
              >
                <MapPin className="w-4 h-4 text-gold-500" />
                <span>In-Person Viewing</span>
              </button>

              <button
                type="button"
                onClick={() => setTourType('4K Live Video Tour')}
                className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  tourType === '4K Live Video Tour'
                    ? 'bg-navy-900 dark:bg-gold-500/20 border-navy-900 dark:border-gold-500/40 text-gold-300 dark:text-gold-300 shadow-md'
                    : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-gold-400'
                }`}
              >
                <Video className="w-4 h-4 text-gold-500" />
                <span>4K Live Video Tour</span>
              </button>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white font-medium focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Viewing Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white font-medium focus:outline-none focus:border-gold-500"
                >
                  <option value="Morning Light (10:00 AM)">Morning Light (10:00 AM)</option>
                  <option value="Midday Solar Walkthrough (1:30 PM)">Midday Solar Walkthrough (1:30 PM)</option>
                  <option value="Golden Hour Sunset (5:30 PM)">Golden Hour Sunset (5:30 PM)</option>
                  <option value="Evening Architectural Lighting (7:30 PM)">Evening Lighting (7:30 PM)</option>
                </select>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Private Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Confirmation Email
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Chauffeur Service Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/10 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={needsChauffeur}
                  onChange={(e) => setNeedsChauffeur(e.target.checked)}
                  className="w-4 h-4 rounded text-gold-500 accent-gold-500"
                />
                <span className="flex items-center gap-1.5 font-medium">
                  <Car className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Request complimentary private chauffeur transfer to property</span>
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Private Appointment</span>
              </button>

              {isScheduled && (
                <p className="text-xs text-emerald-600 font-semibold text-center mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Viewing reservation confirmed!
                </p>
              )}
            </div>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
