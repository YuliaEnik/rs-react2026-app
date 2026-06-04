import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";
import { useGetArtworks } from "./useArtworksQueries";


const fetchSpy = vi.spyOn(globalThis, "fetch");

describe("TanStack Query Caching Integration", () => {
  it("should reuse cached data and not trigger a second network request", async () => {

    const testQueryClient = new QueryClient({
      defaultOptions: { queries: { staleTime: 60000, retry: false } }
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );

    const { result, rerender } = renderHook(() => useGetArtworks("", 1), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const countAfterFirstCall = fetchSpy.mock.calls.length;

    rerender();

    expect(fetchSpy.mock.calls.length).toBe(countAfterFirstCall);
  });
});
