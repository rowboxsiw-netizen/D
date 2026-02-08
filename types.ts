
export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  publishedAt: number;
  slug: string;
}

export interface TechItem {
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tool' | 'Language';
  proficiency: number; // 1-100
}

export interface SiteSettings {
  heroTitle: string;
  heroBio: string;
  avatarUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}
