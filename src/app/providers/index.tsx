import { Router } from "./RouterProvider.tsx";
import { BrowserRouter } from "react-router-dom";

export function Provider() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
