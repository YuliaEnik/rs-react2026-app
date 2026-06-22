"use client";

import { handleCloseAction } from "../../catalog/actions";
import "./../../../pages/DetailsPage/DetailsPage.scss";

interface CloseButtonProps {
  currentPage: string;
  searchQuery: string;
}

export default function CloseButton({
  currentPage,
  searchQuery,
}: CloseButtonProps) {
  return (
    <form action={handleCloseAction}>
      <input type="hidden" name="page" value={currentPage} />
      <input type="hidden" name="query" value={searchQuery} />

      <button type="submit" className="btn-modal">
        <p className="btn-modal__img">✕</p>
      </button>
    </form>
  );
}
