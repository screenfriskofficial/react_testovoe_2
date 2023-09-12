import { Navigate } from "react-router-dom";

const currentUser = false;
export const AuthGuard = ({ children }: any) => {
  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }
  return children;
};
