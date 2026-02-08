
import React from 'react';
import { 
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  Cpu, 
  Wrench,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  BookOpen,
  User,
  Layout,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

export const ADMIN_EMAIL = 'rowboxsiw@gmail.com';

export const ICONS = {
  Code2, 
  Layers, 
  Terminal, 
  Database, 
  Cpu, 
  Wrench,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  BookOpen,
  User,
  Layout,
  Plus,
  Trash2,
  Edit,
  Save,
  LogOut,
  ShieldCheck,
  Search,
  Filter
};

export const TECH_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tool', 'Language'] as const;

export const INITIAL_TECH_STACK = [
  { name: 'React', icon: 'Code2', category: 'Frontend', proficiency: 95 },
  { name: 'TypeScript', icon: 'Code2', category: 'Language', proficiency: 90 },
  { name: 'Next.js', icon: 'Layers', category: 'Frontend', proficiency: 92 },
  { name: 'Node.js', icon: 'Terminal', category: 'Backend', proficiency: 88 },
  { name: 'Firebase', icon: 'Database', category: 'Database', proficiency: 85 },
  { name: 'Tailwind CSS', icon: 'Layout', category: 'Frontend', proficiency: 98 },
  { name: 'Docker', icon: 'Cpu', category: 'DevOps', proficiency: 75 },
  { name: 'Git', icon: 'Wrench', category: 'Tool', proficiency: 90 },
];
