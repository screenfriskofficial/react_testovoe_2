import { create } from "zustand";

interface UserWallState {
  error: string;
  setError: (str: string) => void;
  loader: boolean;
  setLoader: (bool: boolean) => void;
}

export const useUserWallStore = create<UserWallState>((set) => ({
  error: "",
  loader: false,
  setError: (str: string) => set((state) => ({ ...state, error: str })),
  setLoader: (bool: boolean) => set((state) => ({ ...state, loader: bool })),
}));
