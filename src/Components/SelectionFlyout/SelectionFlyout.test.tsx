import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SelectionFlyout } from "./SelectionFlyout";
import { useStore } from "../../store/useStore";
import { downloadCSV } from "../../helpers/downloadCSV";
import type { IData } from "../../types/types";

vi.mock("../../helpers/downloadCSV", () => ({
  downloadCSV: vi.fn(),
}));

const mockCards: IData[] = [
  { id: 1, title: "Artwork 1" },
  { id: 2, title: "Artwork 2" },
];

describe("SelectionFlyout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return null (not render) when no cards are selected", () => {
    useStore.setState({ selectedCards: [] });

    const { container } = render(<SelectionFlyout />);
    expect(container.firstChild).toBeNull();
  });

  it("should render correctly and display the number of selected items", () => {
    useStore.setState({ selectedCards: mockCards });

    render(<SelectionFlyout />);
    expect(screen.getByTestId("selection-flyout")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should call downloadCSV function with selected cards when 'Download' button is clicked", () => {
    useStore.setState({ selectedCards: mockCards });

    render(<SelectionFlyout />);
    const downloadButton = screen.getByRole("button", { name: /download/i });
    fireEvent.click(downloadButton);
    expect(downloadCSV).toHaveBeenCalledWith(mockCards);
  });
});
