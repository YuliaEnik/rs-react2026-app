"use client";

import React, { useState } from "react";
import type { SearchProps } from "../../types/types";
import { TEXT } from "../../constants/text";
import "./Search.scss";

const Search: React.FC<SearchProps> = ({ onSearch }) => {

  const [value, setValue] = useState("");

  const handleSearch = () => {
    const trimmedValue = value.trim();
    if (onSearch) {
      onSearch(trimmedValue);
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
          placeholder={TEXT.search.placeholder}
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
