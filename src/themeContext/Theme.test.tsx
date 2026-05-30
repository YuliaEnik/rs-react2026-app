import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useAppTheme } from "./ThemeContext";

const TestComponent = () => {
  const { theme, toggleTheme } = useAppTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-btn">
        Toggle
      </button>
    </div>
  );
};

describe("Theme Context", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("change theme by click", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const themeSpan = screen.getByTestId("theme-value");
    const button = screen.getByTestId("toggle-btn");

    expect(themeSpan.textContent).toBe("dark");

    fireEvent.click(button);
    expect(themeSpan.textContent).toBe("light");

    fireEvent.click(button);
    expect(themeSpan.textContent).toBe("dark");
  });
});
