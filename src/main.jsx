import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}> 
          </RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </StrictMode>
);
