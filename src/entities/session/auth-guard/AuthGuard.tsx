import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { User as FirebaseUser } from "firebase/auth";

type AuthGuardProps = {
  currentUser: FirebaseUser | null;
  children: ReactNode;
};

export const AuthGuard = (props: AuthGuardProps) => {
  const { currentUser, children } = props;
  if (currentUser) {
    return <Navigate to={"/"} />;
  }
  return children;
};
