import { createFileRoute } from "@tanstack/react-router";
import { AboutUs } from "../pages/AboutUs/AboutUs";

export const Route = createFileRoute("/about")({
  component: AboutUs,
});
