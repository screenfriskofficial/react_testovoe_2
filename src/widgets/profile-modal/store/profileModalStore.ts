import { create } from "zustand";

interface ModalState {
  open: boolean;
  loading: boolean;
  setLoading: (bool: boolean) => void;
  setOpen: (bool: boolean) => void;
}

export const useProfileModalStore = create<ModalState>((set) => ({
  open: false,
  loading: false,
  setOpen: (bool: boolean) => set((state) => ({ ...state, open: bool })),
  setLoading: (bool: boolean) => set((state) => ({ ...state, loading: bool })),
}));
