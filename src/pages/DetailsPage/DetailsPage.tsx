import type { PropsWithChildren } from "react";
import Card from "../../Components/Card/Card";
import type { IDetails } from "../../types/types";
import { CSS_CLASSES } from "../../constants/cssClasses";
import "./DetailsPage.scss";

const DetailsPage = ({
  closeDetails,
  card,
  isActive,
}: PropsWithChildren<IDetails>) => {
  if (!isActive) return null;

  const className = `modal-page ${isActive ? CSS_CLASSES.ACTIVE : CSS_CLASSES.INACTIVE}`;

  return (
    <div className={className}>
      {isActive && card && (
        <div>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div className="btn-modal" onClick={closeDetails}>
                <p className="btn-modal__img">X</p>
              </div>
            </div>
            <Card {...card} isSelected={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
