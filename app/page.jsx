import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q?.trim() || "";
  const kategoriTerpilih = resolvedSearchParams?.kategori?.trim() || "";

  let daftarProduk = null;
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = buatKoneksiServer();

    // Ambil semua kategori untuk tombol filter
    const { data: dataKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (dataKategori) {
      daftarKategori = Array.from(
        new Set(dataKategori.map((p) => p.kategori).filter(Boolean))
      ).sort();
    }

    // Ambil produk sesuai kategori dan/atau kata kunci pencarian
    let query = supabase.from("produk").select("*");

    if (kategoriTerpilih) {
      query = query.eq("kategori", kategoriTerpilih);
    }

    if (q) {
      query = query.ilike("nama", `%${q}%`);
    }

    const { data, error } = await query.order("id", { ascending: true });

    if (error) {
      pesanError = `Gagal memuat produk: ${error.message}`;
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = `Gagal memuat produk: ${err.message}`;
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>

          {/* Form Pencarian */}
          <form method="get" action="/" className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Cari nama produk..."
                className="w-full rounded-xl border border-garis bg-latar px-4 py-2.5 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
              />
            </div>
            {kategoriTerpilih && (
              <input type="hidden" name="kategori" value={kategoriTerpilih} />
            )}
            <button
              type="submit"
              className="rounded-xl bg-utama px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
            >
              Cari
            </button>
            {(q || kategoriTerpilih) && (
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-garis bg-latar px-4 py-2.5 text-sm font-semibold text-teks hover:border-utama hover:text-utama"
              >
                Reset
              </Link>
            )}
          </form>

          {/* Filter Kategori */}
          {daftarKategori.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={q ? `/?q=${encodeURIComponent(q)}` : "/"}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  !kategoriTerpilih
                    ? "bg-utama text-white"
                    : "border border-garis bg-latar text-teks hover:border-utama hover:text-utama"
                }`}
              >
                Semua
              </Link>
              {daftarKategori.map((kat) => {
                const aktif = kategoriTerpilih === kat;
                const paramsUrl = new URLSearchParams();
                if (q) paramsUrl.set("q", q);
                paramsUrl.set("kategori", kat);

                return (
                  <Link
                    key={kat}
                    href={`/?${paramsUrl.toString()}`}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                      aktif
                        ? "bg-utama text-white"
                        : "border border-garis bg-latar text-teks hover:border-utama hover:text-utama"
                    }`}
                  >
                    {kat}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Daftar Produk / Error / Kosong */}
        {pesanError ? (
          <div className="rounded-2xl border border-garis bg-permukaan p-6 text-bahaya">
            <p className="font-semibold">Terjadi kesalahan</p>
            <p className="mt-1 text-sm text-teks-lembut">{pesanError}</p>
          </div>
        ) : daftarProduk && daftarProduk.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-teks-lembut">
            {q || kategoriTerpilih
              ? "Belum ada produk yang sesuai dengan filter atau kata kunci."
              : "Belum ada produk"}
          </p>
        )}
      </section>
    </>
  );
}
