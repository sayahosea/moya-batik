"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const KeranjangContext = createContext(null);

export function useKeranjang() {
  const ctx = useContext(KeranjangContext);
  if (!ctx) {
    throw new Error("useKeranjang harus dipakai di dalam KeranjangProvider");
  }
  return ctx;
}

const STORAGE_KEY = "moya-batik-keranjang";

function muatDariStorage() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function simpanKeStorage(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

export function KeranjangProvider({ children }) {
  const [items, setItems] = useState([]);
  const [sudahDimuat, setSudahDimuat] = useState(false);

  // Muat dari localStorage saat pertama kali render di client
  useEffect(() => {
    setItems(muatDariStorage());
    setSudahDimuat(true);
  }, []);

  // Simpan ke localStorage setiap kali items berubah
  useEffect(() => {
    if (sudahDimuat) {
      simpanKeStorage(items);
    }
  }, [items, sudahDimuat]);

  const tambahItem = useCallback((produk, jumlah = 1, varian = "") => {
    setItems((prev) => {
      // Cek apakah produk dengan varian yang sama sudah ada
      const idx = prev.findIndex(
        (item) => item.id === produk.id && item.varian === varian
      );
      if (idx !== -1) {
        // Update jumlah
        const updated = [...prev];
        updated[idx] = { ...updated[idx], jumlah: updated[idx].jumlah + jumlah };
        return updated;
      }

      // Hitung harga satuan (memperhitungkan diskon)
      const hargaSatuan =
        produk.harga_diskon && Number(produk.harga_diskon) < Number(produk.harga)
          ? Number(produk.harga_diskon)
          : Number(produk.harga);

      const fotoUtama = produk.foto_url
        ? produk.foto_url.split(",")[0].trim()
        : "/produk/batik.svg";

      return [
        ...prev,
        {
          id: produk.id,
          nama: produk.nama,
          harga: hargaSatuan,
          foto: fotoUtama,
          jumlah,
          varian,
        },
      ];
    });
  }, []);

  const ubahJumlah = useCallback((id, varian, jumlahBaru) => {
    if (jumlahBaru < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.varian === varian
          ? { ...item, jumlah: jumlahBaru }
          : item
      )
    );
  }, []);

  const hapusItem = useCallback((id, varian) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.varian === varian))
    );
  }, []);

  const kosongkanKeranjang = useCallback(() => {
    setItems([]);
  }, []);

  const totalItem = items.reduce((sum, item) => sum + item.jumlah, 0);
  const totalHarga = items.reduce(
    (sum, item) => sum + item.harga * item.jumlah,
    0
  );

  return (
    <KeranjangContext.Provider
      value={{
        items,
        totalItem,
        totalHarga,
        tambahItem,
        ubahJumlah,
        hapusItem,
        kosongkanKeranjang,
        sudahDimuat,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}
