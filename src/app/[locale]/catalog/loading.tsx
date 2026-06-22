import SkeletonCard from "../../../Components/Skeleton/Skeleton";
import { PAGINATION } from "../../../constants/numbers";
import "../../../pages/HomePage/HomePage.scss";

export default function CatalogLoading() {
  return (
    <ul className="cards-wrapper">
      {Array.from({ length: PAGINATION.CARDS_PER_PAGE }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  );
}
