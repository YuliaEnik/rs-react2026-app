"use client";

import { handleCloseAction } from "../../../actions";
import { useLocale } from "next-intl";
import "./../../../../pages/DetailsPage/DetailsPage.scss";

interface CloseButtonProps {
  currentPage: string;
  searchQuery: string;
}

export default function CloseButton({
  currentPage,
  searchQuery,
}: CloseButtonProps) {
  const currentLocale = useLocale();

  return (
    <form action={handleCloseAction}>
      <input type="hidden" name="page" value={currentPage} />
      <input type="hidden" name="query" value={searchQuery} />
      <input type="hidden" name="locale" value={currentLocale} />

      <button type="submit" className="btn-modal">
        <p className="btn-modal__img">✕</p>
      </button>
    </form>
  );
}
