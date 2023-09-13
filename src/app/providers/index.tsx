import { Router } from "./RouterProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { AuthProviderContext } from "~features/session";

export function Provider() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f37c9",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AuthProviderContext>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProviderContext>
    </ThemeProvider>
  );
}
