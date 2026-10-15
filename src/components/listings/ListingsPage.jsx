import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  Filter
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';
import { AMENITY_OPTIONS, PROPERTY_TYPES, MOCK_NEIGHBORHOODS } from '../../data/mockData';

export const ListingsPage = () => {
  const {
    filteredProperties,
    paginatedProperties,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedNeighborhood,
    setSelectedNeighborhood,
    selectedPropertyType,
    setSelectedPropertyType,
    listingType,
    setListingType,
    priceRange,
    setPriceRange,
    minBeds,
    setMinBeds,
    minBaths,
    selectedAmenities,
    setSelectedAmenities,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    resetFilters,
    currency,
    formatPrice
  } = useRealEstate();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Toggle amenity selection
  const handleToggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    searchQuery ||
    selectedNeighborhood !== 'All' ||
    selectedPropertyType !== 'All Types' ||
    listingType !== 'All' ||
    minBeds > 0 ||
    minBaths > 0 ||
    selectedAmenities.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000000000;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="bg-navy-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Exclusive Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Prime Residences & Estates
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Browse our curated inventory of premier trophy properties, private waterfront villas, and architectural penthouses.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Top Search & Filter Bar */}
        <div className="bg-white dark:bg-navy-900 rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 shadow-luxury mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-listings-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by city, address, or estate title..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white dark:focus:bg-navy-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-950 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Listing Type Filter */}
            <div className="flex items-center space-x-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {['All', 'For Sale', 'For Rent'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setListingType(type);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    listingType === type
                      ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 font-bold shadow-md'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15'
                  }`}
                >
                  {type === 'All' ? 'All Portfolios' : type}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button & View Mode Controls */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              
              <button
                id="mobile-filter-open-btn"
                onClick={() => setIsMobileFiltersOpen(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden lg:inline">Sort:</span>
                <select
                  id="sort-listings-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs font-medium text-navy-900 dark:text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="sqft-desc">Largest Square Footage</option>
                  <option value="popular">Most Viewed</option>
                  <option value="newest">Recently Built</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-white/10 p-1 rounded-xl">
                <button
                  id="view-grid-btn"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-navy-800 shadow text-navy-900 dark:text-white'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="Grid Layout"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  id="view-list-btn"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-navy-800 shadow text-navy-900 dark:text-white'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="List Layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedPropertyType !== 'All Types' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Type: {selectedPropertyType}
                  <button onClick={() => setSelectedPropertyType('All Types')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedNeighborhood !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Location: {selectedNeighborhood}
                  <button onClick={() => setSelectedNeighborhood('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {listingType !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Status: {listingType}
                  <button onClick={() => setListingType('All')}><X className="w-3 h-3" /></button>
                </span>
              )}

              {minBeds > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Beds: {minBeds}+
                  <button onClick={() => setMinBeds(0)}><X className="w-3 h-3" /></button>
                </span>
              )}

              {priceRange[1] < 1000000000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  Max: {currency === 'INR' ? `₹${(priceRange[1] / 10000000).toFixed(0)} Cr` : `$${(priceRange[1] / 83500000).toFixed(1)}M`}
                  <button onClick={() => setPriceRange([0, 1000000000])}><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedAmenities.map((am) => (
                <span key={am} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gold-50 dark:bg-gold-500/15 text-gold-800 dark:text-gold-200 text-[11px] font-medium border border-gold-200 dark:border-gold-500/30">
                  {am}
                  <button onClick={() => handleToggleAmenity(am)}><X className="w-3 h-3" /></button>
                </span>
              ))}

              <button
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 font-semibold flex items-center gap-1 ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content Grid: Sidebar Filters + Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white dark:bg-navy-900 rounded-3xl p-6 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                <h3 className="font-serif text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold-500" />
                  <span>Refine Portfolio</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-rose-500 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Property Classification */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                  Property Classification
                </label>
                <div className="space-y-1">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedPropertyType(type);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all ${
                        selectedPropertyType === type
                          ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                  Prime Destinations
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedNeighborhood('All');
                      setCurrentPage(1);
                    }}
                    className={`w-full px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all ${
                      selectedNeighborhood === 'All'
                        ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    All Destinations
                  </button>
                  {MOCK_NEIGHBORHOODS.map((nh) => (
                    <button
                      key={nh.id}
                      onClick={() => {
                        setSelectedNeighborhood(nh.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-all ${
                        selectedNeighborhood === nh.name
                          ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 font-semibold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {nh.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                  Minimum Bedrooms
                </label>
                <div className="flex gap-1.5">
                  {[0, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setMinBeds(num);
                        setCurrentPage(1);
                      }}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        minBeds === num
                          ? 'bg-navy-900 dark:bg-gold-500 border-navy-900 dark:border-gold-500 text-gold-300 dark:text-navy-950 font-bold'
                          : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                      }`}
                    >
                      {num === 0 ? 'Any' : `${num}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-navy-950 dark:text-white">Max Investment</span>
                  <span className="font-bold text-gold-600 dark:text-gold-400">
                    {currency === 'INR' ? `₹${(priceRange[1] / 10000000).toFixed(0)} Cr` : `$${(priceRange[1] / 83500000).toFixed(1)}M`}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000000"
                  max="1000000000"
                  step="25000000"
                  value={priceRange[1]}
                  onChange={(e) => {
                    setPriceRange([priceRange[0], Number(e.target.value)]);
                    setCurrentPage(1);
                  }}
                  className="w-full accent-gold-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{currency === 'INR' ? '₹50 L' : '$500K'}</span>
                  <span>{currency === 'INR' ? '₹50 Cr' : '$6M'}</span>
                  <span>{currency === 'INR' ? '₹100 Cr+' : '$12M+'}</span>
                </div>
              </div>

              {/* Luxury Amenities Multi-select */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                  Signature Amenities
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleAmenity(amenity)}
                          className="w-4 h-4 rounded text-gold-500 focus:ring-gold-400 border-slate-300 cursor-pointer accent-gold-500"
                        />
                        <span className={isChecked ? 'font-semibold text-navy-950 dark:text-white' : ''}>
                          {amenity}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Listings Column */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results Count Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <p>
                Showing <strong className="text-navy-950 dark:text-white font-semibold">{filteredProperties.length}</strong> ultra-luxury residences
              </p>
              <p className="text-slate-400 dark:text-slate-500">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Properties List / Grid */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white dark:bg-navy-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-4 transition-colors">
                <div className="w-16 h-16 rounded-3xl bg-gold-500/10 dark:bg-gold-500/20 border border-gold-500/30 text-gold-600 dark:text-gold-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                  No Properties Match Your Criteria
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  We could not find any available estates matching your exact filter specifications. Try adjusting your price threshold, destination, or amenities.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                    : 'flex flex-col space-y-5'
                }
              >
                <AnimatePresence>
                  {paginatedProperties.map((prop) => (
                    <PropertyCard
                       key={prop.id}
                       property={prop}
                       isListView={viewMode === 'list'}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  id="pagination-prev-btn"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === 1
                      ? 'border-slate-200 dark:border-white/10 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      : 'border-slate-200 dark:border-white/15 bg-white dark:bg-navy-900 text-navy-950 dark:text-white hover:border-gold-500'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === pageNum
                          ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 shadow-md'
                          : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  id="pagination-next-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                    currentPage === totalPages
                      ? 'border-slate-200 dark:border-white/10 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                      : 'border-slate-200 dark:border-white/15 bg-white dark:bg-navy-900 text-navy-950 dark:text-white hover:border-gold-500'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-white dark:bg-navy-900 border-l border-slate-200 dark:border-white/10 h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                  <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                    Refine Properties
                  </h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-navy-950 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Classification */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                    Property Classification
                  </label>
                  <select
                    value={selectedPropertyType}
                    onChange={(e) => {
                      setSelectedPropertyType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-navy-950 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Destinations */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                    Destination
                  </label>
                  <select
                    value={selectedNeighborhood}
                    onChange={(e) => {
                      setSelectedNeighborhood(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-navy-950 dark:text-white text-xs focus:outline-none focus:border-gold-500"
                  >
                    <option value="All">All Destinations</option>
                    {MOCK_NEIGHBORHOODS.map((nh) => (
                      <option key={nh.id} value={nh.name}>{nh.name}</option>
                    ))}
                  </select>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white">
                    Luxury Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {AMENITY_OPTIONS.map((am) => (
                      <label key={am} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(am)}
                          onChange={() => handleToggleAmenity(am)}
                          className="accent-gold-500"
                        />
                        <span>{am}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs shadow-md transition-colors"
                >
                  Apply Filters ({filteredProperties.length})
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
