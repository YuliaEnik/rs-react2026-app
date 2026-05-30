import { createFileRoute } from "@tanstack/react-router";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import type { IData } from "../../types/types";

export const Route = createFileRoute("/catalog/$id")({
  loader: async ({ params }) => {
    const { id } = params;
    const res = await fetch(`/api/artworks/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch artwork details");
    }
    const json = await res.json();
    return (json.data || json) as IData;
  },
  pendingComponent: () => (
    <div className="active" style={{ margin: 0, width: 100 }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: 100 }}>
        <SkeletonCard />
      </ul>
    </div>
  ),
  component: DetailsPage,
});
