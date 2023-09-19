import { create } from "zustand";
import { User } from "firebase/auth";

interface AuthState {
  isLoading: boolean;
  error: string;
  user: User;
  setLoading: (bool: boolean) => void;
  setError: (str: string) => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: "",
  user: {} as User,
  setLoading: (bool: boolean) =>
    set((state) => ({ ...state, isLoading: bool })),
  setError: (str: string) => set((state) => ({ ...state, error: str })),
  setUser: (user: User) => set((state) => ({ ...state, user: user })),
}));
