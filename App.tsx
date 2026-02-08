
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './hooks/useAuth';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 selection:text-blue-200">
          <Navbar />
          <main>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/tech-stack" element={<TechStack />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="py-20 border-t border-slate-900 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-xs">IAC</span>
                </div>
                <span className="text-xl font-bold">IndiaAur<span className="text-blue-400">Code</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">
                Crafting digital excellence through advanced engineering and creative design.
              </p>
              <div className="text-sm text-slate-600">
                &copy; {new Date().getFullYear()} IndiaAurCode. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
