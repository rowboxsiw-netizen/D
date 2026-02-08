
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, User, Layout, BookOpen, Terminal, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Code2 size={18} /> },
    { name: 'Projects', path: '/projects', icon: <Layout size={18} /> },
    { name: 'Tech Stack', path: '/tech-stack', icon: <Terminal size={18} /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
  ];

  const activeClass = "text-blue-400 font-semibold";
  const inactiveClass = "text-slate-300 hover:text-white transition-colors";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
              <Code2 className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              IndiaAur<span className="text-blue-400">Code</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1.5 text-sm ${location.pathname === link.path ? activeClass : inactiveClass}`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            {user?.isAdmin && (
              <Link to="/admin" className="p-2 rounded-full bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all">
                <ShieldCheck size={20} />
              </Link>
            )}
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-500/25">
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
             {user?.isAdmin && (
              <Link to="/admin" className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                <ShieldCheck size={20} />
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 pointer-events-none' } glass mt-2`}>
        <div className="px-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 p-3 rounded-xl ${location.pathname === link.path ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300'}`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-blue-600 text-white p-3 rounded-xl font-bold"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
