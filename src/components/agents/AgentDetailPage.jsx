import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Phone, 
  Mail, 
  Award, 
  ShieldCheck, 
  Languages, 
  Building2, 
  Calendar, 
  Send, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';

export const AgentDetailPage = () => {
  const { currentAgent, properties, navigateTo, showToast } = useRealEstate();

  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingType, setBookingType] = useState('Acquisition Advisory');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!currentAgent) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="font-serif text-2xl font-bold">Advisor Profile Not Found</h2>
        <button
          onClick={() => navigateTo('agents')}
          className="mt-4 px-6 py-2 rounded-xl bg-navy-900 text-gold-300 text-xs font-semibold"
        >
          Back to Advisors Directory
        </button>
      </div>
    );
  }

  // Active listings by this agent
  const agentProperties = properties.filter((p) => p.agentId === currentAgent.id);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) {
      showToast('Please provide your name and private email', 'info');
      return;
    }
    setIsBooked(true);
    showToast(`Consultation request submitted to ${currentAgent.name}`, 'gold');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigateTo('agents')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Advisors Directory</span>
        </button>
      </div>

      {/* Advisor Profile Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Portrait */}
            <div className="md:col-span-4 lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-[280px] mx-auto ring-2 ring-gold-400/40 shadow-2xl">
                <img
                  src={currentAgent.avatar}
                  alt={currentAgent.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio & Details */}
            <div className="md:col-span-8 lg:col-span-9 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-400/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Senior Advisor
                  </span>
                  <div className="flex items-center gap-1 text-gold-400 text-xs font-bold">
                    <Star className="w-4 h-4 fill-gold-400" />
                    <span>{currentAgent.rating}</span>
                    <span className="text-slate-400 font-normal">({currentAgent.reviewsCount} private client reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                  {currentAgent.name}
                </h1>

                <p className="text-sm text-gold-300 font-medium mt-1">
                  {currentAgent.title} • {currentAgent.agency}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-3xl">
                {currentAgent.bio}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Career Sales Volume</span>
                  <strong className="font-serif text-xl font-bold text-white mt-0.5 block">{currentAgent.salesVolume}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Experience</span>
                  <strong className="font-serif text-xl font-bold text-white mt-0.5 block">{currentAgent.experienceYears} Years</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Languages</span>
                  <strong className="text-slate-200 mt-0.5 block">{currentAgent.languages.join(', ')}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Direct Contact</span>
                  <span className="text-gold-300 font-medium mt-0.5 block">{currentAgent.phone}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Main Content: Agent Listings + Confidential Consultation Booking Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Listings Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold">
                  Exclusive Representations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
                  Active Listings by {currentAgent.name.split(' ')[0]}
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {agentProperties.length} Trophy Estates
              </span>
            </div>

            {agentProperties.length === 0 ? (
              <div className="bg-white dark:bg-navy-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-white/10 shadow-luxury">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  This advisor currently has off-market private listings available upon direct inquiry.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Confidential Consultation Form */}
          <div>
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 sticky top-28 transition-colors">
              <div>
                <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                  Request Private Consultation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Schedule a confidential advisory call or private viewing with {currentAgent.name}.
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Private Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="investor@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Advisory Objective
                  </label>
                  <select
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Acquisition Advisory">Private Acquisition Advisory</option>
                    <option value="Asset Disposition">Listing / Selling a Trophy Asset</option>
                    <option value="Off-Market Portfolio Inquiry">Off-Market Portfolio Access</option>
                    <option value="Maritime & Yacht Slips">Coastal & Maritime Property</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Confidential Notes
                  </label>
                  <textarea
                    rows={3}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="Target locations, budget parameters, or specific requirements..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-gold-400 dark:text-navy-950" />
                  <span>Book Confidential Consultation</span>
                </button>

                {isBooked && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4" /> Consultation requested successfully!
                  </p>
                )}
              </form>

              <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>License: CalDRE #01928441</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active & Insured</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
