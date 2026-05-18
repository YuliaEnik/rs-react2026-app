import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navigation from "./Navigate";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("Navigation", () => {
  it("renders navigation", () => {
    render(<Navigation />);
    expect(document.querySelector(".nav")).toBeInTheDocument();
  });

  it("has Home link pointing to /", () => {
    render(<Navigation />);
    const link = screen.getByText("Home");
    expect(link).toHaveAttribute("href", "/");
  });

  it("has About Us link pointing to /about", () => {
    render(<Navigation />);
    const link = screen.getByText("About us");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("has both navigation links", () => {
    render(<Navigation />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About us")).toBeInTheDocument();
  });
});
