import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Heart, 
  Scale, 
  User, 
  PlusCircle, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  Sun,
  Moon,
  KeyRound,
  Monitor,
  Tablet,
  Smartphone,
  Check
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const Navbar = () => {
  const { 
    currentView, 
    navigateTo, 
    savedPropertyIds, 
    comparePropertyIds, 
    setIsCompareModalOpen, 
    user, 
    openAuthModal, 
    logoutUser,
    theme,
    toggleTheme,
    viewportMode,
    setViewportMode,
    isViewportSwitcherOpen,
    setIsViewportSwitcherOpen
  } = useRealEstate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isViewportMenuOpen, setIsViewportMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const viewportMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (viewportMenuRef.current && !viewportMenuRef.current.contains(e.target)) {
        setIsViewportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy-950/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10' 
          : 'bg-navy-900/80 backdrop-blur-sm py-4 border-b border-white/5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <motion.button 
            id="nav-logo-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateTo('home')}
            className="flex items-center space-x-3 group text-left focus:outline-none flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-800 to-navy-900 border border-gold-500/40 flex items-center justify-center shadow-lg group-hover:border-gold-400 group-hover:rotate-3 group-hover:scale-110 transition-all duration-300">
              <Building2 className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-1.5">
                AURA <span className="text-gold-400 font-sans font-light text-xs tracking-widest uppercase px-1.5 py-0.5 rounded border border-gold-500/30 bg-gold-500/10">Estates</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase hidden sm:block">Private Client Real Estate</p>
            </div>
          </motion.button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-2xl bg-white/[0.03] border border-white/5 mx-auto">
            {[
              { id: 'home', label: 'Home' },
              { id: 'listings', label: 'Prime Residences' },
              { id: 'enclaves', label: 'Prime Enclaves' },
              { id: 'insights', label: 'Market Insights' },
              { id: 'agents', label: 'Private Advisors' },
              { id: 'private-desk', label: 'Private Desk' },
              { id: 'submit-property', label: '+ List Property', isSpecial: true },
            ].map((item) => {
              const isActive = currentView === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo(item.id)}
                  className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                    isActive
                      ? item.isSpecial ? 'text-gold-300' : 'text-gold-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-gold-500/30 shadow-inner"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden lg:flex items-center space-x-2.5 flex-shrink-0">

            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border bg-white/5 border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-all flex items-center justify-center"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gold-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-300" />
              )}
            </motion.button>

            {/* Device Viewport Mode Selector (Non-intrusive header dropdown) */}
            <div className="relative" ref={viewportMenuRef}>
              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                id="nav-viewport-toggle-btn"
                onClick={() => setIsViewportMenuOpen(!isViewportMenuOpen)}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                  viewportMode !== 'desktop'
                    ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-gold-glow/20'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/40'
                }`}
                title="Device View (Desktop / Tablet / Mobile)"
              >
                {viewportMode === 'desktop' && <Monitor className="w-4 h-4" />}
                {viewportMode === 'tablet' && <Tablet className="w-4 h-4 text-gold-400" />}
                {viewportMode === 'mobile' && <Smartphone className="w-4 h-4 text-gold-400" />}
                <ChevronDown className="w-3 h-3 opacity-70" />
              </motion.button>

              {/* Viewport Dropdown */}
              <AnimatePresence>
                {isViewportMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-navy-900 border border-gold-500/30 shadow-2xl p-2 z-50 text-slate-200"
                  >
                    <div className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-gold-400 border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>Device Viewport</span>
                      <span className="text-[9px] text-slate-400 normal-case">Responsive</span>
                    </div>

                    {[
                      { id: 'desktop', label: 'Desktop (100% Fluid)', icon: Monitor, desc: 'Full-width display' },
                      { id: 'tablet', label: 'Tablet (768px)', icon: Tablet, desc: 'iPad Air / Mini frame' },
                      { id: 'mobile', label: 'Mobile (390px)', icon: Smartphone, desc: 'iPhone 15 Pro frame' }
                    ].map((vp) => {
                      const Icon = vp.icon;
                      const isActive = viewportMode === vp.id;
                      return (
                        <button
                          key={vp.id}
                          onClick={() => {
                            setViewportMode(vp.id);
                            setIsViewportMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                            isActive
                              ? 'bg-gold-500/20 text-gold-300 font-bold border border-gold-500/40'
                              : 'hover:bg-white/5 text-slate-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                            <div>
                              <p className="leading-tight">{vp.label}</p>
                              <p className="text-[10px] text-slate-400 font-normal">{vp.desc}</p>
                            </div>
                          </div>
                          {isActive && <Check className="w-4 h-4 text-gold-400 ml-1 shrink-0" />}
                        </button>
                      );
                    })}

                    <div className="border-t border-white/10 mt-1.5 pt-1.5 px-1">
                      <button
                        onClick={() => {
                          setIsViewportSwitcherOpen(!isViewportSwitcherOpen);
                          setIsViewportMenuOpen(false);
                        }}
                        className="w-full text-[11px] text-slate-400 hover:text-gold-300 py-1 text-center transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-gold-400" />
                        <span>{isViewportSwitcherOpen ? 'Hide Floating Switcher' : 'Show Floating Switcher'}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              id="nav-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2.5 rounded-xl border transition-all ${
                currentView === 'wishlist'
                  ? 'bg-gold-500/15 border-gold-500/60 text-gold-400 shadow-gold-glow/20'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-gold-500/30'
              }`}
              title="Saved Properties"
            >
              <Heart className={`w-4 h-4 ${savedPropertyIds.length > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              <AnimatePresence>
                {savedPropertyIds.length > 0 && (
                  <motion.span
                    key={savedPropertyIds.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-2 ring-navy-950"
                  >
                    {savedPropertyIds.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Compare Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              id="nav-compare-btn"
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-gold-500/30 transition-all"
              title="Property Comparison"
            >
              <Scale className="w-4 h-4" />
              <AnimatePresence>
                {comparePropertyIds.length > 0 && (
                  <motion.span
                    key={comparePropertyIds.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-navy-700 border border-gold-400 text-gold-300 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-2 ring-navy-950"
                  >
                    {comparePropertyIds.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Profile / Auth */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  id="nav-user-menu-btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/40 transition-all focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-gold-400/50"
                  />
                  <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-900 border border-gold-500/20 shadow-2xl p-2 z-50 text-slate-200"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-1">
                        <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-gold-400 font-medium flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          {user.role}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          navigateTo('wishlist');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Heart className="w-3.5 h-3.5 text-gold-400" />
                        <span>Saved Portfolio ({savedPropertyIds.length})</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('submit-property');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-gold-400" />
                        <span>Submit New Estate</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsCompareModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Scale className="w-3.5 h-3.5 text-gold-400" />
                        <span>Compare Matrix ({comparePropertyIds.length})</span>
                      </button>

                      <button
                        onClick={() => {
                          openAuthModal('login');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gold-300 hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Switch Persona / Access</span>
                      </button>

                      <div className="border-t border-white/10 my-1" />

                      <button
                        onClick={() => {
                          logoutUser();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-signin-btn"
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wide transition-all border border-white/15"
                >
                  Sign In
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => openAuthModal('signup')}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-navy-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-gold-glow"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="mobile-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-slate-300 relative"
            >
              <Heart className={`w-5 h-5 ${savedPropertyIds.length > 0 ? 'fill-gold-400 text-gold-400' : ''}`} />
              {savedPropertyIds.length > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-navy-950 font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {savedPropertyIds.length}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-950/98 border-b border-gold-500/20 px-4 pt-3 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  navigateTo('home');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigateTo('listings');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Prime Residences
              </button>
              <button
                onClick={() => {
                  navigateTo('enclaves');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Prime Enclaves
              </button>
              <button
                onClick={() => {
                  navigateTo('insights');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Market Insights
              </button>
              <button
                onClick={() => {
                  navigateTo('agents');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Private Advisors
              </button>
              <button
                onClick={() => {
                  navigateTo('private-desk');
                  setIsMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 text-xs text-left font-medium hover:bg-white/10"
              >
                Private Desk
              </button>
              <button
                onClick={() => {
                  navigateTo('submit-property');
                  setIsMobileMenuOpen(false);
                }}
                className="col-span-2 p-2.5 rounded-xl bg-white/5 border border-gold-500/30 text-gold-400 text-xs text-center font-bold hover:bg-gold-500/10"
              >
                + List Property
              </button>
            </div>

            {/* Mobile Controls Row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-gold-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={() => {
                  setIsCompareModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-gold-400" />
                <span>Compare ({comparePropertyIds.length})</span>
              </button>
            </div>

            {/* Mobile Device View Selector */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between px-1">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-gold-400" />
                Device View:
              </span>
              <div className="flex gap-1">
                {[
                  { id: 'desktop', label: 'Desktop' },
                  { id: 'tablet', label: 'Tablet' },
                  { id: 'mobile', label: 'Mobile' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setViewportMode(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      viewportMode === item.id
                        ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Auth Row */}
            <div className="pt-2 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={user.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="text-xs text-slate-200">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-300 text-xs font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      openAuthModal('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/15"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-xs"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
