import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  KeyRound,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';
import { useRealEstate } from '../../context/RealEstateContext';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, loginUser, showToast } = useRealEstate();

  const [mode, setMode] = useState(authMode || 'login'); // 'login' | 'signup' | 'forgot-password'
  
  // Login & Register Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Accredited Buyer');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password flow
  const [resetEmail, setResetEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (authMode) {
      setMode(authMode);
    }
  }, [authMode]);

  if (!isAuthModalOpen) return null;

  const demoPersonas = [
    {
      id: 'demo-buyer',
      name: 'Rajesh Bansal',
      email: 'rajesh.bansal@auragroup.com',
      role: 'Accredited Buyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'demo-agent',
      name: 'Aditya Singhania',
      email: 'aditya.singhania@auraestates.com',
      role: 'Private Client Advisor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'demo-developer',
      name: 'Meera Sen',
      email: 'meera.sen@auraestates.com',
      role: 'Estate Developer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleDemoLogin = (persona) => {
    loginUser(persona);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    loginUser({
      id: `user-${Date.now()}`,
      name: fullName || (email.split('@')[0].toUpperCase()),
      email,
      role: 'Accredited Buyer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80'
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password !== confirmPassword) {
      showToast('Passwords do not match. Please verify.', 'info');
      return;
    }

    loginUser({
      id: `user-${Date.now()}`,
      name: fullName || 'Accredited Member',
      email,
      role: selectedRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    });
    showToast(`Accredited account created for ${fullName || email}!`, 'gold');
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      showToast('Please enter a valid registered email', 'info');
      return;
    }
    setOtpSent(true);
    setOtpCode('849201');
    showToast('Secure 6-digit access token sent to your email (Demo Code: 849201)', 'gold');
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!otpCode || !newPassword) {
      showToast('Please enter the verification code and new password', 'info');
      return;
    }
    showToast('Your security passphrase has been successfully updated!', 'gold');
    loginUser({
      id: `user-reset-${Date.now()}`,
      name: resetEmail.split('@')[0].toUpperCase(),
      email: resetEmail,
      role: 'Accredited Buyer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
    });
  };

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-navy-900 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10"
        >
          {/* Header */}
          <div className="p-6 bg-navy-950 text-white relative border-b border-gold-500/20">
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold block mb-1">
              Private Client Network
            </span>
            <h3 className="font-serif text-2xl font-bold">
              {mode === 'login' && 'Welcome to AURA Estates'}
              {mode === 'signup' && 'Accredited Registration'}
              {mode === 'forgot-password' && 'Password Recovery'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {mode === 'login' && 'Sign in to access off-market trophy portfolios & private client advisory.'}
              {mode === 'signup' && 'Create your accredited portfolio to unlock confidential acquisition data.'}
              {mode === 'forgot-password' && 'Reset your private authentication credentials.'}
            </p>

            {/* Navigation Tabs (Sign In vs Sign Up) */}
            {mode !== 'forgot-password' && (
              <div className="flex border-b border-white/10 mt-5">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-wider flex-1 text-center transition-all border-b-2 ${
                    mode === 'login'
                      ? 'border-gold-400 text-gold-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`pb-2.5 text-xs font-bold uppercase tracking-wider flex-1 text-center transition-all border-b-2 ${
                    mode === 'signup'
                      ? 'border-gold-400 text-gold-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* 1. SIGN IN (LOGIN) MODE */}
            {mode === 'login' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Quick One-Click Demo Logins */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    One-Click Demo Access:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {demoPersonas.map((persona) => (
                      <button
                        key={persona.id}
                        type="button"
                        onClick={() => handleDemoLogin(persona)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-gold-500/50 bg-slate-50 dark:bg-navy-950 hover:bg-gold-50/30 dark:hover:bg-gold-500/10 transition-all text-left text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-gold-400/40"
                          />
                          <div>
                            <p className="font-bold text-navy-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-300">{persona.name}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">{persona.role}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Or with credentials</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Private Client Email
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@familyoffice.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Security Passphrase
                      </label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-[10px] text-gold-600 dark:text-gold-400 hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-950 dark:hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded accent-gold-500 text-gold-500"
                      />
                      <span className="text-[11px]">Remember me for 30 days</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2"
                  >
                    Sign In to Portal
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-gold-600 dark:text-gold-400 font-bold hover:underline"
                  >
                    Register Here
                  </button>
                </p>
              </motion.div>
            )}

            {/* 2. SIGN UP (REGISTER) MODE */}
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <form onSubmit={handleSignupSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Lord / Lady Vance"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Private Client Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@familyoffice.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Investor Profile / Accreditation *
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                    >
                      <option value="Accredited Buyer">Accredited Buyer / Private Investor</option>
                      <option value="Family Office Trustee">Family Office Trustee</option>
                      <option value="Private Estate Owner">Private Estate Owner / Seller</option>
                      <option value="Licensed Broker">Licensed Luxury Broker</option>
                    </select>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-500 dark:text-slate-400">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 rounded accent-gold-500 text-gold-500"
                      />
                      <span className="text-[11px] leading-snug">
                        I agree to the AURA Confidentiality Charter and Accredited Private Client Terms.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all mt-2"
                  >
                    Create Accredited Account
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-gold-600 dark:text-gold-400 font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </motion.div>
            )}

            {/* 3. FORGOT PASSWORD MODE */}
            {mode === 'forgot-password' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-gold-50 dark:bg-gold-500/10 border border-gold-200 dark:border-gold-500/20 text-gold-900 dark:text-gold-200 text-xs">
                  <KeyRound className="w-5 h-5 text-gold-600 dark:text-gold-400 shrink-0" />
                  <p className="leading-relaxed text-[11px]">
                    Enter your registered private email. We will generate a secure authentication verification code to restore account access.
                  </p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleRequestOtp} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        Registered Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="client@familyoffice.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      Send 6-Digit Verification Token
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        6-Digit Verification Code (Sent to {resetEmail})
                      </label>
                      <input
                        type="text"
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="849201"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-center font-mono font-bold tracking-widest text-sm text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                        New Security Passphrase
                      </label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/15 text-xs text-navy-950 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-navy-900 dark:bg-gold-500 hover:bg-navy-800 dark:hover:bg-gold-400 text-gold-300 dark:text-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      Update Passphrase & Sign In
                    </button>
                  </form>
                )}

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setOtpSent(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-navy-950 dark:hover:text-white font-semibold"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Sign In</span>
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
