import { createFileRoute } from "@tanstack/react-router";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

export const Route = createFileRoute("/catalog/$id")({
  component: DetailsPage,
});
