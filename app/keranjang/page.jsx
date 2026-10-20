"use client";

import Link from "next/link";
import { useKeranjang } from "@/components/KeranjangProvider";
import { formatRupiah } from "@/lib/format";
import { toko } from "@/lib/toko";

export default function HalamanKeranjang() {
  const { items, totalItem, totalHarga, ubahJumlah, hapusItem, kosongkanKeranjang, sudahDimuat } =
    useKeranjang();

  if (!sudahDimuat) {
    return (
      <div className="py-16 text-center text-teks-lembut">Memuat keranjang...</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <svg className="h-16 w-16 text-garis" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.002-.881 2.002-2V8.25M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        <p className="text-lg font-semibold text-teks">Keranjang kosong</p>
        <p className="text-sm text-teks-lembut">Belum ada produk di keranjang kamu.</p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-utama px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
        >
          Lihat katalog
        </Link>
      </div>
    );
  }

  // Buat pesan WhatsApp dari seluruh isi keranjang
  const nomor = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";
  const barisPesanan = items.map((item, i) => {
    const subtotal = item.harga * item.jumlah;
    const varianText = item.varian ? ` (Varian: ${item.varian})` : "";
    return `${i + 1}. ${item.nama}${varianText} × ${item.jumlah} = ${formatRupiah(subtotal)}`;
  });
  const pesanWhatsApp = [
    "Halo, saya ingin memesan:",
    "",
    ...barisPesanan,
    "",
    `Total: ${formatRupiah(totalHarga)}`,
    "",
    "Terima kasih!",
  ].join("\n");
  const hrefWhatsApp = `https://wa.me/${nomor}?text=${encodeURIComponent(pesanWhatsApp)}`;

  return (
    <div className="py-8 md:py-12">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Keranjang{" "}
          <span className="text-base font-normal text-teks-lembut">
            ({totalItem} {totalItem === 1 ? "item" : "item"})
          </span>
        </h1>
        <button
          type="button"
          onClick={kosongkanKeranjang}
          className="text-sm font-semibold text-bahaya transition-colors hover:underline"
        >
          Kosongkan
        </button>
      </div>

      {/* Daftar Item */}
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const subtotal = item.harga * item.jumlah;
          const itemKey = `${item.id}-${item.varian}`;

          return (
            <div
              key={itemKey}
              className="flex gap-3 rounded-xl border border-garis bg-latar p-3 sm:gap-4 sm:p-4"
            >
              {/* Foto */}
              <Link href={`/produk/${item.id}`} className="shrink-0">
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="h-20 w-20 rounded-lg border border-garis bg-permukaan object-cover sm:h-24 sm:w-24"
                />
              </Link>

              {/* Detail */}
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      href={`/produk/${item.id}`}
                      className="line-clamp-2 font-semibold leading-snug text-teks hover:text-utama"
                    >
                      {item.nama}
                    </Link>
                    {item.varian && (
                      <p className="mt-0.5 text-xs text-teks-lembut">
                        Varian: {item.varian}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => hapusItem(item.id, item.varian)}
                    aria-label={`Hapus ${item.nama}`}
                    className="shrink-0 rounded-md p-1 text-teks-lembut transition-colors hover:bg-permukaan hover:text-bahaya"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm font-bold text-harga">
                  {formatRupiah(item.harga)}/pcs
                </p>

                {/* Kontrol Jumlah */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-lg border border-garis bg-latar">
                    <button
                      type="button"
                      onClick={() => ubahJumlah(item.id, item.varian, item.jumlah - 1)}
                      disabled={item.jumlah <= 1}
                      aria-label="Kurangi jumlah"
                      className="flex h-8 w-8 items-center justify-center rounded-l-lg text-sm font-bold text-teks transition-colors hover:bg-permukaan disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="flex h-8 w-10 items-center justify-center text-center text-sm font-bold text-teks">
                      {item.jumlah}
                    </span>
                    <button
                      type="button"
                      onClick={() => ubahJumlah(item.id, item.varian, item.jumlah + 1)}
                      aria-label="Tambah jumlah"
                      className="flex h-8 w-8 items-center justify-center rounded-r-lg text-sm font-bold text-teks transition-colors hover:bg-permukaan"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm font-bold text-utama">
                    {formatRupiah(subtotal)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ringkasan & Tombol Pesan */}
      <div className="mt-6 rounded-xl border border-garis bg-permukaan p-4 sm:p-5">
        <div className="mb-4 flex items-baseline justify-between text-lg">
          <span className="font-semibold text-teks">Total</span>
          <span className="text-xl font-bold text-utama">{formatRupiah(totalHarga)}</span>
        </div>
        <a
          href={hrefWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Pesan semua via WhatsApp
        </a>
        <Link
          href="/"
          className="mt-3 flex w-full items-center justify-center rounded-lg border border-garis bg-latar px-5 py-2.5 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
        >
          Lanjut belanja
        </Link>
      </div>
    </div>
  );
}
