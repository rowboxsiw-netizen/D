
import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip 
} from 'recharts';
import { TECH_CATEGORIES, INITIAL_TECH_STACK, ICONS } from '../constants.tsx';

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTech = activeCategory 
    ? INITIAL_TECH_STACK.filter(t => t.category === activeCategory)
    : INITIAL_TECH_STACK;

  // Chart data Preparation
  const chartData = TECH_CATEGORIES.map(cat => ({
    category: cat,
    score: INITIAL_TECH_STACK.filter(t => t.category === cat).reduce((acc, curr) => acc + curr.proficiency, 0) / 
           (INITIAL_TECH_STACK.filter(t => t.category === cat).length || 1)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Tech <span className="text-blue-400">Stack</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          A deep dive into the languages, frameworks, and tools that I use to architect and build robust solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Radar Visualization */}
        <div className="glass p-8 rounded-[2rem] h-[500px]">
          <h3 className="text-xl font-bold mb-8 text-center">Expertise Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Radar
                name="Proficiency"
                dataKey="score"
                stroke="#60a5fa"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Categories and List */}
        <div className="space-y-8">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-white'}`}
            >
              All Skills
            </button>
            {TECH_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-600 text-white' : 'glass text-slate-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTech.map(tech => {
              const IconComp = (ICONS as any)[tech.icon] || ICONS.Code2;
              return (
                <div key={tech.name} className="glass p-4 rounded-2xl flex items-center space-x-4 group hover:border-blue-500/30 transition-all">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <IconComp size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-bold text-white">{tech.name}</span>
                      <span className="text-xs text-slate-500">{tech.proficiency}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${tech.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
