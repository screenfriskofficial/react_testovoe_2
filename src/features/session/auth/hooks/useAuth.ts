import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "~app/firebase.ts";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "~features/session";

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps {
  email: string;
  password: string;
  displayName: string;
}

export const useAuth = () => {
  const { setLoading, setError, setUser, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const signUp = async (values: signUpProps) => {
    const { email, password, displayName } = values;
    setLoading(true);
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
        });
        setUser(res.user);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const result = error as Error;
        setError(result.message);
      })
      .finally(() => setLoading(false));
  };
  const signIn = async (values: signInProps) => {
    const { email, password } = values;
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const result = error as Error;
        setError(result.message);
      })
      .finally(() => setLoading(false));
  };
  const logout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({} as User);
        navigate("/login");
      })
      .catch((error) => {
        const result = error as Error;
        setError(result.message);
      })
      .finally(() => setLoading(false));
  };

  return {
    signUp,
    signIn,
    logout,
    isLoading,
    error,
  };
};
