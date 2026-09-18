export default function ImageWithFallback({ src, alt, className, style }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';
      }}
    />
  );
}
