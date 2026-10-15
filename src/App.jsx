import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  ArrowLeft 
} from 'lucide-react';
import { RealEstateProvider, useRealEstate } from './context/RealEstateContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { DeviceViewportSwitcher } from './components/common/DeviceViewportSwitcher';
import { LandingPage } from './components/landing/LandingPage';
import { ListingsPage } from './components/listings/ListingsPage';
import { PropertyDetailPage } from './components/property/PropertyDetailPage';
import { AgentsPage } from './components/agents/AgentsPage';
import { AgentDetailPage } from './components/agents/AgentDetailPage';
import { SubmitPropertyPage } from './components/submit/SubmitPropertyPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { EnclavesPage } from './components/enclaves/EnclavesPage';
import { MarketInsightsPage } from './components/insights/MarketInsightsPage';
import { PrivateDeskPage } from './components/privatedesk/PrivateDeskPage';
import { CompareModal } from './components/compare/CompareModal';
import { TourModal } from './components/property/TourModal';
import { AuthModal } from './components/auth/AuthModal';

const AppContent = ({ viewportMode }) => {
  const { currentView } = useRealEstate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-gold-500 selection:text-white transition-colors duration-300 relative">
      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Main View Router with Smooth Page Transitions */}
      <main className="flex-1 overflow-x-hidden pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentView === 'home' && <LandingPage />}
            {currentView === 'listings' && <ListingsPage />}
            {currentView === 'property-detail' && <PropertyDetailPage />}
            {currentView === 'enclaves' && <EnclavesPage />}
            {currentView === 'insights' && <MarketInsightsPage />}
            {currentView === 'agents' && <AgentsPage />}
            {currentView === 'agent-detail' && <AgentDetailPage />}
            {currentView === 'private-desk' && <PrivateDeskPage />}
            {currentView === 'submit-property' && <SubmitPropertyPage />}
            {currentView === 'wishlist' && <WishlistPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile & Tablet Dedicated Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Floating Elements */}
      <CompareModal />
      <TourModal />
      <AuthModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

const AppSimulatorContainer = () => {
  const { viewportMode, setViewportMode } = useRealEstate();

  return (
    <>
      {/* Interactive Device Viewport Switcher Toolbar (Bottom-Left, collapsible & dismissible) */}
      <DeviceViewportSwitcher />

      {/* 1. DESKTOP FULL WIDTH (100% Fluid) */}
      {viewportMode === 'desktop' && (
        <AppContent viewportMode="desktop" />
      )}

      {/* 2. TABLET SIMULATOR VIEW (768px iPad Frame) */}
      {viewportMode === 'tablet' && (
        <div className="min-h-screen bg-slate-950/95 py-8 px-4 flex flex-col items-center justify-start overflow-y-auto">
          {/* External Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4 max-w-xl text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold bg-navy-900/90 border border-gold-500/30 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <Tablet className="w-3.5 h-3.5" />
              Tablet Viewport (768 × 1024 px — iPad Air)
            </span>
            <button
              onClick={() => setViewportMode('desktop')}
              className="px-3.5 py-1.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md hover:shadow-gold-glow"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Exit to Desktop Full View</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-gold-400" />
              <span>Switch to Mobile</span>
            </button>
          </div>

          <div className="w-[768px] h-[980px] rounded-[38px] bg-navy-950 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_12px_#1e293b,0_0_0_14px_rgba(212,175,55,0.45)] overflow-hidden border border-slate-700/60 relative flex flex-col">
            {/* Tablet Status Header */}
            <div className="h-7 bg-slate-900/95 border-b border-white/10 flex items-center justify-between px-6 text-[10px] text-slate-300 font-mono select-none shrink-0 z-50">
              <span>iPadOS 9:41 AM</span>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 mx-auto" />
              <span>100% [🔋]</span>
            </div>

            {/* Embedded True Responsive Tablet Frame */}
            <iframe
              src="/?sim=tablet"
              title="iPad Tablet View"
              className="flex-1 w-full h-[calc(980px-28px)] border-0 bg-navy-950"
            />
          </div>
        </div>
      )}

      {/* 3. MOBILE SIMULATOR VIEW (393px iPhone 15 Pro Frame) */}
      {viewportMode === 'mobile' && (
        <div className="min-h-screen bg-slate-950/95 py-8 px-4 flex flex-col items-center justify-start overflow-y-auto">
          {/* External Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4 max-w-sm text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold bg-navy-900/90 border border-gold-500/30 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5" />
              Mobile Viewport (393 × 852 px — iPhone 15 Pro)
            </span>
            <button
              onClick={() => setViewportMode('desktop')}
              className="px-3.5 py-1.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md hover:shadow-gold-glow"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Exit to Desktop Full View</span>
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Tablet className="w-3.5 h-3.5 text-gold-400" />
              <span>Switch to Tablet</span>
            </button>
          </div>

          <div className="w-[393px] h-[852px] rounded-[52px] bg-navy-950 shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_0_10px_#111827,0_0_0_13px_rgba(212,175,55,0.45)] overflow-hidden border border-slate-800 relative flex flex-col">
            {/* Mobile Dynamic Island Top Bar */}
            <div className="h-11 bg-black border-b border-white/5 flex items-center justify-between px-6 text-[11px] text-slate-200 font-semibold select-none shrink-0 z-50">
              <span>9:41</span>
              <div className="w-24 h-5 rounded-full bg-black border border-white/10 flex items-center justify-end pr-2 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
              </div>
              <span className="text-[10px] font-mono">5G 100%</span>
            </div>

            {/* Embedded True Responsive Mobile Frame */}
            <iframe
              src="/?sim=mobile"
              title="iPhone 15 Pro Mobile View"
              className="flex-1 w-full h-[calc(852px-44px)] border-0 bg-navy-950"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function App() {
  // If running inside the simulator iframe, render the pure app content with true native mobile width
  const isInsideIframe = typeof window !== 'undefined' && (window.self !== window.top || window.location.search.includes('sim='));

  if (isInsideIframe) {
    return (
      <RealEstateProvider>
        <AppContent viewportMode="fluid" />
      </RealEstateProvider>
    );
  }

  return (
    <RealEstateProvider>
      <AppSimulatorContainer />
    </RealEstateProvider>
  );
}
