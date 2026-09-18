import React, { useState, useEffect } from 'react';

export default function ImageWithFallback({ src, alt, className, style }) {
  // Un placeholder con un color que combina con el tema oscuro/portal
  const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyNDAwNDYiLz48L3N2Zz4=';
  const fallbackSrc = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';

  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Resetear al cambiar el src
    setCurrentSrc(placeholderSrc);
    setIsLoaded(false);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setCurrentSrc(fallbackSrc);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        transition: 'filter 0.4s ease-in-out',
        filter: isLoaded ? 'blur(0px)' : 'blur(4px)',
      }}
    />
  );
}
