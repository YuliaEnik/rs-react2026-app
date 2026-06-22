import { fetchArtworksQueryFn } from "../../../hooks/useArtworksQueries";
import { PAGINATION } from "../../../constants/numbers";
import CatalogClientHandler from "./_components/CatalogClientHandler";
import { Suspense } from "react";
import DetailsPage from "./[id]/page";
import SkeletonCard from "../../../Components/Skeleton/Skeleton";
import { getMessages, setRequestLocale } from "next-intl/server";
import "./../../../appPages/DetailsPage/DetailsPage.scss";
import "./../../../appPages/HomePage/HomePage.scss";
import Search from "../../../Components/Search/Search";
import CatalogLoading from "./loading";
import { NextIntlClientProvider } from "next-intl";
import CatalogData from "./_components/CatalogData";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
    id?: string;
  }>;
  params: Promise<{
    locale: string;
  }>;
}

export default async function CatalogPage({ searchParams, params }: PageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  setRequestLocale(locale);

  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.query || "";
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const selectedId = resolvedSearchParams.id || "";
  const messages = await getMessages();

  const dataPromise = fetchArtworksQueryFn(searchQuery, currentPage);
  const resultData = await dataPromise;
  const totalPages = Math.ceil(
    (resultData?.total || 0) / PAGINATION.CARDS_PER_PAGE,
  );

  return (
    <NextIntlClientProvider messages={messages}>
      <section className="home-page">
        <Search />

        <Suspense
          key={`${searchQuery}-${currentPage}`}
          fallback={<CatalogLoading />}
        >
          <CatalogClientHandler
            initialQuery={searchQuery}
            currentPage={currentPage}
            totalPages={totalPages}
          >
            <div className="cards-content">
              <CatalogData
                data={resultData.data || []}
                searchQuery={searchQuery}
                currentPage={currentPage}
              />
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
        </Suspense>
      </section>
    </NextIntlClientProvider>
  );
}
