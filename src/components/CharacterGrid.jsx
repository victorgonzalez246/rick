import React from 'react';
import CharacterCard from './CharacterCard';

export default function CharacterGrid({
  characters,
  onSelectCharacter,
  favorites,
  onToggleFavorite,
  emptyMessage = 'No se encontraron especímenes en esta dimensión.',
}) {
  if (!characters || characters.length === 0) {
    return (
      <div className="empty-state">
        <h3 className="empty-title">⚠️ Sin resultados interdimensionales</h3>
        <p className="empty-desc">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <main className="character-grid">
      {characters.map((char) => (
        <CharacterCard
          key={char.id}
          character={char}
          onSelect={onSelectCharacter}
          isFavorite={favorites.some((fav) => fav.id === char.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </main>
  );
}
