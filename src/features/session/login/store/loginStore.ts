import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~app/firebase.ts";
import { create } from "zustand";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthStoreProps {
  loginError: string;
  login: (credentials: LoginCredentials, navigate: () => void) => void;
}

export const userLoginStore = create<AuthStoreProps>((set) => ({
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
}));
