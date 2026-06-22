import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SelectionFlyout } from "./SelectionFlyout";
import { useStore } from "../../store/useStore";
import { downloadCSV } from "../../helpers/downloadCSV";
import type { IData } from "../../types/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      count: "Selected:",
      buttonUnselect: "Unselect All",
      buttonDownLoad: "Download CSV",
    };
    return translations[key] || key;
  },
}));

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
    useStore.setState({
      selectedCards: [],
      unselectAll: vi.fn(),
    });
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

  it("should call unselectAll function when 'Unselect All' button is clicked", () => {
    const mockUnselectAll = vi.fn();
    useStore.setState({
      selectedCards: mockCards,
      unselectAll: mockUnselectAll,
    });

    render(<SelectionFlyout />);
    const unselectButton = screen.getByRole("button", {
      name: /Unselect All/i,
    });
    fireEvent.click(unselectButton);
    expect(mockUnselectAll).toHaveBeenCalled();
  });

  it("should call downloadCSV function with selected cards when 'Download CSV' button is clicked", () => {
    useStore.setState({ selectedCards: mockCards });

    render(<SelectionFlyout />);
    const downloadButton = screen.getByRole("button", {
      name: /Download CSV/i,
    });
    fireEvent.click(downloadButton);
    expect(downloadCSV).toHaveBeenCalledWith(mockCards);
  });
});
