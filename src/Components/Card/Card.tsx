import React, { useState } from "react";
import type { CardState, IData } from "../../Data/types";
import "./Card.scss";

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
          <div className="image-placeholder">Image not available</div>
        )}
      </div>
      <h3>
        Author:{" "}
        <i className="card-value">{creators?.[0]?.description || "Unknown"}</i>
      </h3>
      <h3>
        Name: <i className="card-value">{title}</i>
      </h3>
      <h3>
        Year: <i className="card-value">{creation_date || "Unknown"}</i>
      </h3>
      {isSelected && description && (
        <div className="card-description">
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </li>
  );
};

export default Card;
