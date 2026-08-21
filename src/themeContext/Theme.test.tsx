import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";
import { useAppTheme } from "./ThemeContext";
import { useState, useCallback } from "react";

vi.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: vi.fn((_key: string, initialValue: string) => {
    const [state, setState] = useState(initialValue);
    const setValue = useCallback(
      (value: string | ((val: string) => string)) => {
        setState((prev) => (value instanceof Function ? value(prev) : value));
      },
      [],
    );
    return [state, setValue] as const;
  }),
}));

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
    vi.clearAllMocks();
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
