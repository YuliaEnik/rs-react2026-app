import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Card from "./Card";
import { useStore } from "../../store/useStore";
import type { IData } from "../../types/types";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      author: "Author:",
      name: "Name:",
      year: "Year:",
      description: "Description:",
      unknown: "Unknown",
      imageNotAvailable: "Image not available",
    };
    return translations[key] || key;
  },
}));

vi.mock("../CheckBox/CheckBox", () => ({
  Checkbox: ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      type="checkbox"
      data-testid="mock-checkbox"
      checked={checked}
      onChange={onChange}
    />
  ),
}));

const mockToggleCard = vi.fn();
const mockUnselectAll = vi.fn();

vi.mock("../../store/useStore", () => ({
  useStore: vi.fn((selector) => {
    const state = {
      selectedCards: [] as IData[],
      toggleCard: mockToggleCard,
      unselectAll: mockUnselectAll,
    };
    return selector(state);
  }),
}));

const mockCardData: IData = {
  id: 123,
  title: "Mona Lisa",
  creators: [{ description: "Leonardo da Vinci" }],
  creation_date: "1503",
  description: "A famous portrait",
  images: {
    web: {
      url: "https://example.com",
    },
  },
};

describe("Card Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        selectedCards: [] as IData[],
        toggleCard: mockToggleCard,
        unselectAll: mockUnselectAll,
      };
      return selector(state);
    });
  });

  it("should render card information correctly", () => {
    render(<Card {...mockCardData} />);

    expect(screen.getByText("Mona Lisa")).toBeInTheDocument();
    expect(screen.getByText("Leonardo da Vinci")).toBeInTheDocument();
    expect(screen.getByText("1503")).toBeInTheDocument();
  });

  it("should call onClick handler with correct id when card is clicked", () => {
    const onClickMock = vi.fn();

    render(<Card {...mockCardData} onClick={onClickMock} />);

    const cardElement = screen.getByTestId("card");
    fireEvent.click(cardElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(123);
  });

  it("should toggle checkbox state and update store on checkbox interaction", () => {
    render(<Card {...mockCardData} />);

    const checkbox = screen.getByTestId("mock-checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleCard).toHaveBeenCalledWith(
      expect.objectContaining({ id: 123 }),
    );
  });

  it("should render checkbox as checked when listed in selectedCards", () => {
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        selectedCards: [mockCardData],
        toggleCard: mockToggleCard,
        unselectAll: mockUnselectAll,
      };
      return selector(state);
    });

    render(<Card {...mockCardData} />);

    const checkbox = screen.getByTestId("mock-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should display description panel when isSelected prop is true", () => {
    render(<Card {...mockCardData} isSelected={true} />);

    expect(screen.getByText("A famous portrait")).toBeInTheDocument();
  });

  it("should hide checkbox component when hideCheckbox prop is provided", () => {
    render(<Card {...mockCardData} hideCheckbox={true} />);

    expect(screen.queryByTestId("mock-checkbox")).not.toBeInTheDocument();
  });
});
