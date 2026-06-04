import { render, screen, fireEvent } from "@testing-library/react";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TEXT } from "../../constants/text";
import { type ThemeKey, ThemeContext } from "../../themeContext/ThemeContext";
import { queryClient } from "../../queryClient";
import Navigation from "./Navigate";

const testQueryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

vi.spyOn(queryClient, "invalidateQueries").mockImplementation(async () => {});

const rootRoute = createRootRoute({
  component: () => <Navigation />,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
});
const routeTree = rootRoute.addChildren([catalogRoute, aboutRoute]);

async function renderNavigation(
  themeValue: ThemeKey = "light",
  toggleThemeMock = vi.fn(),
) {
  const testHistory = createMemoryHistory({ initialEntries: ["/catalog"] });
  const router = createRouter({ routeTree, history: testHistory });
  await router.load();

  return render(
    <QueryClientProvider client={testQueryClient}>
      <ThemeContext.Provider
        value={{ theme: themeValue, toggleTheme: toggleThemeMock }}
      >
        <RouterProvider router={router} defaultComponent={Navigation} />
      </ThemeContext.Provider>
    </QueryClientProvider>,
  );
}

describe("Navigation Component", () => {
  it("should render navigation links with correct text", async () => {
    await renderNavigation();

    const homeLink = screen.getByText(TEXT.navigation.home);
    const aboutLink = screen.getByText(TEXT.navigation.about);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it("should have correct href attributes for routing", async () => {
    await renderNavigation();

    const homeLink = screen.getByText(TEXT.navigation.home).closest("a");
    const aboutLink = screen.getByText(TEXT.navigation.about).closest("a");

    expect(homeLink).toHaveAttribute("href", "/catalog");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("should display dark theme button text when current theme is light", async () => {
    await renderNavigation("light");

    const button = screen.getByRole("button", { name: TEXT.theme.dark });
    expect(button).toBeInTheDocument();
  });

  it("should display light theme button text when current theme is dark", async () => {
    await renderNavigation("dark");

    const button = screen.getByRole("button", { name: TEXT.theme.light });
    expect(button).toBeInTheDocument();
  });

  it("should call toggleTheme function when theme button is clicked", async () => {
    const toggleThemeMock = vi.fn();
    await renderNavigation("light", toggleThemeMock);

    const button = screen.getByRole("button", { name: TEXT.theme.dark });
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it("should call invalidateQueries when refresh button is clicked", async () => {
    await renderNavigation();

    const refreshButton = screen.getByRole("button", {
      name: TEXT.refresh.refresh,
    });
    expect(refreshButton).toBeInTheDocument();

    fireEvent.click(refreshButton);

    expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1);
  });
});
