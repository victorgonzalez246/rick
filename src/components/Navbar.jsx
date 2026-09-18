import React from 'react';

export default function Navbar({ totalCharacters = 0, favoritesCount = 0 }) {
  return (
    <header className="header">
      <div className="portal-title-wrapper">
        <div className="portal-logo-glow" title="Portal Interdimensional C-137"></div>
        <h1 className="main-title">RICK AND MORTY</h1>
      </div>
      <p className="subtitle">
        Explorador Multiversal C-137 • {totalCharacters} Personajes registrados • {favoritesCount} Favoritos
      </p>
    </header>
  );
}
