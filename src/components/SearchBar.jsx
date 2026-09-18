import React, { useState, useRef, useEffect } from 'react';

export default function SearchBar({ onSearch }) {
  const [localTerm, setLocalTerm] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(localTerm);
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [localTerm]);

  return (
    <div className="search-input-wrapper">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar personaje (ej. Rick, Morty, Pickle Rick)..."
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
      />
      {localTerm && (
        <button
          className="clear-search-btn"
          onClick={() => setLocalTerm('')}
          title="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}
