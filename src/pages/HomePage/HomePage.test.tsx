import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../__tests__/mocks/server";
import type { IData } from "../../types/types";
import HomePage from "./HomePage";

const mockNavigate = vi.fn();
const currentSearchParams = { page: 1 };

vi.mock("../../routes/catalog/route", () => ({
  Route: {
    useSearch: () => currentSearchParams,
  },
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: vi.fn(() => mockNavigate),
  Outlet: () => <div data-testid="mock-outlet" />,
}));

vi.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: () => ["", vi.fn()],
}));

vi.mock("../../Components/CardList/CardList", () => ({
  default: ({
    loading,
    repos,
    error,
    onCardClick,
  }: {
    loading: boolean;
    repos: IData[] | null;
    error: string | null;
    searchQuery: string;
    onCardClick: (id: number) => void;
    onRetry: () => Promise<void>;
  }) => {
    if (loading) return <div data-testid="skeleton-card">Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <ul>
        {repos?.map((card) => (
          <li key={card.id} onClick={() => onCardClick(card.id)}>
            {card.title}
          </li>
        ))}
      </ul>
    );
  },
}));

vi.mock("../../Components/Search/Search", () => ({ default: () => null }));
vi.mock("../../Components/Pagination/Pagination", () => ({
  default: () => null,
}));

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentSearchParams.page = 1;
  });

  it("renders loader and then displays cards from API", async () => {
    render(<HomePage />);

    expect(screen.getByTestId("skeleton-card")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    });
  });

  it("displays error message when API fails", async () => {
    server.use(
      http.get("*/api/artworks", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });

  it("navigates to details page when a card is clicked", async () => {
    render(<HomePage />);

    const card = await screen.findByText("Test Artwork 1");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/catalog/$id",
      params: { id: "1" },
    });
  });
});
