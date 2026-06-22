import { fetchArtworkByIdQueryFn } from "../../../hooks/useArtworksQueries";
import Card from "../../../Components/Card/Card";
import "./../../../pages/DetailsPage/DetailsPage.scss";
import CloseButton from "./CloseButton";

interface DetailsPageProps {
  id: string;
  currentPage: string;
  searchQuery: string;
}

export default async function DetailsPage({
  id,
  currentPage,
  searchQuery,
}: DetailsPageProps) {
  const card = await fetchArtworkByIdQueryFn(id);

  return (
    <>
      <div className="modal-header">
        <CloseButton currentPage={currentPage} searchQuery={searchQuery} />
      </div>
      <Card {...card} isSelected={true} />
    </>
  );
}
