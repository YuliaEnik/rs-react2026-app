"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import type { SearchProps } from "../../types/types";
import "./Search.scss";
import { useSearchParams } from "next/navigation";
import { STORAGE_KEYS } from "../../constants/localStoragesKeys";
import { handleSearchAction } from "../../app/actions";

const Search: React.FC<SearchProps> = () => {
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const queryFromUrl = searchParams?.get("query") || "";
  const t = useTranslations("search");

  return (
    <span className="search-wrap">
      <form action={handleSearchAction} className="search">
        <input type="hidden" name="locale" value={currentLocale} />
        <input
          type="text"
          name="query"
          className="search-form_input"
          placeholder={t("placeholder")}
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
