import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  Scale, 
  Share2, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Phone, 
  Mail, 
  Calculator, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Eye, 
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';

export const PropertyDetailPage = () => {
  const {
    currentProperty,
    properties,
    agents,
    navigateTo,
    toggleSaveProperty,
    isPropertySaved,
    toggleCompareProperty,
    isComparing,
    openTourModal,
    showToast,
    formatPrice,
    currency
  } = useRealEstate();

  // Gallery Lightbox Modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);

  // Agent inquiry form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState(
    currentProperty 
      ? `I am interested in scheduling a confidential private viewing of ${currentProperty.title}. Please provide full acquisition diligence documentation.`
      : ''
  );
  const [isInquirySent, setIsInquirySent] = useState(false);

  if (!currentProperty) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <h2 className="font-serif text-2xl font-bold">Property Not Found</h2>
        <button
          onClick={() => navigateTo('listings')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-navy-900 text-gold-300 font-semibold text-xs"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  const homePrice = currentProperty.price;
  const agent = agents.find((a) => a.id === currentProperty.agentId) || agents[0];

  // Mortgage calculations
  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const principalLoan = Math.max(0, homePrice - downPaymentAmount);
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    principalLoan > 0
      ? (principalLoan *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
      : 0;

  const monthlyTaxes = currentProperty.monthlyCosts?.propertyTaxes || 85000;
  const monthlyInsurance = currentProperty.monthlyCosts?.homeInsurance || 25000;
  const monthlyHoa = currentProperty.monthlyCosts?.hoa || 60000;
  const estimatedStampDuty = Math.round(homePrice * 0.06); // ~6% average stamp duty in Indian states
  const totalMonthlyCost =
    monthlyPrincipalAndInterest + monthlyTaxes + monthlyInsurance + monthlyHoa;

  // Similar properties
  const similarProperties = properties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        (p.propertyType === currentProperty.propertyType ||
          p.location.neighborhood === currentProperty.location.neighborhood)
    )
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Listing link copied to clipboard', 'gold');
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      showToast('Please provide your name and private email', 'info');
      return;
    }
    setIsInquirySent(true);
    showToast(`Confidential inquiry dispatched to ${agent.name}`, 'gold');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-24 transition-colors duration-300">
      
      {/* 1. TOP BREADCRUMBS & ACTIONS BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => navigateTo('home')} className="hover:text-gold-600 font-medium">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('listings')} className="hover:text-gold-600 font-medium">Portfolios</button>
            <span>/</span>
            <span className="text-navy-950 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-xs">{currentProperty.title}</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompareProperty(currentProperty.id)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-all ${
                isComparing(currentProperty.id)
                  ? 'bg-navy-900 border-navy-900 text-gold-300 dark:bg-gold-500/20 dark:border-gold-500/40 dark:text-gold-300'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-gold-400'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isComparing(currentProperty.id) ? 'Comparing' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleSaveProperty(currentProperty.id)}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-all ${
                isPropertySaved(currentProperty.id)
                  ? 'bg-rose-50 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/40 text-rose-500'
                  : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-rose-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isPropertySaved(currentProperty.id) ? 'fill-rose-500' : ''}`} />
              <span>{isPropertySaved(currentProperty.id) ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-gold-400"
              title="Share Listing"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-gold-400 hidden sm:block"
              title="Print Brochure"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. MOSAIC PHOTO GALLERY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] sm:h-[500px] rounded-3xl overflow-hidden relative shadow-2xl">
          
          {/* Main Large Photo */}
          <div
            onClick={() => {
              setActivePhotoIdx(0);
              setIsLightboxOpen(true);
            }}
            className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden bg-navy-950"
          >
            <img
              src={currentProperty.images[0]}
              alt={currentProperty.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-950/90 text-gold-300 border border-gold-400/40">
                {currentProperty.status}
              </span>
            </div>
          </div>

          {/* Side Photo 1 */}
          <div
            onClick={() => {
              setActivePhotoIdx(1);
              setIsLightboxOpen(true);
            }}
            className="hidden md:block h-full relative cursor-pointer group overflow-hidden bg-navy-950"
          >
            <img
              src={currentProperty.images[1] || currentProperty.images[0]}
              alt="Interior perspective"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Side Photo 2 + View All Photos Trigger */}
          <div className="hidden md:flex flex-col gap-3 h-full">
            <div
              onClick={() => {
                setActivePhotoIdx(2);
                setIsLightboxOpen(true);
              }}
              className="h-1/2 relative cursor-pointer group overflow-hidden rounded-tr-2xl bg-navy-950"
            >
              <img
                src={currentProperty.images[2] || currentProperty.images[0]}
                alt="Architecture detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              onClick={() => {
                setActivePhotoIdx(3);
                setIsLightboxOpen(true);
              }}
              className="h-1/2 relative cursor-pointer group overflow-hidden rounded-br-2xl bg-navy-950"
            >
              <img
                src={currentProperty.images[3] || currentProperty.images[0]}
                alt="Outdoor living"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-navy-950/40 transition-colors">
                <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-gold-400/50 px-3 py-1.5 rounded-xl bg-navy-900/80">
                  <Eye className="w-3.5 h-3.5 text-gold-400" />
                  <span>View All Photos ({currentProperty.images.length})</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mobile View Photos Trigger */}
          <button
            onClick={() => {
              setActivePhotoIdx(0);
              setIsLightboxOpen(true);
            }}
            className="md:hidden absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-navy-950/90 text-gold-300 font-bold text-xs border border-gold-400/40 backdrop-blur-md flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View All Photos ({currentProperty.images.length})</span>
          </button>

        </div>
      </div>

      {/* 3. PROPERTY TITLE, PRICING & KEY SPECS RIBBON */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 transition-colors">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-100 dark:border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-300 border border-gold-500/30">
                  {currentProperty.propertyType}
                </span>
                {currentProperty.reraId && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{currentProperty.reraId}</span>
                  </span>
                )}
                {currentProperty.vastuCompliant && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30">
                    100% Vastu Compliant
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-navy-900 text-gold-300 border border-gold-400/30">
                  {currentProperty.status}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white">
                {currentProperty.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>
                  {currentProperty.location.address}, {currentProperty.location.city}, {currentProperty.location.state} {currentProperty.location.zip}
                </span>
              </p>
            </div>

            <div className="lg:text-right space-y-1">
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-400 font-bold">
                {currentProperty.listingType === 'For Rent' ? 'Monthly Lease' : 'Offered At'}
              </p>
              <p className="font-serif text-3xl sm:text-5xl font-bold text-navy-950 dark:text-gold-300">
                {formatPrice(currentProperty.price, currentProperty.listingType)}
              </p>
              {currentProperty.specs.pricePerSqft && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Approx. {currency === 'INR' ? `₹${currentProperty.specs.pricePerSqft.toLocaleString('en-IN')}` : `$${Math.round(currentProperty.specs.pricePerSqft / 83.5).toLocaleString('en-US')}`} / sq ft
                </p>
              )}
            </div>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bedrooms</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.beds} Beds</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bathrooms</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.baths} Baths</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Living Area</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.sqft.toLocaleString()} sqft</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Lot Size</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.lotSize || 'Private'}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Year Completed</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.yearBuilt}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Garage Capacity</p>
              <p className="font-serif text-xl font-bold text-navy-950 dark:text-white mt-0.5">{currentProperty.specs.garages || 2} Vehicles</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. MAIN DETAILS GRID: Left Content + Right Sticky Agent / Tour Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Narrative, Highlights, Amenities, Mortgage, Neighborhood */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Architectural Narrative */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-4 transition-colors">
              <h2 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                Architectural Narrative
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                {currentProperty.description}
              </p>

              {currentProperty.architecturalHighlights && (
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-gold-600 dark:text-gold-400">
                    Key Architectural Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentProperty.architecturalHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Curated Amenities */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 transition-colors">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                  Estate Amenities & Features
                </h2>
                <span className="text-xs text-gold-600 dark:text-gold-400 font-semibold">
                  {currentProperty.amenities.length} Verified Luxuries
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentProperty.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10 hover:border-gold-400/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-navy-950 dark:text-white">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Mortgage & Monthly Expense Calculator */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 transition-colors">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                    <span>Private Capital & Home Loan EMI Calculator</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Calculate monthly capital outlay based on loan parameters, Indian bank interest rates, and holding costs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Down Payment % */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Down Payment</span>
                    <span className="font-bold text-gold-600 dark:text-gold-400">{downPaymentPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <p className="text-[11px] text-slate-400">{formatPrice(downPaymentAmount)}</p>
                </div>

                {/* Interest Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Bank Interest Rate</span>
                    <span className="font-bold text-gold-600 dark:text-gold-400">{interestRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="11.5"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <p className="text-[11px] text-slate-400">Standard Indian Prime Lending Rate</p>
                </div>

                {/* Loan Term */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">Loan Tenure</span>
                  <div className="flex gap-2">
                    {[15, 20, 25].map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTermYears(term)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          loanTermYears === term
                            ? 'bg-navy-900 border-navy-900 text-gold-300 dark:bg-gold-500/20 dark:border-gold-500/40 dark:text-gold-300'
                            : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                        }`}
                      >
                        {term} Yrs
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Monthly Breakdown Display */}
              <div className="p-5 rounded-2xl bg-navy-950 text-white space-y-4 border border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-white/10">
                  <span className="text-xs text-gold-300 uppercase tracking-widest font-semibold">
                    Estimated Total Monthly Outlay
                  </span>
                  <span className="font-serif text-3xl font-bold text-white">
                    {formatPrice(Math.round(totalMonthlyCost))} <span className="text-xs font-sans text-slate-400">/ mo</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly EMI (P&I)</span>
                    <strong className="text-white">{formatPrice(Math.round(monthlyPrincipalAndInterest))}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Society Maintenance</span>
                    <strong className="text-white">{formatPrice(monthlyHoa)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Municipal / Property Tax</span>
                    <strong className="text-white">{formatPrice(monthlyTaxes)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Est. Stamp Duty (~6%)</span>
                    <strong className="text-gold-300">{formatPrice(estimatedStampDuty)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Neighborhood Scores */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 transition-colors">
              <h2 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                Location & Neighborhood Index
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10 text-center">
                  <p className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                    {currentProperty.neighborhoodScores?.safety || 98}/100
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Safety Index</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10 text-center">
                  <p className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                    {currentProperty.neighborhoodScores?.schools || 96}/100
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Top Schools</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10 text-center">
                  <p className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                    {currentProperty.neighborhoodScores?.walkability || 75}/100
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Walkability</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10 text-center">
                  <p className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                    {currentProperty.neighborhoodScores?.transit || 80}/100
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Transit Access</p>
                </div>
              </div>

              {/* Simulated Map View Card */}
              <div className="relative rounded-2xl overflow-hidden h-64 bg-navy-950 border border-slate-200 dark:border-white/10">
                <img
                  src={currentProperty.images?.[1] || '/images/neighborhoods/worli_sea_face_hood.jpg'}
                  alt={`${currentProperty.location.neighborhood} Aerial View`}
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-navy-950/30 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center shadow-lg animate-bounce mb-2">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold">
                    {currentProperty.location.neighborhood}, {currentProperty.location.city}
                  </h4>
                  <p className="text-xs text-slate-200 mt-0.5">
                    Coordinates: {currentProperty.location.coordinates?.lat}, {currentProperty.location.coordinates?.lng}
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-full bg-navy-900/90 text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-gold-400/30">
                    Confidential Exact Address Available to Qualified Buyers
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Agent Contact & Tour Scheduler Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 sticky top-28 transition-colors">
              
              {/* Tour CTA */}
              <button
                id="schedule-tour-trigger-btn"
                onClick={() => openTourModal(currentProperty)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Viewing</span>
              </button>

              {/* Agent Profile Miniature */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gold-400/50"
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-gold-600 dark:text-gold-400 tracking-wider">
                    Assigned Senior Advisor
                  </span>
                  <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {agent.title}
                  </p>
                </div>
              </div>

              {/* Direct Inquiry Form */}
              <form onSubmit={handleSendInquiry} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Lord Sterling"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="investor@familyoffice.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Direct Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Confidential Inquiry Notes
                  </label>
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-gold-400 dark:text-navy-950" />
                  <span>Send Confidential Inquiry</span>
                </button>

                {isInquirySent && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-4 h-4" /> Inquiry dispatched to private advisor.
                  </p>
                )}
              </form>

              {/* Direct Contact Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-gold-400 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Direct Call</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-gold-400 text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
                  <span>Email Broker</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 5. SIMILAR / RECOMMENDED PROPERTIES */}
      {similarProperties.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold">
                Complementary Portfolio
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
                Similar Ultra-Prime Estates
              </h2>
            </div>
            <button
              onClick={() => navigateTo('listings')}
              className="text-xs font-semibold text-navy-950 dark:text-gold-300 hover:text-gold-600 dark:hover:text-gold-200 flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}

      {/* 6. FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between text-white z-10">
              <div>
                <h3 className="font-serif text-lg font-bold">{currentProperty.title}</h3>
                <p className="text-xs text-slate-400">
                  Photo {activePhotoIdx + 1} of {currentProperty.images.length}
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Image with Arrows */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <motion.img
                key={activePhotoIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={currentProperty.images[activePhotoIdx]}
                alt={`Photo ${activePhotoIdx + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev === 0 ? currentProperty.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 p-3 rounded-full bg-navy-900/80 text-white hover:bg-navy-800 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() =>
                  setActivePhotoIdx((prev) =>
                    prev === currentProperty.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 p-3 rounded-full bg-navy-900/80 text-white hover:bg-navy-800 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Bottom Row */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
              {currentProperty.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    idx === activePhotoIdx ? 'border-gold-400 scale-105' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. MOBILE & TABLET STICKY ACTION BAR */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 p-3 bg-navy-950/95 backdrop-blur-xl border-t border-gold-500/20 shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Guide Price</p>
            <p className="font-serif text-base sm:text-lg font-bold text-white">
              {formatPrice(currentProperty.price, currentProperty.listingType)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openTourModal(currentProperty)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-gold-glow flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing</span>
            </button>
            <a
              href={`tel:${agent.phone}`}
              className="p-2 rounded-xl bg-white/10 text-gold-300 border border-gold-400/30 hover:bg-white/15"
              title="Call Advisor"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
