import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchCharacters } from '../services/rickMortyApi';
import { useStore } from '../store/useStore';
import SearchBar from '../components/SearchBar';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';

export default function Home({ setTotalCharacters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites } = useStore();

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['characters', searchTerm, statusFilter, genderFilter],
    queryFn: ({ pageParam = 1 }) =>
      fetchCharacters({ pageParam, name: searchTerm, status: statusFilter, gender: genderFilter }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.info?.next ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !showFavoritesOnly,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !showFavoritesOnly) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, showFavoritesOnly]);

  useEffect(() => {
    if (data?.pages[0]?.info?.count !== undefined) {
      setTotalCharacters(data.pages[0].info.count);
    }
  }, [data, setTotalCharacters]);

  const handleSearch = (term) => setSearchTerm(term);

  const allCharacters = data?.pages.flatMap((page) => page.results) || [];
  const characters = showFavoritesOnly ? favorites : allCharacters;

  return (
    <main className="main-content">
      {/* Panel de Controles */}
      <section className="controls-card">
        <SearchBar onSearch={handleSearch} />

        <div className="filters-row">
          <div className="filter-groups">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              disabled={showFavoritesOnly}
            >
              <option value="">Todos los Estados</option>
              <option value="alive">🟢 Vivo</option>
              <option value="dead">🔴 Muerto</option>
              <option value="unknown">⚪ Desconocido</option>
            </select>

            <select
              className="filter-select"
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              disabled={showFavoritesOnly}
            >
              <option value="">Todos los Géneros</option>
              <option value="female">♀ Femenino</option>
              <option value="male">♂ Masculino</option>
              <option value="genderless">⚬ Sin Género</option>
              <option value="unknown">? Desconocido</option>
            </select>
          </div>

          <button
            className={`fav-toggle-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <span>{showFavoritesOnly ? '★ Mostrando Favoritos' : '☆ Ver Favoritos'}</span>
            <span>({favorites.length})</span>
          </button>
        </div>
      </section>

      {/* Contenido principal */}
      {status === 'pending' && !showFavoritesOnly ? (
        <Loader message="Viajando a través de portales..." />
      ) : status === 'error' && !showFavoritesOnly ? (
        <div className="empty-state">
          <h2 className="empty-title">⚠️ Error dimensional</h2>
          <p className="empty-desc">No se pudo conectar con la base de datos del Ciudadelo. Intenta de nuevo.</p>
        </div>
      ) : characters.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-title">
            {showFavoritesOnly ? '💔 Sin favoritos aún' : '🌀 Sin resultados'}
          </h2>
          <p className="empty-desc">
            {showFavoritesOnly
              ? 'Agrega personajes a favoritos haciendo clic en el corazón de cada tarjeta.'
              : 'No se encontraron personajes con esos filtros en este universo.'}
          </p>
        </div>
      ) : (
        <CharacterGrid
          characters={characters}
          isFetchingNextPage={isFetchingNextPage && !showFavoritesOnly}
          observerRef={ref}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          Datos proporcionados por <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">Rick and Morty API</a> •
          Desarrollado con React + Vite + Zustand + TanStack Query
        </p>
      </footer>
    </main>
  );
}
