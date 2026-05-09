import React from 'react';
import './Search.scss';

type IState = { value: string };
type SearchProps = { onSearch: (value: string) => void };

class Search extends React.Component<SearchProps, IState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleSearch = () => {
  const trimmedValue = this.state.value.trim();

  this.props.onSearch(trimmedValue);

  if (trimmedValue) {
    localStorage.setItem('items', trimmedValue);
  } else {
    localStorage.removeItem('items');
  }
};
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
 };

  componentDidMount(): void {
    const savedValue = localStorage.getItem('items');
    if (savedValue) {
      this.setState({ value: savedValue });
      this.props.onSearch(savedValue);
    } else {
      this.props.onSearch('');
    }
  }

  render() {
    return (
      <header className="header">
        <div className="search">
          <input
            type="text"
            name="text"
            className="search-form_input"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} 
          />
          <button onClick={this.handleSearch} className="search-button">
          </button>
        </div>
      </header>
    );
  }
}

export { Search };
