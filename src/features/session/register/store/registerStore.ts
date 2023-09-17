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
  register: (
    credentials: RegisterCredentials,
    navigate: () => void,
    setLoader: (arg0: boolean) => void,
  ) => void;
}

export const userRegisterStore = create<AuthStoreProps>((set) => ({
  registerError: "",
  register: async (credentials, navigate, setLoader) => {
    const { displayName, email, password } = credentials;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, {
          displayName,
          photoURL: "",
        });

        setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          followers: 0,
        });
        navigate();
        setLoader(false);
      })
      .catch((e) => {
        set({ registerError: e.message });
        setLoader(false);
      });
  },
}));
