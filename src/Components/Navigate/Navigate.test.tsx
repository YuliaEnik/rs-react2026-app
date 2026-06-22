import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import Navigation from "./Navigate";
import { ThemeContext } from "../../themeContext/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";

const mockReplace = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next-intl", () => ({
  useLocale: () => "ru",
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "navigation.home": "Главная",
      "navigation.about": "О нас",
      "theme.dark": "Темная",
      "theme.light": "Светлая",
      "refresh.refresh": "Обновить",
    };
    return translations[key] || key;
  },
}));

vi.mock("../../i18n/navigation", () => ({
  Link: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
  useRouter: () => ({
    replace: mockReplace,
    refresh: mockRefresh,
  }),
  usePathname: () => "/about",
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    toString: () => "page=1&query=test",
  }),
}));

vi.mock("../../queryClient", () => ({
  queryClient: {
    invalidateQueries: vi.fn(() => Promise.resolve()),
  },
}));

describe("Navigation Component", () => {
  let testQueryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    testQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  const renderComponent = (themeValue: "light" | "dark" = "light", toggleThemeMock = vi.fn()) => {
    return render(
      <QueryClientProvider client={testQueryClient}>
        <ThemeContext.Provider value={{ theme: themeValue, toggleTheme: toggleThemeMock }}>
          <Navigation />
        </ThemeContext.Provider>
      </QueryClientProvider>
    );
  };

  it("should render navigation links with correct text", () => {
    renderComponent();

    expect(screen.getByText("Главная")).toBeInTheDocument();
    expect(screen.getByText("О нас")).toBeInTheDocument();
  });

  it("should have correct href attributes for routing", () => {
    renderComponent();

    expect(screen.getByText("Главная")).toHaveAttribute("href", "/");
    expect(screen.getByText("О нас")).toHaveAttribute("href", "/about");
  });

  it("should display dark and light theme button texts", () => {
    renderComponent("light");

    expect(screen.getByText("Темная")).toBeInTheDocument();
    expect(screen.getByText("Светлая")).toBeInTheDocument();
  });

  it("should call toggleTheme function when theme button is clicked", () => {
    const toggleThemeMock = vi.fn();
    renderComponent("light", toggleThemeMock);

    const button = screen.getByText("Темная").closest("button");
    if (button) fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it("should call router.refresh when refresh button is clicked", async () => {
    renderComponent();

    const refreshButton = screen.getByRole("button", { name: "Обновить" });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledTimes(1);
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("should handle locale change selection correctly", () => {
    renderComponent();

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "en" } });

    expect(mockReplace).toHaveBeenCalledWith("/about?page=1&query=test", { locale: "en" });
  });
});
