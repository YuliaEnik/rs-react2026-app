"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Card from "../Card/Card";
import SkeletonCard from "../Skeleton/Skeleton";
import type { CardListProps, IData } from "../../types/types";
import { useLocale, useTranslations } from "next-intl";
import { PAGINATION } from "../../constants/numbers";
import { useStore } from "../../store/useStore";
import { Checkbox } from "../CheckBox/CheckBox";
import "./CardList.scss";
import { handleSelectAction } from "../../app/actions";

const CardList: React.FC<CardListProps> = ({
  loading,
  repos,
  error,
  searchQuery,
  onCardClick,
}) => {
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const t = useTranslations("catalog");
  const currentPage = searchParams?.get("page") || "1";
  const shouldShowSkeletons = loading && !repos;
  const hasNoResults = repos?.length === 0 && !loading && searchQuery !== "";
  const showError = !!error && !loading;

  const selectedCards = useStore((state) => state.selectedCards);
  const toggleCard = useStore((state) => state.toggleCard);

  return (
    <ul className="cards-wrapper" onClick={(e) => e.stopPropagation()}>
      {shouldShowSkeletons &&
        Array.from({ length: PAGINATION.CARDS_PER_PAGE }, (_, i) => (
          <SkeletonCard key={i} />
        ))}

      {hasNoResults && (
        <div className="loading">
          <p>
            {t("noResults")} &quot;{searchQuery}&quot;
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

        const isChecked = selectedCards.some((item) => item.id === cardData.id);

        return (
          <form
            action={handleSelectAction}
            key={cardData.id}
            className="cardlist-form"
          >
            <input type="hidden" name="id" value={cardData.id} />
            <input type="hidden" name="page" value={currentPage} />
            <input type="hidden" name="query" value={searchQuery} />
            <input type="hidden" name="locale" value={currentLocale} />

            <button
              type="button"
              className="cardlist-btn"
              onClick={(e) => {
                e.currentTarget.form?.requestSubmit();
              }}
            >
              <Card {...cardData} onClick={() => {}} hideCheckbox={true} />
            </button>

            {!cardData.isSelected && (
              <div
                className="card-checkbox-container"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  id={cardData.id}
                  checked={isChecked}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleCard(cardData);
                  }}
                />
              </div>
            )}
          </form>
        );
      })}
    </ul>
  );
};

export default CardList;
