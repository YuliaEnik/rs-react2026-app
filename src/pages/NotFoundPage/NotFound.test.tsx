import { render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "../../routeTree.gen";
import NotFoundPage from "./NotFoundPage";
import { ThemeProvider } from "../../context/ThemeProvider";

function renderRouterWithUrl(initialUrl: string) {
  const testHistory = createMemoryHistory({
    initialEntries: [initialUrl],
  });

  const router = createRouter({
    routeTree,
    history: testHistory,
    defaultNotFoundComponent: () => <NotFoundPage />,
  });

  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

describe("Feature 4: 404 Not Found Page Tests", () => {
  it("should display the 404 page for unknown routes", async () => {
    renderRouterWithUrl("/some-non-existent-route");

    const pageContainer = await screen.findByText("404");
    expect(pageContainer).toBeInTheDocument();
  });

  it("should clearly state that the page was not found", async () => {
    renderRouterWithUrl("/broken-link-123");

    const mainHeader = await screen.findByRole("heading", {
      level: 1,
      name: "404",
    });
    const subHeader = screen.getByRole("heading", {
      level: 2,
      name: /page not found/i,
    });

    expect(mainHeader).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
  });

  it("should provide a navigation link to return to the main application", async () => {
    renderRouterWithUrl("/invalid-path");

    const homeLink = await screen.findByRole("link", { name: /back to home/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
