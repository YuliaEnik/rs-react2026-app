import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Checkbox } from "./CheckBox";
import type { ICheckbox } from "../../types/types";

describe("Checkbox Component", () => {
  const defaultProps: ICheckbox = {
    id: 123,
    checked: false,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with given id and label attributes", () => {
    render(<Checkbox {...defaultProps} />);

    const container = screen.getByTestId("checkbox");
    expect(container).toBeInTheDocument();

    const input = container.querySelector("input") as HTMLInputElement;
    const label = container.querySelector("label") as HTMLLabelElement;

    expect(input).toBeInTheDocument();
    expect(input.type).toBe("checkbox");
    expect(input.id).toBe("123");
    expect(label).toBeInTheDocument();
    // Проверяем реальный HTML-атрибут 'for'
    expect(label.getAttribute("for")).toBe("123");
  });

  it("reflects checked state correctly when true", () => {
    render(<Checkbox {...defaultProps} checked={true} />);

    const input = screen
      .getByTestId("checkbox")
      .querySelector("input") as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("reflects checked state correctly when false or undefined", () => {
    render(<Checkbox {...defaultProps} checked={false} />);

    const input = screen
      .getByTestId("checkbox")
      .querySelector("input") as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it("calls onChange handler when checkbox state changes", () => {
    render(<Checkbox {...defaultProps} />);

    const input = screen
      .getByTestId("checkbox")
      .querySelector("input") as HTMLInputElement;
    fireEvent.click(input);

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });
});
