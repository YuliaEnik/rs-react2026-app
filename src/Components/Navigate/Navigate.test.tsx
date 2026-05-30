import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navigation from "./Navigate";
import { TEXT } from "../../constants/text";

const { navigation } = TEXT;

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    activeProps?: { className?: string };
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("Navigation", () => {
  it("renders navigation container", () => {
    const { container } = render(<Navigation />);
    expect(container.querySelector(".nav")).toBeInTheDocument();
  });

  it("has Catalog link pointing to /catalog", () => {
    render(<Navigation />);
    const link = screen.getByText(navigation.home);
    expect(link).toHaveAttribute("href", "/catalog");
  });

  it("has About Us link pointing to /about", () => {
    render(<Navigation />);
    const link = screen.getByText(navigation.about);
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders both navigation links inside the document", () => {
    render(<Navigation />);
    expect(screen.getByText(navigation.home)).toBeInTheDocument();
    expect(screen.getByText(navigation.about)).toBeInTheDocument();
  });
});
