"use client";

import { useTranslations } from "next-intl";
import "./Pagination.scss";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
  const t = useTranslations("pagination");

  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="pagination-controls">
      <button onClick={handlePrevPage} disabled={page === 1}>
        {t("prev")}
      </button>
      <span className="page-info">
        {page} / {totalPages || 1}
      </span>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages || totalPages === 0}
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
