import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { Loadable } from "~shared/ui/loadable";
import { MainLayout } from "~pages//layouts";
import { AuthGuard } from "~widgets/auth-guard/AuthGuard.tsx";

const HomePage = Loadable(lazy(() => import("~pages/home-page")));
const ProfilePage = Loadable(lazy(() => import("~pages/profile-page")));
const UploadPage = Loadable(lazy(() => import("~pages/upload-page")));
const LoginPage = Loadable(lazy(() => import("~pages/login-page")));
const RegisterPage = Loadable(lazy(() => import("~pages/register-page")));
const NotFoundPage = Loadable(lazy(() => import("~pages/not-found-page")));

export function Router() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          ),
        },
        {
          path: "/upload",
          element: (
            <AuthGuard>
              <UploadPage />
            </AuthGuard>
          ),
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
}
