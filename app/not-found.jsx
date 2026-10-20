import Link from "next/link";

export default function TidakDitemukan() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-permukaan text-utama shadow-sm">
        <svg
          className="h-10 w-10 text-utama"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </div>

      <span className="mt-6 inline-flex rounded-full bg-harga-latar px-3.5 py-1 text-xs font-bold tracking-wider text-harga uppercase">
        Error 404
      </span>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-teks sm:text-4xl">
        Halaman Tidak Ditemukan
      </h1>

      <p className="mt-2 max-w-md text-base leading-relaxed text-teks-lembut">
        Maaf, produk atau halaman yang Anda cari tidak ada, telah dihapus, atau alamat URL yang dituju salah.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-utama px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/tentang"
          className="inline-flex items-center justify-center rounded-lg border border-garis bg-latar px-6 py-3 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
