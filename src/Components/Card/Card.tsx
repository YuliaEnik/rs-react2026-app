import React, { useState } from "react";
import type { CardState, IData } from "../../types/types";
import "./Card.scss";
import { TEXT } from "../../constants/text";

const Card: React.FC<IData> = ({
  id,
  title,
  creators,
  creation_date,
  images,
  description,
  onClick,
  isSelected,
}) => {
  const [imgError, setImgError] = useState<CardState["imgError"]>(false);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <li className="card-wrapper" data-testid="card" onClick={handleClick}>
      <div className="card-image-box">
        {images?.web?.url && !imgError ? (
          <img
            src={images.web.url}
            alt={title}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">{TEXT.card.imageNotAvailable}</div>
        )}
      </div>
      <h3>
        {TEXT.card.author}
        <i className="card-value">
          {creators?.[0]?.description || TEXT.card.unknown}
        </i>
      </h3>
      <h3>
        {TEXT.card.name}
        <i className="card-value">{title}</i>
      </h3>
      <h3>
        {TEXT.card.year}
        <i className="card-value">{creation_date || TEXT.card.unknown}</i>
      </h3>
      {isSelected && description && (
        <div className="card-description">
          <h3>{TEXT.card.description || TEXT.card.unknown}</h3>
          <p>{description}</p>
        </div>
      )}
    </li>
  );
};

export default Card;
