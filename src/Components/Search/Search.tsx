"use client";

import React from "react";
import type { SearchProps } from "../../types/types";
import { TEXT } from "../../constants/text";
import "./Search.scss";
import { useSearchParams } from "next/navigation";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { handleSearchAction } from "../../app/catalog/actions";

const Search: React.FC<SearchProps> = () => {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams?.get("query") || "";

  return (
    <span className="search-wrap">
      <form action={handleSearchAction} className="search">
        <input
          type="text"
          name="query"
          className="search-form_input"
          placeholder={TEXT.search.placeholder}
          defaultValue={queryFromUrl}
          onChange={(e) => {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                STORAGE_KEYS.SEARCH_QUERY,
                e.target.value,
              );
            }
          }}
        />
        <button className="search-button"></button>
      </form>
    </span>
  );
};

export default Search;
