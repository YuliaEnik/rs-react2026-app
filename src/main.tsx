import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import React from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { ThemeProvider } from "./themeContext/ThemeProvider";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({
  routeTree,
  defaultPreload: false,
  defaultNotFoundComponent: () => <NotFoundPage />,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
