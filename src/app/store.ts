import { create } from "zustand";
import { auth, db } from "~app/firebase.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthStoreProps {
  loginError: string;
  login: (credentials: LoginCredentials, navigate: () => void) => void;
  register: (credentials: RegisterCredentials, navigate: () => void) => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  loginError: "",
  login: async (credentials, navigate) => {
    const { email, password } = credentials;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate();
      })
      .catch((e) => {
        set({ loginError: e.message });
      });
  },
  register: async (credentials, navigate) => {
    const { username, email, password } = credentials;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        password,
      });
      navigate();
    } catch (error) {
      console.error(error);
    }
  },
}));
