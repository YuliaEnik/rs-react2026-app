import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CardList from "./CardList";
import { useStore } from "../../store/useStore";
import type { IData } from "../../types/types";

vi.mock("next-intl", () => ({
  useLocale: () => "ru",
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      noResults: "Ничего не найдено по запросу",
    };
    return translations[key] || key;
  },
}));

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "page" ? "1" : null),
  }),
}));

vi.mock("../Card/Card", () => ({
  default: ({
    title,
    id,
    onClick,
  }: {
    title: string;
    id: number;
    onClick: (id: number) => void;
  }) => (
    <div data-testid={`card-${id}`} onClick={() => onClick(id)}>
      {title}
    </div>
  ),
}));

vi.mock("../Skeleton/Skeleton", () => ({
  default: () => <div data-testid="skeleton-card" />,
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

const mockRepos: IData[] = [
  {
    id: 1,
    title: "Artwork 1",
    creators: [],
    creation_date: "",
    images: {},
    description: "",
  },
];

describe("CardList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    HTMLFormElement.prototype.requestSubmit = vi.fn();

    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        selectedCards: [] as IData[],
        toggleCard: mockToggleCard,
        unselectAll: mockUnselectAll,
      };
      return selector(state);
    });
  });

  it("should render cards and handle click when onCardClick is provided", () => {
    const mockOnCardClick = vi.fn();

    render(
      <CardList
        loading={false}
        repos={mockRepos}
        error={null}
        searchQuery=""
        onCardClick={mockOnCardClick}
      />,
    );
    const card = screen.getByText("Artwork 1");
    expect(card).toBeInTheDocument();

    fireEvent.click(card);
    expect(mockOnCardClick).toHaveBeenCalledWith(1);
  });

  it("should render skeletons when loading and repos are not available", () => {
    render(
      <CardList
        loading={true}
        repos={null}
        error={null}
        searchQuery=""
        onCardClick={undefined}
      />,
    );

    const skeletons = screen.getAllByTestId("skeleton-card");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should render error message when error is present", () => {
    render(
      <CardList
        loading={false}
        repos={null}
        error="Network Failure"
        searchQuery=""
        onCardClick={undefined}
      />,
    );

    expect(screen.getByText("Network Failure")).toBeInTheDocument();
  });

  it("should render no results message when repos array is empty", () => {
    render(
      <CardList
        loading={false}
        repos={[]}
        error={null}
        searchQuery="sunset"
        onCardClick={undefined}
      />,
    );

    expect(
      screen.getByText(/Ничего не найдено по запросу/),
    ).toBeInTheDocument();
  });

  it("should submit the form when card button wrapper is clicked", () => {
    render(
      <CardList
        loading={false}
        repos={mockRepos}
        error={null}
        searchQuery=""
        onCardClick={undefined}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(HTMLFormElement.prototype.requestSubmit).toHaveBeenCalled();
  });

  it("should trigger toggleCard action when checkbox changes state", () => {
    render(
      <CardList
        loading={false}
        repos={mockRepos}
        error={null}
        searchQuery=""
        onCardClick={undefined}
      />,
    );

    const checkbox = screen.getByTestId("mock-checkbox");
    fireEvent.click(checkbox);

    expect(mockToggleCard).toHaveBeenCalledWith(mockRepos[0]);
  });

  it("should mark checkbox as checked if card exists in store selectedCards", () => {
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        selectedCards: [mockRepos[0]],
        toggleCard: mockToggleCard,
        unselectAll: mockUnselectAll,
      };
      return selector(state);
    });

    render(
      <CardList
        loading={false}
        repos={mockRepos}
        error={null}
        searchQuery=""
        onCardClick={undefined}
      />,
    );

    const checkbox = screen.getByTestId("mock-checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
