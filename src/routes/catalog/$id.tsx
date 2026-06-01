import { createFileRoute } from "@tanstack/react-router";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import { fetchArtworkByIdQueryFn } from "../../hooks/useArtworksQueries";
import { queryClient } from "../../queryClient";

export const Route = createFileRoute("/catalog/$id")({
  loader: async ({ params }) => {
    const { id } = params;
    return queryClient.ensureQueryData({
      queryKey: ["artwork", id],
      queryFn: () => fetchArtworkByIdQueryFn(id),
    });
  },
  pendingComponent: () => (
    <div className="modal-page active">
      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
        <SkeletonCard />
      </ul>
    </div>
  ),
  component: DetailsPage,
});
