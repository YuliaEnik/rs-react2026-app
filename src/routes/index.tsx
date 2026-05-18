import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../pages/HomePage/HomePage";

type ProductSearch = {
  page?: number;
  details?: number;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      page: Number(search.page) || 1,
      details: search.details ? Number(search.details) : undefined,
    };
  },
  component: HomePage,
});
