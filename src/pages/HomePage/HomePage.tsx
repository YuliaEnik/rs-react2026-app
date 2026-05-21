import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import getURL from "../../Api/api";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import Search from "../../Components/Search/Search";
import CardList from "../../Components/CardList/CardList";
import type { IData, IHomeState } from "../../types/types";
import Pagination from "../../Components/Pagination/Pagination";
import DetailsPage from "../DetailsPage/DetailsPage";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { PAGINATION } from "../../constants/numbers";
import { ERROR_MESSAGES } from "../../constants/text";
import "./HomePage.scss";

const HomePage = () => {
  const { page, details } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEYS.ITEMS, "");
  const [appState, setAppState] = useState<IHomeState>({
    loading: true,
    repos: null,
    error: null,
  });

  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<IData | null>(null);

  const getApi = useCallback(async (): Promise<void> => {
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
      repos: null,
      error: null,
    }));

    try {
      const response = await getURL(searchQuery, page);

      if (response && response.data) {
        setAppState({
          loading: false,
          repos: response.data,
          error: null,
        });
        setTotalPages(Math.ceil(response.total / PAGINATION.LIMIT));
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

  useEffect(() => {
    if (!details) {
      setSelectedCard(null);
    }
  }, [details]);

  const handleSearch = (searchValue: string) => {
    if (searchValue === searchQuery || appState.loading) return;
    setSearchQuery(searchValue);
    navigate({
      search: (prev) => ({ ...prev, page: 1 }),
    });
  };

  const handlePageChange = (newPage: number) => {
    if (appState.loading) return;
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleCardClick = useCallback(
    (id: number) => {
      const card = appState.repos?.find((p) => p.id === id);
      if (card) {
        setSelectedCard(card);
      }
      navigate({
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          details: id,
        }),
        resetScroll: false,
      });
    },
    [appState.repos, navigate],
  );

  const closeDetails = useCallback(() => {
    setSelectedCard(null);
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.details;
        return newSearch;
      },
      resetScroll: false,
    });
  }, [navigate]);

  const handleMainPanelClick = () => {
    if (details) {
      closeDetails();
    }
  };

  const shouldShowPagination = useMemo(
    () => !appState.loading && appState.repos && appState.repos.length > 0,
    [appState.loading, appState.repos],
  );

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Search onSearch={handleSearch} />
        <div className="cards-content" onClick={handleMainPanelClick}>
          <CardList
            loading={appState.loading}
            repos={appState.repos}
            error={appState.error}
            searchQuery={searchQuery}
            onCardClick={handleCardClick}
            onRetry={getApi}
          />
          <DetailsPage
            isActive={!!details && !!selectedCard}
            closeDetails={closeDetails}
            card={selectedCard}
          />
        </div>
        {shouldShowPagination && (
          <Pagination
            page={page || 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </ErrorBoundary>
  );
};

export default HomePage;
