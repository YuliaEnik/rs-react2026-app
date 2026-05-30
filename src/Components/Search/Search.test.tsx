import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useState } from "react";
import Search from "./Search";
import { TEXT } from "../../constants/text";

const mockSetValue = vi.fn();

let initialStorageValue = "";

vi.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: vi.fn((_key, initialValue) => {
    const [state, setState] = useState(initialStorageValue || initialValue);

    const activeSetValue = (newValue: string) => {
      setState(newValue);
      mockSetValue(newValue);
    };

    return [state, activeSetValue];
  }),
}));

describe("Search Component", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    initialStorageValue = "";
  });

  it("updates value and calls onSearch with trimmed query after click", () => {
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(TEXT.search.placeholder);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "  test query  " } });
    expect(mockSetValue).toHaveBeenCalledWith("  test query  ");

    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith("test query");
    expect(mockSetValue).toHaveBeenCalledWith("test query");
  });

  it("handles empty search query properly", () => {
    initialStorageValue = "some old value";

    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(TEXT.search.placeholder);
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "" } });

    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("");
    expect(mockSetValue).toHaveBeenCalledWith("");
  });
});
