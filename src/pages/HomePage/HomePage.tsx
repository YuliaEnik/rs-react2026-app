import { type JSX, useMemo } from "react";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { Route } from "../../routes/catalog/route";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CardList from "../../Components/CardList/CardList";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import Pagination from "../../Components/Pagination/Pagination";
import Search from "../../Components/Search/Search";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { PAGINATION } from "../../constants/numbers";
import { SelectionFlyout } from "../../Components/SelectionFlyout/SelectionFlyout";
import { useGetArtworks } from "../../hooks/useArtworksQueries";
import "./HomePage.scss";

function HomePage(): JSX.Element {
  const navigate = useNavigate({ from: "/catalog" });

  const { page = 1 } = Route.useSearch();

  const [searchQuery, setSearchQuery] = useLocalStorage(
    STORAGE_KEYS.SEARCH_QUERY,
    "",
  );
  const { data, error, isLoading } = useGetArtworks(searchQuery, page);

  const totalPages = useMemo(() => {
    if (!data?.total) return 1;
    return Math.ceil(data.total / PAGINATION.CARDS_PER_PAGE);
  }, [data?.total]);

  const handleSearch = (searchValue: string) => {
    if (searchValue === searchQuery || isLoading) return;
    setSearchQuery(searchValue);
    void navigate({
      search: (prev) => ({ ...prev, page: 1 }),
    });
  };

  const handlePageChange = (newPage: number) => {
    if (isLoading) return;
    void navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleCardClick = (id: number) => {
    void navigate({
      to: "/catalog/$id",
      params: { id: String(id) },
    });
  };

  const shouldShowPagination = !isLoading && data?.data && data.data.length > 0;

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Search onSearch={handleSearch} />
        <div className="cards-content">
          <CardList
            loading={isLoading}
            repos={data?.data || null}
            error={error instanceof Error ? error.message : null}
            searchQuery={searchQuery}
            onCardClick={handleCardClick}
          />
          <Outlet />
        </div>
        {shouldShowPagination && (
          <Pagination
            page={page || 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
      <SelectionFlyout />
    </ErrorBoundary>
  );
}

export default HomePage;
