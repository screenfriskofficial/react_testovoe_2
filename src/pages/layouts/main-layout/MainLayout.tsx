import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "~widgets/navbar/ui/Navbar.tsx";
import { Container } from "@mui/material";

export const MainLayout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/login" ||
        (location.pathname === "/register" ? "" : <Navbar />)}
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};
