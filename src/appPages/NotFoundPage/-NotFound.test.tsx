import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotFound from "../../app/[locale]/not-found";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => {
    const translations: Record<string, string> = {
      heading: "404",
      subheading: "Page Not Found",
      message: "The page you are looking for does not exist.",
      backLink: "Back to Home",
    };
    return translations[key] || key;
  },
}));

vi.mock("../../i18n/navigation", () => ({
  Link: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Feature 4: 404 Not Found Page Tests", () => {
  it("should display the 404 page for unknown routes", async () => {
    const mockParams = Promise.resolve({ locale: "en" });
    const ResolvedPage = await NotFound({ params: mockParams });

    render(ResolvedPage);

    const heading = await screen.findByText("404");
    expect(heading).toBeInTheDocument();
  });

  it("should clearly state that the page was not found", async () => {
    const mockParams = Promise.resolve({ locale: "en" });
    const ResolvedPage = await NotFound({ params: mockParams });

    render(ResolvedPage);

    const mainHeader = await screen.findByRole("heading", {
      level: 1,
      name: "404",
    });
    const subHeader = screen.getByRole("heading", {
      level: 2,
      name: "Page Not Found",
    });

    expect(mainHeader).toBeInTheDocument();
    expect(subHeader).toBeInTheDocument();
  });

  it("should provide a navigation link to return to the main application", async () => {
    const mockParams = Promise.resolve({ locale: "en" });
    const ResolvedPage = await NotFound({ params: mockParams });

    render(ResolvedPage);

    const homeLink = await screen.findByRole("link", { name: "Back to Home" });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
