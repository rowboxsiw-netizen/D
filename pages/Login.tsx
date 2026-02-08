
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="glass p-10 md:p-16 rounded-[2.5rem] max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[80px]"></div>
        
        <div className="w-20 h-20 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={40} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Please sign in with your authorized Google account to manage your portfolio and blog.
        </p>

        <button 
          onClick={handleLogin}
          className="w-full flex items-center justify-center space-x-3 bg-white text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
        >
          <LogIn size={20} />
          <span>Sign in with Google</span>
        </button>

        <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-semibold">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default Login;
