"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);
  const [varian, setVarian] = useState("");

  if (!produk) return null;

  const isHabis =
    produk.stok !== undefined && produk.stok !== null
      ? Number(produk.stok) <= 0
      : produk.status_stok === "habis";

  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";
  const hargaSatuan =
    produk.harga_diskon && Number(produk.harga_diskon) < Number(produk.harga)
      ? Number(produk.harga_diskon)
      : Number(produk.harga);
  const totalHarga = hargaSatuan * jumlah;

  const detailVarian = varian.trim() ? ` (Varian: ${varian.trim()})` : "";
  const pesan = `Halo, saya ingin memesan ${produk.nama}${detailVarian} sebanyak ${jumlah} pcs seharga ${formatRupiah(totalHarga)}.`;
  const href = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  const kurangJumlah = () => {
    if (jumlah > 1) setJumlah(jumlah - 1);
  };

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
  };

  if (isHabis) {
    return (
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-bahaya/15 px-3 py-1 text-sm font-bold text-bahaya">
            Stok Habis
          </span>
          <span className="text-sm text-teks-lembut">
            Maaf, produk ini saat ini tidak tersedia.
          </span>
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg bg-garis px-5 py-3 font-semibold text-teks-lembut sm:w-auto"
        >
          Pesan via WhatsApp (Stok Habis)
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className="flex flex-wrap items-center gap-6">
        {/* Pilihan Jumlah */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="jumlah-pesanan" className="text-sm font-semibold">
            Jumlah
          </label>
          <div className="inline-flex items-center rounded-lg border border-garis bg-latar">
            <button
              type="button"
              onClick={kurangJumlah}
              disabled={jumlah <= 1}
              aria-label="Kurangi jumlah"
              className="flex h-10 w-10 items-center justify-center rounded-l-lg text-lg font-bold text-teks transition-colors hover:bg-permukaan disabled:opacity-40"
            >
              -
            </button>
            <span
              id="jumlah-pesanan"
              className="flex h-10 w-12 items-center justify-center text-center font-bold text-teks"
            >
              {jumlah}
            </span>
            <button
              type="button"
              onClick={tambahJumlah}
              aria-label="Tambah jumlah"
              className="flex h-10 w-10 items-center justify-center rounded-r-lg text-lg font-bold text-teks transition-colors hover:bg-permukaan"
            >
              +
            </button>
          </div>
        </div>

        {/* Pilihan Varian (opsional) */}
        <div className="flex min-w-[160px] flex-1 flex-col gap-1.5">
          <label htmlFor="varian-pesanan" className="text-sm font-semibold">
            Varian / Catatan <span className="font-normal text-teks-lembut">(opsional)</span>
          </label>
          <input
            id="varian-pesanan"
            type="text"
            value={varian}
            onChange={(e) => setVarian(e.target.value)}
            placeholder="Contoh: Ukuran M / Warna Cokelat"
            className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
        </div>
      </div>

      {/* Ringkasan Total */}
      <div className="flex items-baseline justify-between border-t border-garis pt-3 text-sm">
        <span className="text-teks-lembut">Total estimasi:</span>
        <span className="text-lg font-bold text-utama">{formatRupiah(totalHarga)}</span>
      </div>

      {/* Tombol Pesan WhatsApp */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}
