import React from 'react';

export default function CharacterCard({ character, onSelect, isFavorite, onToggleFavorite }) {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'status-alive';
      case 'dead':
        return 'status-dead';
      default:
        return 'status-unknown';
    }
  };

  const translateStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Muerto';
      default:
        return 'Desconocido';
    }
  };

  return (
    <article className="character-card" onClick={() => onSelect(character)}>
      <div className="card-image-container">
        <img
          src={character.image}
          alt={character.name}
          className="card-image"
          loading="lazy"
        />
        <button
          className="fav-badge-btn"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(character);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-name" title={character.name}>
          {character.name}
        </h3>

        <div className={`status-badge ${getStatusClass(character.status)}`}>
          <span className="status-dot"></span>
          <span>
            {translateStatus(character.status)} - {character.species}
          </span>
        </div>

        <div className="card-info-item">
          <span className="info-label">Última ubicación:</span>
          <span className="info-value" title={character.location?.name}>
            {character.location?.name || 'Desconocida'}
          </span>
        </div>

        <div className="card-info-item">
          <span className="info-label">Origen:</span>
          <span className="info-value" title={character.origin?.name}>
            {character.origin?.name || 'Desconocido'}
          </span>
        </div>
      </div>
    </article>
  );
}
