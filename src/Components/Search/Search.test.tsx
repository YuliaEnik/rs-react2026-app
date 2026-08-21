import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Search from "./Search";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      placeholder: "Search...",
    };
    return translations[key] || key;
  },
  useLocale: () => "ru",
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "query" ? "initial query" : null),
  }),
}));

const mockSearchAction = vi.fn();
vi.mock("../../app/actions", () => ({
  handleSearchAction: (formData: FormData) => mockSearchAction(formData),
}));

describe("Search Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("renders correctly with initial values and hidden locale input", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("initial query");

    const localeInput = document.querySelector(
      'input[name="locale"]',
    ) as HTMLInputElement;
    expect(localeInput).toBeInTheDocument();
    expect(localeInput.value).toBe("ru");
  });

  it("updates localStorage on input change", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "React 2026" } });

    expect(window.localStorage.getItem(STORAGE_KEYS.SEARCH_QUERY)).toBe(
      "React 2026",
    );
  });

  it("submits the form when search button is clicked", () => {
    render(<Search />);

    const button = screen.getByRole("button");
    const form = document.querySelector("form");
    const submitSpy = vi.fn((e) => e.preventDefault());

    form?.addEventListener("submit", submitSpy);
    fireEvent.click(button);

    expect(submitSpy).toHaveBeenCalled();
  });
});
