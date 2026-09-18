import React, { useState, useEffect } from 'react';
import { getCharacters } from './services/rickMortyApi';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CharacterGrid from './components/CharacterGrid';
import CharacterModal from './components/CharacterModal';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import './styles/index.css';

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parámetros de consulta
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Modal de detalle
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Favoritos en localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rm_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Debounce para el buscador (evita saturar la API al teclear)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reiniciar a página 1 al buscar
    }, 400);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Persistir favoritos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rm_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('No se pudieron guardar los favoritos', e);
    }
  }, [favorites]);

  // Reset de página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, genderFilter]);

  // Llamada principal a la API de Rick and Morty
  useEffect(() => {
    if (showFavoritesOnly) return; // Si solo muestra favoritos, no llama a la API

    let isMounted = true;
    setLoading(true);
    setError(null);

    getCharacters({
      page: currentPage,
      name: debouncedSearch,
      status: statusFilter,
      gender: genderFilter,
    })
      .then((data) => {
        if (!isMounted) return;
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 0);
        setTotalCount(data.info?.count || 0);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error(err);
        setError('Ocurrió un error al contactar el portal interdimensional de datos.');
        setCharacters([]);
        setTotalPages(0);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage, debouncedSearch, statusFilter, genderFilter, showFavoritesOnly]);

  // Manejador de favoritos
  const handleToggleFavorite = (character) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === character.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

  // Filtrado de personajes a mostrar (normal o solo favoritos)
  const displayedCharacters = showFavoritesOnly
    ? favorites.filter((char) =>
        char.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : characters;

  return (
    <div className="app-container">
      <Navbar totalCharacters={totalCount} favoritesCount={favorites.length} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoritesCount={favorites.length}
      />

      {loading && !showFavoritesOnly ? (
        <Loader message="Abriendo portal a la dimensión C-137..." />
      ) : error && !showFavoritesOnly ? (
        <div className="empty-state">
          <h3 className="empty-title">Portal Inestable (Error)</h3>
          <p className="empty-desc">{error}</p>
        </div>
      ) : (
        <>
          <CharacterGrid
            characters={displayedCharacters}
            onSelectCharacter={setSelectedCharacter}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            emptyMessage={
              showFavoritesOnly
                ? 'Aún no has guardado especímenes favoritos.'
                : 'No se encontraron personajes que coincidan con los criterios.'
            }
          />

          {!showFavoritesOnly && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </>
      )}

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          isFavorite={favorites.some((f) => f.id === selectedCharacter.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      <footer className="footer">
        <p>
          Laboratorio de Consumo de API en React • Desarrollado con{' '}
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noreferrer">
            The Rick and Morty API
          </a>
        </p>
      </footer>
    </div>
  );
}
