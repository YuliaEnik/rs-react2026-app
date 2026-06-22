"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useStore } from "../../store/useStore";
import "./SelectionFlyout.scss";

export const SelectionFlyout: React.FC = () => {
  const selectedCards = useStore((state) => state.selectedCards);
  const unselectAll = useStore((state) => state.unselectAll);
  const t = useTranslations("selectionFlyout");

  const count = selectedCards.length;

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch("/api/download-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedCards),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "selected_artworks.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Server CSV generation failed:", error);
    }
  };

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
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="btn-download"
          >
            {t("buttonDownLoad")}
          </button>
        </div>
      </div>
    </div>
  );
};
