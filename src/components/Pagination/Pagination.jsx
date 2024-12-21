import "../../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, isLoading, onPageChange }) => {
  return (
    <nav className="pagination-controls">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className="pagination-button"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
