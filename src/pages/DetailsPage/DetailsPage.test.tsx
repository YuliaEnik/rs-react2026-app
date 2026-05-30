import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailsPage from "./DetailsPage";
import { Route } from "../../routes/catalog/$id";

vi.mock("../../Components/Card/Card", () => ({
  default: vi.fn(({ title, isSelected }) => (
    <div data-testid="mocked-card" data-selected={isSelected}>
      <h3>{title}</h3>
    </div>
  )),
}));

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../routes/catalog/$id", () => ({
  Route: {
    useLoaderData: vi.fn(),
  },
}));

describe("DetailsPage", () => {
  const mockCard = {
    id: 1,
    title: "Test Artwork 1",
    creators: [{ description: "Artist 1" }],
    creation_date: "2024",
    description: "Test description",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when card is null", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(null);

    render(<DetailsPage />);

    expect(screen.queryByTestId("mocked-card")).not.toBeInTheDocument();
  });

  it("renders card when data exists", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(mockCard);

    render(<DetailsPage />);

    expect(screen.getByTestId("mocked-card")).toBeInTheDocument();
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("passes isSelected={true} to Card component", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(mockCard);

    render(<DetailsPage />);

    const mockedCard = screen.getByTestId("mocked-card");
    expect(mockedCard).toHaveAttribute("data-selected", "true");
  });

  it("calls navigate to /catalog when clicking close button", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(mockCard);

    render(<DetailsPage />);

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/catalog" });
  });

  it("calls navigate to /catalog when clicking backdrop (outer overlay)", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(mockCard);

    const { container } = render(<DetailsPage />);

    const backdrop = container.firstChild;
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/catalog" });
  });

  it("does not call navigate when clicking on modal-content due to stopPropagation", () => {
    vi.mocked(Route.useLoaderData).mockReturnValue(mockCard);

    const { container } = render(<DetailsPage />);

    const modalContent = container.querySelector(".modal-content");
    if (modalContent) {
      fireEvent.click(modalContent);
    }

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
