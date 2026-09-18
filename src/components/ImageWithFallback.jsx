import React, { useState } from 'react';

export default function ImageWithFallback({ src, alt, className, style }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Avatar de Rick como fallback genérico cuando la API no responde con la imagen
  const fallbackSrc = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
  // Placeholder mientras carga (una imagen muy pequeña o un fondo oscuro)
  const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxODJjM2QiLz48L3N2Zz4=';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Imagen de carga/Placeholder visible mientras isLoaded sea false */}
      <img
        src={placeholderSrc}
        alt="Cargando..."
        className={className}
        style={{
          ...style,
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 1
        }}
      />
      
      {/* Imagen real que se descarga de fondo */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{
          ...style,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          position: 'relative',
          zIndex: 2
        }}
      />
    </div>
  );
}
