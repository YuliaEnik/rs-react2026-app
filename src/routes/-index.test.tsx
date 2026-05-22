import { render, screen } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "../routeTree.gen";
import { ThemeProvider } from "../context/ThemeProvider";

function renderRouterWithUrl(initialUrl: string) {
  const testHistory = createMemoryHistory({
    initialEntries: [initialUrl],
  });

  const router = createRouter({
    routeTree,
    history: testHistory,
  });

  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
}

describe("Home Route Search Params Validation", () => {
  it("should render HomePage when valid search parameters are provided", async () => {
    renderRouterWithUrl("/?page=2");

    const homePageElement = await screen.findByText(/home/i);
    expect(homePageElement).toBeInTheDocument();
  });

  it("should render NotFoundPage when invalid search parameters trigger errorComponent", async () => {
    renderRouterWithUrl("/?page=1рррррр");
    const errorHeading = await screen.findByRole("heading", {
      level: 1,
      name: "404",
    });
    const errorMessage = screen.getByText(/page not found/i);

    expect(errorHeading).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
