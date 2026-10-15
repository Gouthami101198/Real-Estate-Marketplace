import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Globe2, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Download, 
  Building,
  HelpCircle,
  Percent,
  Check
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const MarketInsightsPage = () => {
  const { formatPrice, showToast } = useRealEstate();
  const [activeTab, setActiveTab] = useState('index'); // 'index' | 'nri' | 'calculator' | 'checklist'

  // Stamp Duty Interactive Calculator State
  const [calcState, setCalcState] = useState('Maharashtra');
  const [calcGender, setCalcGender] = useState('joint'); // 'male' | 'female' | 'joint'
  const [calcPropertyValue, setCalcPropertyValue] = useState(250000000); // 25 Cr

  const stateTaxRates = {
    Maharashtra: { male: 6.0, female: 5.0, joint: 5.5, regCap: 30000, notes: 'Includes 1% Metro Cess in Mumbai' },
    Haryana: { male: 7.0, female: 5.0, joint: 6.0, regCap: 50000, notes: 'Standard Gurugram & Faridabad rate' },
    Karnataka: { male: 5.0, female: 5.0, joint: 5.0, regCap: 100000, notes: 'Includes 2% Surcharge + 10% Cess on stamp duty' },
    Goa: { male: 4.5, female: 4.0, joint: 4.25, regCap: 50000, notes: 'Slab-based for luxury estates exceeding ₹1 Cr' },
    Delhi: { male: 6.0, female: 4.0, joint: 5.0, regCap: 30000, notes: '1% Corporation tax included' },
    Telangana: { male: 7.5, female: 7.5, joint: 7.5, regCap: 45000, notes: 'Applicable to Jubilee Hills & Hyderabad Prime' }
  };

  const selectedRateObj = stateTaxRates[calcState] || stateTaxRates['Maharashtra'];
  const stampRate = selectedRateObj[calcGender];
  const calculatedStampDuty = Math.round((calcPropertyValue * stampRate) / 100);
  const calculatedRegistration = selectedRateObj.regCap;
  const totalGovtOutlay = calculatedStampDuty + calculatedRegistration;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            <span>Wealth & Real Estate Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Indian Luxury Real Estate Report 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Market analytics, NRI regulatory frameworks, state-wise stamp duty calculators, and legal diligence frameworks curated for family offices and discerning global buyers.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Navigation Sub-Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-white/10">
          {[
            { id: 'index', label: 'Luxury Index & Yields', icon: TrendingUp },
            { id: 'nri', label: 'NRI & Global Citizen Guide', icon: Globe2 },
            { id: 'calculator', label: 'Stamp Duty & Tax Calculator', icon: Calculator },
            { id: 'checklist', label: '10-Point Legal Diligence', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-3 text-xs font-bold flex items-center gap-2 shrink-0 transition-all ${
                  isSelected
                    ? 'text-gold-600 dark:text-gold-400 border-b-2 border-gold-500'
                    : 'text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LUXURY INDEX & YIELDS */}
        {activeTab === 'index' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Top Stat Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-navy-900 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Prime Capital Growth (YoY)</span>
                <p className="font-serif text-3xl font-bold text-emerald-600 dark:text-emerald-400">+19.4%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Average across Mumbai, Gurugram & Goa luxury belts</p>
              </div>

              <div className="bg-white dark:bg-navy-900 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Top Performing Market</span>
                <p className="font-serif text-3xl font-bold text-navy-950 dark:text-white">DLF Camellias Belt</p>
                <p className="text-xs text-emerald-600 font-semibold">+24.2% price appreciation in 2025-2026</p>
              </div>

              <div className="bg-white dark:bg-navy-900 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Holiday Home Rental Yields</span>
                <p className="font-serif text-3xl font-bold text-gold-600 dark:text-gold-400">7.8% – 10.2%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">North Goa (Assagao) boutique villa segment</p>
              </div>

              <div className="bg-white dark:bg-navy-900 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">NRI Allocation Share</span>
                <p className="font-serif text-3xl font-bold text-navy-950 dark:text-white">32%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Transactions above ₹20 Cr by diaspora buyers</p>
              </div>
            </div>

            {/* City-by-City Performance Table */}
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                    Metropolitan Capital Valuation Benchmarks (2026)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Average transaction benchmarks for verified freehold trophy residences.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Full Quarterly Luxury Index PDF downloaded', 'gold')}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Index (PDF)</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-bold">Micro-Market</th>
                      <th className="pb-3 font-bold">Prime Rate (Sq Ft)</th>
                      <th className="pb-3 font-bold">1-Yr Change</th>
                      <th className="pb-3 font-bold">5-Yr Change</th>
                      <th className="pb-3 font-bold">Gross Yield</th>
                      <th className="pb-3 font-bold">Key Growth Catalyst</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-600 dark:text-slate-300">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">Worli Sea Face, Mumbai</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹62,000 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+16.5%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+68.5%</td>
                      <td className="py-3.5">3.8%</td>
                      <td className="py-3.5 text-slate-500">Coastal Road & Trans-Harbour Link connectivity</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">DLF Golf Course Rd, Gurugram</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹44,500 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+24.2%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+84.2%</td>
                      <td className="py-3.5">5.4%</td>
                      <td className="py-3.5 text-slate-500">Global CXO influx & Gary Player course scarcity</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">Assagao & Candolim, Goa</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹32,000 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+19.8%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+92.0%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">8.4%</td>
                      <td className="py-3.5 text-slate-500">MOPA Airport & ultra-luxury holiday rental demand</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">Jubilee Hills, Hyderabad</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹36,000 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+17.1%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+71.5%</td>
                      <td className="py-3.5">4.5%</td>
                      <td className="py-3.5 text-slate-500">Pharma & tech unicorn founder wealth expansion</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">Sadashivnagar & UB City, Bengaluru</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹42,000 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+14.5%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+59.0%</td>
                      <td className="py-3.5">4.8%</td>
                      <td className="py-3.5 text-slate-500">Silicon Plateau liquidity & Cubbon Park proximity</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 font-bold text-navy-950 dark:text-white">Lutyens’ Bungalow Zone, New Delhi</td>
                      <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">₹95,000 / sq ft</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+11.0%</td>
                      <td className="py-3.5 text-emerald-600 font-bold">+48.0%</td>
                      <td className="py-3.5">2.8%</td>
                      <td className="py-3.5 text-slate-500">Extreme historical scarcity; irreplaceable colonial plots</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: NRI & GLOBAL INDIAN GUIDE */}
        {activeTab === 'nri' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
                  Foreign Exchange Management Act (FEMA)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
                  Acquisition Framework for NRIs & OCIs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Under general permission granted by the Reserve Bank of India (RBI), Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely acquire any number of residential properties in India with zero prior governmental approval.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-gold-600 font-bold text-sm">
                    <Globe2 className="w-5 h-5" />
                    <span>NRE vs NRO Banking Routes</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Payments for acquisitions must be made through normal banking channels via inward remittance from abroad or funds held in <strong>NRE (Non-Resident External)</strong>, <strong>FCNR</strong>, or <strong>NRO (Non-Resident Ordinary)</strong> accounts. Cash payments or foreign currency notes are strictly prohibited.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    <Percent className="w-5 h-5" />
                    <span>Full Repatriation of Capital</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Sale proceeds equivalent to the original foreign currency remitted can be freely repatriated abroad without limit for up to two residential properties. Profits and rental yields held in NRO accounts can be repatriated up to <strong>USD 1,000,000 per financial year</strong> under RBI guidelines.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-gold-600 font-bold text-sm">
                    <FileText className="w-5 h-5" />
                    <span>Power of Attorney (POA) Registration</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    NRIs who cannot travel to India for deed execution can appoint a trusted representative via a Specific Power of Attorney. The document must be executed before a Notary Public in the residence country, attested by the Indian Consulate / Embassy, and subsequently adjudicated in India within 90 days.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                    <HelpCircle className="w-5 h-5" />
                    <span>TDS & Tax Structuring (Section 195)</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    When an NRI sells an Indian property, the buyer is mandated to deduct TDS at 20% (plus applicable surcharge & cess). Our Private Client Tax Desk assists in filing for a <strong>Lower Deduction Certificate (LDC)</strong> under Section 197, saving clients significant capital hold-ups.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: STAMP DUTY & REGISTRATION CALCULATOR */}
        {activeTab === 'calculator' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-8">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-gold-500" />
                  <span>State-Wise Stamp Duty & Statutory Fee Matrix</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Accurately model state registration outlays, gender concessions, and statutory registration fee caps.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Inputs Col */}
                <div className="lg:col-span-6 space-y-5">
                  
                  {/* Select State */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Jurisdiction / State
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.keys(stateTaxRates).map((state) => (
                        <button
                          key={state}
                          type="button"
                          onClick={() => setCalcState(state)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            calcState === state
                              ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 border-navy-900 dark:border-gold-500 shadow-md'
                              : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                          }`}
                        >
                          {state}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buyer Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Title Ownership Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'male', label: 'Male Buyer' },
                        { id: 'female', label: 'Female Buyer (Rebate)' },
                        { id: 'joint', label: 'Joint Ownership' }
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setCalcGender(type.id)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                            calcGender === type.id
                              ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 border-navy-900 dark:border-gold-500 shadow-md'
                              : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Property Value Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Property Consideration</span>
                      <span className="font-bold text-gold-600 dark:text-gold-400">{formatPrice(calcPropertyValue)}</span>
                    </div>
                    <input
                      type="range"
                      min="50000000"
                      max="800000000"
                      step="25000000"
                      value={calcPropertyValue}
                      onChange={(e) => setCalcPropertyValue(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>₹5 Cr</span>
                      <span>₹40 Cr</span>
                      <span>₹80 Cr</span>
                    </div>
                  </div>

                </div>

                {/* Calculation Output Card */}
                <div className="lg:col-span-6 bg-navy-950 text-white rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
                        {calcState} Statutory Estimate
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[11px] font-bold">
                        {stampRate}% Effective Rate
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Stamp Duty ({stampRate}%):</span>
                        <strong className="text-white font-bold">{formatPrice(calculatedStampDuty)}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Registration Fee (Govt Cap):</span>
                        <strong className="text-white font-bold">₹{calculatedRegistration.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Local State Policy:</span>
                        <span>{selectedRateObj.notes}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-widest text-gold-300 font-bold">
                        Total Statutory Outlay
                      </span>
                      <span className="font-serif text-3xl font-bold text-white">
                        {formatPrice(totalGovtOutlay)}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-4">
                    * Stamp duty calculations reflect current 2026 state revenue regulations and exclude legal conveyance retainer. Contact the Private Desk for turnkey deed drafting and registration facilitation.
                  </p>

                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: 10-POINT LEGAL CHECKLIST */}
        {activeTab === 'checklist' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
                  Zero-Defect Acquisition Protocol
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 dark:text-white">
                  10-Point Legal Diligence & Title Verification Checklist
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Every property curated on AURA Estates undergoes exhaustive audit through our empanelled bar council legal partners before listing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    num: '01',
                    title: 'RERA Registration & Progress Validation',
                    desc: 'Cross-verifying project quarterly disclosures, escrow account compliance, and litigation logs on state RERA portals.'
                  },
                  {
                    num: '02',
                    title: '30-Year Chain of Title Search',
                    desc: 'Establishing unbroken ownership provenance across three decades to ensure zero undisclosed ancestral claims.'
                  },
                  {
                    num: '03',
                    title: 'Encumbrance Certificate (Form 15)',
                    desc: 'Procuring Nil-Encumbrance Certificate from the Sub-Registrar confirming freedom from mortgages, liens, or court attachments.'
                  },
                  {
                    num: '04',
                    title: 'Sanctioned Building Plans & CC',
                    desc: 'Verifying Commencement Certificate (CC) and municipal layout approvals against actual constructed dimensions.'
                  },
                  {
                    num: '05',
                    title: 'Occupancy Certificate (OC)',
                    desc: 'Mandatory verification that municipal authorities have sanctioned civic services (water, power, fire safety) and certified habitability.'
                  },
                  {
                    num: '06',
                    title: 'Society NOC & Share Certificate Transfer',
                    desc: 'Obtaining clear No Objection Certificate from Cooperative Housing Society (CHS) / Condominium Association.'
                  },
                  {
                    num: '07',
                    title: 'Property Tax & Utility Clearance',
                    desc: 'Verification of up-to-date paid municipal receipts (BMC / MCGM / MCG / BBMP) and utility meter transfers.'
                  },
                  {
                    num: '08',
                    title: 'Coastal Regulation Zone (CRZ) Clearance',
                    desc: 'Crucial for Goa & Alibaug coastal assets: establishing complete compliance with Ministry of Environment & Forests (MoEF) setbacks.'
                  },
                  {
                    num: '09',
                    title: 'Heritage Conservation Clearances',
                    desc: 'For South Mumbai Art Deco & Goa Portuguese villas: verifying state archaeological department permissions for alterations.'
                  },
                  {
                    num: '10',
                    title: 'Public Notice in National Dailies',
                    desc: 'Publishing mandatory 14-day public notice in English and vernacular dailies inviting third-party objections prior to registration.'
                  }
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 flex items-start gap-4"
                  >
                    <span className="font-serif text-lg font-bold text-gold-600 dark:text-gold-400 shrink-0">
                      {item.num}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-navy-950 dark:text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item.title}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  );
};
