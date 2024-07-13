import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}


export const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            login: () => set({ isAuthenticated: true }),
            logout: () => set({ isAuthenticated: false }),
        }),
        {
            name: 'auth', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // specify the storage type (localStorage)
        }
    )
) as any;
