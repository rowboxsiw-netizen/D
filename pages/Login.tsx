
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate('/admin');
      } else {
        setAccessDenied(true);
        // We log them out automatically if they aren't an admin to keep the state clean
        setTimeout(() => {
          logout();
        }, 3000);
      }
    }
  }, [user, navigate, logout]);

  const handleLogin = async () => {
    setAccessDenied(false);
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-slate-950">
      <div className="glass p-10 md:p-16 rounded-[2.5rem] max-w-md w-full text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px]"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px]"></div>
        
        <div className="w-20 h-20 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 relative">
          <ShieldCheck size={40} />
          {isLoggingIn && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-2xl">
              <Loader2 className="animate-spin text-blue-400" size={32} />
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Please sign in with your authorized Google account (<span className="text-blue-400">rowboxsiw@gmail.com</span>) to access the dashboard.
        </p>

        {accessDenied && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center space-x-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-left">Access Denied: This account is not authorized to access the admin panel.</p>
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full flex items-center justify-center space-x-3 bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-white/5"
        >
          {isLoggingIn ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <LogIn size={20} />
          )}
          <span>{isLoggingIn ? 'Authenticating...' : 'Sign in with Google'}</span>
        </button>

        <div className="mt-10 pt-8 border-t border-slate-800">
           <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            IndiaAurCode Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
