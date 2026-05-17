import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../pages/HomePage/HomePage";

type ProductSearch = {
  page?: number;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      page: Number(search.page) || 1,
    };
  },
  component: HomePage,
});
