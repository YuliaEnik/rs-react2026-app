import CatalogData from "./_components/CatalogData";
import { fetchArtworksQueryFn } from "../../hooks/useArtworksQueries";
import { PAGINATION } from "../../constants/numbers";
import CatalogClientHandler from "./_components/CatalogClientHandler";
import { Suspense } from "react";
import DetailsPage from "./[id]/page";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import "./../../pages/DetailsPage/DetailsPage.scss";
import "./../../pages/HomePage/HomePage.scss";
import Search from "../../Components/Search/Search";
import CatalogLoading from "./loading";

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

  const dataPromise = fetchArtworksQueryFn(searchQuery, currentPage);

  const resultData = await dataPromise;
  const totalPages = Math.ceil(
    (resultData?.total || 0) / PAGINATION.CARDS_PER_PAGE,
  );

  return (
    /*  <ErrorBoundary> */
    <section className="home-page">
      <Search />

      <CatalogClientHandler
        initialQuery={searchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
      >
        <div className="cards-content">
          <Suspense
            key={`${searchQuery}-${currentPage}`}
            fallback={<CatalogLoading />}
          >
            <CatalogData
              data={resultData.data || []}
              searchQuery={searchQuery}
              currentPage={currentPage}
            />
          </Suspense>

          {selectedId && (
            <div className={"modal-page active"}>
              <div className="modal-content">
                <Suspense
                  key={selectedId}
                  fallback={
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        width: "100%",
                      }}
                    >
                      <SkeletonCard />
                    </ul>
                  }
                >
                  <DetailsPage
                    id={selectedId}
                    currentPage={String(currentPage)}
                    searchQuery={searchQuery}
                  />
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
