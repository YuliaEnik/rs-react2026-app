import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

type ProductSearch = {
  page?: number;
  details?: number;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    if (search.page && isNaN(Number(search.page))) {
      throw new Error("Invalid page parameter");
    }
    if (search.details && isNaN(Number(search.details))) {
      throw new Error("Invalid details parameter");
    }

    return {
      page: Number(search.page) || 1,
      details: search.details ? Number(search.details) : undefined,
    };
  },
  errorComponent: () => <NotFoundPage />,
  component: HomePage,
});
