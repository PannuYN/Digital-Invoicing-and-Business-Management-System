import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';
import './css/Pagination.css'; // Import the CSS file for styling

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageChange = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pagesToShow = [];
    const maxPageButtons = 3; // Number of page buttons to show

    // If there are fewer pages than the maximum number of page buttons, show all pages
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      // Calculate start and end page numbers
      let startPage = Math.max(activePage - Math.floor(maxPageButtons / 2), 1);
      let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

      // Adjust start and end page numbers if nearing the beginning or end of pages
      if (endPage - startPage < maxPageButtons - 1) {
        startPage = endPage - maxPageButtons + 1;
      } else if (endPage === totalPages) {
        startPage = totalPages - maxPageButtons + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }
    }

    return pagesToShow;
  };

  return (
    <Pagination className="custom-pagination"> {/* Add custom class name */}
      <Pagination.Prev
        onClick={() => handlePageChange(Math.max(1, activePage - 1))}
        disabled={activePage === 1}
      />
      {getPageNumbers().map((page) => (
        <Pagination.Item
          key={page}
          active={page === activePage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(Math.min(totalPages, activePage + 1))}
        disabled={activePage === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
