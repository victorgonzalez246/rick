import React from 'react';

export default function Navbar({ totalCharacters = 0, favoritesCount = 0 }) {
  return (
    <header className="header">
      <div className="portal-title-wrapper">
        <div className="faces-logo" title="Rick y Morty">
          <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick" className="face-img rick-face" />
          <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Morty" className="face-img morty-face" />
        </div>
        <h1 className="main-title">RICK AND MORTY</h1>
      </div>
      <p className="subtitle">
        Explorador Multiversal C-137 • {totalCharacters} Personajes registrados • {favoritesCount} Favoritos
      </p>
    </header>
  );
}
