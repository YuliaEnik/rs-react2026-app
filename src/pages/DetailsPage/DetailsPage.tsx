/* import { useNavigate } from "@tanstack/react-router";
import Card from "../../Components/Card/Card";
import { Route } from "../../routes/catalog/$id";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import { useGetArtworkById } from "../../hooks/useArtworksQueries";
import "./DetailsPage.scss";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const { data: card, isLoading, error, isFetching } = useGetArtworkById(id);

  const closeDetails = () => {
    navigate({ to: "/catalog" });
  };
  const showSkeleton = isLoading || isFetching;

  return (
    <div className={"modal-page active"} onClick={closeDetails}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {showSkeleton && (
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
          >
            <SkeletonCard />
          </ul>
        )}

        {error instanceof Error && (
          <div role="alert" style={{ color: "red", padding: "20px" }}>
            {error.message}
          </div>
        )}

        {card && !showSkeleton && !error && (
          <>
            <div className="modal-header">
              <div className="btn-modal" onClick={closeDetails}>
                <p className="btn-modal__img">X</p>
              </div>
            </div>
            <Card {...card} isSelected={true} />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
 */