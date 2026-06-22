import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailsPage from "../../app/catalog/[id]/page";

const mockCard = {
  id: 1,
  title: "Test Artwork 1",
  creators: [{ description: "Artist 1" }],
  creation_date: "2024",
  description: "Test description",
};

const mockFetchArtworkById = vi.fn();
vi.mock("../../../hooks/useArtworksQueries", () => ({
  fetchArtworkByIdQueryFn: (id: string) => mockFetchArtworkById(id),
}));

vi.mock("../../../Components/Card/Card", () => ({
  default: vi.fn(({ title, isSelected }) => (
    <div data-testid="mocked-card" data-selected={isSelected}>
      <h3>{title}</h3>
    </div>
  )),
}));

vi.mock("./CloseButton", () => ({
  default: () => <button data-testid="mock-close-button">✕</button>,
}));

describe("DetailsPage Server Component Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully fetches data on server and renders artwork detail panel", async () => {

    mockFetchArtworkById.mockResolvedValue(mockCard);

    const ResolvedDetailsPage = await DetailsPage({
      id: "1",
      currentPage: "1",
      searchQuery: "sun",
    });

    render(ResolvedDetailsPage);

    expect(mockFetchArtworkById).toHaveBeenCalledWith("1");

    expect(screen.getByTestId("mocked-card")).toBeInTheDocument();
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    expect(screen.getByTestId("mock-close-button")).toBeInTheDocument();
  });
});
