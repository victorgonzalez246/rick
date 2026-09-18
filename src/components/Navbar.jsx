import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ImageWithFallback from './ImageWithFallback';

export default function Navbar({ totalCharacters = 0 }) {
  const { favorites, theme, toggleTheme } = useStore();

  // Asegurar que el tema cargue inicialmente en el HTML
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <header className="header">
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <button
          onClick={toggleTheme}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid var(--portal-green)',
            color: 'var(--text-main)',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-title)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {theme === 'dark' ? '☀️ Dimensión Clara' : '🌌 Dimensión Oscura'}
        </button>
      </div>

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
        Explorador Multiversal C-137 • {totalCharacters} Personajes registrados • {favorites.length} Favoritos
      </p>
    </header>
  );
}
