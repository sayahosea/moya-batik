"use client";

import Link from "next/link";
import { useFavorit } from "@/components/FavoritProvider";
import KartuProduk from "@/components/KartuProduk";

export default function HalamanFavorit() {
  const { favoritList, sudahDimuat } = useFavorit();

  if (!sudahDimuat) {
    return (
      <div className="py-16 text-center text-teks-lembut">
        Memuat produk favorit...
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="mb-6 flex flex-col gap-2">
        <Link
          href="/"
          className="self-start text-sm text-teks-lembut underline underline-offset-4 hover:text-utama"
        >
          ← Kembali ke katalog
        </Link>
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-teks sm:text-3xl">
            Produk Favorit{" "}
            <span className="text-base font-normal text-teks-lembut">
              ({favoritList.length} produk)
            </span>
          </h1>
        </div>
        <p className="text-sm text-teks-lembut">
          Koleksi produk yang telah Anda tandai sebagai favorit.
        </p>
      </div>

      {favoritList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-garis bg-permukaan py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-latar text-teks-lembut shadow-sm">
            <svg className="h-8 w-8 text-bahaya/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
          <p className="text-lg font-bold text-teks">Belum ada produk favorit</p>
          <p className="max-w-md text-sm text-teks-lembut">
            Simpan produk yang Anda sukai dengan menekan ikon hati pada kartu produk atau halaman detail.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-utama px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
          >
            Jelajahi Katalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {favoritList.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}
    </div>
  );
}
