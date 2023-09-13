import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Loadable } from "~shared/ui/loadable";
import { MainLayout } from "~pages//layouts";
import { AuthGuard } from "~entities/session";
import { GuestGuard } from "~entities/session";
import { AuthContext } from "~features/session";

const HomePage = Loadable(lazy(() => import("~pages/home-page")));
const ProfilePage = Loadable(lazy(() => import("~pages/profile-page")));
const UploadPage = Loadable(lazy(() => import("~pages/upload-page")));
const LoginPage = Loadable(lazy(() => import("~pages/login-page")));
const RegisterPage = Loadable(lazy(() => import("~pages/register-page")));
const NotFoundPage = Loadable(lazy(() => import("~pages/not-found-page")));

export function Router() {
  const { currentUser } = React.useContext(AuthContext);
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <GuestGuard currentUser={currentUser}>
              <HomePage />
            </GuestGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <GuestGuard currentUser={currentUser}>
              <ProfilePage />
            </GuestGuard>
          ),
        },
        {
          path: "/upload",
          element: (
            <GuestGuard currentUser={currentUser}>
              <UploadPage />
            </GuestGuard>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthGuard currentUser={currentUser}>
              <LoginPage />
            </AuthGuard>
          ),
        },
        {
          path: "/register",
          element: (
            <AuthGuard currentUser={currentUser}>
              <RegisterPage />
            </AuthGuard>
          ),
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
}
