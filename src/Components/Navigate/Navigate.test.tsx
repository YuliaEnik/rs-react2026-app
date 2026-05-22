import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navigation from "./Navigate";
import React from "react";
import { ThemeProvider } from "../../context/ThemeProvider";

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
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>,
    );
    expect(document.querySelector(".nav")).toBeInTheDocument();
  });

  it("has Home link pointing to /", () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>,
    );
    const link = screen.getByText("Home");
    expect(link).toHaveAttribute("href", "/");
  });

  it("has About Us link pointing to /about", () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>,
    );
    const link = screen.getByText("About us");
    expect(link).toHaveAttribute("href", "/about");
  });

  it("has both navigation links", () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About us")).toBeInTheDocument();
  });
});
