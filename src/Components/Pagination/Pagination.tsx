import "./Pagination.scss";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, totalPages, onPageChange }: Props) => {
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
        &laquo; Prev
      </button>
      <span className="page-info">
        {" "}
        {page} / {totalPages || 1}{" "}
      </span>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages || totalPages === 0}
      >
        Next &raquo;
      </button>
    </div>
  );
};
