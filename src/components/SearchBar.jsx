import React from 'react';

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  genderFilter,
  setGenderFilter,
  showFavoritesOnly,
  setShowFavoritesOnly,
  favoritesCount,
}) {
  return (
    <section className="controls-card">
      <div className="search-row">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre (ej. Rick Sanchez, Morty, Pickle Rick)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="filters-row">
        <div className="filter-groups">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={showFavoritesOnly}
          >
            <option value="">Todos los Estados</option>
            <option value="alive">Vivo (Alive)</option>
            <option value="dead">Muerto (Dead)</option>
            <option value="unknown">Desconocido (Unknown)</option>
          </select>

          <select
            className="filter-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            disabled={showFavoritesOnly}
          >
            <option value="">Todos los Géneros</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin Género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <button
          className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <span>{showFavoritesOnly ? '★ Mostrando Favoritos' : '☆ Ver Favoritos'}</span>
          <span>({favoritesCount})</span>
        </button>
      </div>
    </section>
  );
}
