import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  TrendingUp, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Award,
  ChevronRight,
  Landmark,
  Waves,
  TreePine,
  DollarSign
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from '../common/PropertyCard';
import { MOCK_NEIGHBORHOODS } from '../../data/mockData';

export const ENCLAVE_DETAILS = [
  {
    id: 'worli',
    name: 'Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The Crown Promenade of South Mumbai',
    image: '/images/neighborhoods/worli_sea_face_hood.jpg',
    avgRate: '₹48,000 – ₹72,000 / sq ft',
    appreciation5Y: '+68.5%',
    rentalYield: '3.4% – 4.2%',
    activeListings: 32,
    description: 'Worli Sea Face represents the epicenter of industrialist wealth and modern skyline luxury in Mumbai. Flanked by the Arabian Sea and the Bandra-Worli Sea Link, the precinct is further transformed by the newly inaugurated Mumbai Coastal Road, connecting South Mumbai to the western suburbs in under 12 minutes.',
    landmarks: [
      'Bandra-Worli Sea Link & Coastal Road Promenade',
      'Willingdon Sports Club & Mahalaxmi Racecourse',
      'Four Seasons Private Residences & St. Regis Mumbai',
      'High Street Phoenix & Palladium Luxury Retail'
    ],
    vibe: 'Coastal High-Rise Splendor & Billionaire Row',
    reraAuthority: 'MahaRERA Registered Corridor'
  },
  {
    id: 'golf-course-rd',
    name: 'Golf Course Road',
    city: 'Gurugram',
    state: 'NCR (Delhi)',
    tagline: 'Billionaires’ Boulevard & Golf Sanctuary of North India',
    image: '/images/neighborhoods/golf_course_road_hood.jpg',
    avgRate: '₹34,000 – ₹58,000 / sq ft',
    appreciation5Y: '+84.2%',
    rentalYield: '4.8% – 6.5%',
    activeListings: 26,
    description: 'Home to India’s most celebrated gated luxury complexes—including DLF The Camellias, The Magnolias, and The Aralias—Golf Course Road is North India’s undisputed apex of executive prestige. Offering panoramic views over the Gary Player 18-hole championship golf course and seamless connectivity to Cyber City and IGI Airport.',
    landmarks: [
      'DLF Golf & Country Club (18-Hole Championship Course)',
      '16-Lane Signal-Free Golf Course Expressway',
      'Horizon Centre & Cyber City Headquarters',
      'The Camellias 1.5 Lakh sq ft Private Clubhouse'
    ],
    vibe: 'Corporate Titans, Private Spas & Championship Fairways',
    reraAuthority: 'HARERA Verified Enclave'
  },
  {
    id: 'assagao',
    name: 'Assagao & Candolim',
    city: 'North Goa',
    state: 'Goa',
    tagline: 'The Beverly Hills of Goa — Heritage Havelis & Culinary Epicenter',
    image: '/images/neighborhoods/assagao_candolim_hood.jpg',
    avgRate: '₹22,000 – ₹38,000 / sq ft',
    appreciation5Y: '+92.0%',
    rentalYield: '6.5% – 9.2%',
    activeListings: 21,
    description: 'Sheltered by lush coconut groves and banyan canopies, Assagao is the cultural sanctuary of choice for creative entrepreneurs, Bollywood personalities, and international collectors. Characterized by 150-year-old restored Indo-Portuguese villas, private emerald pools, and world-class fine dining.',
    landmarks: [
      'Badem & Assagao Michelin-Acclaimed Dining Hubs',
      'Vagator & Candolim Pristine Sunset Shorelines',
      'MOPA International Airport (35 min drive)',
      'Historic Portuguese Architectural Conservation Zone'
    ],
    vibe: 'Barefoot Luxury, Colonial Heritage & Lush Tropical Zen',
    reraAuthority: 'Goa RERA Regulated Area'
  },
  {
    id: 'jubilee-hills',
    name: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    tagline: 'Ridge-Top Estates & Hyderabad Aristocracy',
    image: '/images/neighborhoods/jubilee_hills_hood.jpg',
    avgRate: '₹28,000 – ₹45,000 / sq ft',
    appreciation5Y: '+71.5%',
    rentalYield: '3.9% – 5.1%',
    activeListings: 18,
    description: 'Perched over scenic rocky ridges and Durgam Cheruvu lake, Jubilee Hills (Road No. 36 & Road No. 45) is home to pharmaceutical moguls, Telugu film royalty, and tech visionaries. Features vast multi-acre compounds, private home cinemas, and subterranean vehicle showrooms.',
    landmarks: [
      'Durgam Cheruvu Lake & Cable Stayed Suspension Bridge',
      'Jubilee Hills International Club',
      'HITEC City & Financial District Corridor',
      'KBR National Park Green Reserve'
    ],
    vibe: 'Modern Palaces, Dramatic Topography & Elite Privacy',
    reraAuthority: 'Telangana RERA Compliant'
  },
  {
    id: 'sadashivnagar',
    name: 'Sadashivnagar & UB City',
    city: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Plateau Old-Money Royalty & Cubbon Skyline',
    image: '/images/neighborhoods/ub_city_bangalore_hood.jpg',
    avgRate: '₹32,000 – ₹54,000 / sq ft',
    appreciation5Y: '+59.0%',
    rentalYield: '4.2% – 5.8%',
    activeListings: 19,
    description: 'Combining historic royal heritage with tech-founder capital, Sadashivnagar and the Lavelle Road / UB City corridor represent Bengaluru’s most aspirational residential addresses. Shaded by ancient rain trees and bordered by Sankey Tank and Cubbon Park.',
    landmarks: [
      'UB City Luxury Retail Mall & Sky Helipad',
      'Cubbon Park Green Lungs & Bangalore Club',
      'Sankey Tank Serene Waterfront Promenade',
      'Bangalore Golf Club (Oldest Golf Club outside Britain)'
    ],
    vibe: 'Aristocratic Estates, Rain-Canopied Boulevards & Tech Visionaries',
    reraAuthority: 'Karnataka RERA Certified'
  },
  {
    id: 'lutyens',
    name: 'Lutyens’ Bungalow Zone',
    city: 'New Delhi',
    state: 'Delhi',
    tagline: 'India’s Apex Seat of Power & Diplomatic Grandeur',
    image: '/images/neighborhoods/lutyens_delhi_hood.jpg',
    avgRate: '₹65,000 – ₹1,20,000 / sq ft',
    appreciation5Y: '+48.0%',
    rentalYield: '2.5% – 3.5%',
    activeListings: 12,
    description: 'Covering approximately 28 square kilometers in the heart of the national capital, LBZ (including Amrita Shergill Marg, Aurangzeb Road, and Prithviraj Road) is the most protected and exclusive residential zone in Asia, featuring colonial neoclassical bungalows on multi-acre estates.',
    landmarks: [
      'Lodhi Gardens & India Habitat Centre',
      'Rashtrapati Bhavan & Central Vista Diplomatic Belt',
      'The Oberoi & Delhi Golf Club',
      'Khan Market Luxury Lifestyle Promenade'
    ],
    vibe: 'Century-Old Banyan Groves, High Security & National Power',
    reraAuthority: 'Delhi RERA Freehold Registry'
  }
];

export const EnclavesPage = () => {
  const { properties, setSelectedNeighborhood, navigateTo, formatPrice } = useRealEstate();
  const [selectedEnclaveId, setSelectedEnclaveId] = useState('worli');

  const activeEnclave = ENCLAVE_DETAILS.find((e) => e.id === selectedEnclaveId) || ENCLAVE_DETAILS[0];

  // Properties located in this enclave
  const matchingProperties = properties.filter((p) => {
    const nh = p.location.neighborhood.toLowerCase();
    const city = p.location.city.toLowerCase();
    const targetName = activeEnclave.name.toLowerCase();
    const targetCity = activeEnclave.city.toLowerCase();
    return nh.includes(targetName) || targetName.includes(nh) || city.includes(targetCity);
  });

  const handleExploreListings = (neighborhoodName) => {
    setSelectedNeighborhood(neighborhoodName);
    navigateTo('listings');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>Curated Indian Enclaves</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            India’s Most Prestigious Enclaves
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From Arabian Sea promenades in Worli to private championship fairways on DLF Golf Course Road and heritage estates in Assagao — explore the country’s most coveted addresses.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Enclave Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ENCLAVE_DETAILS.map((enclave) => {
            const isSelected = enclave.id === selectedEnclaveId;
            return (
              <button
                key={enclave.id}
                onClick={() => setSelectedEnclaveId(enclave.id)}
                className={`relative px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide shrink-0 transition-all ${
                  isSelected
                    ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 shadow-luxury'
                    : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-gold-400'
                }`}
              >
                <span>{enclave.name}</span>
                <span className="text-[10px] opacity-70 ml-1.5 font-normal">({enclave.city})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Enclave Feature Banner & Analytics Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEnclave.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-navy-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-luxury grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Col */}
            <div className="lg:col-span-5 relative h-80 lg:h-auto min-h-[360px] overflow-hidden bg-navy-950">
              <img
                src={activeEnclave.image}
                alt={activeEnclave.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-navy-950/80 text-gold-300 border border-gold-400/40 backdrop-blur-md">
                  {activeEnclave.city}, {activeEnclave.state}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-600/90 text-white backdrop-blur-md">
                  {activeEnclave.reraAuthority}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  {activeEnclave.vibe}
                </p>
                <h2 className="font-serif text-3xl font-bold">
                  {activeEnclave.name}
                </h2>
                <p className="text-xs text-slate-300">
                  {activeEnclave.tagline}
                </p>
              </div>
            </div>

            {/* Enclave Data & Highlights Col */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* 4 Key Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Capital Rate</span>
                    <strong className="text-sm sm:text-base font-bold text-navy-950 dark:text-white mt-0.5 block">{activeEnclave.avgRate}</strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">5-Yr Growth</span>
                    <strong className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">{activeEnclave.appreciation5Y}</strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Gross Yield</span>
                    <strong className="text-sm sm:text-base font-bold text-gold-600 dark:text-gold-400 mt-0.5 block">{activeEnclave.rentalYield}</strong>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-100 dark:border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Inventory</span>
                    <strong className="text-sm sm:text-base font-bold text-navy-950 dark:text-white mt-0.5 block">{activeEnclave.activeListings} Residences</strong>
                  </div>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  {activeEnclave.description}
                </p>

                {/* Key Infrastructure & Landmarks */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 dark:text-white flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5 text-gold-500" />
                    <span>Infrastructure, Clubs & Lifestyle Anchors</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {activeEnclave.landmarks.map((lm, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                        <span>{lm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {matchingProperties.length} curated trophy residences available now
                </span>
                <button
                  onClick={() => handleExploreListings(activeEnclave.name)}
                  className="px-6 py-2.5 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Explore All {activeEnclave.name} Listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Active Residences in Selected Enclave */}
        <div className="space-y-6 pt-4">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-600 dark:text-gold-400 font-bold">
                Available Portfolio
              </span>
              <h3 className="font-serif text-2xl font-bold text-navy-950 dark:text-white">
                Featured Residences in {activeEnclave.name}
              </h3>
            </div>
            <button
              onClick={() => handleExploreListings(activeEnclave.name)}
              className="text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
            >
              <span>View Full Portfolio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {matchingProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProperties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-navy-900 rounded-3xl border border-slate-200 dark:border-white/10 text-xs text-slate-500">
              No public listings currently displayed. Contact the Private Client Desk for confidential off-market allocations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
