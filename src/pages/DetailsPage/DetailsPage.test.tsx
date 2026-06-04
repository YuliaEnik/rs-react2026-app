import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailsPage from "./DetailsPage";

const mockCard = {
  id: 1,
  title: "Test Artwork 1",
  creators: [{ description: "Artist 1" }],
  creation_date: "2024",
  description: "Test description",
};

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => {
  const mockRouteInstance = {
    useParams: () => ({ id: "1" }),
    useSearch: () => ({ page: 1 }),
  };

  return {
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
    createFileRoute: () => () => mockRouteInstance,
    Route: mockRouteInstance,
  };
});

vi.mock("../../Components/Card/Card", () => ({
  default: vi.fn(({ title, isSelected }) => (
    <div data-testid="mocked-card" data-selected={isSelected}>
      <h3>{title}</h3>
    </div>
  )),
}));

const mockUseGetArtworkById = vi.fn();
vi.mock("../../hooks/useArtworksQueries", () => ({
  useGetArtworkById: () => mockUseGetArtworkById(),
}));

describe("DetailsPage Component Tests", () => {
  let testQueryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    testQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  const renderWithQuery = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
    );
  };

  it("renders card when data exists and is loaded", () => {
    mockUseGetArtworkById.mockReturnValue({
      data: mockCard,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderWithQuery(<DetailsPage />);

    expect(screen.getByTestId("mocked-card")).toBeInTheDocument();
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("calls navigate to /catalog when clicking close button", () => {
    mockUseGetArtworkById.mockReturnValue({
      data: mockCard,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    renderWithQuery(<DetailsPage />);

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/catalog" });
  });

  it("calls navigate to /catalog when clicking backdrop (outer overlay)", () => {
    mockUseGetArtworkById.mockReturnValue({
      data: mockCard,
      isLoading: false,
      isFetching: false,
      error: null,
    });

    const { container } = renderWithQuery(<DetailsPage />);

    const backdrop = container.firstChild;
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    expect(mockNavigate).toHaveBeenCalledWith({ to: "/catalog" });
  });
});
