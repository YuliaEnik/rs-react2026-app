"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { useStore } from "../../store/useStore";
import "./SelectionFlyout.scss";

export const SelectionFlyout: React.FC = () => {
  const selectedCards = useStore((state) => state.selectedCards);
  const unselectAll = useStore((state) => state.unselectAll);
  const t = useTranslations("selectionFlyout");
  const currentLocale = useLocale();
  const count = selectedCards.length;

   if (count === 0) return null;

  return (
    <div className="flyout-container" data-testid="selection-flyout">
      <div className="flyout-content">
        <span className="flyout-count">
          {t("count")} <strong className="flyout-count-number">{count}</strong>
        </span>

        <div className="flyout-buttons">
          <button type="button" onClick={unselectAll} className="btn-unselect">
            {t("buttonUnselect")}
          </button>
          <form 
            action={`/${currentLocale}/api/download-csv`} 
            method="POST"
            className="download-form"
          >
            <input 
              type="hidden" 
              name="cards" 
              value={JSON.stringify(selectedCards)} 
            />
            <button type="submit" className="btn-download">
              {t("buttonDownLoad")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
