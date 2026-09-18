import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    staleTime: 1000 * 60 * 60,
  });

  const isFavorite = character ? favorites.some((fav) => fav.id === character.id) : false;

  useEffect(() => {
    if (character && character.episode?.length > 0) {
      fetchMultipleEpisodes(character.episode.slice(0, 8)).then(setEpisodes);
    }
  }, [character]);

  if (isLoading) return <Loader message="Cargando información clasificada..." />;
  if (isError) return (
    <div className="empty-state" style={{ marginTop: '4rem' }}>
      <h2 className="empty-title">🌀 Personaje no encontrado</h2>
      <p className="empty-desc">Este ser no existe en ninguna dimensión conocida.</p>
      <button onClick={() => navigate('/')} className="detail-back-btn" style={{ marginTop: '1rem' }}>
        ⬅ Regresar al portal
      </button>
    </div>
  );

  const getStatusClass = (s) => {
    switch (s?.toLowerCase()) {
      case 'alive': return 'status-alive';
      case 'dead': return 'status-dead';
      default: return 'status-unknown';
    }
  };

  const translateStatus = (s) => {
    switch (s?.toLowerCase()) {
      case 'alive': return 'Vivo';
      case 'dead': return 'Muerto';
      default: return 'Desconocido';
    }
  };

  const translateGender = (g) => {
    switch (g) {
      case 'Male': return 'Masculino';
      case 'Female': return 'Femenino';
      case 'Genderless': return 'Sin género';
      default: return 'Desconocido';
    }
  };

  return (
    <main className="detail-page">
      <button onClick={() => navigate(-1)} className="detail-back-btn">
        ⬅ Regresar
      </button>

      <div className="detail-card">
        {/* Hero Section */}
        <div className="detail-hero">
          <div className="detail-avatar-glow">
            <ImageWithFallback src={character.image} alt={character.name} className="detail-avatar-img" />
          </div>
          <h1 className="detail-name">{character.name}</h1>
          <div className={`status-badge ${getStatusClass(character.status)}`}>
            <span className="status-dot"></span>
            <span>{translateStatus(character.status)} - {character.species}</span>
          </div>
          <button
            className={`detail-fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(character)}
          >
            {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>

        {/* Info Grid */}
        <div className="detail-info-grid">
          <div className="detail-info-box">
            <span className="info-label">Género</span>
            <span className="info-value">{translateGender(character.gender)}</span>
          </div>
          <div className="detail-info-box">
            <span className="info-label">Especie</span>
            <span className="info-value">{character.species}</span>
          </div>
          <div className="detail-info-box">
            <span className="info-label">Tipo</span>
            <span className="info-value">{character.type || 'Normal'}</span>
          </div>
          <div className="detail-info-box">
            <span className="info-label">Origen</span>
            <span className="info-value">{character.origin?.name}</span>
          </div>
          <div className="detail-info-box" style={{ gridColumn: 'span 2' }}>
            <span className="info-label">Ubicación Actual</span>
            <span className="info-value">{character.location?.name}</span>
          </div>
        </div>

        {/* Episodes */}
        <div className="detail-episodes">
          <h3 className="detail-section-title">📺 Apariciones ({character.episode?.length || 0} episodios)</h3>
          <div className="episodes-list">
            {episodes.length > 0 ? episodes.map(ep => (
              <div key={ep.id} className="episode-pill">
                <span className="episode-code">{ep.episode}</span>
                <span className="episode-name">{ep.name}</span>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>Cargando registros multiversales...</p>
            )}
            {character.episode?.length > 8 && (
              <div className="episode-pill episode-pill-more">
                <span className="episode-name">... y {character.episode.length - 8} episodios más</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
