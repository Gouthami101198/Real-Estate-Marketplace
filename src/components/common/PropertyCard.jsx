import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Heart, 
  Scale, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const PropertyCard = ({ property, isListView = false }) => {
  const { 
    viewPropertyDetail, 
    toggleSaveProperty, 
    isPropertySaved, 
    toggleCompareProperty, 
    isComparing,
    agents,
    formatPrice,
    currency
  } = useRealEstate();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const saved = isPropertySaved(property.id);
  const comparing = isComparing(property.id);
  const agent = agents.find((a) => a.id === property.agentId) || agents[0];

  const handlePrevImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  if (isListView) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => viewPropertyDetail(property.id)}
        className="group bg-white dark:bg-navy-900/95 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-gold-500/70 hover:shadow-[0_16px_36px_-10px_rgba(212,175,55,0.22)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row shadow-sm relative"
      >
        {/* Card Sheen Sweep */}
        <div className="card-sheen" />

        {/* Image Preview Container */}
        <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-navy-950 shrink-0">
          <img
            src={property.images[currentImgIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-navy-950/80 backdrop-blur-md text-gold-300 border border-gold-400/40">
              {property.status || property.listingType}
            </span>
            {property.reraId && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600/90 text-white backdrop-blur-md">
                RERA
              </span>
            )}
            {property.vastuCompliant && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-600/80 text-white backdrop-blur-md">
                Vastu
              </span>
            )}
            {property.priceDrop && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/90 text-white backdrop-blur-md">
                Price Improved
              </span>
            )}
          </div>

          {/* Image Navigation Arrows */}
          {property.images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrevImg}
                className="w-8 h-8 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImg}
                className="w-8 h-8 rounded-full bg-navy-950/70 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {property.images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImgIndex ? 'bg-gold-400 w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gold-600 dark:text-gold-400 font-semibold tracking-wide uppercase mb-1">
                  <span>{property.propertyType}</span>
                  <span>•</span>
                  <span>{property.location.neighborhood}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-1">
                  {property.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCompareProperty(property.id);
                  }}
                  className={`p-2 rounded-xl border transition-all ${
                    comparing
                      ? 'bg-navy-900 border-gold-400 text-gold-300'
                      : 'bg-slate-100/80 dark:bg-white/10 border-slate-200 dark:border-white/15 text-slate-500 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:border-gold-400/40'
                  }`}
                  title="Compare Property"
                >
                  <Scale className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.15 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveProperty(property.id);
                  }}
                  className={`p-2 rounded-xl border transition-all ${
                    saved
                      ? 'bg-rose-50 border-rose-200 text-rose-500'
                      : 'bg-slate-100/80 dark:bg-white/10 border-slate-200 dark:border-white/15 text-slate-500 dark:text-slate-300 hover:text-rose-500 hover:border-rose-300'
                  }`}
                  title="Save to Portfolio"
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500' : ''}`} />
                </motion.button>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}</span>
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Specs Ribbon & Price */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5 font-medium">
                <Bed className="w-4 h-4 text-slate-400" />
                <span>{property.specs.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.specs.baths} Baths</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                <span>{property.specs.sqft.toLocaleString()} Sq Ft</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                {formatPrice(property.price, property.listingType)}
              </span>
              {property.listingType === 'For Sale' && property.specs.pricePerSqft && (
                <span className="text-[11px] text-slate-400 font-medium">
                  ({currency === 'INR' ? '₹' : '$'}{currency === 'INR' ? property.specs.pricePerSqft.toLocaleString('en-IN') : Math.round(property.specs.pricePerSqft / 83.5).toLocaleString('en-US')}/sqft)
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View Mode
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      onClick={() => viewPropertyDetail(property.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white dark:bg-navy-900/95 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-gold-500/70 hover:shadow-[0_22px_45px_-12px_rgba(212,175,55,0.28)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-sm relative"
    >
      {/* Top Image Preview */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-navy-950">
        {/* Card Diagonal Sheen */}
        <div className="card-sheen" />

        <img
          src={property.images[currentImgIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient overlay on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-navy-950/85 backdrop-blur-md text-gold-300 border border-gold-400/40 shadow-md">
            {property.status || property.listingType}
          </span>
          {property.priceDrop && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md shadow-sm w-fit">
              Price Improved
            </span>
          )}
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.15, rotate: -6 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleCompareProperty(property.id);
            }}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all ${
              comparing
                ? 'bg-navy-900 border-gold-400 text-gold-300 shadow-lg'
                : 'bg-navy-950/60 border-white/20 text-white hover:bg-navy-900 hover:border-gold-400/60 hover:shadow-gold-glow/30'
            }`}
            title="Compare Property"
          >
            <Scale className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.2, rotate: 6 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveProperty(property.id);
            }}
            className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all ${
              saved
                ? 'bg-rose-500/90 border-rose-400 text-white shadow-lg'
                : 'bg-navy-950/60 border-white/20 text-white hover:bg-rose-600/90 hover:border-rose-400 hover:shadow-lg'
            }`}
            title="Save to Portfolio"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
          </motion.button>
        </div>

        {/* Image Carousel Controls */}
        {property.images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImg}
              className="w-8 h-8 rounded-full bg-navy-950/80 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImg}
              className="w-8 h-8 rounded-full bg-navy-950/80 hover:bg-navy-950 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Image Info (Price & Category) */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white z-10">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gold-300 font-semibold drop-shadow-sm">
              {property.propertyType}
            </p>
            <p className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {formatPrice(property.price, property.listingType)}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-1 pb-1">
            {property.images.slice(0, 4).map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImgIndex ? 'bg-gold-400 w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" />
            <span className="font-medium text-slate-600 dark:text-slate-300 truncate">
              {property.location.neighborhood}, {property.location.city}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-navy-900 dark:text-white group-hover:text-gold-500 transition-colors line-clamp-1">
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Specifications Ribbon */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1 font-medium">
            <Bed className="w-4 h-4 text-slate-400" />
            <span>{property.specs.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Bath className="w-4 h-4 text-slate-400" />
            <span>{property.specs.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span>{property.specs.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Agent Miniature Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-gold-400/40"
            />
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate max-w-[130px]">
              {agent.name}
            </span>
          </div>

          <span className="text-xs font-semibold text-gold-600 dark:text-gold-400 group-hover:text-gold-500 flex items-center gap-1">
            Explore <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
