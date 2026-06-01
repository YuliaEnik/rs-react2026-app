import { describe, it, expect } from "vitest";
import { Route } from "./$id";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

describe("Catalog ID Route Component Reference", () => {
  it("should use DetailsPage as its main component", () => {
    const MainComponent = Route.options.component;

    expect(MainComponent).toBe(DetailsPage);
  });
});
