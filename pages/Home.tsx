
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ChevronRight, Sparkles } from 'lucide-react';
import { firestoreService } from '../services/firebase';
import { Project } from '../types';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestoreService.getProjects().then(data => {
      setProjects(data.slice(0, 3) as Project[]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-full text-sm text-blue-400 mb-8">
            <Sparkles size={16} />
            <span>Available for new projects in 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Building Digital Experiences <br />
            <span className="gradient-text">Through Code.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
            I'm <span className="text-white font-semibold">IndiaAurCode</span>, a Full Stack Developer specializing in high-performance web applications and AI integrations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/projects" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1">
              View My Work
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10">
              More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-slate-400">Some of my most impactful contributions.</p>
          </div>
          <Link to="/projects" className="hidden sm:flex items-center text-blue-400 hover:text-blue-300 font-medium">
            View All <ChevronRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-[450px] bg-slate-800/50 rounded-2xl animate-pulse"></div>
          )) : projects.map(project => (
            <div key={project.id} className="group glass rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all transform hover:-translate-y-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-md uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6">{project.description}</p>
                <div className="flex items-center space-x-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-white text-sm font-medium hover:text-blue-400">
                      <ExternalLink size={16} className="mr-1.5" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-slate-400 text-sm font-medium hover:text-white">
                      <Github size={16} className="mr-1.5" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative glass rounded-[2rem] p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] -z-10"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's build something <br /><span className="text-blue-400">extraordinary together.</span></h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            I'm always looking for interesting projects and collaborations. If you have an idea, let's talk about how to bring it to life.
          </p>
          <Link to="/contact" className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
