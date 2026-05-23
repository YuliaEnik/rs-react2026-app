import React, { useState } from "react";
import type { CardState, IData } from "../../types/types";
import { TEXT } from "../../constants/text";
import { useStore } from "../../store/useStore";
import { Checkbox } from "../CheckBox/CheckBox";
import "./Card.scss";

const Card: React.FC<IData> = (props: IData) => {
  const [imgError, setImgError] = useState<CardState["imgError"]>(false);

  const selectedIds = useStore((state) => state.selectedIds);
  const toggleCard = useStore((state) => state.toggleCard);

  const isChecked = selectedIds.includes(props.id);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  const handleCheckboxChange = () => {
    toggleCard(props.id);
  };

  return (
    <li className="card-wrapper" data-testid="card" onClick={handleClick}>
      <div className="card-image-box">
        {props.images?.web?.url && !imgError ? (
          <img
            src={props.images.web.url}
            alt={props.title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">{TEXT.card.imageNotAvailable}</div>
        )}
      </div>
      <h3>
        {TEXT.card.author}{" "}
        <i className="card-value">
          {props.creators?.[0]?.description || "Unknown"}
        </i>
      </h3>
      <h3>
        {TEXT.card.name} <i className="card-value">{props.title}</i>
      </h3>
      <h3>
        {TEXT.card.year}{" "}
        <i className="card-value">{props.creation_date || "Unknown"}</i>
      </h3>
      {props.isSelected && props.description && (
        <div className="card-description">
          <h3>{TEXT.card.description}</h3>
          <p>{props.description}</p>
        </div>
      )}
      {!props.isSelected && (
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
