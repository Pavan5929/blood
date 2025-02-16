// src/hooks/useAuth.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuth = create(
  persist(
    (set) => ({
      userData: null,
      login: (data) => set({ userData: data }),
      logout: () => set({ userData: null }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
    }
  )
);

export { useAuth };