import React from "react";
import "./Search.scss";
import type { SearchProps } from "../../Data/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../Data/constants";

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = useLocalStorage(STORAGE_KEYS.ITEMS, "");

  const handleSearch = () => {
    const trimmedValue = value.trim();
    if (onSearch) {
      onSearch(trimmedValue);
    }
    setValue(trimmedValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <span className="search-wrap">
      <div className="search">
        <input
          type="text"
          name="text"
          className="search-form_input"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="search-button"></button>
      </div>
    </span>
  );
};

export default Search;
