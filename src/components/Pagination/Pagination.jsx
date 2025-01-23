import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      {/* Pagination Controls */}
      <nav aria-label="Page navigation" className="mx-auto">
        <ul className="pagination justify-content-center mb-0">
          {/* Previous Button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Button
              variant="light"
              className="page-link"
              onClick={handlePrevPage}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <Button
                  variant="light"
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              </li>
            );
          })}

          {/* Next Button */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <Button
              variant="light"
              className="page-link"
              onClick={handleNextPage}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
