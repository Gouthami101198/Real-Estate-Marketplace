import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Plane, 
  Sparkles, 
  FileCheck, 
  ArrowRight, 
  Send, 
  PhoneCall, 
  Building2, 
  Users, 
  Award,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const PrivateDeskPage = () => {
  const { showToast, agents, viewAgentDetail } = useRealEstate();

  const [mandateData, setMandateData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    investorType: 'Family Office Principal',
    targetMetros: ['Mumbai (Worli & South)'],
    capitalBracket: '₹30 Cr – ₹60 Cr',
    timeframe: 'Immediate (0 – 3 Months)',
    preferredFeatures: ['Arabian Sea View', '100% Vastu Compliant'],
    confidentialNotes: ''
  });

  const [isMandateSubmitted, setIsMandateSubmitted] = useState(false);

  const toggleMetro = (metro) => {
    setMandateData((prev) => ({
      ...prev,
      targetMetros: prev.targetMetros.includes(metro)
        ? prev.targetMetros.filter((m) => m !== metro)
        : [...prev.targetMetros, metro]
    }));
  };

  const toggleFeature = (feature) => {
    setMandateData((prev) => ({
      ...prev,
      preferredFeatures: prev.preferredFeatures.includes(feature)
        ? prev.preferredFeatures.filter((f) => f !== feature)
        : [...prev.preferredFeatures, feature]
    }));
  };

  const handleMandateSubmit = (e) => {
    e.preventDefault();
    if (!mandateData.clientName || !mandateData.clientEmail) {
      showToast('Please provide your name and confidential email', 'info');
      return;
    }
    setIsMandateSubmitted(true);
    showToast('Confidential mandate registered. Your private partner will connect within 2 hours.', 'gold');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>Off-Market & Bilateral Advisory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            The Private Client Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Over 45% of India’s benchmark trophy transactions above ₹30 Cr remain undisclosed to public portals. Our Private Desk represents family offices, tech titans, and global business dynasties under strict non-disclosure covenants.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-navy-900 p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-600 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              Confidential Off-Market Inventory
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bespoke developer allocations, private havelis, and unlisted penthouses in Worli, DLF Camellias, and Assagao protected by mutual bilateral NDAs.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-600 flex items-center justify-center">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              Private Aviation & Site Transfers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              15-minute helicopter transfer arrangements from Juhu Aerodrome to Alibaug coastal plots or private turboprop charters to North Goa estates.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              Architectural & Atelier Concierge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Curated introductions to India’s leading architectural ateliers, bespoke Italian marble curators, and turnkey landscape designers.
            </p>
          </div>

          <div className="bg-white dark:bg-navy-900 p-7 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
              Single-Point Fiduciary Conveyance
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              End-to-end representation covering family trust holding structures, Lower Deduction Certificate (LDC) filings, and deed registration.
            </p>
          </div>
        </div>

        {/* Confidential Mandate Submission Section */}
        <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Protected Under Bilateral Confidentiality</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
              Register a Confidential Acquisition Mandate
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Specify your target parameters. A Senior Managing Director will personally review your mandate and respond via encrypted channel.
            </p>
          </div>

          {isMandateSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 sm:p-12 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-gold-500/30 text-center space-y-4 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 rounded-3xl bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                Mandate Successfully Registered
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Thank you, <strong>{mandateData.clientName}</strong>. Your acquisition mandate has been routed to our Managing Partner. You will receive an initial off-market dossier and private consultation link at <strong>{mandateData.clientEmail}</strong>.
              </p>
              <button
                onClick={() => setIsMandateSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 font-bold text-xs"
              >
                Submit Additional Mandate
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleMandateSubmit} className="space-y-6">
              
              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Principal / Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={mandateData.clientName}
                    onChange={(e) => setMandateData({ ...mandateData, clientName: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={mandateData.clientEmail}
                    onChange={(e) => setMandateData({ ...mandateData, clientEmail: e.target.value })}
                    placeholder="e.g. principal@singhaniaholdings.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Direct Contact / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={mandateData.clientPhone}
                    onChange={(e) => setMandateData({ ...mandateData, clientPhone: e.target.value })}
                    placeholder="e.g. +91 98201 00000"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Investor Classification & Capital Allocation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Investor Profile
                  </label>
                  <select
                    value={mandateData.investorType}
                    onChange={(e) => setMandateData({ ...mandateData, investorType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Family Office Principal">Family Office Principal</option>
                    <option value="Tech Founder / Unicorn Executive">Tech Founder / Unicorn Executive</option>
                    <option value="Industrialist / Business Dynasty">Industrialist / Business Dynasty</option>
                    <option value="NRI / Global Citizen">NRI / Global Citizen</option>
                    <option value="Entertainment & Sports Icon">Entertainment & Sports Icon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Capital Allocation Bracket
                  </label>
                  <select
                    value={mandateData.capitalBracket}
                    onChange={(e) => setMandateData({ ...mandateData, capitalBracket: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 font-bold"
                  >
                    <option value="₹15 Cr – ₹30 Cr">₹15 Cr – ₹30 Cr</option>
                    <option value="₹30 Cr – ₹60 Cr">₹30 Cr – ₹60 Cr</option>
                    <option value="₹60 Cr – ₹100 Cr">₹60 Cr – ₹100 Cr</option>
                    <option value="₹100 Cr+ (Trophy Palaces)">₹100 Cr+ (Trophy Palaces)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Acquisition Timeframe
                  </label>
                  <select
                    value={mandateData.timeframe}
                    onChange={(e) => setMandateData({ ...mandateData, timeframe: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Immediate (0 – 3 Months)">Immediate (0 – 3 Months)</option>
                    <option value="3 – 6 Months">3 – 6 Months</option>
                    <option value="6 – 12 Months (Strategic Allocation)">6 – 12 Months (Strategic Allocation)</option>
                  </select>
                </div>
              </div>

              {/* Target Metros Multi-Select */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Target Locations (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Mumbai (Worli & South)',
                    'Bandra West & Pali Hill',
                    'Golf Course Road, Gurugram',
                    'Lutyens’ Bungalow Zone, Delhi',
                    'Assagao & North Goa Coastal',
                    'Alibaug Coastal Sanctuaries',
                    'UB City / Sadashivnagar, Bengaluru',
                    'Jubilee Hills, Hyderabad'
                  ].map((metro) => {
                    const isSelected = mandateData.targetMetros.includes(metro);
                    return (
                      <button
                        key={metro}
                        type="button"
                        onClick={() => toggleMetro(metro)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 border-navy-900 dark:border-gold-500 font-bold'
                            : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{metro}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Specific Features Multi-Select */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Essential Requirements
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Arabian Sea View',
                    '100% Vastu Compliant',
                    'Championship Golf Facing',
                    'Restored Portuguese Heritage',
                    'Private Plunge Pool',
                    'Helipad Access Nearby',
                    '100% DG Power Backup',
                    'Staff & Driver Quarters (3+)'
                  ].map((feat) => {
                    const isSelected = mandateData.preferredFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          isSelected
                            ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 border-navy-900 dark:border-gold-500 font-bold'
                            : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{feat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confidential Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Specific Brief / Confidential Constraints
                </label>
                <textarea
                  rows="3"
                  value={mandateData.confidentialNotes}
                  onChange={(e) => setMandateData({ ...mandateData, confidentialNotes: e.target.value })}
                  placeholder="Detail any specific floor plate requirements, privacy clearances, or holding entity parameters..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/10">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-gold-500" />
                  <span>Encrypted submission protected under Indian Contract Act NDAs.</span>
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-glow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Confidential Mandate</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Private Desk Managing Directors Roster */}
        <div className="space-y-6 pt-4">
          <div className="border-b border-slate-200 dark:border-white/10 pb-4">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
              Direct Access
            </span>
            <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
              Private Desk Managing Directors
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => viewAgentDetail(agent.id)}
                className="bg-white dark:bg-navy-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 hover:border-gold-500/50 shadow-luxury transition-all cursor-pointer group space-y-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-gold-500/30"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-navy-950 dark:text-white group-hover:text-gold-600 transition-colors">
                      {agent.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {agent.title}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Transactions:</span>
                  <strong className="text-navy-950 dark:text-white font-bold">{agent.salesVolume}</strong>
                </div>

                <button
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Connect Confidential</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
