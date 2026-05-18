import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailsPage from "./DetailsPage";

vi.mock("../../Components/Card/Card", () => ({
  default: vi.fn(({ title, isSelected }) => (
    <div data-testid="mocked-card" data-selected={isSelected}>
      <h3>{title}</h3>
    </div>
  )),
}));

describe("DetailsPage", () => {
  const mockCard = {
    id: 1,
    title: "Test Artwork 1",
    creators: [{ description: "Artist 1" }],
    creation_date: "2024",
    description: "Test description",
  };

  const mockCloseDetails = vi.fn();

  beforeEach(() => {
    mockCloseDetails.mockClear();
  });

  it("renders nothing when isActive is false", () => {
    render(
      <DetailsPage
        isActive={false}
        closeDetails={mockCloseDetails}
        card={mockCard}
      />,
    );

    expect(screen.queryByTestId("mocked-card")).not.toBeInTheDocument();
  });

  it("renders nothing when card is null", () => {
    render(
      <DetailsPage
        isActive={true}
        closeDetails={mockCloseDetails}
        card={null}
      />,
    );

    expect(screen.queryByTestId("mocked-card")).not.toBeInTheDocument();
  });

  it("renders card when isActive is true and card exists", () => {
    render(
      <DetailsPage
        isActive={true}
        closeDetails={mockCloseDetails}
        card={mockCard}
      />,
    );

    expect(screen.getByTestId("mocked-card")).toBeInTheDocument();
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("passes isSelected={true} to Card component", () => {
    render(
      <DetailsPage
        isActive={true}
        closeDetails={mockCloseDetails}
        card={mockCard}
      />,
    );

    const mockedCard = screen.getByTestId("mocked-card");
    expect(mockedCard).toHaveAttribute("data-selected", "true");
  });

  it("calls closeDetails when clicking close button", () => {
    render(
      <DetailsPage
        isActive={true}
        closeDetails={mockCloseDetails}
        card={mockCard}
      />,
    );

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(mockCloseDetails).toHaveBeenCalledTimes(1);
  });

  it("does not call closeDetails when clicking on modal-content", () => {
    render(
      <DetailsPage
        isActive={true}
        closeDetails={mockCloseDetails}
        card={mockCard}
      />,
    );

    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      fireEvent.click(modalContent);
    }

    expect(mockCloseDetails).not.toHaveBeenCalled();
  });
});
