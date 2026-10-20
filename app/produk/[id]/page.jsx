import Link from "next/link";
import { notFound } from "next/navigation";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import TombolKeranjang from "@/components/TombolKeranjang";
import TombolFavorit from "@/components/TombolFavorit";
import TombolBagikan from "@/components/TombolBagikan";
import GaleriFoto from "@/components/GaleriFoto";
import KartuProduk from "@/components/KartuProduk";
import { formatRupiah } from "@/lib/format";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  const supabase = buatKoneksiServer();

  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !produk) {
    notFound();
  }

  // Ambil produk terkait dari kategori yang sama, mengecualikan produk yang sedang dibuka (US-17)
  const { data: produkTerkait } = await supabase
    .from("produk")
    .select("*")
    .eq("kategori", produk.kategori)
    .neq("id", id)
    .limit(4);

  const adaDiskon = Boolean(produk.harga_diskon && Number(produk.harga_diskon) < Number(produk.harga));
  const isHabis =
    produk.stok !== undefined && produk.stok !== null
      ? Number(produk.stok) <= 0
      : produk.status_stok === "habis";

  // Badge logic (US-20)
  const badge =
    produk.badge ||
    (produk.created_at &&
    new Date() - new Date(produk.created_at) < 7 * 24 * 60 * 60 * 1000
      ? "Baru"
      : null);

  return (
    <div className="py-8 md:py-12">
      <article className="grid gap-8 md:grid-cols-2">
        {/* Galeri Foto (US-18) */}
        <GaleriFoto fotoUrl={produk.foto_url} namaProduk={produk.nama} />

        <div className="flex flex-1 flex-col gap-4">
          <Link
            href="/"
            className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama"
          >
            Kembali ke katalog
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-teks-lembut">{produk.kategori}</span>
            {isHabis ? (
              <span className="rounded-md bg-bahaya px-2 py-0.5 text-xs font-bold text-white">
                Habis
              </span>
            ) : (
              badge && (
                <span className="rounded-md bg-utama px-2 py-0.5 text-xs font-bold text-white">
                  {badge}
                </span>
              )
            )}
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{produk.nama}</h1>

          {/* Harga normal / diskon (US-20) */}
          <div className="flex flex-wrap items-baseline gap-3">
            <p className="self-start rounded-md bg-harga-latar px-3 py-1 text-2xl font-bold text-harga">
              {formatRupiah(adaDiskon ? produk.harga_diskon : produk.harga)}
            </p>
            {adaDiskon && (
              <>
                <span className="text-base text-teks-lembut line-through">
                  {formatRupiah(produk.harga)}
                </span>
                <span className="rounded bg-bahaya/15 px-2 py-0.5 text-xs font-bold text-bahaya">
                  Diskon
                </span>
              </>
            )}
          </div>

          <p className="max-w-prose leading-relaxed text-teks-lembut">{produk.deskripsi}</p>
          <TombolWhatsApp produk={produk} />
          <TombolKeranjang produk={produk} className="w-full sm:w-auto" />

          {/* Fitur Tambahan: Favorit (US-24) & Bagikan (US-23) */}
          <div className="flex flex-wrap gap-3 border-t border-garis pt-4">
            <TombolFavorit produk={produk} varian="tombol" />
            <TombolBagikan judul={produk.nama} deskripsi={produk.deskripsi} />
          </div>
        </div>
      </article>

      {/* Produk Terkait (US-17) */}
      {produkTerkait && produkTerkait.length > 0 && (
        <section className="mt-16 border-t border-garis pt-10">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Produk Terkait</h2>
            <span className="text-sm text-teks-lembut">Kategori: {produk.kategori}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {produkTerkait.map((item) => (
              <KartuProduk key={item.id} produk={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
