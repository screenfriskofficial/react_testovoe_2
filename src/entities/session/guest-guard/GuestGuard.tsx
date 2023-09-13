import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { User as FirebaseUser } from "firebase/auth";

type GuestGuardProps = {
  currentUser: FirebaseUser | null;
  children: ReactNode;
};
export const GuestGuard = (props: GuestGuardProps) => {
  const { currentUser, children } = props;
  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};
