"use client";

import React, { useEffect } from "react";
import type { SearchProps } from "../../types/types";
import { TEXT } from "../../constants/text";
import "./Search.scss";
import { useSearchParams } from "next/navigation";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { handleSearchAction } from "../../app/catalog/actions";

const Search: React.FC<SearchProps> = () => {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams?.get("query") || "";

  const [value, setValue] = useLocalStorage(
    STORAGE_KEYS.SEARCH_QUERY,
    queryFromUrl,
  );

  useEffect(() => {
    if (queryFromUrl !== value) {
      setValue(queryFromUrl);
    }
  }, [queryFromUrl]);

  return (
    <span className="search-wrap">
      <div className="search">
        <form action={handleSearchAction} className="search">
          <input
            type="text"
            name="query"
            className="search-form_input"
            placeholder={TEXT.search.placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="search-button"></button>
        </form>
      </div>
    </span>
  );
};

export default Search;
