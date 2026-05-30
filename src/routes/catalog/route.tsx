import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

type ProductSearch = {
  page?: number;
};

export const Route = createFileRoute("/catalog")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    if (search.page && isNaN(Number(search.page))) {
      throw new Error("Invalid page parameter");
    }
    return {
      page: Number(search.page) || 1,
    };
  },
  errorComponent: () => <NotFoundPage />,
});
