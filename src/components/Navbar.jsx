import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ImageWithFallback from './ImageWithFallback';

export default function Navbar({ totalCharacters = 0 }) {
  const { favorites, theme, toggleTheme } = useStore();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <header className="header">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ Dimensión Clara' : '🌌 Dimensión Oscura'}
      </button>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="portal-title-wrapper">
          <div className="faces-logo" title="Rick y Morty">
            <ImageWithFallback src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick" className="face-img rick-face" />
            <ImageWithFallback src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Morty" className="face-img morty-face" />
          </div>
          <h1 className="main-title">RICK AND MORTY</h1>
        </div>
      </Link>

      <p className="subtitle">
        Explorador Multiversal C-137 • {totalCharacters} Personajes • ❤️ {favorites.length} Favoritos
      </p>
    </header>
  );
}
