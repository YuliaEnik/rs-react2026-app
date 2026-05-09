import React from 'react';
import { Card } from '../../Components/Card/Card';
import type { IDataApi, IData } from '../../Data/data';
import { getURL } from '../../Api/api';
import './HomePage.scss';

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

  getApi = async (isLoadMore: boolean = false) => {
    const search = localStorage.getItem('items') || '';
    const currentPage = isLoadMore ? this.state.currentPage + 1 : 1;
    
    if (!isLoadMore) {
      this.setState({
        isLoading: true,
        repos: null,
        currentPage: 1,
      });
    } else {
      this.setState({ isLoading: true });
    }

    try {
      const response = await getURL(search, currentPage);
      
      this.setState((prevState) => ({
        repos: isLoadMore 
          ? [...(prevState.repos || []), ...response.data]
          : response.data,
        isLoading: false,
        currentPage: currentPage,
        hasMore: response.hasMore,
        searchQuery: search,
      }));
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    if (!this.state.isLoading && this.state.hasMore) {
      this.getApi(true);
    }
  };

  render() {
    return (
      <main className="main">
        <div className="home-page">
        <ul className="cards-wrapper">
          {this.state.isLoading && this.state.repos === null && (
            <p className="loading">Loading...</p>
          )}
          {this.state.repos &&
            this.state.repos.map((cardData: IData) => (
              <Card {...cardData} key={cardData.id} />
            ))}
        </ul>
        
        {this.state.repos && this.state.repos.length > 0 && (
          <div className="pagination">
            {this.state.isLoading && <p className="loading">Loading...</p>}
            {!this.state.isLoading && this.state.hasMore && (
              <button onClick={this.loadMore}>
                Load More
              </button>
            )}
          </div>
        )}
        </div>
      </main>
    );
  }
}

export { HomePage };
