"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const FavoritContext = createContext(null);

export function useFavorit() {
  const ctx = useContext(FavoritContext);
  if (!ctx) {
    throw new Error("useFavorit harus dipakai di dalam FavoritProvider");
  }
  return ctx;
}

const STORAGE_KEY = "moya-batik-favorit";

function muatFavoritDariStorage() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function simpanFavoritKeStorage(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

export function FavoritProvider({ children }) {
  const [favoritList, setFavoritList] = useState([]);
  const [sudahDimuat, setSudahDimuat] = useState(false);

  useEffect(() => {
    setFavoritList(muatFavoritDariStorage());
    setSudahDimuat(true);
  }, []);

  useEffect(() => {
    if (sudahDimuat) {
      simpanFavoritKeStorage(favoritList);
    }
  }, [favoritList, sudahDimuat]);

  const toggleFavorit = useCallback((produk) => {
    if (!produk || !produk.id) return;
    setFavoritList((prev) => {
      const exists = prev.some((item) => item.id === produk.id);
      if (exists) {
        return prev.filter((item) => item.id !== produk.id);
      } else {
        return [
          ...prev,
          {
            id: produk.id,
            nama: produk.nama,
            harga: produk.harga,
            harga_diskon: produk.harga_diskon,
            foto_url: produk.foto_url,
            kategori: produk.kategori,
            stok: produk.stok,
            status_stok: produk.status_stok,
            created_at: produk.created_at,
            badge: produk.badge,
          },
        ];
      }
    });
  }, []);

  const isFavorit = useCallback(
    (id) => {
      return favoritList.some((item) => item.id === id);
    },
    [favoritList]
  );

  return (
    <FavoritContext.Provider
      value={{
        favoritList,
        totalFavorit: favoritList.length,
        toggleFavorit,
        isFavorit,
        sudahDimuat,
      }}
    >
      {children}
    </FavoritContext.Provider>
  );
}
