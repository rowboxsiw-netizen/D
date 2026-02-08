
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, ShieldCheck, AlertCircle, Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants.tsx';

const Login: React.FC = () => {
  const { user, login, loading, logout } = useAuth();
  const navigate = useNavigate();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Check if the user's email is the authorized admin email
      if (user.email === ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        setErrorMsg(`Access Denied: ${user.email} is not authorized.`);
        // Immediately log out unauthorized users
        const timer = setTimeout(() => {
          logout();
          setErrorMsg(null);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, navigate, logout]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoggingIn(true);
    
    try {
      await login(email, password);
      // Logic inside useEffect handles the redirect if email matches
    } catch (error: any) {
      console.error("Login failed", error);
      // Handle Firebase specific authentication errors
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMsg('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMsg('Too many failed attempts. Please try again later.');
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-slate-950">
      <div className="glass p-10 md:p-14 rounded-[2.5rem] max-w-md w-full relative overflow-hidden border border-white/5">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px]"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-slate-400 text-sm">
            Please enter your credentials to manage IndiaAurCode
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center space-x-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-left font-medium">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rowboxsiw@gmail.com"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-4 flex items-center justify-center space-x-3 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
          >
            {isLoggingIn ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <LogIn size={20} />
            )}
            <span>{isLoggingIn ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-800 text-center">
           <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
            IndiaAurCode Security Protocol v2.2
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
