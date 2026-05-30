import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Route } from "./$id";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

vi.mock("../../Components/Skeleton/Skeleton", () => ({
  default: () => <div data-testid="mock-skeleton">Skeleton Loading...</div>,
}));

describe("Catalog ID Route (Isolated Minimum)", () => {
  it("renders pending component correctly", () => {
    const PendingComp = Route.options.pendingComponent;

    if (!PendingComp) {
      throw new Error("PendingComponent is not defined");
    }

    render(<PendingComp />);

    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByTestId("mock-skeleton")).toBeInTheDocument();
  });
});

describe("Catalog ID Route Component Reference", () => {
  it("should use DetailsPage as its main component", () => {
    const MainComponent = Route.options.component;

    expect(MainComponent).toBe(DetailsPage);
  });
});
