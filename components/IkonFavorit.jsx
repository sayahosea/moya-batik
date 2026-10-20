"use client";

import Link from "next/link";
import { useFavorit } from "@/components/FavoritProvider";

export default function IkonFavorit() {
  const { totalFavorit, sudahDimuat } = useFavorit();

  return (
    <Link
      href="/favorit"
      className="relative inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-teks transition-colors hover:bg-permukaan hover:text-utama"
      aria-label={`Favorit${totalFavorit > 0 ? `, ${totalFavorit} item` : ""}`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      {sudahDimuat && totalFavorit > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-bahaya px-1 text-[11px] font-bold leading-none text-white">
          {totalFavorit > 99 ? "99+" : totalFavorit}
        </span>
      )}
    </Link>
  );
}
