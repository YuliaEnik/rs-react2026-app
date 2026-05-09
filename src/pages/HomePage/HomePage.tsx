import React from 'react';
import { Card } from '../../Components/Card/Card';
import type { IDataApi, IData } from '../../Data/data';
import { getURL } from '../../Api/api';
import './HomePage.scss';
import { Search } from '../../Components/Search/Search';

class HomePage extends React.Component<unknown, IDataApi> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      repos: null,
      isLoading: false,
      currentPage: 1,
      hasMore: true,
      searchQuery: '',
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
      });
    } else {
      this.setState({ isLoading: true });
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
      console.error(error);
      this.setState({ isLoading: false });
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
  const { repos, isLoading, searchQuery, hasMore } = this.state;
  const hasNoResults = repos && repos.length === 0 && !isLoading && searchQuery !== '';
  
  return (
    <main className="main">
      <div className="home-page">
        <Search onSearch={this.handleSearch}/>

        <ul className="cards-wrapper">

          {isLoading && !repos && (
            <p className="loading">Loading...</p>
          )}

          {hasNoResults && (
            <div className="loading">
              <p>Sorry, nothing found for &quot;{searchQuery}&quot;</p>
              <p>Try searching by artist name or painting title</p>
            </div>
          )}

          {repos && repos.map((cardData: IData) => (
            <Card {...cardData} key={cardData.id} />
          ))}
        </ul>
      
        <div className="pagination">

          {isLoading && repos && (
            <p className="loading">Loading...</p>
          )}

          {!isLoading && hasMore && repos && (
            <button onClick={this.loadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

}

export { HomePage };
