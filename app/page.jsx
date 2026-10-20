import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

export default async function HalamanKatalog({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q?.trim() || "";
  const kategoriTerpilih = resolvedSearchParams?.kategori?.trim() || "";
  const urutan = resolvedSearchParams?.urutan?.trim() || "terbaru";
  const halaman = Math.max(1, parseInt(resolvedSearchParams?.halaman || "1", 10) || 1);

  let daftarProduk = null;
  let daftarKategori = [];
  let totalProduk = 0;
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

    // Ambil produk sesuai kategori, pencarian, urutan (US-15), dan paginasi (US-16)
    let query = supabase.from("produk").select("*", { count: "exact" });

    if (kategoriTerpilih) {
      query = query.eq("kategori", kategoriTerpilih);
    }

    if (q) {
      query = query.ilike("nama", `%${q}%`);
    }

    // US-15: Pengurutan query di database
    if (urutan === "termurah") {
      query = query.order("harga", { ascending: true });
    } else if (urutan === "termahal") {
      query = query.order("harga", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    // US-16: Pembatasan jumlah di query database (paginasi)
    const from = (halaman - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      pesanError = `Gagal memuat produk: ${error.message}`;
    } else {
      daftarProduk = data;
      totalProduk = count || 0;
    }
  } catch (err) {
    pesanError = `Gagal memuat produk: ${err.message}`;
  }

  const totalHalaman = Math.max(1, Math.ceil(totalProduk / ITEMS_PER_PAGE));

  const buatUrlNavigasi = (opsiBaru = {}) => {
    const params = new URLSearchParams();
    const finalQ = opsiBaru.q !== undefined ? opsiBaru.q : q;
    const finalKat = opsiBaru.kategori !== undefined ? opsiBaru.kategori : kategoriTerpilih;
    const finalUrut = opsiBaru.urutan !== undefined ? opsiBaru.urutan : urutan;
    const finalHal = opsiBaru.halaman !== undefined ? opsiBaru.halaman : halaman;

    if (finalQ) params.set("q", finalQ);
    if (finalKat) params.set("kategori", finalKat);
    if (finalUrut && finalUrut !== "terbaru") params.set("urutan", finalUrut);
    if (finalHal && finalHal > 1) params.set("halaman", String(finalHal));

    const stringParams = params.toString();
    return stringParams ? `/?${stringParams}` : "/";
  };

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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="judul-produk" className="text-xl font-bold">
              Produk kami
            </h2>

            {/* US-15: Pilihan Urutan Produk */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-teks-lembut">Urutkan:</span>
              <div className="inline-flex rounded-lg border border-garis bg-latar p-0.5 text-xs font-semibold">
                <Link
                  href={buatUrlNavigasi({ urutan: "terbaru", halaman: 1 })}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    urutan === "terbaru"
                      ? "bg-utama text-white"
                      : "text-teks hover:text-utama"
                  }`}
                >
                  Terbaru
                </Link>
                <Link
                  href={buatUrlNavigasi({ urutan: "termurah", halaman: 1 })}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    urutan === "termurah"
                      ? "bg-utama text-white"
                      : "text-teks hover:text-utama"
                  }`}
                >
                  Termurah
                </Link>
                <Link
                  href={buatUrlNavigasi({ urutan: "termahal", halaman: 1 })}
                  className={`rounded-md px-2.5 py-1 transition-colors ${
                    urutan === "termahal"
                      ? "bg-utama text-white"
                      : "text-teks hover:text-utama"
                  }`}
                >
                  Termahal
                </Link>
              </div>
            </div>
          </div>

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
            {urutan && urutan !== "terbaru" && (
              <input type="hidden" name="urutan" value={urutan} />
            )}
            <button
              type="submit"
              className="rounded-xl bg-utama px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
            >
              Cari
            </button>
            {(q || kategoriTerpilih || urutan !== "terbaru") && (
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
                href={buatUrlNavigasi({ kategori: "", halaman: 1 })}
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
                return (
                  <Link
                    key={kat}
                    href={buatUrlNavigasi({ kategori: kat, halaman: 1 })}
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
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {daftarProduk.map((produk) => (
                <KartuProduk key={produk.id} produk={produk} />
              ))}
            </div>

            {/* US-16: Kontrol Paginasi */}
            {totalHalaman > 1 && (
              <nav
                aria-label="Paginasi halaman"
                className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-garis pt-6 text-sm"
              >
                <p className="text-teks-lembut">
                  Halaman <span className="font-semibold text-teks">{halaman}</span> dari{" "}
                  <span className="font-semibold text-teks">{totalHalaman}</span> ({totalProduk} produk)
                </p>

                <div className="flex items-center gap-1.5">
                  {halaman > 1 ? (
                    <Link
                      href={buatUrlNavigasi({ halaman: halaman - 1 })}
                      className="rounded-lg border border-garis bg-latar px-3 py-1.5 font-semibold text-teks hover:border-utama hover:text-utama"
                    >
                      Sebelumnya
                    </Link>
                  ) : (
                    <span className="cursor-not-allowed rounded-lg border border-garis bg-permukaan px-3 py-1.5 font-semibold text-teks-lembut opacity-50">
                      Sebelumnya
                    </span>
                  )}

                  {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((nomorHal) => (
                    <Link
                      key={nomorHal}
                      href={buatUrlNavigasi({ halaman: nomorHal })}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg font-semibold transition-colors ${
                        nomorHal === halaman
                          ? "bg-utama text-white"
                          : "border border-garis bg-latar text-teks hover:border-utama hover:text-utama"
                      }`}
                    >
                      {nomorHal}
                    </Link>
                  ))}

                  {halaman < totalHalaman ? (
                    <Link
                      href={buatUrlNavigasi({ halaman: halaman + 1 })}
                      className="rounded-lg border border-garis bg-latar px-3 py-1.5 font-semibold text-teks hover:border-utama hover:text-utama"
                    >
                      Berikutnya
                    </Link>
                  ) : (
                    <span className="cursor-not-allowed rounded-lg border border-garis bg-permukaan px-3 py-1.5 font-semibold text-teks-lembut opacity-50">
                      Berikutnya
                    </span>
                  )}
                </div>
              </nav>
            )}
          </>
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
