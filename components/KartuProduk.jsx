import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import TombolFavorit from "@/components/TombolFavorit";

export default function KartuProduk({ produk }) {
  const adaDiskon = Boolean(produk.harga_diskon && produk.harga_diskon < produk.harga);
  const isHabis = produk.stok !== undefined ? Number(produk.stok) <= 0 : produk.status_stok === "habis";

  // Badge logic (US-20)
  const badge = produk.badge || (new Date() - new Date(produk.created_at) < 7 * 24 * 60 * 60 * 1000 ? "Baru" : null);

  const fotoUtama = produk.foto_url ? produk.foto_url.split(",")[0].trim() : "/produk/batik.svg";

  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar"
    >
      {/* Badge Penanda (US-19 & US-20) */}
      <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1">
        {isHabis ? (
          <span className="rounded-md bg-bahaya px-2 py-0.5 text-xs font-bold text-white shadow-sm">
            Habis
          </span>
        ) : (
          badge && (
            <span className="rounded-md bg-utama px-2 py-0.5 text-xs font-bold text-white shadow-sm">
              {badge}
            </span>
          )
        )}
      </div>

      {/* Tombol Favorit (US-24) */}
      <TombolFavorit produk={produk} varian="icon" className="absolute right-2.5 top-2.5 z-10" />

      <img
        src={fotoUtama}
        alt={produk.nama}
        className="aspect-square w-full bg-permukaan object-cover"
      />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-xs text-teks-lembut">{produk.kategori}</p>
        <h3 className="font-semibold leading-snug group-hover:text-utama">{produk.nama}</h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <p className="self-start rounded-md bg-harga-latar px-2 py-0.5 text-sm font-bold text-harga">
            {formatRupiah(adaDiskon ? produk.harga_diskon : produk.harga)}
          </p>
          {adaDiskon && (
            <span className="text-xs text-teks-lembut line-through">
              {formatRupiah(produk.harga)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
