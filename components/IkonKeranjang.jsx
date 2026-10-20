"use client";

import Link from "next/link";
import { useKeranjang } from "@/components/KeranjangProvider";

export default function IkonKeranjang() {
  const { totalItem, sudahDimuat } = useKeranjang();

  return (
    <Link
      href="/keranjang"
      className="relative inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-semibold text-teks transition-colors hover:bg-permukaan hover:text-utama"
      aria-label={`Keranjang${totalItem > 0 ? `, ${totalItem} item` : ""}`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.002-.881 2.002-2V8.25M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      {sudahDimuat && totalItem > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-utama px-1 text-[11px] font-bold leading-none text-white">
          {totalItem > 99 ? "99+" : totalItem}
        </span>
      )}
    </Link>
  );
}
