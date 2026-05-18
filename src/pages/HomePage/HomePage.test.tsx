import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "../../__tests__/mocks/server";
import HomePage from "./HomePage";
import type { IData } from "../../Data/types";

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useSearch: vi.fn(() => ({ page: 1, details: undefined })),
  useNavigate: vi.fn(() => mockNavigate),
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

vi.mock("../../Components/Skeleton/Skeleton", () => ({
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
      onClick={() => onClick(id)}
    >
      {title}
    </div>
  ),
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
    render(<HomePage />);

    const card = await screen.findByText("Test Artwork 1");
    fireEvent.click(card);

    expect(screen.getByTestId("details-page")).toBeInTheDocument();
    expect(screen.getByText("Details: Test Artwork 1")).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("should close DetailsPage when clicking on the main panel background", async () => {
    render(<HomePage />);

    const card = await screen.findByText("Test Artwork 1");
    fireEvent.click(card);
    expect(screen.getByTestId("details-page")).toBeInTheDocument();

    const mainPanel = screen.getByRole("list").parentElement;
    if (mainPanel) {
      fireEvent.click(mainPanel);
    }

    expect(screen.queryByTestId("details-page")).not.toBeInTheDocument();
  });
});
