import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  setLoggedIn: (state) => set({ isLoggedIn: state }),
}));
