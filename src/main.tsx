import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import React from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const router = createRouter({
  routeTree,
  defaultPreload: false,
  defaultNotFoundComponent: () => <NotFoundPage />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
