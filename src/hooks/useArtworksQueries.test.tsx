import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchArtworksQueryFn } from "./useArtworksQueries";

const mockResponseData = {
  info: { total: 2 },
  data: [
    { id: 1, title: "Artwork 1" },
    { id: 2, title: "Artwork 2" },
  ],
};

describe("TanStack Query Caching Integration", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          headers: new Headers({ "content-type": "application/json" }),
          json: () => Promise.resolve(mockResponseData),
        }),
      ),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should reuse cached data and not trigger a second network request", async () => {
    const testQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60000,
          retry: false,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result, rerender } = renderHook(
      () =>
        useQuery({
          queryKey: ["artworks", "", 1],
          queryFn: () => fetchArtworksQueryFn("", 1),
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetch).toHaveBeenCalledTimes(1);

    rerender();

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
