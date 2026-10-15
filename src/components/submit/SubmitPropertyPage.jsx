import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PROPERTY_TYPES, AMENITY_OPTIONS, MOCK_AGENTS } from '../../data/mockData';

export const SubmitPropertyPage = () => {
  const { addProperty, showToast } = useRealEstate();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    listingType: 'For Sale', // 'For Sale' | 'For Rent'
    propertyType: 'Modern Mansion',
    status: 'Exclusive',
    price: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    zip: '400030',
    neighborhood: 'Worli Sea Face',
    reraId: 'MahaRERA: P51900028410',
    beds: '5',
    baths: '6',
    sqft: '8500',
    lotSize: 'Duplex Full Floor',
    yearBuilt: '2023',
    garages: '4',
    description: '',
    highlights: [
      'Panoramic Arabian Sea and skyline views through floor-to-ceiling automated glass',
      'Private temperature-controlled plunge pool and entertainment terrace',
      '100% Vastu-compliant layout designed by master consultants'
    ],
    amenities: ['Arabian Sea View', 'Private Plunge Pool', 'Vastu Compliant', '100% DG Power Backup'],
    images: [
      '/images/properties/worli_skyvilla.jpg',
      '/images/neighborhoods/worli_sea_face_hood.jpg',
      '/images/properties/pali_hill_penthouse.jpg'
    ],
    agentId: 'agent-1'
  });

  const [customImageUrl, setCustomImageUrl] = useState('');

  const samplePresets = [
    {
      name: 'Worli Sky Villa (Mumbai)',
      title: 'The Worli Sea Link Penthouse',
      tagline: 'Duplex Sky Mansion with 270° Arabian Sea & Sea Link Panoramas',
      price: 485000000,
      propertyType: 'Sky Palace',
      city: 'Mumbai',
      state: 'Maharashtra',
      neighborhood: 'Worli Sea Face',
      reraId: 'MahaRERA: P51900028410',
      beds: '5',
      baths: '7',
      sqft: '10800',
      images: [
        '/images/properties/worli_skyvilla.jpg',
        '/images/neighborhoods/worli_sea_face_hood.jpg',
        '/images/properties/pali_hill_penthouse.jpg'
      ]
    },
    {
      name: 'Casa Do Sol (Goa)',
      title: 'Casa Do Sol Indo-Portuguese Heritage Villa',
      tagline: 'Restored 150-Year Heritage Palatial Villa with Private Emerald Quartz Pool',
      price: 187500000,
      propertyType: 'Heritage Villa',
      city: 'North Goa',
      state: 'Goa',
      neighborhood: 'Assagao & Candolim',
      reraId: 'Goa RERA: PRGO05180421',
      beds: '5',
      baths: '6',
      sqft: '7800',
      images: [
        '/images/properties/casa_do_sol_goa.jpg',
        '/images/properties/assagao_valley_villa.jpg',
        '/images/properties/mandwa_alibaug_villa.jpg'
      ]
    },
    {
      name: 'The Camellias (Gurugram)',
      title: 'The Camellias DLF Golf Palace',
      tagline: 'Pinnacle Golf-Facing Sky Mansion with Private Landscaped Terrace Gardens',
      price: 420000000,
      propertyType: 'Sky Palace',
      city: 'Gurugram',
      state: 'Haryana',
      neighborhood: 'Golf Course Road',
      reraId: 'HARERA: HRERA-PKL-GGM-129-2022',
      beds: '6',
      baths: '8',
      sqft: '11500',
      images: [
        '/images/properties/camellias_gurugram.jpg',
        '/images/properties/camellias_signature_lease.jpg',
        '/images/properties/worli_skyvilla.jpg'
      ]
    }
  ];

  const handleApplyPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      title: preset.title,
      tagline: preset.tagline,
      price: preset.price.toString(),
      propertyType: preset.propertyType,
      city: preset.city,
      state: preset.state || 'Maharashtra',
      neighborhood: preset.neighborhood,
      reraId: preset.reraId || 'MahaRERA: P51900028410',
      beds: preset.beds,
      baths: preset.baths,
      sqft: preset.sqft,
      images: preset.images
    }));
    showToast(`Loaded ${preset.name} template values`, 'gold');
  };

  const handleAddImage = () => {
    if (!customImageUrl || !customImageUrl.startsWith('http')) {
      showToast('Please enter a valid image URL', 'info');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, customImageUrl]
    }));
    setCustomImageUrl('');
    showToast('Photo added to estate gallery', 'gold');
  };

  const handleRemoveImage = (index) => {
    if (formData.images.length <= 1) {
      showToast('At least one photo is required for luxury submission', 'info');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleToggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.city) {
      showToast('Please complete required fields: Title, Price, and City', 'info');
      return;
    }

    const priceNum = Number(formData.price.toString().replace(/[^0-9]/g, '')) || 15000000;

    const newProperty = {
      title: formData.title,
      tagline: formData.tagline || 'Exemplary architectural residence represented by AURA Estates',
      price: priceNum,
      listingType: formData.listingType,
      propertyType: formData.propertyType,
      status: formData.status,
      featured: true,
      priceDrop: false,
      location: {
        address: formData.address || 'Private Gated Enclave',
        city: formData.city,
        state: formData.state,
        zip: formData.zip || '90210',
        neighborhood: formData.neighborhood,
        coordinates: { lat: 34.0736, lng: -118.4004 }
      },
      specs: {
        beds: Number(formData.beds) || 5,
        baths: Number(formData.baths) || 6,
        sqft: Number(formData.sqft) || 8000,
        pricePerSqft: Math.round(priceNum / (Number(formData.sqft) || 8000)),
        lotSize: formData.lotSize,
        yearBuilt: Number(formData.yearBuilt) || 2023,
        garages: Number(formData.garages) || 4,
        stories: 2
      },
      images: formData.images,
      description: formData.description || `${formData.title} represents an exceptional trophy asset in ${formData.city}. Featuring uncompromising construction quality, bespoke finishes, and transcendent spaces designed for both quiet reflection and palatial entertaining.`,
      architecturalHighlights: formData.highlights,
      amenities: formData.amenities,
      agentId: formData.agentId,
      neighborhoodScores: {
        walkability: 82,
        schools: 98,
        transit: 78,
        safety: 99
      },
      monthlyCosts: {
        propertyTaxes: Math.round(priceNum * 0.01 / 12),
        homeInsurance: 4500,
        hoa: 1200
      }
    };

    addProperty(newProperty);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 pt-24 pb-20 transition-colors duration-300">
      
      {/* Header */}
      <div className="bg-navy-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-gold-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Private Client Listing Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Submit a Trophy Property
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Present your estate to accredited international buyers, private wealth managers, and architectural collectors worldwide.
          </p>

          {/* Preset Buttons */}
          <div className="pt-3 flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400">Quick Test Templates:</span>
            {samplePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-gold-300 font-medium border border-gold-400/30 transition-colors"
              >
                + Load {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
          {[
            { num: 1, label: 'Estate Overview' },
            { num: 2, label: 'Specifications' },
            { num: 3, label: 'Amenities & Media' }
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={`flex items-center gap-2 text-xs font-bold transition-all ${
                currentStep === step.num
                  ? 'text-navy-950 dark:text-white font-bold'
                  : currentStep > step.num
                  ? 'text-gold-600 dark:text-gold-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-serif text-xs ${
                  currentStep === step.num
                    ? 'bg-navy-900 dark:bg-gold-500 text-gold-300 dark:text-navy-950 shadow-md'
                    : currentStep > step.num
                    ? 'bg-gold-500 text-navy-950'
                    : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                }`}
              >
                {step.num}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-navy-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-luxury space-y-8 transition-colors">
          
          {/* STEP 1: Overview */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                  Estate Identity & Valuation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide primary naming, classification, and asking terms for the property.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Estate Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Bel-Air Glass Pavilion"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Curated Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Architectural Masterpiece with Unrivaled Los Angeles Basin Vistas"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Listing Type
                  </label>
                  <select
                    value={formData.listingType}
                    onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="For Sale">For Sale (Acquisition)</option>
                    <option value="For Rent">For Rent (Luxury Lease)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Property Classification
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    {PROPERTY_TYPES.filter((t) => t !== 'All Types').map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Price / Offering Amount (₹ INR or $ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 485000000 for ₹48.5 Cr"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    RERA Registration ID
                  </label>
                  <input
                    type="text"
                    value={formData.reraId || ''}
                    onChange={(e) => setFormData({ ...formData, reraId: e.target.value })}
                    placeholder="e.g. MahaRERA: P51900028410"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Lead Advisor
                  </label>
                  <select
                    value={formData.agentId}
                    onChange={(e) => setFormData({ ...formData, agentId: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  >
                    {MOCK_AGENTS.map((agent) => (
                      <option key={agent.id} value={agent.id}>{agent.name} ({agent.title})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    City / Destination *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, Gurugram, Goa, Bengaluru"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Enclave / Neighborhood
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="e.g. Worli Sea Face, Golf Course Road, Assagao"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.title || !formData.price || !formData.city) {
                      showToast('Please fill out Title, Price, and City first', 'info');
                      return;
                    }
                    setCurrentStep(2);
                  }}
                  className="px-6 py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Continue to Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Specifications & Narrative */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                  Architectural Specifications & Narrative
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detail square footage, room counts, and property narrative.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Interior Living Area (Sq Ft)
                  </label>
                  <input
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Lot Size
                  </label>
                  <input
                    type="text"
                    value={formData.lotSize}
                    onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
                    placeholder="e.g. 1.45 Acres"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Year Completed
                  </label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Garage Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.garages}
                    onChange={(e) => setFormData({ ...formData, garages: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Architectural Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the architectural provenance, signature materials, finishes, and indoor/outdoor flow..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Continue to Amenities & Media</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Amenities & Photography */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-navy-950 dark:text-white">
                  Signature Amenities & High-Res Photography
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select curated luxury perks and review high-resolution photography.
                </p>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Select Featured Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleToggleAmenity(amenity)}
                        className={`p-3 rounded-xl text-xs font-medium text-left flex items-center gap-2 transition-all border ${
                          isChecked
                            ? 'bg-navy-900 dark:bg-gold-500/20 text-gold-300 dark:text-gold-300 border-navy-900 dark:border-gold-500/40 font-semibold shadow-sm'
                            : 'bg-slate-50 dark:bg-navy-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-gold-400'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-gold-500 text-navy-950' : 'border border-slate-300 dark:border-slate-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </span>
                        <span className="truncate">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Images preview & Add photo URL */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Estate Photography Gallery ({formData.images.length} Photos)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative h-28 rounded-xl overflow-hidden group bg-navy-950 border border-white/5">
                      <img src={img} alt="estate" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-navy-950/80 text-white hover:bg-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Photo Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Paste external high-res photo URL (https://...)"
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-navy-950 dark:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="submit"
                  id="publish-estate-btn"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-gold-glow transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Luxury Estate</span>
                </button>
              </div>
            </motion.div>
          )}

        </form>

      </div>

    </div>
  );
};
