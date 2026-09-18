import { create } from 'zustand';

// Helpers para LocalStorage
const getStoredFavorites = () => {
  try {
    const saved = localStorage.getItem('rm_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const getStoredTheme = () => {
  try {
    const saved = localStorage.getItem('rm_theme');
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export const useStore = create((set) => ({
  // Favorites State
  favorites: getStoredFavorites(),
  toggleFavorite: (character) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === character.id);
      let newFavorites;
      if (exists) {
        newFavorites = state.favorites.filter((fav) => fav.id !== character.id);
      } else {
        newFavorites = [...state.favorites, character];
      }
      localStorage.setItem('rm_favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),

  // Theme State
  theme: getStoredTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('rm_theme', newTheme);
      // Aplicar al DOM
      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      return { theme: newTheme };
    }),
}));
