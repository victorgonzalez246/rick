import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container" aria-label="Navegación de páginas">
      <button
        className="page-btn"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ◀ Anterior
      </button>

      <div className="page-info">
        Página <span>{currentPage}</span> de <span>{totalPages}</span>
      </div>

      <button
        className="page-btn"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente ▶
      </button>
    </nav>
  );
}
