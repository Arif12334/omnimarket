import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Sparkles,
  KeyRound,
  Smartphone,
  Info,
  Check
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    loginWithEmail, 
    loginWithOAuth, 
    loginWithGoogle,
    signup, 
    loginWithPhone,
    showToast
  } = useApp();

  // Mode: login, signup, forgot_password, google_chooser, phone_otp
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'google_chooser' | 'phone'>('login');
  
  // Normal Email Fields
  const [email, setEmail] = useState('arifogunsheye2@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPass, setSignupConfirmPass] = useState('');
  const [showSignupPass, setShowSignupPass] = useState(false);

  // Phone Login Fields
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  // Google Chooser Custom Email
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [showCustomGoogleInput, setShowCustomGoogleInput] = useState(false);

  // Loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSentEmail, setResetSentEmail] = useState('');

  if (activeModal !== 'auth') return null;

  // Preset Google Accounts for realistic 1-click Google sign in
  const googleAccounts = [
    {
      name: 'Arif Ogunsheye',
      email: 'arifogunsheye2@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      badge: 'Current User • 1-Click Sign In',
      isPrimary: true
    },
    {
      name: 'Alex Morgan',
      email: 'alex.morgan.work@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      badge: 'Personal Google Account',
      isPrimary: false
    },
    {
      name: 'Dev Shopper',
      email: 'dev.shopper@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      badge: 'Google Workspace',
      isPrimary: false
    }
  ];

  // Quick fill helper for testing
  const handleQuickFill = (type: 'arif' | 'alex') => {
    if (type === 'arif') {
      setEmail('arifogunsheye2@gmail.com');
      setPassword('securePass2026!');
    } else {
      setEmail('alex.morgan@omnimarket.io');
      setPassword('password123');
    }
    setErrorMessage('');
  };

  // Normal Email Login Submit
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithEmail(email.trim(), password);
    } catch {
      setErrorMessage('Sign in failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Normal Email Signup Submit
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!signupName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPass) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      await signup(signupName.trim(), signupEmail.trim(), signupPhone.trim(), signupPassword);
    } catch {
      setErrorMessage('Account creation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Trigger
  const handleGooglePrimaryClick = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch {
      await loginWithOAuth('google', googleAccounts[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSelect = async (account: { name: string; email: string; avatar: string }) => {
    setIsLoading(true);
    try {
      await loginWithOAuth('google', account);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomGoogleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail.trim() || !customGoogleEmail.includes('@')) {
      setErrorMessage('Please enter a valid Google email address.');
      return;
    }
    const name = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    setIsLoading(true);
    try {
      await loginWithOAuth('google', {
        name,
        email: customGoogleEmail.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Phone SMS Submit
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!codeSent) {
      if (!phone.trim()) {
        setErrorMessage('Please enter a valid phone number.');
        return;
      }
      setCodeSent(true);
      showToast('SMS Code Sent', `Enter the 6-digit code sent to ${phone}`, 'info');
      return;
    }

    if (verificationCode.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithPhone(phone, verificationCode);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setResetSentEmail(email);
    showToast('Password Reset Link Sent', `Instructions sent to ${email}`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto">
        
        {/* Header with Branding & Close */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-amber-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
              OM
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-slate-900 text-sm tracking-tight font-heading">
                  Omni<span className="text-amber-500">Prime</span>
                </span>
                <span className="text-[10px] bg-slate-900 text-amber-300 font-bold px-1.5 py-0.2 rounded">
                  Auth
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {authMode === 'login' && 'Sign in to access your account & Prime benefits'}
                {authMode === 'signup' && 'Create your new customer account'}
                {authMode === 'google_chooser' && 'Choose a Google Account to sign in'}
                {authMode === 'phone' && 'Sign in with Mobile SMS verification'}
                {authMode === 'forgot' && 'Reset your account password'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            id="close-auth-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 animate-in fade-in">
              <Info className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: GOOGLE ACCOUNT CHOOSER POPUP / SELECTOR */}
          {/* ========================================================= */}
          {authMode === 'google_chooser' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-center pb-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm mb-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Choose an account</h4>
                <p className="text-xs text-slate-500">to continue to OmniPrime Marketplace</p>
              </div>

              {/* List of Accounts */}
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 shadow-2xs">
                {googleAccounts.map((acc, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleGoogleSelect(acc)}
                    disabled={isLoading}
                    className="w-full p-3.5 flex items-center gap-3.5 hover:bg-white transition-colors text-left group cursor-pointer"
                  >
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-indigo-500 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{acc.name}</p>
                        {acc.isPrimary && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                      <span className="text-[10px] text-indigo-600 font-medium block">{acc.badge}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Use Another Google Account Toggle */}
              {!showCustomGoogleInput ? (
                <button
                  type="button"
                  onClick={() => setShowCustomGoogleInput(true)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-xl border border-dashed border-indigo-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Use another Google account</span>
                </button>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                  <span className="text-xs font-bold text-slate-800 block">Custom Google Account</span>
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="your.google.account@gmail.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    required
                  />
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="Display Name (optional)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Sign in with this Google Account</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← Back to standard Sign In
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: NORMAL SIGN IN (GOOGLE 1-CLICK + EMAIL/PASSWORD) */}
          {/* ========================================================= */}
          {authMode === 'login' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* PRIMARY: Official Standard 'Sign in with Google' button */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleGooglePrimaryClick}
                  disabled={isLoading}
                  id="google-sign-in-primary-btn"
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs sm:text-sm rounded-xl shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer group"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* 1-Click Fast Google Continue with Profile Preview */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect(googleAccounts[0])}
                  disabled={isLoading}
                  id="google-quick-continue-btn"
                  className="w-full p-2.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 hover:from-blue-100/90 hover:to-indigo-100/90 border border-blue-200/80 hover:border-blue-300 text-slate-900 rounded-xl flex items-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-2xs group"
                >
                  <img
                    src={googleAccounts[0].avatar}
                    alt={googleAccounts[0].name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40 shrink-0"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900 truncate">
                        Continue as {googleAccounts[0].name}
                      </span>
                      <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                        Google
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 truncate">{googleAccounts[0].email}</p>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-2xs text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Switch Google Account Button */}
                <button
                  type="button"
                  onClick={() => setAuthMode('google_chooser')}
                  id="google-sign-in-btn"
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Choose another Google Account</span>
                </button>

                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-slate-200 w-full" />
                  <span className="bg-white px-3 text-[10px] uppercase font-extrabold tracking-wider text-slate-400 absolute">
                    or sign in with password
                  </span>
                </div>
              </div>

              {/* Normal Email Form */}
              <form onSubmit={handleEmailLogin} className="space-y-3.5">
                
                {/* Email input */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 pl-9 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      required
                      id="auth-email-input"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Password input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-amber-600 hover:text-amber-700 hover:underline font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 pl-9 pr-9 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                      required
                      id="auth-password-input"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me checkbox & Phone SMS */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer text-[11px]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                    />
                    <span>Keep me signed in</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setAuthMode('phone')}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Use Phone SMS</span>
                  </button>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  id="email-signin-submit-btn"
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <span>Signing in...</span>
                  ) : (
                    <>
                      <span>Sign In with Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Fill Testing bar */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-semibold text-slate-400">Quick Test:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('arif')}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[10px]"
                  >
                    Arif Ogunsheye
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('alex')}
                    className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium text-[10px]"
                  >
                    Alex Morgan
                  </button>
                </div>
              </div>

              {/* Switch to Signup */}
              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
                <p>
                  New to OmniMarket?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage('');
                    }}
                    id="switch-to-signup-btn"
                    className="font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Create your account
                  </button>
                </p>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: CREATE ACCOUNT (SIGN UP) */}
          {/* ========================================================= */}
          {authMode === 'signup' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Google Fast Signup Alternative */}
              <button
                type="button"
                onClick={() => setAuthMode('google_chooser')}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>Fast 1-Click Sign Up with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 absolute">
                  or register with email
                </span>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3">
                
                {/* Full Name */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Your Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="First and last name"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Mobile Phone (optional) */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Mobile Phone <span className="text-slate-400 font-normal">(for delivery SMS updates)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showSignupPass ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 pr-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowSignupPass(!showSignupPass)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showSignupPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Re-enter Password</label>
                  <div className="relative">
                    <input
                      type={showSignupPass ? 'text' : 'password'}
                      value={signupConfirmPass}
                      onChange={(e) => setSignupConfirmPass(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Prime trial perks badge */}
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2 text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] text-amber-900 font-medium leading-tight">
                    Includes automatic <strong>30-day Free Prime Trial</strong> with 1-Day shipping!
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
                >
                  <span>{isLoading ? 'Creating Account...' : 'Create your OmniPrime Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Switch to Login */}
              <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage('');
                    }}
                    className="font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: FORGOT PASSWORD */}
          {/* ========================================================= */}
          {authMode === 'forgot' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="text-center pb-1">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Password Assistance</h4>
                <p className="text-xs text-slate-500">
                  Enter the email address associated with your OmniMarket account.
                </p>
              </div>

              {resetSentEmail ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">Check Your Inbox</p>
                  <p className="text-[11px] text-emerald-700">
                    We sent a password reset link to <strong>{resetSentEmail}</strong>. Follow the instructions in the email to set a new password.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setResetSentEmail('');
                    }}
                    className="mt-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                        required
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Send Password Reset Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors block text-center"
                  >
                    ← Back to Sign In
                  </button>
                </form>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 5: PHONE / SMS 2FA SIGN IN */}
          {/* ========================================================= */}
          {authMode === 'phone' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="text-center pb-1">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 mb-2">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Mobile Phone Verification</h4>
                <p className="text-xs text-slate-500">
                  {!codeSent ? 'We will send a one-time passcode to your mobile phone' : `Enter the 6-digit code sent to ${phone}`}
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-8901"
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3 py-2.5 pl-9 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {codeSent && (
                  <div className="animate-in fade-in">
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">6-Digit SMS Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="849201"
                      className="w-full bg-white border-2 border-indigo-600 rounded-xl px-3 py-2 text-center text-sm font-mono tracking-widest font-bold text-indigo-600"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>{!codeSent ? 'Send SMS Code' : 'Verify & Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors block text-center"
                >
                  ← Back to Email Sign In
                </button>
              </form>

            </div>
          )}

        </div>

        {/* Modal Footer / Security Guarantee */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Identity & 256-Bit SSL Protection</span>
          </div>
          <span>Terms & Privacy</span>
        </div>

      </div>
    </div>
  );
};
