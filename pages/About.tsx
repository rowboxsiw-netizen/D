
import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Award, 
  MapPin, 
  Globe, 
  Download 
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Bio & Personal */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Engineering <br /><span className="text-blue-400">Digital Progress.</span></h1>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Hello! I'm <span className="text-white font-semibold">IndiaAurCode</span>, a passionate software engineer based in Bangalore. My journey in technology began over 7 years ago, driven by a relentless curiosity about how digital systems operate and a desire to build things that matter.
              </p>
              <p>
                I specialize in building full-stack applications that are not just functional, but high-performance and accessible. My core philosophy centers on <span className="text-blue-400">"Simplicity through engineering"</span>—taking complex requirements and distilling them into elegant, maintainable codebases.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects, writing technical deep-dives on my blog, or exploring the latest breakthroughs in Generative AI.
              </p>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="space-y-12 pt-8">
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <Briefcase size={24} className="mr-3 text-blue-400" />
                Work Experience
              </h2>
              <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                {[
                  {
                    role: 'Senior Software Engineer',
                    company: 'TechFlow Systems',
                    period: '2022 - Present',
                    desc: 'Leading a team of 5 developers to build a real-time analytics platform serving 1M+ active users.'
                  },
                  {
                    role: 'Full Stack Developer',
                    company: 'Creative Labs',
                    period: '2019 - 2022',
                    desc: 'Developed and launched multiple SaaS products using Next.js, GraphQL, and AWS.'
                  }
                ].map((job, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    </div>
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <p className="text-blue-400 text-sm font-medium mb-2">{job.company} &bull; {job.period}</p>
                    <p className="text-slate-400">{job.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
               <h2 className="text-2xl font-bold mb-8 flex items-center">
                <GraduationCap size={24} className="mr-3 text-blue-400" />
                Education
              </h2>
              <div className="glass p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">B.Tech in Computer Science</h3>
                  <p className="text-slate-400">Indian Institute of Technology &bull; 2015 - 2019</p>
                </div>
                <div className="hidden sm:block text-slate-500">
                  GPA: 9.4/10
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right: Profile Card & Quick Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass p-10 rounded-[2.5rem] sticky top-32">
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/profile/400/400" 
                alt="Profile" 
                className="relative w-full h-full rounded-3xl object-cover border-4 border-slate-800"
              />
            </div>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-1">IndiaAurCode</h2>
              <p className="text-blue-400 font-medium">Software Architect</p>
              <div className="flex items-center justify-center space-x-4 mt-4 text-slate-400 text-sm">
                <span className="flex items-center"><MapPin size={14} className="mr-1" /> Bangalore, IN</span>
                <span className="flex items-center"><Globe size={14} className="mr-1" /> Remote Work</span>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center space-x-2">
                <Download size={18} />
                <span>Download CV</span>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl text-center">
                  <h4 className="text-2xl font-bold text-white">7+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Years Exp</p>
                </div>
                <div className="glass p-4 rounded-xl text-center">
                  <h4 className="text-2xl font-bold text-white">40+</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Projects</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">I Love</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {['Hiking', 'Coffee', 'Open Source', 'Photography', 'Sci-Fi'].map(h => (
                  <span key={h} className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium text-slate-300">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
