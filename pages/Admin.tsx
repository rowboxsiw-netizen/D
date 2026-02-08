
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { 
  Plus, Trash2, Edit, Save, LogOut, ShieldCheck, 
  Layout, BookOpen, Terminal, Settings, X 
} from 'lucide-react';
import { firestoreService } from '../services/firebase';
import { Project, BlogPost } from '../types';

const Admin: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'settings'>('projects');
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.isAdmin) {
      if (activeTab === 'projects') firestoreService.getProjects().then(setItems);
      if (activeTab === 'blog') firestoreService.getBlogs().then(setItems);
    }
  }, [user, activeTab]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Verifying credentials...</div>;
  if (!user?.isAdmin) return <Navigate to="/" />;

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-10 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-500">
              <img src={user.photoURL || ''} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                Admin Control Center
                <ShieldCheck size={20} className="ml-2 text-blue-400" />
              </h1>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center space-x-2 px-6 py-2 bg-slate-800 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all border border-slate-700"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold capitalize">{activeTab} List</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all"
              >
                <Plus size={20} />
                <span>New {activeTab === 'projects' ? 'Project' : 'Post'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="glass p-6 rounded-2xl flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <img src={item.thumbnail || item.coverImage} alt="" className="w-20 h-20 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm line-clamp-1">{item.description || item.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 bg-slate-800 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                      <Edit size={18} />
                    </button>
                    <button className="p-3 bg-slate-800 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Mock Modal for Adding Content */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditing(false)}></div>
          <div className="relative glass w-full max-w-2xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-8">Add New {activeTab === 'projects' ? 'Project' : 'Post'}</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Title</label>
                <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Description</label>
                <textarea rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Image URL</label>
                  <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Link URL</label>
                  <input className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-2">
                <Save size={18} />
                <span>Save Entry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
