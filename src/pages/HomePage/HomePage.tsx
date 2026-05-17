import { useCallback, useEffect, useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { getURL } from "../../Api/api";
import { Card } from "../../Components/Card/Card";
import { ErrorBoundary } from "../../Components/ErrorBoundary/ErrorBoundary";
import { ErrorButton } from "../../Components/ErrorButton/ErrorButton";
import { Search } from "../../Components/Search/Search";
import { SkeletonCard } from "../../Components/Skeleton/Skeleton";
import type { IData, IHomeState } from "../../Data/data";
import "./HomePage.scss";
import { Pagination } from "../../Components/Pagination/Pagination";

const HomePage = () => {
  const { page } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });
  const [appState, setAppState] = useState<IHomeState>({
    loading: true,
    repos: null,
    error: null,
  });

  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(
    () => localStorage.getItem("items") || "",
  );

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
        const limit = 12;
        const totalCalc = Math.ceil(response.total / limit);
        setTotalPages(totalCalc);
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }));
    }
  }, [searchQuery, page]);

  useEffect(() => {
    getApi();
  }, [getApi]);

  const handleSearch = (searchValue: string) => {
    if (searchValue === searchQuery || appState.loading) return;
    localStorage.setItem("items", searchValue);
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

  const hasNoResults =
    appState.repos &&
    appState.repos.length === 0 &&
    !appState.loading &&
    searchQuery !== "";
  const showError = appState.error && !appState.loading;
  const skeletonItems = Array.from({ length: 12 }, (_, i) => (
    <SkeletonCard key={i} />
  ));

  return (
    <ErrorBoundary>
      <section className="home-page">
        <Search onSearch={handleSearch} />
        <ul className="cards-wrapper">
          {appState.loading && !appState.repos && skeletonItems}

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

          {appState.repos &&
            appState.repos.map((cardData: IData) => (
              <Card {...cardData} key={cardData.id} />
            ))}
        </ul>
        {!appState.loading && appState.repos && appState.repos.length > 0 && (
          <Pagination
            page={page || 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <ErrorButton />
      </section>
    </ErrorBoundary>
  );
};

export { HomePage };
