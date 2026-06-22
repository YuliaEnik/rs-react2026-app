import { fetchArtworkByIdQueryFn } from "../../../hooks/useArtworksQueries";
import Card from "../../../Components/Card/Card";
import "./../../../pages/DetailsPage/DetailsPage.scss";
import CloseButton from "./CloseButton";

interface DetailsPageProps {
  id: string;
}

export default async function DetailsPage({ id }: DetailsPageProps) {
  
  const card = await fetchArtworkByIdQueryFn(id);

  return (
<>
        <div className="modal-header">
          <CloseButton />
        </div>
        <Card {...card} isSelected={true} />
</>
  );
}
