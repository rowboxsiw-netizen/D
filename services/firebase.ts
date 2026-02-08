
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, where, limit } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// NOTE: These would typically be process.env.VITE_FIREBASE_* in a real project
const firebaseConfig = {
  apiKey: "AIzaSyDummyKey_123456789",
  authDomain: "indiaaurcode.firebaseapp.com",
  projectId: "indiaaurcode",
  storageBucket: "indiaaurcode.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Mocking some database helpers for visual demo if Firebase isn't fully set up
export const firestoreService = {
  getProjects: async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.warn("Firestore error, returning dummy data", e);
      return [
        {
          id: '1',
          title: 'IndiaAurCode Portfolio',
          description: 'A high-performance portfolio site built with React, Tailwind, and Firebase.',
          thumbnail: 'https://picsum.photos/seed/port/800/600',
          tags: ['React', 'Firebase', 'Tailwind'],
          githubUrl: '#',
          liveUrl: '#',
          featured: true,
          createdAt: Date.now()
        },
        {
          id: '2',
          title: 'DevNexus SaaS',
          description: 'Collaborative platform for developers to share snippets and resources.',
          thumbnail: 'https://picsum.photos/seed/nexus/800/600',
          tags: ['Next.js', 'PostgreSQL', 'Prisma'],
          githubUrl: '#',
          liveUrl: '#',
          featured: true,
          createdAt: Date.now() - 100000
        }
      ];
    }
  },
  
  getBlogs: async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('publishedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      return [
        {
          id: 'b1',
          title: 'Mastering React 18 Concurrent Rendering',
          excerpt: 'Dive deep into transitions, deferred values, and the new root API.',
          content: 'Full content here...',
          coverImage: 'https://picsum.photos/seed/react/800/400',
          tags: ['React', 'Frontend'],
          publishedAt: Date.now(),
          slug: 'mastering-react-18'
        }
      ];
    }
  }
};
