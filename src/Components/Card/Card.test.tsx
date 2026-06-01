import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from "./Card";
import type { IData } from "../../types/types";

interface IMockStoreState {
  selectedCards: IData[];
  toggleCard: (card: IData) => void;
}

vi.mock("../../store/useStore", () => ({
  useStore: (selector: (state: IMockStoreState) => unknown) =>
    selector({
      selectedCards: [],
      toggleCard: vi.fn(),
    }),
}));

vi.mock("../CheckBox/CheckBox", () => ({
  Checkbox: () => <input type="checkbox" data-testid="mock-checkbox" />,
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

describe("Card Component (Basic Minimum)", () => {
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
});
