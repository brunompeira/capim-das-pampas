'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface FavoritesContextType {
  favoriteProducts: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    if (savedFavorites) {
      try {
        setFavoriteProducts(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const addToFavorites = (product: Product) => {
    setFavoriteProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favoriteProducts.some(p => p.id === productId);
  };

  const clearFavorites = () => {
    setFavoriteProducts([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favoriteProducts,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
