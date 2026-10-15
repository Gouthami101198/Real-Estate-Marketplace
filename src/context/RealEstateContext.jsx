import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MOCK_PROPERTIES, MOCK_AGENTS, formatCurrencyINR, formatCurrencyUSD } from '../data/mockData';

const RealEstateContext = createContext();

export const RealEstateProvider = ({ children }) => {
  // Currency State ('INR' | 'USD')
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_currency');
      return saved || 'INR';
    } catch {
      return 'INR';
    }
  });

  const toggleCurrency = () => {
    setCurrency((prev) => {
      const next = prev === 'INR' ? 'USD' : 'INR';
      try {
        localStorage.setItem('aura_currency', next);
      } catch {}
      showToast(
        next === 'INR' 
          ? 'Switched display currency to Indian Rupee (₹ INR)' 
          : 'Switched display currency to US Dollar ($ USD)', 
        'gold'
      );
      return next;
    });
  };

  const formatPrice = (amount, listingType = 'For Sale') => {
    return currency === 'INR'
      ? formatCurrencyINR(amount, listingType)
      : formatCurrencyUSD(amount, listingType);
  };

  // Properties state (supports adding user submitted listings)
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem('aura_custom_properties');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...MOCK_PROPERTIES];
      } catch (e) {
        return MOCK_PROPERTIES;
      }
    }
    return MOCK_PROPERTIES;
  });

  // Navigation & Views
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'listings' | 'property-detail' | 'agents' | 'agent-detail' | 'submit-property' | 'wishlist'
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All Types');
  const [listingType, setListingType] = useState('All'); // 'All' | 'For Sale' | 'For Rent'
  const [priceRange, setPriceRange] = useState([0, 1000000000]); // 0 to ₹100 Cr
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'sqft-desc' | 'popular' | 'newest'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Saved / Wishlist properties
  const [savedPropertyIds, setSavedPropertyIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_saved_properties');
      return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  // Comparison drawer & properties (up to 4)
  const [comparePropertyIds, setComparePropertyIds] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_compare_properties');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Tour Scheduling Modal
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourProperty, setTourProperty] = useState(null);

  // Theme State ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_theme', theme);
    } catch {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(next === 'dark' ? 'Switched to Luxury Dark Theme' : 'Switched to Refined Light Theme', 'gold');
      return next;
    });
  };

  // Auth State
  const [user, setUser] = useState({
    id: 'user-vip',
    name: 'Aarav Singhania',
    email: 'aarav.singhania@auracapital.in',
    role: 'Accredited UHNWI Investor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    memberSince: '2023'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot-password'

  // Viewport Simulator Mode ('desktop' | 'tablet' | 'mobile')
  const [viewportMode, setViewportMode] = useState('desktop');
  const [isViewportSwitcherOpen, setIsViewportSwitcherOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Persist Wishlist & Compare
  useEffect(() => {
    localStorage.setItem('aura_saved_properties', JSON.stringify(savedPropertyIds));
  }, [savedPropertyIds]);

  useEffect(() => {
    localStorage.setItem('aura_compare_properties', JSON.stringify(comparePropertyIds));
  }, [comparePropertyIds]);

  // Toast dispatch
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wishlist actions
  const toggleSaveProperty = (id) => {
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showToast(
        exists ? 'Property removed from saved portfolio' : 'Property saved to your portfolio',
        exists ? 'info' : 'gold'
      );
      return updated;
    });
  };

  const isPropertySaved = (id) => savedPropertyIds.includes(id);

  // Compare actions
  const toggleCompareProperty = (id) => {
    setComparePropertyIds((prev) => {
      if (prev.includes(id)) {
        showToast('Removed from property comparison', 'info');
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        showToast('You can compare a maximum of 4 properties at once', 'info');
        return prev;
      }
      showToast('Added to property comparison matrix', 'gold');
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setComparePropertyIds((prev) => prev.filter((item) => item !== id));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setComparePropertyIds([]);
    showToast('Comparison cleared', 'info');
  };

  const isComparing = (id) => comparePropertyIds.includes(id);

  // Navigation helpers
  const navigateTo = (view, payload = null) => {
    setCurrentView(view);
    if (view === 'property-detail' && payload) {
      setSelectedPropertyId(payload);
    } else if (view === 'agent-detail' && payload) {
      setSelectedAgentId(payload);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewPropertyDetail = (id) => {
    navigateTo('property-detail', id);
  };

  const viewAgentDetail = (id) => {
    navigateTo('agent-detail', id);
  };

  // Schedule Tour modal
  const openTourModal = (property) => {
    setTourProperty(property);
    setIsTourModalOpen(true);
  };

  const closeTourModal = () => {
    setIsTourModalOpen(false);
    setTourProperty(null);
  };

  // Auth actions
  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${userData.name}!`, 'gold');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Signed out of AURA Estates', 'info');
  };

  // Add custom property submission
  const addProperty = (newProp) => {
    const rawPrice = Number(newProp.price) || 250000000;
    const formatted = {
      ...newProp,
      id: `custom-prop-${Date.now()}`,
      slug: newProp.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: rawPrice,
      viewsCount: 1,
      savesCount: 0,
      verified: true,
      reraId: newProp.reraId || 'MahaRERA: P51900039201',
      vastuCompliant: true,
      priceFormatted: formatPrice(rawPrice, newProp.listingType),
    };

    setProperties((prev) => [formatted, ...prev]);

    // Save to localStorage
    try {
      const saved = localStorage.getItem('aura_custom_properties');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('aura_custom_properties', JSON.stringify([formatted, ...existing]));
    } catch (e) {
      console.error(e);
    }

    showToast('Your Indian luxury residence has been submitted and published!', 'gold');
    navigateTo('property-detail', formatted.id);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedNeighborhood('All');
    setSelectedPropertyType('All Types');
    setListingType('All');
    setPriceRange([0, 1000000000]);
    setMinBeds(0);
    setMinBaths(0);
    setSelectedAmenities([]);
    setSortBy('featured');
    setCurrentPage(1);
    showToast('Filters reset to default', 'info');
  };

  // Filtered & Sorted Properties calculation
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = prop.title.toLowerCase().includes(query);
        const matchCity = prop.location.city.toLowerCase().includes(query);
        const matchAddress = prop.location.address.toLowerCase().includes(query);
        const matchZip = prop.location.zip.toLowerCase().includes(query);
        const matchNeighborhood = prop.location.neighborhood.toLowerCase().includes(query);
        const matchRera = prop.reraId ? prop.reraId.toLowerCase().includes(query) : false;
        if (!matchTitle && !matchCity && !matchAddress && !matchZip && !matchNeighborhood && !matchRera) {
          return false;
        }
      }

      // Neighborhood
      if (selectedNeighborhood !== 'All') {
        if (!prop.location.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase())) {
          return false;
        }
      }

      // Property Type
      if (selectedPropertyType !== 'All Types') {
        if (prop.propertyType !== selectedPropertyType) {
          return false;
        }
      }

      // Listing Type
      if (listingType !== 'All') {
        if (prop.listingType !== listingType) {
          return false;
        }
      }

      // Price Range
      if (prop.price < priceRange[0] || prop.price > priceRange[1]) {
        return false;
      }

      // Bedrooms
      if (minBeds > 0 && prop.specs.beds < minBeds) {
        return false;
      }

      // Bathrooms
      if (minBaths > 0 && prop.specs.baths < minBaths) {
        return false;
      }

      // Amenities (must have all selected)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          prop.amenities && prop.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'sqft-desc') return b.specs.sqft - a.specs.sqft;
      if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
      if (sortBy === 'newest') return b.specs.yearBuilt - a.specs.yearBuilt;
      // Default: featured first, then saves count
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.savesCount - a.savesCount;
    });
  }, [
    properties,
    searchQuery,
    selectedNeighborhood,
    selectedPropertyType,
    listingType,
    priceRange,
    minBeds,
    minBaths,
    selectedAmenities,
    sortBy
  ]);

  // Paginated slice
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;

  // Selected Property Object
  const currentProperty = useMemo(() => {
    if (!selectedPropertyId) return null;
    return properties.find((p) => p.id === selectedPropertyId) || properties[0];
  }, [properties, selectedPropertyId]);

  // Selected Agent Object
  const currentAgent = useMemo(() => {
    if (!selectedAgentId) return null;
    return MOCK_AGENTS.find((a) => a.id === selectedAgentId) || MOCK_AGENTS[0];
  }, [selectedAgentId]);

  // Saved properties array
  const savedProperties = useMemo(() => {
    return properties.filter((p) => savedPropertyIds.includes(p.id));
  }, [properties, savedPropertyIds]);

  // Compare properties array
  const compareProperties = useMemo(() => {
    return properties.filter((p) => comparePropertyIds.includes(p.id));
  }, [properties, comparePropertyIds]);

  return (
    <RealEstateContext.Provider
      value={{
        properties,
        agents: MOCK_AGENTS,
        currentView,
        setCurrentView,
        navigateTo,
        selectedPropertyId,
        viewPropertyDetail,
        currentProperty,
        selectedAgentId,
        viewAgentDetail,
        currentAgent,
        // Currency
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        // Search & Filters
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
        setMinBaths,
        selectedAmenities,
        setSelectedAmenities,
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        viewMode,
        setViewMode,
        resetFilters,
        filteredProperties,
        paginatedProperties,
        totalPages,
        // Wishlist
        savedPropertyIds,
        savedProperties,
        toggleSaveProperty,
        isPropertySaved,
        // Compare
        comparePropertyIds,
        compareProperties,
        toggleCompareProperty,
        removeFromCompare,
        clearCompare,
        isComparing,
        isCompareModalOpen,
        setIsCompareModalOpen,
        // Tour modal
        isTourModalOpen,
        tourProperty,
        openTourModal,
        closeTourModal,
        // Theme
        theme,
        setTheme,
        toggleTheme,
        // Auth
        user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        loginUser,
        logoutUser,
        // Submissions
        addProperty,
        // Notifications
        toasts,
        showToast,
        removeToast,
        // Viewport Switcher
        viewportMode,
        setViewportMode,
        isViewportSwitcherOpen,
        setIsViewportSwitcherOpen,
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};
