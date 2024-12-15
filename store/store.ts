import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (authStatus: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null, // initial state
  setIsAuthenticated: (authStatus: boolean) =>
    set({ isAuthenticated: authStatus }),
}));