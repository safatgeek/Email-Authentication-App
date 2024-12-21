import { create } from "zustand";
import { User, UserInfo } from '@prisma/client'

interface AuthState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (authStatus: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null, // initial state
  setIsAuthenticated: (authStatus: boolean) =>
    set({ isAuthenticated: authStatus }),
}));

type UserState = {
  user: User | null
  userInfo: UserInfo | null
  setUser: (user: User) => void
  setUserInfo: (userInfo: UserInfo) => void
  clearUser: () => void
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  userInfo: null,
  setUser: (user: User) => set({ user }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  clearUser: () => set({ user: null }),
  clearUserInfo: () => set({ userInfo: null }),
}))
