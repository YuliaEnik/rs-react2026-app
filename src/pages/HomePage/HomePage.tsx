import React from 'react';
import { Card } from '../../Components/Card/Card';
import type { IDataApi, IData } from '../../Data/data';
import { getURL } from '../../Api/api';
import './HomePage.scss';
import { Search } from '../../Components/Search/Search';
import { ErrorButton } from '../../Components/ErrorButton/ErrorButton';
import { SkeletonCard } from '../../Components/Skeleton/Skeleton';
import { ErrorBoundary } from '../../Components/ErrorBoundary/ErrorBoundary';

class HomePage extends React.Component<unknown, IDataApi> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      repos: null,
      isLoading: false,
      currentPage: 1,
      hasMore: true,
      searchQuery: '',
      errorMessage: null,
    };
  }

  componentDidMount(): void {
    this.getApi();
  }

  getApi = async (search?: string, isLoadMore: boolean = false) => {
    const searchQuery = search !== undefined ? search : (localStorage.getItem('items') || '');
    const currentPage = isLoadMore ? this.state.currentPage + 1 : 1;
    
    if (!isLoadMore) {
      this.setState({
        isLoading: true,
        repos: null,
        currentPage: 1,
        searchQuery: searchQuery,
        errorMessage: null,
      });
    } else {
      this.setState({ isLoading: true, errorMessage: null });
    }

    try {
      const response = await getURL(searchQuery, currentPage);
      
      this.setState((prevState) => ({
        repos: isLoadMore 
          ? [...(prevState.repos || []), ...response.data]
          : response.data,
        isLoading: false,
        currentPage: currentPage,
        hasMore: response.hasMore,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('API Error:', error);
      this.setState({ 
        isLoading: false, 
        errorMessage: errorMessage,
      });
    }
  };

  handleSearch = (searchValue: string) => {
    if (searchValue === this.state.searchQuery) {
      return; 
    }
    this.getApi(searchValue, false);
  };

  loadMore = () => {
    if (!this.state.isLoading && this.state.hasMore) {
      this.getApi(undefined, true);
    }
  };

  render() {
  const { repos, isLoading, searchQuery, errorMessage, hasMore } = this.state;
  const hasNoResults = repos && repos.length === 0 && !isLoading && searchQuery !== '';
  const showError = errorMessage && !isLoading;
  const skeletonItems = Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />);
  
  return (
    <ErrorBoundary>
    <main className="main">
      <div className="home-page">
        <Search onSearch={this.handleSearch}/>

        <ul className="cards-wrapper">
          {isLoading && !repos && skeletonItems } 

          {!isLoading && hasNoResults && (
            <div className="loading">
              <p>Sorry, nothing found for &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {!isLoading && showError && (
            <div className="error-message">
              <p>{errorMessage}</p>
              <button onClick={() => this.getApi(this.state.searchQuery, false)}>
                Try Again
              </button>
            </div>
          )}

          {repos && repos.map((cardData: IData) => (
            <Card {...cardData} key={cardData.id} />
          ))}

           {isLoading && repos && skeletonItems.slice(0, 4)}

        </ul>
        <div className="pagination">
          {!isLoading && hasMore && repos && repos.length > 0 && (
            <button onClick={this.loadMore}>
              Load More
            </button>
          )}
        </div>

        <ErrorButton />
      </div>
    </main>
    </ErrorBoundary>
  );
}

}

export { HomePage };
