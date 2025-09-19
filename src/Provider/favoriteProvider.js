import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from AsyncStorage on mount
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favoriteBooks');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (bookId) => {
    if (!favorites.includes(bookId)) {
      const updated = [...favorites, bookId];
      setFavorites(updated);
      await AsyncStorage.setItem('favoriteBooks', JSON.stringify(updated));
    }
  };

  const removeFavorite = async (bookId) => {
    const updated = favorites.filter(id => id !== bookId);
    setFavorites(updated);
    await AsyncStorage.setItem('favoriteBooks', JSON.stringify(updated));
  };

  const isFavorite = (bookId) => favorites.includes(bookId);

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, loading }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
