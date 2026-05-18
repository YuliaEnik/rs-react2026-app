import React, { useState } from "react";
import "./Search.scss";

type SearchProps = { 
  onSearch: (value: string) => void 
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>(() => {
    try {
      return localStorage.getItem("items") || "";
    } catch {
      return "";
    }
  });

  const handleSearch = () => {
    const trimmedValue = value.trim();

    if (onSearch) {
      onSearch(trimmedValue);
    }
    
    try {
      if (trimmedValue) {
        localStorage.setItem("items", trimmedValue);
      } else {
        localStorage.removeItem("items");
      }
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
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
        <button
          onClick={handleSearch}
          className="search-button"
        ></button>
      </div>
    </span>
  );
};

export default Search;
