import CardList from "../../../Components/CardList/CardList";
import { IData } from "../../../types/types";

interface CatalogDataProps {
  data: IData[];
  searchQuery: string;
  currentPage: number;
}

export default async function CatalogData({
  data,
  searchQuery,
  currentPage,
}: CatalogDataProps) {
  return (
    <CardList
      loading={false}
      repos={data || null}
      error={null}
      searchQuery={searchQuery}
      currentPage={currentPage}
    />
  );
}
