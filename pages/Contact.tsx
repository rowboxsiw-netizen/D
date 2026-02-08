
import React, { useState } from 'react';
import { Send, Mail, MapPin, Linkedin, Github, Twitter, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    setTimeout(() => setStatus('success'), 2000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="glass p-12 rounded-[2.5rem] text-center max-w-lg mx-auto transform animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you for reaching out. I've received your message and will get back to you within 24 hours.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's start a <br /><span className="text-blue-400">conversation.</span></h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Whether you have a specific project in mind, a job opportunity, or just want to say hello, I'm all ears.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Me</p>
                <p className="text-lg font-medium text-white">indiaaurcode@example.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 glass flex items-center justify-center rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="text-lg font-medium text-white">Bangalore, India</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {[Github, Linkedin, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" className="w-12 h-12 glass flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:border-blue-500 transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="glass p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Subject</label>
              <input 
                required
                type="text" 
                placeholder="Project Inquiry"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
              <textarea 
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white resize-none"
              ></textarea>
            </div>

            <button 
              disabled={status === 'sending'}
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
            >
              {status === 'sending' ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
