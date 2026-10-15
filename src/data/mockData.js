export const formatCurrencyINR = (amount, listingType = 'For Sale') => {
  if (!amount || isNaN(amount)) return '₹0';
  const num = Number(amount);
  let str = '';
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '');
    str = `₹${cr} Cr`;
  } else if (num >= 100000) {
    const l = (num / 100000).toFixed(2).replace(/\.00$/, '');
    str = `₹${l} Lakh`;
  } else {
    str = `₹${num.toLocaleString('en-IN')}`;
  }
  return listingType === 'For Rent' ? `${str} / mo` : str;
};

export const formatCurrencyUSD = (amount, listingType = 'For Sale') => {
  if (!amount || isNaN(amount)) return '$0';
  // Standard conversion 1 USD ~ 83.5 INR
  const usd = Math.round(Number(amount) / 83.5);
  let str = '';
  if (usd >= 1000000) {
    str = `$${(usd / 1000000).toFixed(2).replace(/\.00$/, '')}M`;
  } else {
    str = `$${usd.toLocaleString('en-US')}`;
  }
  return listingType === 'For Rent' ? `${str} / mo` : str;
};

export const MOCK_AGENTS = [
  {
    id: 'agent-1',
    name: 'Aditya Singhania',
    title: 'Managing Director & Mumbai Luxury Lead',
    agency: 'AURA India Private Client Group',
    phone: '+91 (022) 6982-4410',
    email: 'aditya.singhania@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 78,
    salesVolume: '₹2,450 Cr+',
    listingsCount: 9,
    experienceYears: 17,
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    specialties: ['Worli & South Mumbai Sea View Mansions', 'Bandra West Celebrity Penthouses', 'Off-Market Portfolios'],
    bio: 'Recognized as Mumbai’s premier luxury advisor for industrial families and Bollywood executives, Aditya brings uncompromised discretion, deep MahaRERA legal mastery, and bespoke acquisition advisory to high-net-worth clients globally.',
    verified: true,
    reraLicense: 'MahaRERA: A51900018420'
  },
  {
    id: 'agent-2',
    name: 'Meera Sen',
    title: 'Principal Advisor & NCR Capital Specialist',
    agency: 'AURA Delhi NCR & Capital Estates',
    phone: '+91 (011) 4892-0198',
    email: 'meera.sen@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.96,
    reviewsCount: 64,
    salesVolume: '₹2,100 Cr+',
    listingsCount: 7,
    experienceYears: 14,
    languages: ['English', 'Hindi', 'Bengali'],
    specialties: ['DLF Golf Course Road Sky Palaces', 'Lutyens’ Bungalow Zone Diplomatic Manors', 'Private Family Offices'],
    bio: 'Specializing in Delhi NCR’s Billionaires’ Row on Golf Course Road and exclusive Lutyens’ heritage acquisitions, Meera represents Fortune 500 CEOs, senior diplomats, and multi-generational business dynasties.',
    verified: true,
    reraLicense: 'HARERA: HRERA-GGM-189-2021'
  },
  {
    id: 'agent-3',
    name: 'Vikramaditya Rao',
    title: 'Director of Tech Tycoon & Southern Estates',
    agency: 'AURA Bengaluru & Hyderabad Division',
    phone: '+91 (080) 4122-9920',
    email: 'vikram.rao@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    rating: 4.93,
    reviewsCount: 56,
    salesVolume: '₹1,780 Cr+',
    listingsCount: 6,
    experienceYears: 15,
    languages: ['English', 'Kannada', 'Telugu', 'Tamil'],
    specialties: ['Sadashivnagar & UB City Sky Mansions', 'Jubilee Hills Ridge Compounds', 'Smart Sustainable Tech Estates'],
    bio: 'Vikramaditya advises founders of India’s top tech unicorns and venture funds, delivering private off-market advisory in Bengaluru’s UB City corridor and Hyderabad’s prestigious Jubilee Hills.',
    verified: true,
    reraLicense: 'Karnataka RERA: PRM/KA/RERA/1251/446/AG/190820'
  },
  {
    id: 'agent-4',
    name: 'Ananya Deshmukh',
    title: 'Partner & Coastal Sanctuaries Lead',
    agency: 'AURA Goa & Alibaug Estates',
    phone: '+91 (0832) 249-8831',
    email: 'ananya.deshmukh@auraestates.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.99,
    reviewsCount: 82,
    salesVolume: '₹1,340 Cr+',
    listingsCount: 5,
    experienceYears: 13,
    languages: ['English', 'Konkani', 'Marathi', 'French'],
    specialties: ['Restored Portuguese Heritage Havelis', 'Alibaug Private Beachfronts', 'Eco-Luxury Hill Sanctuaries'],
    bio: 'Ananya curates the finest boutique heritage estates in Assagao, Candolim, and Alibaug for global connoisseurs seeking tranquil retreats, pristine coastal plots, and architecturally restored heritage villas.',
    verified: true,
    reraLicense: 'Goa RERA: AGGO08190342'
  }
];

export const MOCK_NEIGHBORHOODS = [
  {
    id: 'n-1',
    name: 'Worli Sea Face',
    state: 'Mumbai, Maharashtra',
    image: '/images/neighborhoods/worli_sea_face_hood.jpg',
    avgPrice: '₹38.5 Cr',
    propertiesCount: 32,
    highlight: 'Iconic Arabian Sea & Sea Link Panorama'
  },
  {
    id: 'n-2',
    name: 'Golf Course Road',
    state: 'Gurugram, NCR',
    image: '/images/neighborhoods/golf_course_road_hood.jpg',
    avgPrice: '₹34.0 Cr',
    propertiesCount: 26,
    highlight: 'DLF Camellias & Magnolias Luxury Enclave'
  },
  {
    id: 'n-3',
    name: 'Assagao & Candolim',
    state: 'North Goa',
    image: '/images/neighborhoods/assagao_candolim_hood.jpg',
    avgPrice: '₹18.5 Cr',
    propertiesCount: 21,
    highlight: 'Indo-Portuguese Heritage & Coconut Groves'
  },
  {
    id: 'n-4',
    name: 'Jubilee Hills',
    state: 'Hyderabad, Telangana',
    image: '/images/neighborhoods/jubilee_hills_hood.jpg',
    avgPrice: '₹28.0 Cr',
    propertiesCount: 18,
    highlight: 'Ridge-Top Lake View Mansions'
  },
  {
    id: 'n-5',
    name: 'Sadashivnagar & UB City',
    state: 'Bengaluru, Karnataka',
    image: '/images/neighborhoods/ub_city_bangalore_hood.jpg',
    avgPrice: '₹24.5 Cr',
    propertiesCount: 19,
    highlight: 'Silicon Plateau Aristocracy & Cubbon Views'
  },
  {
    id: 'n-6',
    name: 'Lutyens’ Bungalow Zone',
    state: 'New Delhi',
    image: '/images/neighborhoods/lutyens_delhi_hood.jpg',
    avgPrice: '₹75.0 Cr',
    propertiesCount: 12,
    highlight: 'Stately Diplomatic Colonial Manors'
  }
];

export const MOCK_PROPERTIES = [
  {
    id: 'prop-1',
    title: 'The Imperial Sky Villa at Worli Sea Face',
    tagline: 'Full-Floor Duplex Sky Mansion with 270° Arabian Sea & Sea Link Vistas',
    slug: 'imperial-sky-villa-worli-mumbai',
    price: 485000000,
    priceFormatted: '₹48.50 Cr',
    reraId: 'MahaRERA: P51900028410',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Sky Palace',
    status: 'Exclusive',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 4820,
    savesCount: 380,
    location: {
      address: 'Sea Face Promenade, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400030',
      neighborhood: 'Worli Sea Face',
      coordinates: { lat: 19.0178, lng: 72.8158 }
    },
    specs: {
      beds: 5,
      baths: 7,
      sqft: 10800,
      pricePerSqft: 44907,
      lotSize: 'N/A (Duplex Full Floor)',
      yearBuilt: 2023,
      garages: 4,
      stories: 2
    },
    images: [
      '/images/properties/worli_skyvilla.jpg',
      '/images/neighborhoods/worli_sea_face_hood.jpg',
      '/images/properties/pali_hill_penthouse.jpg',
      '/images/properties/camellias_signature_lease.jpg'
    ],
    description: 'Commanding unmatched 270-degree vistas across the Arabian Sea to the Bandra-Worli Sea Link, The Imperial Sky Villa stands as Mumbai’s definitive trophy residence. Designed by celebrated interior architects, this duplex features soaring 14-foot ceilings, book-matched Italian Statuario marble, private plunge pool, and dedicated staff quarters.',
    architecturalHighlights: [
      '270-degree unhindered Arabian Sea & Bandra-Worli Sea Link horizon views',
      'Private cantilevered temperature-controlled infinity plunge pool over the bay',
      '100% Vastu-compliant northeast orientation certified by master Vedic consultants',
      'Private dual high-speed elevators opening directly into double-height grand vestibule',
      'Fully equipped Gaggenau show kitchen with separate wet kitchen and butler pantry'
    ],
    amenities: [
      'Arabian Sea View',
      'Private Plunge Pool',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Private Elevator Access',
      'Smart Home Automation',
      '24/7 Multi-Tier Security',
      'Wine & Cigar Lounge',
      'Clubhouse & Spa Access'
    ],
    agentId: 'agent-1',
    neighborhoodScores: {
      walkability: 88,
      schools: 96,
      transit: 92,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 185000,
      homeInsurance: 45000,
      hoa: 120000
    }
  },
  {
    id: 'prop-2',
    title: 'The Camellias Ultra-Luxury Sky Palace',
    tagline: 'Pinnacle Golf-Facing Sky Mansion with Private Landscaped Terrace Gardens',
    slug: 'the-camellias-golf-course-road-gurugram',
    price: 420000000,
    priceFormatted: '₹42.00 Cr',
    reraId: 'HARERA: HRERA-PKL-GGM-129-2022',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Sky Palace',
    status: 'Featured',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 5240,
    savesCount: 410,
    location: {
      address: 'DLF Phase 5, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      zip: '122002',
      neighborhood: 'Golf Course Road',
      coordinates: { lat: 28.4595, lng: 77.0988 }
    },
    specs: {
      beds: 6,
      baths: 8,
      sqft: 11500,
      pricePerSqft: 36521,
      lotSize: 'N/A (Single Floor Plate)',
      yearBuilt: 2022,
      garages: 5,
      stories: 1
    },
    images: [
      '/images/properties/camellias_gurugram.jpg',
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/worli_skyvilla.jpg',
      '/images/properties/kingfisher_towers.jpg'
    ],
    description: 'Set within India’s most celebrated luxury residential enclave on Golf Course Road, this full-floor Sky Palace directly overlooks the 18-hole Gary Player championship golf course. Offering bespoke air-purification ecosystems, three private lifts, and access to a 1.5 Lakh sq ft private clubhouse.',
    architecturalHighlights: [
      'Sweeping panoramic frontage over DLF Golf Course fairways and Aravalli Ridge',
      'Double-height ceiling gallery engineered to display international museum art',
      'Triple-glazed soundproof acoustic low-E glass envelope with microclimate controls',
      'Separate service wing with independent service elevator and living quarters for 3 staff',
      'Private 12-seater Dolby Atmos screening theater and custom wine cellar'
    ],
    amenities: [
      'Golf Course View',
      'Clubhouse & Spa Access',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Private Elevator Access',
      'Private Garden Courtyard',
      'Smart Home Automation',
      'Helipad Access Nearby',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-2',
    neighborhoodScores: {
      walkability: 82,
      schools: 98,
      transit: 89,
      safety: 100
    },
    monthlyCosts: {
      propertyTaxes: 160000,
      homeInsurance: 38000,
      hoa: 140000
    }
  },
  {
    id: 'prop-3',
    title: 'Casa Do Sol Indo-Portuguese Heritage Estate',
    tagline: 'Restored 150-Year Heritage Palatial Villa with Private Emerald Quartz Pool',
    slug: 'casa-do-sol-heritage-villa-assagao-goa',
    price: 187500000,
    priceFormatted: '₹18.75 Cr',
    reraId: 'Goa RERA: PRGO05180421',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Heritage Villa',
    status: 'Exclusive',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 3950,
    savesCount: 295,
    location: {
      address: 'Badem High Road, Assagao',
      city: 'North Goa',
      state: 'Goa',
      zip: '403507',
      neighborhood: 'Assagao & Candolim',
      coordinates: { lat: 15.5908, lng: 73.7744 }
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 7800,
      pricePerSqft: 24038,
      lotSize: '0.85 Acres',
      yearBuilt: 2022,
      garages: 4,
      stories: 2
    },
    images: [
      '/images/properties/casa_do_sol_goa.jpg',
      '/images/properties/assagao_valley_villa.jpg',
      '/images/properties/udaipur_heritage_haveli.jpg',
      '/images/properties/mandwa_alibaug_villa.jpg'
    ],
    description: 'Tucked within the whispering banyans of Assagao’s culinary haven, Casa Do Sol combines 19th-century Portuguese colonial elegance with barefoot resort modernism. Boasting original Burma teak roof trusses, laterite masonry walls, and a 60-foot emerald quartz swimming pool surrounded by Alphonso mango orchards.',
    architecturalHighlights: [
      'Restored high-ceiling Portuguese colonnade with hand-painted Azulejo ceramic tiles',
      '60-foot natural emerald quartz swimming pool with sunken sunlounges and poolside bar',
      'Separate two-bedroom guest cottage with private garden terrace entrance',
      'Open-air alfresco dining pavilion with Wood Stone pizza oven and Argentine parrilla grill',
      'Redundant solar hybrid microgrid with 100% silent DG genset backup'
    ],
    amenities: [
      'Private Plunge Pool',
      'Private Garden Courtyard',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      'Wine & Cigar Lounge',
      '24/7 Multi-Tier Security',
      'Vastu Compliant'
    ],
    agentId: 'agent-4',
    neighborhoodScores: {
      walkability: 76,
      schools: 85,
      transit: 65,
      safety: 98
    },
    monthlyCosts: {
      propertyTaxes: 45000,
      homeInsurance: 22000,
      hoa: 25000
    }
  },
  {
    id: 'prop-4',
    title: 'The Kingfisher Towers Sky Mansion at UB City',
    tagline: 'Lavelle Road Ultra-Luxury Penthouse Towering Over Cubbon Park',
    slug: 'kingfisher-towers-sky-mansion-bengaluru',
    price: 385000000,
    priceFormatted: '₹38.50 Cr',
    reraId: 'Karnataka RERA: PRM/KA/RERA/1251/446/PR/180516',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Penthouse',
    status: 'Exclusive',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 3410,
    savesCount: 260,
    location: {
      address: 'Vittal Mallya Road / UB City',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560001',
      neighborhood: 'Sadashivnagar & UB City',
      coordinates: { lat: 12.9719, lng: 77.5958 }
    },
    specs: {
      beds: 5,
      baths: 6.5,
      sqft: 8900,
      pricePerSqft: 43258,
      lotSize: 'N/A (Full Floor Plate)',
      yearBuilt: 2021,
      garages: 4,
      stories: 1
    },
    images: [
      '/images/properties/kingfisher_towers.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg',
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/pali_hill_penthouse.jpg'
    ],
    description: 'Towering above Cubbon Park in Bengaluru’s most illustrious address, this sprawling residence offers 360-degree city skyline panoramas, direct VIP skywalk access to UB City luxury retail, cantilevered heated swimming pool, and Italian Boffi gourmet kitchen.',
    architecturalHighlights: [
      'Unobstructed 360-degree greenery and skyline panorama over Cubbon Park',
      'Direct private VIP skywalk to UB City Michelin dining, luxury boutiques, and helipad',
      'Floor-to-ceiling Rimadesio glass partitions and imported Calacatta Gold marble',
      'Full Crestron centralized automation for ambient illumination, climate, and security',
      'Four dedicated basement stilt parking bays equipped with 22kW EV chargers'
    ],
    amenities: [
      'Cubbon Park Skyline View',
      'Private Elevator Access',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      'Clubhouse & Spa Access',
      '24/7 Multi-Tier Security',
      'Helipad Access Nearby'
    ],
    agentId: 'agent-3',
    neighborhoodScores: {
      walkability: 96,
      schools: 94,
      transit: 95,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 120000,
      homeInsurance: 32000,
      hoa: 95000
    }
  },
  {
    id: 'prop-5',
    title: 'Jubilee Hills Ridge-Top Manor',
    tagline: 'Contemporary Travertine Compound Overlooking Durgam Cheruvu Lake',
    slug: 'jubilee-hills-ridge-top-manor-hyderabad',
    price: 310000000,
    priceFormatted: '₹31.00 Cr',
    reraId: 'Telangana RERA: P02400003418',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Modern Mansion',
    status: 'Exclusive',
    featured: true,
    priceDrop: true,
    verified: true,
    viewsCount: 2980,
    savesCount: 215,
    location: {
      address: 'Road No. 36, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      zip: '500033',
      neighborhood: 'Jubilee Hills',
      coordinates: { lat: 17.4319, lng: 78.4073 }
    },
    specs: {
      beds: 6,
      baths: 8,
      sqft: 12200,
      pricePerSqft: 25409,
      lotSize: '1.1 Acres',
      yearBuilt: 2023,
      garages: 6,
      stories: 3
    },
    images: [
      '/images/properties/jubilee_hills_manor.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg',
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/worli_skyvilla.jpg'
    ],
    description: 'Perched on the prime crest of Jubilee Hills with commanding lake views, this modern villa boasts an Italian Roman travertine exterior, heated infinity pool with sunken firepit, dedicated 6-car collector gallery, and biometric security perimeter.',
    architecturalHighlights: [
      'Commanding panoramic views of Durgam Cheruvu lake and HITEC City skyline',
      'Cascade heated infinity lap pool flanked by sunken fire lounges and tropical gardens',
      'Private 12-seat Dolby Atmos screening room and glass-walled fitness pavilion',
      'Subterranean automotive gallery designed to showcase 6 collector sports cars',
      'Dedicated guard outpost with 24/7 video analytics and smart intrusion defense'
    ],
    amenities: [
      'Lake & Valley Views',
      'Private Plunge Pool',
      'Private Garden Courtyard',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      'Wine & Cigar Lounge',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-3',
    neighborhoodScores: {
      walkability: 68,
      schools: 95,
      transit: 78,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 98000,
      homeInsurance: 28000,
      hoa: 42000
    }
  },
  {
    id: 'prop-6',
    title: 'Pali Hill Celebrity Penthouse at Bandra West',
    tagline: 'Triplex Penthouse with Wrap-Around Verdant Sea Breeze Terrace',
    slug: 'pali-hill-penthouse-bandra-mumbai',
    price: 340000000,
    priceFormatted: '₹34.00 Cr',
    reraId: 'MahaRERA: P51800019280',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Penthouse',
    status: 'Exclusive',
    featured: false,
    priceDrop: true,
    verified: true,
    viewsCount: 3890,
    savesCount: 310,
    location: {
      address: 'Nargis Dutt Road, Pali Hill, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400050',
      neighborhood: 'Worli Sea Face',
      coordinates: { lat: 19.0657, lng: 72.8258 }
    },
    specs: {
      beds: 4,
      baths: 5.5,
      sqft: 6400,
      pricePerSqft: 53125,
      lotSize: 'N/A (Triplex Penthouse)',
      yearBuilt: 2022,
      garages: 3,
      stories: 3
    },
    images: [
      '/images/properties/pali_hill_penthouse.jpg',
      '/images/properties/worli_skyvilla.jpg',
      '/images/neighborhoods/worli_sea_face_hood.jpg',
      '/images/properties/camellias_signature_lease.jpg'
    ],
    description: 'Nestled in Bandra West’s serene celebrity enclave of Pali Hill, this triplex penthouse features 1,800 sq ft of lush private terrace garden, biometric elevator access directly to your private foyer, and bespoke Italian interior fit-outs.',
    architecturalHighlights: [
      '1,800 sq ft wrap-around landscaped private terrace with Arabian Sea breezes',
      'Keyed private elevator opening directly into private double-height art salon',
      'Custom Poliform kitchen with integrated Gaggenau induction and sub-zero cooling',
      'Primary retreat featuring dual walk-in dressing suites and onyx spa bathroom',
      'Three dedicated basement parking bays on prestigious Nargis Dutt Road'
    ],
    amenities: [
      'Arabian Sea View',
      'Private Elevator Access',
      'Private Garden Courtyard',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-1',
    neighborhoodScores: {
      walkability: 94,
      schools: 95,
      transit: 92,
      safety: 98
    },
    monthlyCosts: {
      propertyTaxes: 135000,
      homeInsurance: 34000,
      hoa: 85000
    }
  },
  {
    id: 'prop-7',
    title: 'The Camellias Signature Residence (DLF Phase 5)',
    tagline: 'Fully Furnished Golf-Front Diplomatic & Executive Trophy Lease',
    slug: 'the-camellias-signature-lease-gurugram',
    price: 650000,
    priceFormatted: '₹6.50 Lakh / mo',
    reraId: 'HARERA: HRERA-GGM-612-2023',
    vastuCompliant: true,
    listingType: 'For Rent',
    propertyType: 'Sky Palace',
    status: 'Available for Lease',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 3120,
    savesCount: 198,
    location: {
      address: 'DLF Phase 5, Golf Course Road',
      city: 'Gurugram',
      state: 'Haryana',
      zip: '122002',
      neighborhood: 'Golf Course Road',
      coordinates: { lat: 28.4595, lng: 77.0988 }
    },
    specs: {
      beds: 4,
      baths: 5,
      sqft: 7400,
      pricePerSqft: 87.8,
      lotSize: 'N/A',
      yearBuilt: 2022,
      garages: 3,
      stories: 1
    },
    images: [
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/camellias_gurugram.jpg',
      '/images/properties/worli_skyvilla.jpg',
      '/images/properties/kingfisher_towers.jpg'
    ],
    description: 'Offering an ultra-rare lease opportunity in India’s finest residential address. Curated with designer pieces by Minotti and Poltrona Frau, central HEPA medical-grade air purification, and full membership to DLF Camellias Clubhouse.',
    architecturalHighlights: [
      'Turnkey luxury interior finished with imported European custom furnishings',
      'Direct balcony frontage facing the manicured 18th hole golf greens',
      'HEPA medical-grade central air filtration guaranteeing 25 PM2.5 indoors year-round',
      'Dedicated on-call butler, private concierge, and sommelier services available',
      'Three dedicated basement parking bays with high-speed EV wall chargers'
    ],
    amenities: [
      'Golf Course View',
      'Clubhouse & Spa Access',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-2',
    neighborhoodScores: {
      walkability: 82,
      schools: 98,
      transit: 89,
      safety: 100
    },
    monthlyCosts: {
      propertyTaxes: 0,
      homeInsurance: 0,
      hoa: 0
    }
  },
  {
    id: 'prop-8',
    title: 'The Mandwa Beachfront Villa & Mango Orchard',
    tagline: 'Private 1.8-Acre Coastal Compound 15 Minutes Speedboat from Gateway of India',
    slug: 'mandwa-beachfront-villa-alibaug',
    price: 165000000,
    priceFormatted: '₹16.50 Cr',
    reraId: 'MahaRERA: P52000031940',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Waterfront / Sea View',
    status: 'Exclusive',
    featured: false,
    priceDrop: false,
    verified: true,
    viewsCount: 2450,
    savesCount: 185,
    location: {
      address: 'Awas Beach Road, Mandwa',
      city: 'Alibaug',
      state: 'Maharashtra',
      zip: '402201',
      neighborhood: 'Worli Sea Face',
      coordinates: { lat: 18.7955, lng: 72.8732 }
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 8200,
      pricePerSqft: 20121,
      lotSize: '1.8 Acres',
      yearBuilt: 2021,
      garages: 4,
      stories: 2
    },
    images: [
      '/images/properties/mandwa_alibaug_villa.jpg',
      '/images/properties/casa_do_sol_goa.jpg',
      '/images/properties/assagao_valley_villa.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg'
    ],
    description: 'Set on 1.8 acres of private coastal land along Awas Beach, this sanctuary is just 15 minutes by speedboat from Colaba. Featuring mature Alphonso mango orchards, an 80-foot swimming pool, and private helipad landing pad.',
    architecturalHighlights: [
      'Direct private gated beach access to peaceful golden sand coastline',
      '80-foot natural stone swimming pool bordered by mature mango orchards',
      'Dedicated private helipad coordinates for 10-minute transfers to South Mumbai',
      'Independent two-bedroom guest cottage with private verandah and plunge pool',
      'Fully equipped outdoor chef kitchen with tandoor oven and wood-fired smoker'
    ],
    amenities: [
      'Arabian Sea View',
      'Helipad Access Nearby',
      'Private Plunge Pool',
      'Private Garden Courtyard',
      'Staff & Driver Quarters',
      '100% DG Power Backup',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-4',
    neighborhoodScores: {
      walkability: 60,
      schools: 75,
      transit: 70,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 40000,
      homeInsurance: 18000,
      hoa: 20000
    }
  },
  {
    id: 'prop-9',
    title: 'Lutyens’ Stately Colonial Compound',
    tagline: 'Palatial 1.25-Acre Manor on Amrita Shergill Marg in Delhi’s Power Enclave',
    slug: 'lutyens-stately-compound-new-delhi',
    price: 820000000,
    priceFormatted: '₹82.00 Cr',
    reraId: 'Delhi RERA: DLRERA2021A0041',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Modern Mansion',
    status: 'Exclusive',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 6890,
    savesCount: 520,
    location: {
      address: 'Amrita Shergill Marg, Lutyens’ Bungalow Zone',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110003',
      neighborhood: 'Lutyens’ Bungalow Zone',
      coordinates: { lat: 28.5982, lng: 77.2212 }
    },
    specs: {
      beds: 7,
      baths: 9,
      sqft: 15400,
      pricePerSqft: 53246,
      lotSize: '1.25 Acres',
      yearBuilt: 2020,
      garages: 8,
      stories: 2
    },
    images: [
      '/images/properties/lutyens_delhi_bungalow.jpg',
      '/images/properties/udaipur_heritage_haveli.jpg',
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg'
    ],
    description: 'Occupying 1.25 manicured acres along Amrita Shergill Marg, this stately compound represents the zenith of Indian aristocratic prestige. Steps from Lodhi Gardens, featuring grand ballrooms, Z+ compliant security, and timeless colonial neoclassical colonnades.',
    architecturalHighlights: [
      '1.25 acres of manicured heritage lawns with century-old neem and banyan trees',
      'Grand formal banquet ballroom accommodating 150 guests with commercial catering wing',
      'Z+ security compliant reinforced perimeter with dual manned bullet-resistant guardhouses',
      'Subterranean automotive gallery accommodating 8 VIP motorcade vehicles',
      'Walking distance to Lodhi Gardens, India Habitat Centre, and international embassies'
    ],
    amenities: [
      'Private Garden Courtyard',
      'Private Plunge Pool',
      'Staff & Driver Quarters',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Wine & Cigar Lounge',
      '24/7 Multi-Tier Security',
      'Helipad Access Nearby'
    ],
    agentId: 'agent-2',
    neighborhoodScores: {
      walkability: 85,
      schools: 99,
      transit: 95,
      safety: 100
    },
    monthlyCosts: {
      propertyTaxes: 280000,
      homeInsurance: 65000,
      hoa: 45000
    }
  },
  {
    id: 'prop-10',
    title: 'Assagao Sunset Valley Pool Villa',
    tagline: 'Ultra-Chic Designer Pool Villa for Season Leases & Creative Retreats',
    slug: 'assagao-sunset-valley-villa-goa',
    price: 420000,
    priceFormatted: '₹4.20 Lakh / mo',
    reraId: 'Goa RERA: PRGO09190581',
    vastuCompliant: true,
    listingType: 'For Rent',
    propertyType: 'Heritage Villa',
    status: 'Available for Lease',
    featured: false,
    priceDrop: false,
    verified: true,
    viewsCount: 2180,
    savesCount: 162,
    location: {
      address: 'Socolvaddo, Assagao',
      city: 'North Goa',
      state: 'Goa',
      zip: '403507',
      neighborhood: 'Assagao & Candolim',
      coordinates: { lat: 15.5908, lng: 73.7744 }
    },
    specs: {
      beds: 4,
      baths: 4.5,
      sqft: 5200,
      pricePerSqft: 80.7,
      lotSize: '0.45 Acres',
      yearBuilt: 2023,
      garages: 2,
      stories: 2
    },
    images: [
      '/images/properties/assagao_valley_villa.jpg',
      '/images/properties/casa_do_sol_goa.jpg',
      '/images/properties/mandwa_alibaug_villa.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg'
    ],
    description: 'Surrounded by forested hills minutes from Goa’s award-winning dining hub, this villa offers a private heated lap pool, terrazzo sundecks, high-speed optical fiber, and daily private chef service upon request.',
    architecturalHighlights: [
      'Private 45-foot heated swimming pool flanked by tropical frangipani trees',
      'Floor-to-ceiling glass pavilions opening onto shaded verandahs',
      'High-speed dedicated lease-line internet with optical backup for seamless remote work',
      'Fully furnished with bespoke pieces crafted by Goa local artisans and brass accents',
      'Staff quarters with daily housekeeping and security guard included in lease'
    ],
    amenities: [
      'Private Plunge Pool',
      'Private Garden Courtyard',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-4',
    neighborhoodScores: {
      walkability: 74,
      schools: 80,
      transit: 62,
      safety: 98
    },
    monthlyCosts: {
      propertyTaxes: 0,
      homeInsurance: 0,
      hoa: 0
    }
  },
  {
    id: 'prop-11',
    title: 'Sadashivnagar Royal Courtyard Estate',
    tagline: 'Modernist Teak & Granite Estate in Bangalore’s Historic Aristocratic Quarter',
    slug: 'sadashivnagar-royal-courtyard-bengaluru',
    price: 245000000,
    priceFormatted: '₹24.50 Cr',
    reraId: 'Karnataka RERA: PRM/KA/RERA/1251/446/PR/200812',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Modern Mansion',
    status: 'Exclusive',
    featured: false,
    priceDrop: false,
    verified: true,
    viewsCount: 2750,
    savesCount: 195,
    location: {
      address: '8th Main, Sadashivnagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560080',
      neighborhood: 'Sadashivnagar & UB City',
      coordinates: { lat: 13.0068, lng: 77.5813 }
    },
    specs: {
      beds: 5,
      baths: 6,
      sqft: 8600,
      pricePerSqft: 28488,
      lotSize: '0.45 Acres',
      yearBuilt: 2022,
      garages: 4,
      stories: 2
    },
    images: [
      '/images/properties/sadashivnagar_courtyard.jpg',
      '/images/properties/kingfisher_towers.jpg',
      '/images/properties/camellias_signature_lease.jpg',
      '/images/properties/assagao_valley_villa.jpg'
    ],
    description: 'Situated in the quiet tree-lined avenues of Sadashivnagar, this architectural gem features a central rain-harvesting skylit courtyard, polished Sadahalli granite stonework, solid Burma teak louvers, and solar microgrid backup.',
    architecturalHighlights: [
      'Central open-to-sky courtyard with natural skylight and ancient frangipani tree',
      'Polished Sadahalli granite and solid teakwood louvers for natural cross-ventilation',
      'Solar hybrid microgrid with 100% silent battery storage and DG generator backup',
      'Minutes from Sankey Tank, Bangalore Golf Club, and premier diplomatic residences',
      'Four covered car parking bays with dedicated EV charging connections'
    ],
    amenities: [
      'Private Garden Courtyard',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Staff & Driver Quarters',
      'Private Plunge Pool',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-3',
    neighborhoodScores: {
      walkability: 90,
      schools: 96,
      transit: 91,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 85000,
      homeInsurance: 24000,
      hoa: 35000
    }
  },
  {
    id: 'prop-12',
    title: 'The Aravalli Heritage Haveli & Spa at Udaipur',
    tagline: 'Palatial Lakeside Haven with Hand-Carved Jharokhas & Lake Pichola Panorama',
    slug: 'aravalli-heritage-haveli-udaipur',
    price: 265000000,
    priceFormatted: '₹26.50 Cr',
    reraId: 'Rajasthan RERA: RAJ/P/2021/1402',
    vastuCompliant: true,
    listingType: 'For Sale',
    propertyType: 'Heritage Villa',
    status: 'Exclusive',
    featured: true,
    priceDrop: false,
    verified: true,
    viewsCount: 4120,
    savesCount: 340,
    location: {
      address: 'Haridas Ji Ki Magri, Lake Pichola Road',
      city: 'Udaipur',
      state: 'Rajasthan',
      zip: '313001',
      neighborhood: 'Jubilee Hills',
      coordinates: { lat: 24.5854, lng: 73.7125 }
    },
    specs: {
      beds: 6,
      baths: 8,
      sqft: 11800,
      pricePerSqft: 22457,
      lotSize: '1.4 Acres',
      yearBuilt: 2021,
      garages: 6,
      stories: 2
    },
    images: [
      '/images/properties/udaipur_heritage_haveli.jpg',
      '/images/properties/lutyens_delhi_bungalow.jpg',
      '/images/properties/casa_do_sol_goa.jpg',
      '/images/properties/sadashivnagar_courtyard.jpg'
    ],
    description: 'Elevated above Lake Pichola, this regal estate brings royal Mewar architectural grandeur into modern ultra-luxury living. Boasting hand-carved white Makrana marble arches, royal courtyard swimming pool, and private spa pavilion.',
    architecturalHighlights: [
      'Unobstructed sunset views over Lake Pichola and the illuminated City Palace',
      'Hand-carved Makrana marble jharokhas, fluted pillars, and restored Rajput frescoes',
      'Central royal courtyard pool with Rajasthani fountain jets and heated Jacuzzi',
      'Rooftop banquet stargazing terrace hosting up to 100 private banquet guests',
      'Dedicated Ayurvedic wellness spa wing with steam, sauna, and massage suites'
    ],
    amenities: [
      'Private Plunge Pool',
      'Private Garden Courtyard',
      'Staff & Driver Quarters',
      'Vastu Compliant',
      '100% DG Power Backup',
      'Wine & Cigar Lounge',
      'Smart Home Automation',
      '24/7 Multi-Tier Security'
    ],
    agentId: 'agent-1',
    neighborhoodScores: {
      walkability: 72,
      schools: 88,
      transit: 70,
      safety: 99
    },
    monthlyCosts: {
      propertyTaxes: 75000,
      homeInsurance: 26000,
      hoa: 40000
    }
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Rajesh Bansal',
    role: 'Fintech Unicorn Founder & Angel Investor',
    location: 'Acquired Worli Sky Villa, Mumbai (₹48.5 Cr)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'AURA Estates redefined my perspective on luxury property acquisition in India. Aditya Singhania negotiated our off-market Worli duplex with absolute discretion, ensuring 100% MahaRERA diligence and saving our family office weeks of friction.'
  },
  {
    id: 't-2',
    name: 'Rohini & Alok Nambiar',
    role: 'Managing Partners, Global Private Equity',
    location: 'Purchased The Camellias Sky Palace, Gurugram (₹42 Cr)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'Meera Sen’s understanding of DLF Golf Course Road inventory is unmatched in Delhi NCR. She presented confidential developer allocations not found on public portals. The private capital calculators and neighborhood analytics were flawless.'
  },
  {
    id: 't-3',
    name: 'Dr. Ananya Sen',
    role: 'Biotech Founder & Contemporary Art Patron',
    location: 'Acquired Casa Do Sol Heritage Villa, Assagao Goa (₹18.75 Cr)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'Ananya Deshmukh navigated the complex Portuguese heritage approvals, title verification, and architectural restoration for our coastal sanctuary in Assagao. Truly a bespoke white-glove experience from viewing to registration.'
  }
];

export const AMENITY_OPTIONS = [
  'Arabian Sea View',
  'Vastu Compliant',
  '100% DG Power Backup',
  'Private Plunge Pool',
  'Staff & Driver Quarters',
  'Smart Home Automation',
  'Private Elevator Access',
  'Golf Course View',
  'Clubhouse & Spa Access',
  '24/7 Multi-Tier Security',
  'Wine & Cigar Lounge',
  'Helipad Access Nearby',
  'Private Garden Courtyard'
];

export const PROPERTY_TYPES = [
  'All Types',
  'Sky Palace',
  'Penthouse',
  'Modern Mansion',
  'Heritage Villa',
  'Waterfront / Sea View',
  'Luxury Apartment'
];
