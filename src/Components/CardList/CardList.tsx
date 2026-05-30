import React from "react";
import Card from "../Card/Card";
import SkeletonCard from "../Skeleton/Skeleton";
import type { CardListProps, IData } from "../../types/types";
import { TEXT } from "../../constants/text";
import { PAGINATION } from "../../constants/numbers";
import "./CardList.scss";

const CardList: React.FC<CardListProps> = ({
  loading,
  repos,
  error,
  searchQuery,
  onCardClick,
}) => {
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

      {repos?.map((cardData: IData) => (
        <Card {...cardData} key={cardData.id} onClick={onCardClick} />
      ))}
    </ul>
  );
};

export default CardList;
