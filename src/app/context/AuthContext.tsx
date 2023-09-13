import React, { createContext, ReactNode } from "react";
import { auth } from "~app/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

export const AuthProviderContext = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = React.useState<FirebaseUser | null>(
    null,
  );
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
