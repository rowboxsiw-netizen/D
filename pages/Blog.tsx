
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { firestoreService } from '../services/firebase';
import { BlogPost } from '../types';

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestoreService.getBlogs().then(data => {
      setBlogs(data as BlogPost[]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Thoughts & <span className="text-blue-400">Tutorials</span></h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Sharing my journey through software engineering, cloud architecture, and modern development patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          {loading ? (
             Array(3).fill(0).map((_, i) => <div key={i} className="h-64 bg-slate-900 rounded-3xl animate-pulse"></div>)
          ) : blogs.map(post => (
            <article key={post.id} className="group glass rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row h-full transition-all hover:border-blue-500/20">
              <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="md:w-2/3 p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500 mb-4 uppercase tracking-widest">
                  <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center"><Clock size={14} className="mr-1.5" /> 8 min read</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                <p className="text-slate-400 mb-6 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center space-x-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-lg uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <BookOpen size={20} className="mr-2 text-blue-400" />
              Newsletter
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Get the latest tutorials and tech insights delivered straight to your inbox. No spam, ever.
            </p>
            <div className="space-y-3">
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                Subscribe
              </button>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Firebase', 'TypeScript', 'Tailwind', 'Architecture', 'AI'].map(tag => (
                <button key={tag} className="px-3 py-1.5 glass rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
