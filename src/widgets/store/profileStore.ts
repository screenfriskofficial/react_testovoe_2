import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAuth } from "firebase/auth";

interface Cards {
  photoURL: string;
  title: string;
  author: string;
  description: string;
}

interface ProfileState {
  cards: Cards[];
  addImgToProfile: (image: Cards) => void;
}

export const useProfileStore = create<ProfileState>(
  persist(
    (set) => ({
      cards: [],
      addImgToProfile: async (card: Cards) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userUID = user.uid;
          set((state) => ({
            cards: [...state.cards, { ...card, userUID }],
          }));
        }
      },
    }),
    {
      name: "profile-storage",
    },
  ),
);
