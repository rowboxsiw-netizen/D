
import React, { useState, useEffect } from 'react';
import { Search, Filter, Github, ExternalLink } from 'lucide-react';
import { firestoreService } from '../services/firebase';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    firestoreService.getProjects().then(data => {
      setProjects(data as Project[]);
      setFiltered(data as Project[]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = projects;
    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeTag) {
      result = result.filter(p => p.tags.includes(activeTag));
    }
    setFiltered(result);
  }, [searchTerm, activeTag, projects]);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags)));

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">My <span className="text-blue-400">Work</span></h1>
        <p className="text-slate-400 max-w-2xl text-lg">
          A collection of projects ranging from enterprise solutions to experimental prototypes.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            type="text" 
            placeholder="Search projects by name or technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button 
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!activeTag ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-white'}`}
          >
            All Tags
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTag === tag ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-white'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-80 bg-slate-900 rounded-3xl animate-pulse"></div>)}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filtered.map(project => (
            <div key={project.id} className="group glass rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-lg border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center space-x-6">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors">
                    <ExternalLink size={18} className="mr-2" />
                    Visit Live
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center text-slate-400 font-bold hover:text-white transition-colors">
                    <Github size={18} className="mr-2" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-xl">No projects match your search criteria.</p>
          <button onClick={() => {setSearchTerm(''); setActiveTag(null);}} className="mt-4 text-blue-400 hover:underline">Clear all filters</button>
        </div>
      )}
    </div>
  );
};

export default Projects;
