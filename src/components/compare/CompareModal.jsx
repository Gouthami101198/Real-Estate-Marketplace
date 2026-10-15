import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Scale, 
  Trash2, 
  ExternalLink, 
  Check, 
  Minus, 
  Plus, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  DollarSign, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { AMENITY_OPTIONS } from '../../data/mockData';

export const CompareModal = () => {
  const {
    compareProperties,
    removeFromCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,
    viewPropertyDetail,
    navigateTo,
    formatPrice
  } = useRealEstate();

  return (
    <>
      {/* FULL COMPARISON MODAL (Triggered strictly from Navbar or Mobile Nav, no floating overlay bar) */}
      <AnimatePresence>
        {isCompareModalOpen && (
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
              className="bg-white dark:bg-navy-900 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 transition-colors"
            >
              
              {/* Modal Header */}
              <div className="p-6 bg-navy-950 text-white flex items-center justify-between border-b border-gold-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-400/40 text-gold-400 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold">
                      Side-by-Side Property Comparison Matrix
                    </h2>
                    <p className="text-xs text-slate-300">
                      Comparing {compareProperties.length} ultra-luxury residences
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {compareProperties.length > 0 && (
                    <button
                      onClick={clearCompare}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsCompareModalOpen(false)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Matrix Content Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {compareProperties.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center mx-auto">
                      <Scale className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                      No Properties Selected for Comparison
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Select up to 4 properties using the compare scale button on any property card or detail page.
                    </p>
                    <button
                      onClick={() => {
                        setIsCompareModalOpen(false);
                        navigateTo('listings');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-semibold text-xs tracking-wider uppercase transition-colors"
                    >
                      Explore Prime Residences
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs min-w-[700px]">
                      
                      {/* Property Header Cards */}
                      <thead>
                        <tr>
                          <th className="p-3 w-48 font-serif text-sm font-bold text-navy-950 dark:text-white bg-slate-50 dark:bg-navy-950 rounded-l-2xl border-b border-slate-200 dark:border-white/10">
                            Residences
                          </th>
                          {compareProperties.map((prop) => (
                            <th
                              key={prop.id}
                              className="p-3 w-64 border-b border-slate-200 dark:border-white/10 align-top"
                            >
                              <div className="space-y-2">
                                <div className="relative h-36 rounded-2xl overflow-hidden bg-navy-950 border border-white/5">
                                  <img
                                    src={prop.images[0]}
                                    alt={prop.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    onClick={() => removeFromCompare(prop.id)}
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-navy-950/80 text-white hover:bg-rose-600 flex items-center justify-center transition-colors"
                                    title="Remove"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <h4 className="font-serif text-sm font-bold text-navy-950 dark:text-white line-clamp-1">
                                  {prop.title}
                                </h4>

                                <p className="font-serif text-lg font-bold text-gold-700 dark:text-gold-400">
                                  {formatPrice(prop.price, prop.listingType)}
                                </p>

                                <button
                                  onClick={() => {
                                    setIsCompareModalOpen(false);
                                    viewPropertyDetail(prop.id);
                                  }}
                                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-navy-900 dark:hover:bg-gold-500 hover:text-gold-300 dark:hover:text-navy-950 text-navy-950 dark:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <span>View Residence</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {/* Location */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Location</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300">
                              {prop.location.neighborhood}, {prop.location.city}, {prop.location.state}
                            </td>
                          ))}
                        </tr>

                        {/* RERA Certification */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">RERA Certification</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300 text-xs">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                                {prop.reraId || 'Verified RERA'}
                              </span>
                            </td>
                          ))}
                        </tr>

                        {/* Vastu Compliance */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Vastu Compliance</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300 text-xs">
                              {prop.vastuCompliant ? (
                                <span className="text-amber-600 dark:text-amber-400 font-bold">100% Compliant</span>
                              ) : (
                                <span>Standard</span>
                              )}
                            </td>
                          ))}
                        </tr>

                        {/* Property Type */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Classification</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 font-medium text-navy-950 dark:text-white">
                              {prop.propertyType}
                            </td>
                          ))}
                        </tr>

                        {/* Bedrooms */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Bedrooms</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300 font-semibold">
                              {prop.specs.beds} Beds
                            </td>
                          ))}
                        </tr>

                        {/* Bathrooms */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Bathrooms</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300 font-semibold">
                              {prop.specs.baths} Baths
                            </td>
                          ))}
                        </tr>

                        {/* Square Footage */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Living Area</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300 font-semibold">
                              {prop.specs.sqft.toLocaleString()} sq ft
                            </td>
                          ))}
                        </tr>

                        {/* Price Per Sq Ft */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Price / Sq Ft</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300">
                              {prop.specs.pricePerSqft ? `$${prop.specs.pricePerSqft.toLocaleString()}` : 'N/A'}
                            </td>
                          ))}
                        </tr>

                        {/* Year Built */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Year Built</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300">
                              {prop.specs.yearBuilt}
                            </td>
                          ))}
                        </tr>

                        {/* Garage Capacity */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-slate-700 dark:text-slate-300">Garage Capacity</td>
                          {compareProperties.map((prop) => (
                            <td key={prop.id} className="p-3.5 text-slate-600 dark:text-slate-300">
                              {prop.specs.garages || 2} vehicles
                            </td>
                          ))}
                        </tr>

                        {/* Amenities Matrix Check */}
                        {AMENITY_OPTIONS.slice(0, 8).map((amenity) => (
                          <tr key={amenity} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                            <td className="p-3.5 font-medium text-slate-600 dark:text-slate-400">{amenity}</td>
                            {compareProperties.map((prop) => {
                              const hasAmenity = prop.amenities.includes(amenity);
                              return (
                                <td key={prop.id} className="p-3.5">
                                  {hasAmenity ? (
                                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                                      <Check className="w-4 h-4 text-emerald-500" /> Yes
                                    </span>
                                  ) : (
                                    <span className="text-slate-300 dark:text-slate-600">
                                      <Minus className="w-4 h-4" />
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
