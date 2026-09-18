import React, { useState } from 'react';

export default function ImageWithFallback({ src, alt, className, style }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.4s ease-in-out',
      }}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => {
        setImgSrc('https://rickandmortyapi.com/api/character/avatar/19.jpeg');
        setLoaded(true);
      }}
    />
  );
}
