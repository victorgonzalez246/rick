import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById, fetchMultipleEpisodes } from '../services/rickMortyApi';
import { useStore } from '../store/useStore';
import Loader from '../components/Loader';
import ImageWithFallback from '../components/ImageWithFallback';

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useStore();
  const [episodes, setEpisodes] = useState([]);

  const { data: character, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    staleTime: 1000 * 60 * 60, // 1 hora de caché para detalles
  });

  const isFavorite = character ? favorites.some((fav) => fav.id === character.id) : false;

  useEffect(() => {
    if (character && character.episode?.length > 0) {
      // Cargar los primeros 5 episodios para no sobrecargar
      fetchMultipleEpisodes(character.episode.slice(0, 5)).then(setEpisodes);
    }
  }, [character]);

  if (isLoading) return <Loader message="Cargando información clasificada..." />;
  if (isError) return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>Personaje no encontrado</h2>
      <button onClick={() => navigate(-1)} className="back-button" style={{ marginTop: '1rem', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', background: 'var(--portal-purple)', color: 'white', border: 'none' }}>
        Regresar al portal principal
      </button>
    </div>
  );

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
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid var(--portal-green)',
          color: 'var(--text-main)',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ⬅ Regresar
      </button>

      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ cursor: 'default' }}>
        <div className="modal-header">
          <div className="modal-image-wrapper">
            <ImageWithFallback src={character.image} alt={character.name} className="modal-image" />
          </div>
          <div className="modal-title-area">
            <h2 className="modal-name">{character.name}</h2>
            <div className={`status-badge ${getStatusClass(character.status)}`}>
              <span className="status-dot"></span>
              <span>{translateStatus(character.status)} - {character.species}</span>
            </div>
            
            <button 
              className={`fav-btn-large ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(character)}
            >
              {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
            </button>
          </div>
        </div>
        
        <div className="modal-body">
          <div className="info-grid">
            <div className="info-box">
              <span className="info-label">Género</span>
              <span className="info-value">
                {character.gender === 'Male' ? 'Masculino' : 
                 character.gender === 'Female' ? 'Femenino' : 
                 character.gender === 'Genderless' ? 'Sin género' : 'Desconocido'}
              </span>
            </div>
            <div className="info-box">
              <span className="info-label">Tipo</span>
              <span className="info-value">{character.type || 'Normal'}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Origen</span>
              <span className="info-value">{character.origin.name}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Ubicación Actual</span>
              <span className="info-value">{character.location.name}</span>
            </div>
          </div>
          
          <div className="episodes-section">
            <h3 className="episodes-title">Primeras apariciones</h3>
            <div className="episodes-list">
              {episodes.length > 0 ? episodes.map(ep => (
                <div key={ep.id} className="episode-pill">
                  <span className="episode-code">{ep.episode}</span>
                  <span className="episode-name">{ep.name}</span>
                </div>
              )) : (
                <p>Cargando registros multiversales...</p>
              )}
              {character.episode?.length > 5 && (
                <div className="episode-pill" style={{ opacity: 0.7 }}>
                  <span className="episode-name">... y {character.episode.length - 5} apariciones más</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
