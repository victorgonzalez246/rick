import React from 'react';
import CharacterCard from './CharacterCard';
import Loader from './Loader';

export default function CharacterGrid({ characters, isFetchingNextPage, observerRef }) {
  if (!characters || characters.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>No se encontraron personajes</h2>
        <p style={{ color: 'var(--text-muted)' }}>Intenta con otros filtros de búsqueda en este universo.</p>
      </div>
    );
  }

  return (
    <>
      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
      
      {/* Elemento observador para Intersection Observer */}
      <div ref={observerRef} style={{ height: '20px', margin: '2rem 0' }}>
        {isFetchingNextPage && <Loader message="Abriendo portal a más personajes..." />}
      </div>
    </>
  );
}
