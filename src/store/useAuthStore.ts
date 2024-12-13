import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { loginUser, logoutUser } from '../services/firebase/auth';

interface AuthStore {
  isAdmin: boolean;
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  userLogin: (email: string, password: string) => Promise<boolean>;
  setCurrentUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAdmin: false,
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      login: async (username: string, password: string) => {
        const isValid = username === 'admin' && password === 'admin123';
        if (isValid) {
          set({ isAdmin: true, currentUser: null });
        }
        return isValid;
      },
      logout: async () => {
        await logoutUser();
        set({ isAdmin: false, currentUser: null });
      },
      userLogin: async (email: string, password: string) => {
        try {
          const firebaseUser = await loginUser(email, password);
          if (firebaseUser) {
            const user: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              role: 'user',
              active: true,
              password: '' // We don't store passwords
            };
            set({ currentUser: user, isAdmin: false });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
    }),
    {
      name: 'trackit-auth',
    }
  )
);