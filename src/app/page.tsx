// app/page.tsx
import { Suspense } from "react";
import CardList from "../Components/CardList/CardList";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";
import { PAGINATION } from "../constants/numbers";
import { fetchArtworksQueryFn } from "../hooks/useArtworksQueries";
import CatalogClientHandler from "./catalog/CatalogClientHandler";
import CatalogLoading from "./catalog/loading";


// Статическая генерация для главной страницы
export default async function HomePage() {
  // Получаем данные для первой страницы без поиска
  let initialData = null;
  let errorMsg = null;
  
  try {
    initialData = await fetchArtworksQueryFn("", 1);
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "Error loading data";
  }

  const total = initialData?.total || 0;
  const totalPages = Math.ceil(total / PAGINATION.CARDS_PER_PAGE) || 1;

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Suspense fallback={<CatalogLoading />}>
          <CatalogClientHandler
            initialQuery=""
            currentPage={1}
            totalPages={totalPages}
          />
        </Suspense>
        
        <div className="cards-content">
          <CardList
            loading={false}
            repos={initialData?.data || null}
            error={errorMsg}
            searchQuery=""
          />
        </div>
      </section>
    </ErrorBoundary>
  );
}
