import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import About from "../../app/[locale]/about/page";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async () => (key: string) => {
    const translations: Record<string, string> = {
      title: "About the Project",
      museumHeading: "The Museum",
      museumText: "Cleveland Museum of Art",
      appHeading: "The Application",
      appTextPreLink: "This app was built as part of the",
      courseLinkText: "RS School React Course",
      appTextPostLink: "program.",
      footerMessage: "Thank you!",
    };
    return translations[key] || key;
  },
}));

describe("AboutUs", () => {
  it("renders component", async () => {
    const mockParams = Promise.resolve({ locale: "ru" });
    const { container } = render(await About({ params: mockParams }));
    expect(container.querySelector(".about-page")).toBeInTheDocument();
  });

  it("shows title", async () => {
    const mockParams = Promise.resolve({ locale: "ru" });
    render(await About({ params: mockParams }));
    expect(screen.getByText("About the Project")).toBeInTheDocument();
  });

  it("shows museum information", async () => {
    const mockParams = Promise.resolve({ locale: "ru" });
    render(await About({ params: mockParams }));
    expect(screen.getByText("The Museum")).toBeInTheDocument();
    expect(screen.getByText(/Cleveland Museum of Art/i)).toBeInTheDocument();
  });

  it("shows application information", async () => {
    const mockParams = Promise.resolve({ locale: "ru" });
    render(await About({ params: mockParams }));
    expect(screen.getByText("The Application")).toBeInTheDocument();
    expect(screen.getByText(/RS School React Course/i)).toBeInTheDocument();
  });

  it("has RS School link with correct URL", async () => {
    const mockParams = Promise.resolve({ locale: "ru" });
    render(await About({ params: mockParams }));
    const link = screen.getByRole("link", { name: /RS School React Course/i });
    expect(link).toHaveAttribute("href", "https://rs.school/courses/reactjs");
  });
});
