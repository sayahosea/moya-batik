"use client";

import { useState } from "react";
import { useKeranjang } from "@/components/KeranjangProvider";

export default function TombolKeranjang({ produk, jumlah = 1, varian = "", className = "" }) {
  const { tambahItem } = useKeranjang();
  const [ditambahkan, setDitambahkan] = useState(false);

  const isHabis =
    produk.stok !== undefined && produk.stok !== null
      ? Number(produk.stok) <= 0
      : produk.status_stok === "habis";

  if (isHabis) return null;

  const handleTambah = () => {
    tambahItem(produk, jumlah, varian);
    setDitambahkan(true);
    setTimeout(() => setDitambahkan(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleTambah}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-utama px-5 py-3 font-semibold text-utama transition-colors hover:bg-utama hover:text-white ${className}`}
    >
      {ditambahkan ? (
        <>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Ditambahkan!
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.002-.881 2.002-2V8.25M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          Tambah ke keranjang
        </>
      )}
    </button>
  );
}
