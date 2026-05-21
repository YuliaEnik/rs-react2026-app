import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../__tests__/mocks/server";
import type { IData } from "../../types/types";
import HomePage from "./HomePage";

const mockNavigate = vi.fn();

const currentSearchParams = {
  page: 1,
  details: undefined as number | undefined,
};

vi.mock("@tanstack/react-router", () => ({
  useSearch: vi.fn(() => currentSearchParams),
  useNavigate: vi.fn(() => mockNavigate),
  createFileRoute: vi.fn(() => ({})),
}));

const mockSearchQuery = vi.hoisted(() => vi.fn(() => ""));
vi.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: () => [mockSearchQuery(), vi.fn()],
}));

vi.mock("../../Components/Search/Search", () => ({
  default: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <div data-testid="search">
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  ),
}));

vi.mock("../../Components/Pagination/Pagination", () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock("../../Components/ErrorButton/ErrorButton", () => ({
  default: () => <div data-testid="error-button">Error Button</div>,
}));

vi.mock("../../Components/CardList/CardList", () => ({
  default: ({
    loading,
    repos,
    error,
    searchQuery,
    onCardClick,
  }: {
    loading: boolean;
    repos: IData[] | null;
    error: string | null;
    searchQuery: string;
    onCardClick: (id: number) => void;
  }) => {
    if (loading && !repos) {
      return (
        <div className="skeleton-card" data-testid="skeleton-card">
          Loading...
        </div>
      );
    }
    if (error && !loading) {
      return (
        <div className="error-message">
          <p>{error}</p>
        </div>
      );
    }
    if (repos?.length === 0 && !loading && searchQuery !== "") {
      return (
        <div className="loading">
          <p>Sorry, nothing found for &quot;{searchQuery}&quot;</p>
        </div>
      );
    }
    return (
      <ul data-testid="mock-cards-list">
        {repos?.map((card) => (
          <div
            key={card.id}
            data-testid={`card-${card.id}`}
            onClick={() => onCardClick(card.id)}
          >
            {card.title}
          </div>
        ))}
      </ul>
    );
  },
}));

vi.mock("../DetailsPage/DetailsPage", () => ({
  default: ({ isActive, card }: { isActive: boolean; card: IData | null }) =>
    isActive && card ? (
      <div data-testid="details-page">Details: {card.title}</div>
    ) : null,
}));

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchQuery.mockReturnValue("");
    currentSearchParams.page = 1;
    currentSearchParams.details = undefined;
  });

  it("show skeletons and cards after render", async () => {
    render(<HomePage />);

    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBeGreaterThan(0);

    await waitFor(
      () => {
        expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
        expect(screen.getByText("Test Artwork 2")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('notice "Sorry, nothing found", if cardList clear', async () => {
    mockSearchQuery.mockReturnValue("UnknownArt");

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Sorry, nothing found for "UnknownArt"/i),
      ).toBeInTheDocument();
    });
  });

  it("show message if API broke", async () => {
    server.use(
      http.get("*/api/artworks", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it("should open DetailsPage when a card is clicked", async () => {
    const { rerender } = render(<HomePage />);

    const card = await screen.findByText("Test Artwork 1");
    fireEvent.click(card);

    currentSearchParams.details = 1;
    rerender(<HomePage />);

    expect(screen.getByTestId("details-page")).toBeInTheDocument();
    expect(screen.getByText("Details: Test Artwork 1")).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should close DetailsPage when clicking on the main panel background", async () => {
    const { rerender } = render(<HomePage />);

    const card = await screen.findByText("Test Artwork 1");
    fireEvent.click(card);

    currentSearchParams.details = 1;
    rerender(<HomePage />);
    expect(screen.getByTestId("details-page")).toBeInTheDocument();

    const mainPanel = screen.getByTestId("mock-cards-list").parentElement;
    if (mainPanel) {
      fireEvent.click(mainPanel);
    }

    currentSearchParams.details = undefined;
    rerender(<HomePage />);

    expect(screen.queryByTestId("details-page")).not.toBeInTheDocument();
  });
});
