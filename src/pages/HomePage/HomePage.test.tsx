import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../__tests__/mocks/server";
import HomePage from "./HomePage";
import type { IData } from "../../Data/types";

vi.mock("@tanstack/react-router", () => ({
  useSearch: vi.fn(() => ({ page: 1 })),
  useNavigate: vi.fn(() => vi.fn()),
  createFileRoute: vi.fn(() => ({})),
}));

const mockSearchQuery = vi.hoisted(() => vi.fn(() => ""));
vi.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: () => [mockSearchQuery(), vi.fn()],
}));

vi.mock("../../Components/Search/Search", () => ({
  default: ({ onSearch }:{ onSearch: (value: string) => void }) => (
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

vi.mock("../../Components/SkeletonCard/SkeletonCard", () => ({
  default: () => (
    <div className="skeleton-card" data-testid="skeleton-card">
      Loading...
    </div>
  ),
}));

vi.mock("../../Components/Card/Card", () => ({
  default: ({
    title,
    id,
    onClick,
  }: {
    title: string;
    id: number;
    onClick: (id: number) => void;
  }) => (
    <div
      data-testid={`card-${id}`}
      data-role="card"
      onClick={() => onClick(id)}
    >
      {title}
    </div>
  ),
}));

vi.mock("../../Components/DetailsPage/DetailsPage", () => ({
  default: ({ isActive, card }: { isActive: boolean; card: IData | null }) =>
    isActive && card ? (
      <div data-testid="details-page">Details: {card.title}</div>
    ) : null,
}));

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchQuery.mockReturnValue("");
  });

  it("show skeletons and cards after render", async () => {
    render(<HomePage />);

    const skeletons = document.querySelectorAll(".skeleton-card");
    expect(skeletons.length).toBeGreaterThan(0);

    await waitFor(
      () => {
        expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
        expect(screen.getByText("Test Artwork 2")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    expect(screen.queryByTestId("skeleton-card")).not.toBeInTheDocument();
  });

  it('notice "Sorry, nothing found", if cardList clear', async () => {
    mockSearchQuery.mockReturnValue("UnknownArt");

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Sorry, nothing found for "UnknownArt"/i),
      ).toBeInTheDocument();

      const cards = screen.queryAllByTestId(/card-/);
      expect(cards.length).toBe(0);
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
});
