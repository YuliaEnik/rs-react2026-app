import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "../routeTree.gen";
import { ThemeProvider } from "../themeContext/ThemeProvider";

function renderRouterWithUrl(initialUrl: string) {
  const testHistory = createMemoryHistory({
    initialEntries: [initialUrl],
  });

  const router = createRouter({
    routeTree,
    history: testHistory,
  });

  return {
    router,
    ...render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>,
    ),
  };
}

describe("Routing & Search Params Validation", () => {
  it("should redirect from '/' to '/catalog?page=1'", async () => {
    const { router } = renderRouterWithUrl("/");

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/catalog");
      expect(router.state.location.search).toEqual({ page: 1 });
    });
  });

  it("should render NotFoundPage or Error когда параметры страницы невалидны", async () => {
    renderRouterWithUrl("/catalog?page=1рррррр");

    const errorHeading = await screen.findByRole("heading", {
      level: 1,
      name: "404",
    });
    const errorMessage = screen.getByText(/page not found/i);

    expect(errorHeading).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
