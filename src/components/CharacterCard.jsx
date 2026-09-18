import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ImageWithFallback from './ImageWithFallback';

export default function CharacterCard({ character }) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  };

  const translateStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Muerto';
      default: return 'Desconocido';
    }
  };

  return (
    <article className="character-card">
      <Link to={`/character/${character.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="card-image-container">
          <ImageWithFallback src={character.image} alt={character.name} className="card-image" />
        </div>

        <div className="card-body">
          <h3 className="card-name" title={character.name}>{character.name}</h3>

          <div className={`status-badge ${getStatusClass(character.status)}`}>
            <span className="status-dot"></span>
            <span>{translateStatus(character.status)} - {character.species}</span>
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
      </Link>
      
      <button
        className="fav-badge-btn"
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(character);
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </article>
  );
}
