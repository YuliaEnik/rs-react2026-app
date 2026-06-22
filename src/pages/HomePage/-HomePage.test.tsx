import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { IData } from "../../types/types";

vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getMessages: async () => ({}),
}));

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTranslations: () => (key: string) => key,
  useLocale: () => "ru",
}));
vi.mock("../../app/[locale]/catalog/page", () => ({
  default: async ({
    searchParams,
  }: {
    searchParams: Promise<{ query?: string; page?: string }>;
  }) => {
    const params = await searchParams;
    const { fetchArtworksQueryFn } =
      await import("../../hooks/useArtworksQueries");
    const result = await fetchArtworksQueryFn(
      params.query || "",
      Number(params.page) || 1,
    );

    return (
      <div data-testid="catalog-page-mock">
        {result.data.map((item) => (
          <span key={item.id}>{item.title}</span>
        ))}
      </div>
    );
  },
}));

import * as queries from "../../hooks/useArtworksQueries";
const fetchSpy = vi.spyOn(queries, "fetchArtworksQueryFn");

import CatalogPage from "../../app/[locale]/catalog/page";

describe("CatalogPage Server Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches data and renders lists with details if selectedId is provided", async () => {
    const mockData = {
      data: [{ id: 1, title: "Test Artwork 1" } as IData],
      total: 1,
      hasMore: false,
    };
    fetchSpy.mockResolvedValue(mockData);

    const mockParams = Promise.resolve({ locale: "ru" });
    const mockSearchParams = Promise.resolve({ query: "sun", page: "1" });

    const ResolvedPage = await CatalogPage({
      params: mockParams,
      searchParams: mockSearchParams,
    });

    render(ResolvedPage);

    expect(fetchSpy).toHaveBeenCalledWith("sun", 1);
    expect(screen.getByText("Test Artwork 1")).toBeInTheDocument();
  });
});
