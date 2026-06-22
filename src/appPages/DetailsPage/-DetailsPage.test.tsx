import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailsPage from "../../app/[locale]/catalog/[id]/page";
import * as queries from "../../hooks/useArtworksQueries";

vi.mock("next-intl", () => ({
  useLocale: () => "ru",
  useTranslations: () => (key: string) => key,
}));

const mockCard = {
  id: 1,
  title: "Test Artwork 1",
  creators: [{ description: "Artist 1" }],
  creation_date: "2024",
  description: "Test description",
};

const fetchByIdSpy = vi.spyOn(queries, "fetchArtworkByIdQueryFn");

describe("DetailsPage Server Component Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully fetches data on server and renders artwork detail panel", async () => {
    fetchByIdSpy.mockResolvedValue(mockCard);

    const ResolvedDetailsPage = await DetailsPage({
      id: "1",
      currentPage: "1",
      searchQuery: "sun",
    });

    render(ResolvedDetailsPage);

    expect(fetchByIdSpy).toHaveBeenCalledWith("1");

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 1")).toBeInTheDocument();

    expect(screen.getByText("✕")).toBeInTheDocument();
  });
});
