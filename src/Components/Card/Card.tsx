"use client";
import React, { useState } from "react";
import type { CardState, IData } from "../../types/types";
import { useTranslations } from "next-intl";
import { useStore } from "../../store/useStore";
import { Checkbox } from "../CheckBox/CheckBox";
import Image from "next/image";
import { useShallow } from 'zustand/react/shallow';
import "./Card.scss";
interface CardProps extends IData {
  hideCheckbox?: boolean;
}

const Card: React.FC<CardProps> = (props) => {
  const [imgError, setImgError] = useState<CardState["imgError"]>(false);
  const t = useTranslations("card");

  const { selectedCards, toggleCard } = useStore(
  useShallow((state) => ({
    selectedCards: state.selectedCards,
    toggleCard: state.toggleCard,
  }))
);

  const isChecked = selectedCards.some((item) => item.id === props.id);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleCard(props);
  };

  return (
    <li className="card-wrapper" data-testid="card" onClick={handleClick}>
      <div className="card-image-box">
        {props.images?.web?.url && !imgError ? (
          <Image
            src={props.images.web.url}
            fill
            loading="lazy"
            unoptimized={true}
            alt={props.title}
            onError={() => setImgError(true)}
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="image-placeholder">{t("imageNotAvailable")}</div>
        )}
      </div>
      <h3>
        {t("author")}
        <i className="card-value">
          {props.creators?.[0]?.description || t("unknown")}
        </i>
      </h3>
      <h3>
        {t("name")}
        <i className="card-value">{props.title}</i>
      </h3>
      <h3>
        {t("year")}
        <i className="card-value">{props.creation_date || t("unknown")}</i>
      </h3>
      {props.isSelected && props.description && (
        <div className="card-description">
          <h3>{t("description")}</h3>
          <p>{props.description}</p>
        </div>
      )}

      {!props.isSelected && !props.hideCheckbox && (
        <div
          className="card-checkbox-container"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            id={props.id}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      )}
    </li>
  );
};

export default Card;
