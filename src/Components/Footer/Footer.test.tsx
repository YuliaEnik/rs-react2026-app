import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(document.querySelector(".footer")).toBeInTheDocument();
  });

  it("shows year 2026", () => {
    render(<Footer />);
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("has GitHub link with correct attributes", () => {
    render(<Footer />);
    const link = screen.getByLabelText("GitHub Profile");
    expect(link).toHaveAttribute("href", "https://github.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("has RS School link with correct href", () => {
    render(<Footer />);
    const link = screen.getByText("RS School");
    expect(link).toHaveAttribute("href", "https://rs.school/");
  });

  it("has all links with noreferrer", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });
});
