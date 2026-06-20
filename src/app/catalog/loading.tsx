import SkeletonCard from "../../Components/Skeleton/Skeleton";
import { PAGINATION } from "../../constants/numbers";
import "../../Components/CardList/CardList.scss";

export default function CatalogLoading() {
  return (
    <div className="home-page" style={{ padding: "20px" }}>
      <div className="cards-content">
        <ul className="cards-wrapper">
          {Array.from({ length: PAGINATION.CARDS_PER_PAGE }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}
