import CatalogData from "./_components/CatalogData";
import { fetchArtworksQueryFn } from "../../hooks/useArtworksQueries";
import { PAGINATION } from "../../constants/numbers";
import CatalogClientHandler from "./_components/CatalogClientHandler";
import { Suspense } from "react";
import DetailsPage from "./[id]/page";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import "./../../pages/DetailsPage/DetailsPage.scss";
import "./../../pages/HomePage/HomePage.scss";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    id?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.query || "";
  const currentPage = Number(params.page) || 1;
   const selectedId = params.id || "";

  const result = await fetchArtworksQueryFn(searchQuery, currentPage);
  const totalPages = Math.ceil(
    (result?.total || 0) / PAGINATION.CARDS_PER_PAGE,
  );
 
  return (
    /*  <ErrorBoundary> */
    <section className="home-page">
      <CatalogClientHandler
        initialQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
      >
        <div className="cards-content">
          <CatalogData
          data={result.data || []} 
           searchQuery={searchQuery} 
           currentPage={currentPage} />

            {selectedId && (
       <div className={"modal-page active"} /* onClick={closeDetails} */>
      <div
        className="modal-content"
        /* onClick={(event) => event.stopPropagation()} */
      >
      <Suspense 
        key={selectedId}
        fallback={
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
          >
            <SkeletonCard />
          </ul>
        }
      >
        <DetailsPage id={selectedId} />
      </Suspense>
    </div>
  </div>
)}

        </div>
      </CatalogClientHandler>
    </section>
    /*     </ErrorBoundary> */
  );
}
