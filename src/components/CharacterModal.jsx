import React, { useEffect, useState } from 'react';
import { getEpisodesByUrls } from '../services/rickMortyApi';

export default function CharacterModal({ character, onClose, isFavorite, onToggleFavorite }) {
  const [episodes, setEpisodes] = useState([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    if (character?.episode && character.episode.length > 0) {
      setLoadingEpisodes(true);
      getEpisodesByUrls(character.episode)
        .then((data) => setEpisodes(data))
        .catch(() => setEpisodes([]))
        .finally(() => setLoadingEpisodes(false));
    }
  }, [character]);

  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Cerrar ventana">
          ✕
        </button>

        <div className="modal-header-hero">
          <div className="modal-avatar-glow">
            <img src={character.image} alt={character.name} />
          </div>
          <h2 className="modal-title">{character.name}</h2>
          <p style={{ color: '#97ce4c', fontSize: '0.95rem' }}>
            ID Universal: #{character.id} • Creado: {new Date(character.created).toLocaleDateString()}
          </p>
        </div>

        <div className="modal-details-grid">
          <div className="modal-info-box">
            <span className="info-label">Estado Vital</span>
            <p className="info-value" style={{ fontWeight: 600 }}>
              {character.status === 'Alive' ? '🟢 Vivo' : character.status === 'Dead' ? '🔴 Muerto' : '⚪ Desconocido'}
            </p>
          </div>

          <div className="modal-info-box">
            <span className="info-label">Especie y Subespecie</span>
            <p className="info-value">
              {character.species} {character.type ? `(${character.type})` : ''}
            </p>
          </div>

          <div className="modal-info-box">
            <span className="info-label">Género</span>
            <p className="info-value">{character.gender}</p>
          </div>

          <div className="modal-info-box">
            <span className="info-label">Dimensión de Origen</span>
            <p className="info-value">{character.origin?.name || 'Desconocido'}</p>
          </div>

          <div className="modal-info-box" style={{ gridColumn: 'span 2' }}>
            <span className="info-label">Ubicación Actual</span>
            <p className="info-value">{character.location?.name || 'Desconocida'}</p>
          </div>

          <div className="modal-episodes-section">
            <span className="info-label">
              Apariciones ({character.episode?.length || 0} episodios registrados):
            </span>
            {loadingEpisodes ? (
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 6 }}>
                Sintonizando frecuencias de transmisión...
              </p>
            ) : (
              <div className="episodes-list">
                {episodes.map((ep) => (
                  <span key={ep.id} className="episode-pill" title={ep.air_date}>
                    {ep.episode}: {ep.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '0 30px 25px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className={`fav-toggle-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(character)}
          >
            {isFavorite ? '❤️ Quitar de Favoritos' : '🤍 Guardar en Favoritos'}
          </button>
        </div>
      </div>
    </div>
  );
}
