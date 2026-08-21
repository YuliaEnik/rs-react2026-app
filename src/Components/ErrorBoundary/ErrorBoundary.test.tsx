import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      catalog: {
        tryAgainBtn: "Попробовать снова",
      },
      errorBoundary: {
        heading: "Что-то пошло не так",
        fallbackMessage: "Произошла непредвиденная ошибка",
      },
    };
    return translations[namespace]?.[key] || key;
  },
}));

const ThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

describe("ErrorBoundary Integration with next-intl", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("must pull mistake notice and button reset after error", () => {
    const errorMessage = "Test Crash";

    render(
      <ErrorBoundary>
        <ThrowError message={errorMessage} />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Что-то пошло не так")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Попробовать снова" }),
    ).toBeInTheDocument();
  });

  it("reset error and render new content", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError message="Error" />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Что-то пошло не так")).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>,
    );

    const button = screen.getByRole("button", { name: "Попробовать снова" });
    fireEvent.click(button);

    expect(screen.getByText("Safe Content")).toBeInTheDocument();
    expect(screen.queryByText("Что-то пошло не так")).not.toBeInTheDocument();
  });

  it("render without error", () => {
    render(
      <ErrorBoundary>
        <span>No Error Here</span>
      </ErrorBoundary>,
    );

    expect(screen.getByText("No Error Here")).toBeInTheDocument();
  });
});
