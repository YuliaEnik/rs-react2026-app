import { QueryClient } from "@tanstack/react-query";

const CACHE_TTL = Number(import.meta.env.REACT_APP_CACHE_TTL_MS) || 30000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
      gcTime: CACHE_TTL * 2,
      refetchOnWindowFocus: false,
    },
  },
});
