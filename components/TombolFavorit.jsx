"use client";

import { useFavorit } from "@/components/FavoritProvider";

export default function TombolFavorit({ produk, varian = "icon", className = "" }) {
  const { toggleFavorit, isFavorit, sudahDimuat } = useFavorit();

  if (!produk || !produk.id) return null;

  const aktif = sudahDimuat && isFavorit(produk.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorit(produk);
  };

  if (varian === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={aktif ? "Hapus dari favorit" : "Tambah ke favorit"}
        className={`flex h-9 w-9 items-center justify-center rounded-full bg-latar/85 backdrop-blur-sm transition-all hover:scale-110 hover:bg-latar shadow-sm ${className}`}
      >
        <svg
          className={`h-5 w-5 transition-colors ${
            aktif ? "fill-bahaya text-bahaya" : "fill-none text-teks-lembut hover:text-bahaya"
          }`}
          viewBox="0 0 24 24"
          strokeWidth={1.75}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={aktif ? "Hapus dari favorit" : "Simpan ke favorit"}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
        aktif
          ? "border-bahaya bg-bahaya/10 text-bahaya hover:bg-bahaya/20"
          : "border-garis bg-latar text-teks hover:border-utama hover:text-utama"
      } ${className}`}
    >
      <svg
        className={`h-4 w-4 ${aktif ? "fill-bahaya text-bahaya" : "fill-none text-current"}`}
        viewBox="0 0 24 24"
        strokeWidth={1.75}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      <span>{aktif ? "Tersimpan di favorit" : "Simpan ke favorit"}</span>
    </button>
  );
}
