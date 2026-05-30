import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardList from "./CardList";
import type { IData } from "../../types/types";

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
  it("should render cards and handle click", () => {
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
});
