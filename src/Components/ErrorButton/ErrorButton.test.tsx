import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ErrorButton } from "./ErrorButton";

describe("ErrorButton", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("render button with right text", () => {
    render(<ErrorButton />);

    expect(
      screen.getByRole("button", { name: /throw error/i }),
    ).toBeInTheDocument();
  });

  it("show error after click", () => {
    render(<ErrorButton />);
    const button = screen.getByRole("button", { name: /throw error/i });

    expect(() => {
      fireEvent.click(button);
    }).toThrow("oops, looks like you made a mistake");
  });
});
