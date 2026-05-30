import { type JSX, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { Route } from "../../routes/catalog/route";
import fetchArtworks from "../../Api/api";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import CardList from "../../Components/CardList/CardList";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import Pagination from "../../Components/Pagination/Pagination";
import Search from "../../Components/Search/Search";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { PAGINATION } from "../../constants/numbers";
import { ERROR_MESSAGES } from "../../constants/text";
import { SelectionFlyout } from "../../Components/SelectionFlyout/SelectionFlyout";
import type { IHomeState } from "../../types/types";
import "./HomePage.scss";

function HomePage(): JSX.Element {
  const navigate = useNavigate({ from: "/catalog" });

  const { page } = Route.useSearch();

  const [searchQuery, setSearchQuery] = useLocalStorage(
    STORAGE_KEYS.SEARCH_QUERY,
    "",
  );
  const [appState, setAppState] = useState<IHomeState>({
    loading: true,
    repos: null,
    error: null,
  });

  const [totalPages, setTotalPages] = useState<number>(1);

  const getApi = useCallback(async (): Promise<void> => {
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
      repos: null,
      error: null,
    }));
    try {
      const response = await fetchArtworks(searchQuery, page);
      if (response && response.data) {
        setAppState({ loading: false, repos: response.data, error: null });
        setTotalPages(Math.ceil(response.total / PAGINATION.CARDS_PER_PAGE));
      } else {
        throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        loading: false,
        repos: null,
        error:
          error instanceof Error ? error.message : ERROR_MESSAGES.UNEXPECTED,
      }));
    }
  }, [searchQuery, page]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  const handleSearch = (searchValue: string) => {
    if (searchValue === searchQuery || appState.loading) return;
    setSearchQuery(searchValue);
    void navigate({
      search: (prev) => ({ ...prev, page: 1 }),
    });
  };

  const handlePageChange = (newPage: number) => {
    if (appState.loading) return;
    void navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleCardClick = useCallback(
    (id: number) => {
      void navigate({
        to: "/catalog/$id",
        params: { id: String(id) },
      });
    },
    [navigate],
  );

  const shouldShowPagination = useMemo(
    () => !appState.loading && appState.repos && appState.repos.length > 0,
    [appState.loading, appState.repos],
  );

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Search onSearch={handleSearch} />
        <div className="cards-content">
          <CardList
            loading={appState.loading}
            repos={appState.repos}
            error={appState.error}
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
