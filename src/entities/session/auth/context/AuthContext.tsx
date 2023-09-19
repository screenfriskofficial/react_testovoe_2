import React, { createContext, ReactNode } from "react";
import { auth } from "~app/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { useAuthStore } from "~features/session";
import { useNavigate } from "react-router-dom";
import { Spinner } from "~shared/ui/spinner";

export interface AuthContextType {
  isLoading: boolean;
  user: User;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  user: {} as User,
});

export const AuthProviderContext = ({ children }: { children: ReactNode }) => {
  const [initialLoader, setInitialLoader] = React.useState<boolean>(false);
  const { user, isLoading, setUser, setLoading } = useAuthStore();
  const navigate = useNavigate();

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
    }),
    [user, isLoading],
  );

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/");
      } else {
        setLoading(true);
        setUser({} as User);
        navigate("/login");
      }
      setInitialLoader(false);
      setLoading(false);
    });
  }, [setUser, setLoading]);
  return (
    <AuthContext.Provider value={value}>
      {initialLoader ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};
