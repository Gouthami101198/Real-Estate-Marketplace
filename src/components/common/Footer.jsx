import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe2, 
  Phone, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const Footer = () => {
  const { navigateTo, showToast } = useRealEstate();
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid private client email', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to AURA Quarterly Wealth & Real Estate Index', 'gold');
    setEmailInput('');
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-gold-500/20 pt-16 pb-12 overflow-hidden relative">
      {/* Decorative Gold Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-400/50 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                AURA <span className="text-gold-400 font-sans font-light text-xs tracking-widest uppercase px-1.5 py-0.5 rounded border border-gold-500/30 bg-gold-500/10">Estates</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Curating exceptional trophy assets, modern architectural estates, and off-market waterfront residences across the world's most coveted destinations.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Private Wealth Network</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              Portfolios
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-gold-300 transition-colors">
                  Worli Sky Mansions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-gold-300 transition-colors">
                  DLF Golf Course Palaces
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-gold-300 transition-colors">
                  Goa Heritage Havelis
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-gold-300 transition-colors">
                  Jubilee Hills Compounds
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('listings')} className="hover:text-gold-300 transition-colors">
                  Ultra-Prime Leases & Rentals
                </button>
              </li>
            </ul>
          </div>

          {/* Private Advisory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              Private Advisory
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('agents')} className="hover:text-gold-300 transition-colors">
                  Meet Elite Advisors
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('submit-property')} className="hover:text-gold-300 transition-colors">
                  Submit Trophy Listing
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-gold-300 transition-colors">
                  Saved Portfolio
                </button>
              </li>
              <li>
                <span className="hover:text-gold-300 transition-colors cursor-pointer">
                  Off-Market Deal Desk
                </span>
              </li>
              <li>
                <span className="hover:text-gold-300 transition-colors cursor-pointer">
                  Yacht & Aviation Partners
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Intelligence Digest */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans">
              Market Intelligence
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive confidential quarterly analyses on prime real estate yields, ultra-prime sales, and emerging sanctuary locations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter confidential email..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 rounded-lg text-xs font-bold hover:brightness-110 flex items-center justify-center transition-all"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed to confidential briefings.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Global Locations & Footnotes */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-slate-400 font-medium">Advisory Hubs:</span>
            <span>BKC & Worli, Mumbai</span>
            <span>•</span>
            <span>Golf Course Rd, Gurugram</span>
            <span>•</span>
            <span>Assagao, North Goa</span>
            <span>•</span>
            <span>UB City, Bengaluru</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>© 2026 AURA Estates India Pvt. Ltd. MahaRERA & HARERA Partner.</span>
            <span className="hover:text-slate-400 cursor-pointer">RERA Diligence</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
