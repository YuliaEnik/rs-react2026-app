import React from "react";
import { useStore } from "../../store/useStore";
import { downloadCSV } from "../../helpers/downloadCSV";
import { TEXT } from "../../constants/text";
import "./SelectionFlyout.scss";

export const SelectionFlyout: React.FC = () => {
  const selectedCards = useStore((state) => state.selectedCards);
  const unselectAll = useStore((state) => state.unselectAll);

  const count = selectedCards.length;

  if (count === 0) return null;

  return (
    <div className="flyout-container" data-testid="selection-flyout">
      <div className="flyout-content">
        <span className="flyout-count">
          {TEXT.selectionFlyout.count}{" "}
          <strong className="flyout-count-number">{count}</strong>
        </span>

        <div className="flyout-buttons">
          <button type="button" onClick={unselectAll} className="btn-unselect">
            {TEXT.selectionFlyout.buttonUnselect}
          </button>
          <button
            type="button"
            onClick={() => downloadCSV(selectedCards)}
            className="btn-download"
          >
            {TEXT.selectionFlyout.buttonDownLoad}
          </button>
        </div>
      </div>
    </div>
  );
};
