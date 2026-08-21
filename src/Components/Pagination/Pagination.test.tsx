import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./Pagination";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      prev: "« Prev",
      next: "Next »",
    };
    return translations[key] || key;
  },
}));

describe("Pagination Component", () => {
  it("renders correct page info text", () => {
    render(<Pagination page={2} totalPages={5} onPageChange={vi.fn()} />);

    const pageInfo = screen.getByText("2 / 5");
    expect(pageInfo).toBeInTheDocument();
  });

  it('disables "Prev" button on the first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);

    const prevButton = screen.getByRole("button", { name: /prev/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />);

    const prevButton = screen.getByRole("button", { name: /prev/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with next page number when "Next" is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination page={2} totalPages={5} onPageChange={handlePageChange} />,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page number when "Prev" is clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <Pagination page={2} totalPages={5} onPageChange={handlePageChange} />,
    );

    const prevButton = screen.getByRole("button", { name: /prev/i });
    fireEvent.click(prevButton);

    expect(handlePageChange).toHaveBeenCalledTimes(1);
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
