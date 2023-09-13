import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "~widgets/navbar/Navbar.tsx";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <div className={"container"}>
      {location.pathname === "/login" ||
        (location.pathname === "/register" ? "" : <Navbar />)}
      <Outlet />
    </div>
  );
};
