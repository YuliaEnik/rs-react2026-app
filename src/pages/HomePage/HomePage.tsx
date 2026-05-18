import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import getURL from "../../Api/api";
import Card from "../../Components/Card/Card";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import Search from "../../Components/Search/Search";
import SkeletonCard from "../../Components/Skeleton/Skeleton";
import type { IData, IHomeState } from "../../Data/types";
import "./HomePage.scss";
import Pagination from "../../Components/Pagination/Pagination";
import { ERROR_MESSAGES, PAGINATION, STORAGE_KEYS } from "../../Data/constants";
import DetailsPage from "../DetailsPage/DetailsPage";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const HomePage = () => {
  const { page } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [searchQuery, setSearchQuery] = useLocalStorage(STORAGE_KEYS.ITEMS, "");
  const [appState, setAppState] = useState<IHomeState>({
    loading: true,
    repos: null,
    error: null,
  });

  const [totalPages, setTotalPages] = useState<number>(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState<IData | null>(null);

  const getApi = useCallback(async (): Promise<void> => {
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
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
        setShowDetails(true);
      }
      navigate({
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          details: id,
        }),
      });
    },
    [appState.repos, navigate],
  );

  const closeDetails = useCallback(() => {
    setShowDetails(false);
    setSelectedCard(null);
    navigate({
      search: (prev) => {
        const newSearch = { ...prev };
        delete newSearch.details;
        return newSearch;
      },
    });
  }, [navigate]);

  const handleMainPanelClick = () => {
    if (showDetails) {
      closeDetails();
    }
  };

  const shouldShowSkeletons = useMemo(
    () => appState.loading && !appState.repos,
    [appState.loading, appState.repos]
  );

  const hasNoResults = useMemo(
    () =>
      appState.repos?.length === 0 && !appState.loading && searchQuery !== "",
    [appState.repos?.length, appState.loading, searchQuery],
  );

  const showError = useMemo(
    () => !!appState.error && !appState.loading,
    [appState.error, appState.loading],
  );

  const shouldShowPagination = useMemo(
    () => !appState.loading && appState.repos && appState.repos.length > 0,
    [appState.loading, appState.repos],
  );

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Search onSearch={handleSearch} />
        <div className="cards-content" onClick={handleMainPanelClick}>
          <ul className="cards-wrapper" onClick={(e) => e.stopPropagation()} >
             {shouldShowSkeletons && 
              Array.from({ length: PAGINATION.SKELETON_COUNT }, (_, i) => (
                <SkeletonCard key={i} />
              ))
            }

            {!appState.loading && hasNoResults && (
              <div className="loading">
                <p>Sorry, nothing found for &quot;{searchQuery}&quot;</p>
              </div>
            )}

            {showError && (
              <div className="error-message">
                <p>{appState.error}</p>
                <button onClick={() => getApi()}>Try Again</button>
              </div>
            )}

            {appState.repos?.map((cardData: IData) => (
              <Card {...cardData} key={cardData.id} onClick={handleCardClick} />
            ))}
          </ul>
          <DetailsPage
            isActive={showDetails}
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
