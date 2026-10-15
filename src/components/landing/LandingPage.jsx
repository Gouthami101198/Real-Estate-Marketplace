import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Building, 
  DollarSign, 
  Bed, 
  SlidersHorizontal, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Users, 
  TrendingUp, 
  ChevronRight,
  Star,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';
import { MOCK_NEIGHBORHOODS, MOCK_TESTIMONIALS, PROPERTY_TYPES } from '../../data/mockData';

export const LandingPage = () => {
  const { 
    properties, 
    agents,
    navigateTo, 
    viewPropertyDetail,
    setSearchQuery, 
    setSelectedNeighborhood,
    setSelectedPropertyType,
    setListingType,
    listingType
  } = useRealEstate();

  // Local hero search inputs
  const [heroLocation, setHeroLocation] = useState('');
  const [heroType, setHeroType] = useState('All Types');
  const [heroTab, setHeroTab] = useState('All'); // 'All' | 'For Sale' | 'For Rent'

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroLocation) setSearchQuery(heroLocation);
    if (heroType !== 'All Types') setSelectedPropertyType(heroType);
    setListingType(heroTab);
    navigateTo('listings');
  };

  const handleSelectNeighborhood = (neighborhoodName) => {
    setSelectedNeighborhood(neighborhoodName);
    navigateTo('listings');
  };

  // Top 4 featured properties
  const featuredProperties = properties.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-20 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-navy-950 overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Ambient Luxury Background Lights & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/properties/worli_skyvilla.jpg"
            alt="Indian Luxury Architectural Estate"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-overlay filter brightness-95 contrast-125 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-900/60" />
          <motion.div
            animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute -top-40 left-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
            className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-navy-600/20 rounded-full blur-[140px] pointer-events-none"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Eyebrow Badge with subtle float */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-gold-400/40 backdrop-blur-md shadow-gold-glow/20"
          >
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
              India's Premier Luxury Real Estate Marketplace
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Find Your Sanctuary Among India's Most <span className="gold-gradient-text italic font-normal">Exclusive Luxury Homes.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover, buy, and lease verified luxury penthouses and private estates across Mumbai, Delhi NCR, Goa & Bengaluru.
          </motion.p>

          {/* Hero Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-navy-900/90 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-gold-500/30 shadow-2xl max-w-4xl mx-auto text-left hover:border-gold-500/50 transition-colors"
          >
            {/* Listing Type Tabs with Animated Sliding Pill */}
            <div className="flex items-center space-x-1.5 mb-4 border-b border-white/10 pb-3">
              {['All', 'For Sale', 'For Rent'].map((tab) => {
                const isSelected = heroTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setHeroTab(tab)}
                    className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                      isSelected
                        ? 'text-navy-950 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="heroTabIndicator"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 shadow-md"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab === 'All' ? 'All Portfolios' : tab}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Input Fields */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Location Input */}
              <div className="sm:col-span-5 relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                  Destination or Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={heroLocation}
                    onChange={(e) => setHeroLocation(e.target.value)}
                    placeholder="Worli, Golf Course Road, Assagao, UB City..."
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-navy-950/70 border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Property Type Selector */}
              <div className="sm:col-span-4 relative">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                  Property Classification
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={heroType}
                    onChange={(e) => setHeroType(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-navy-950/70 border border-white/15 text-white text-xs focus:outline-none focus:border-gold-400 transition-colors appearance-none cursor-pointer"
                  >
                    {PROPERTY_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-navy-900 text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-3 pt-4 sm:pt-4">
                <button
                  type="submit"
                  id="hero-search-submit-btn"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-glow transition-all btn-luxury-shine hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Discover Estates</span>
                </button>
              </div>

            </form>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-slate-300"
          >
            <motion.div 
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/40 transition-all cursor-default"
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">₹18,500 Cr+</p>
              <p className="text-[11px] text-gold-400 uppercase tracking-widest mt-0.5">Volume Transacted</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/40 transition-all cursor-default"
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">100%</p>
              <p className="text-[11px] text-gold-400 uppercase tracking-widest mt-0.5">RERA Registered</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/40 transition-all cursor-default"
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">6 Prime</p>
              <p className="text-[11px] text-gold-400 uppercase tracking-widest mt-0.5">Luxury Metros</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-gold-500/40 transition-all cursor-default"
            >
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">24/7</p>
              <p className="text-[11px] text-gold-400 uppercase tracking-widest mt-0.5">Wealth Advisory</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES CAROUSEL / SHOWCASE */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-gold-600" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white">
              Featured Trophy Properties
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
              Hand-selected architectural statements offering irreplaceable locations and world-class craftsmanship.
            </p>
          </div>

          <button
            id="view-all-residences-btn"
            onClick={() => navigateTo('listings')}
            className="flex items-center gap-2 text-sm font-semibold text-navy-950 dark:text-gold-300 hover:text-gold-600 dark:hover:text-gold-200 transition-colors group"
          >
            <span>View All Prime Residences ({properties.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 3. PRIME NEIGHBORHOODS & DESTINATIONS */}
      <section className="py-20 bg-navy-950 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              India's Prime Enclaves
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Explore Coveted Destinations
            </h2>
            <p className="text-sm text-slate-400">
              From Arabian Sea promenades in Worli to historic Portuguese havelis in Assagao and golf sanctuaries on DLF Golf Course Road.
            </p>
          </div>

          {/* Neighborhoods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {MOCK_NEIGHBORHOODS.map((nh) => (
              <motion.div
                key={nh.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={() => handleSelectNeighborhood(nh.name)}
                className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer border border-white/10 hover:border-gold-400/80 hover:shadow-[0_20px_45px_-12px_rgba(212,175,55,0.35)] transition-all shadow-xl"
              >
                <div className="card-sheen" />
                <img
                  src={nh.image}
                  alt={nh.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gold-300 font-bold group-hover:text-gold-200 transition-colors">
                    {nh.highlight}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 group-hover:translate-x-1 transition-all">
                    {nh.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                    <span>Avg {nh.avgPrice}</span>
                    <span className="text-gold-400 font-semibold">{nh.propertiesCount} Active</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enclaves Hub CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigateTo('enclaves')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-gold-300 font-bold text-xs uppercase tracking-wider border border-gold-400/30 transition-all shadow-md group"
            >
              <span>Explore All Indian Prime Enclaves & Analytics</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE AURA (VALUE PROPOSITION) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white">
            Why Discerning Clients Choose AURA
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            We operate beyond standard commercial brokerages, offering private capital advisory and discreet acquisitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="group relative bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.22)] hover:border-gold-500/60 transition-all overflow-hidden"
          >
            <div className="card-sheen" />
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 group-hover:border-gold-400 group-hover:bg-gold-500/25 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 transition-all duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors">
              Discreet Off-Market Desk
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Over 40% of our ultra-prime estate transactions never reach public marketing portals, safeguarding buyer and seller confidentiality.
            </p>
            <button
              onClick={() => navigateTo('private-desk')}
              className="mt-3 text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 flex items-center gap-1 group/btn"
            >
              <span>Access Private Desk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="group relative bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.22)] hover:border-gold-500/60 transition-all overflow-hidden"
          >
            <div className="card-sheen" />
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 group-hover:border-gold-400 group-hover:bg-gold-500/25 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 transition-all duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors">
              Verified Ownership & Title
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Every residence undergoes rigorous architectural provenance and legal due diligence before joining our portfolio.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="group relative bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.22)] hover:border-gold-500/60 transition-all overflow-hidden"
          >
            <div className="card-sheen" />
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 group-hover:border-gold-400 group-hover:bg-gold-500/25 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 transition-all duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors">
              Real-Time Yield Analytics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Proprietary financial modeling, mortgage calculators, and tax optimization frameworks customized for family offices.
            </p>
            <button
              onClick={() => navigateTo('insights')}
              className="mt-3 text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-gold-500 flex items-center gap-1 group/btn"
            >
              <span>View 2026 Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="group relative bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury hover:shadow-[0_25px_50px_-12px_rgba(212,175,55,0.22)] hover:border-gold-500/60 transition-all overflow-hidden"
          >
            <div className="card-sheen" />
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 group-hover:border-gold-400 group-hover:bg-gold-500/25 group-hover:rotate-6 group-hover:scale-110 flex items-center justify-center text-gold-600 dark:text-gold-400 mb-6 transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors">
              Global Private Advisors
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Access trusted advisors with direct relations to aviation, luxury maritime charters, and leading interior ateliers.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 5. TOP PRIVATE ADVISORS */}
      <section className="py-20 bg-slate-100/70 dark:bg-navy-900/50 border-y border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
                Elite Representation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white">
                Meet Our Senior Advisors
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Distinguished real estate specialists representing global buyers and family offices.
              </p>
            </div>

            <button
              onClick={() => navigateTo('agents')}
              className="flex items-center gap-2 text-sm font-semibold text-navy-950 dark:text-gold-300 hover:text-gold-600 dark:hover:text-gold-200 transition-colors group"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={() => navigateTo('agent-detail', agent.id)}
                className="bg-white dark:bg-navy-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 hover:border-gold-500/70 shadow-luxury hover:shadow-[0_22px_45px_-12px_rgba(212,175,55,0.25)] transition-all cursor-pointer group flex flex-col justify-between relative"
              >
                <div className="relative h-64 overflow-hidden bg-navy-950">
                  <div className="card-sheen" />
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-500/40 text-gold-300 text-[11px] font-bold flex items-center gap-1 group-hover:border-gold-400 group-hover:scale-105 transition-all">
                    <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                    <span>{agent.rating}</span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white group-hover:text-gold-600 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-gold-600 font-medium">
                      {agent.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {agent.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                    <span>Volume: <strong className="text-navy-950 dark:text-white">{agent.salesVolume}</strong></span>
                    <span className="text-gold-600 font-semibold group-hover:underline">
                      View Profile →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
            Private Client Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white">
            Endorsed by Global Investors
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Read how AURA Estates secures unprecedented results across major world capitals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-navy-900 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-5 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gold-400/40"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-navy-950 dark:text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.role}</p>
                  <p className="text-[10px] text-gold-600 font-semibold">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION: SUBMIT PROPERTY */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-navy-950 text-white overflow-hidden p-8 sm:p-12 lg:p-16 border border-gold-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-widest border border-gold-400/40">
              Private Client Representation
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Thinking of Listing an Extraordinary Trophy Estate?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect directly with our private client group. We provide confidential asset valuation, architectural drone cinematography, and immediate access to accredited international buyers.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="cta-submit-property-btn"
                onClick={() => navigateTo('submit-property')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-glow transition-all"
              >
                Submit Your Estate Online
              </button>
              <button
                onClick={() => navigateTo('agents')}
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/20 hover:border-gold-400 text-white font-semibold text-xs tracking-wider transition-all"
              >
                Consult a Private Broker
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
