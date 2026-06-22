"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Card from "../Card/Card";
import SkeletonCard from "../Skeleton/Skeleton";
import type { CardListProps, IData } from "../../types/types";
import { TEXT } from "../../constants/text";
import { PAGINATION } from "../../constants/numbers";
import "./CardList.scss";
import { handleSelectAction } from "../../app/catalog/actions";

const CardList: React.FC<CardListProps> = ({
  loading,
  repos,
  error,
  searchQuery,
  onCardClick,
}) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get("page") || "1";
  const shouldShowSkeletons = loading && !repos;
  const hasNoResults = repos?.length === 0 && !loading && searchQuery !== "";
  const showError = !!error && !loading;

  return (
    <ul className="cards-wrapper" onClick={(e) => e.stopPropagation()}>
      {shouldShowSkeletons &&
        Array.from({ length: PAGINATION.CARDS_PER_PAGE }, (_, i) => (
          <SkeletonCard key={i} />
        ))}

      {hasNoResults && (
        <div className="loading">
          <p>
            {TEXT.catalog.noResults} &quot;{searchQuery}&quot;
          </p>
        </div>
      )}

      {showError && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {repos?.map((cardData: IData) => {
        if (onCardClick) {
          return <Card {...cardData} key={cardData.id} onClick={onCardClick} />;
        }

        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("id", String(cardData.id));

        return (
          <form
            action={handleSelectAction}
            key={cardData.id}
            className="cardlist-form"
          >
            <input type="hidden" name="id" value={cardData.id} />
            <input type="hidden" name="page" value={currentPage} />
            <input type="hidden" name="query" value={searchQuery} />

            <button type="submit" className="cardlist-btn">
              <Card {...cardData} onClick={() => {}} />
            </button>
          </form>
        );
      })}
    </ul>
  );
};

export default CardList;
