import { create } from "zustand";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "~app/firebase.ts";
import { doc, setDoc } from "firebase/firestore";

interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}

interface AuthStoreProps {
  registerError: string;
  register: (credentials: RegisterCredentials, navigate: () => void) => void;
}

export const userRegisterStore = create<AuthStoreProps>((set) => ({
  registerError: "",
  register: async (credentials, navigate) => {
    const { displayName, email, password } = credentials;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName,
        });

        setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          password,
        });
        navigate();
      })
      .catch((e) => set({ registerError: e.message }));
  },
}));
