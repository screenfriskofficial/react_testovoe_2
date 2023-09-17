import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~app/firebase.ts";
import { create } from "zustand";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthStoreProps {
  loginError: string;
  login: (
    credentials: LoginCredentials,
    navigate: () => void,
    setLoader: (arg0: boolean) => void,
  ) => void;
}

export const userLoginStore = create<AuthStoreProps>((set) => ({
  loginError: "",
  login: async (credentials, navigate, setLoader) => {
    const { email, password } = credentials;
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate();
        setLoader(false);
      })
      .catch((e) => {
        set({ loginError: e.message });
        setLoader(false);
      });
  },
}));
