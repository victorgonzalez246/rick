import React from 'react';

export default function Loader({ message = 'Cargando datos del multiverso...' }) {
  return (
    <div className="loader-container">
      <div className="spinning-portal"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
}
