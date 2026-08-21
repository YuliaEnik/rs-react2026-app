import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";
import { LINKS } from "../../constants/links";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => {
    const translations: Record<string, string> = {
      gitHubLabel: "GitHub Profile",
      year: "2026",
      schoolName: "RS School",
    };
    return translations[key] || key;
  },
}));

describe("Footer", () => {
  it("renders without crashing", async () => {
    const ResolvedFooter = await Footer({ locale: "ru" });
    const { container } = render(ResolvedFooter);
    expect(container.querySelector(".footer")).toBeInTheDocument();
  });

  it("shows year 2026", async () => {
    const ResolvedFooter = await Footer({ locale: "ru" });
    render(ResolvedFooter);
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("has GitHub link with correct attributes", async () => {
    const ResolvedFooter = await Footer({ locale: "ru" });
    render(ResolvedFooter);
    const link = screen.getByLabelText("GitHub Profile");
    expect(link).toHaveAttribute("href", LINKS.creatorGitHub);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("has RS School link with correct href", async () => {
    const ResolvedFooter = await Footer({ locale: "ru" });
    render(ResolvedFooter);
    const link = screen.getByText("RS School");
    expect(link).toHaveAttribute("href", LINKS.rsSchool);
  });

  it("has all links with noreferrer", async () => {
    const ResolvedFooter = await Footer({ locale: "ru" });
    render(ResolvedFooter);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
