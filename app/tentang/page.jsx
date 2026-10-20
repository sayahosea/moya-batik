import Link from "next/link";
import { toko } from "@/lib/toko";

export const metadata = {
  title: `Tentang Kami - ${toko.nama}`,
  description: `Profil, alamat, dan kontak resmi ${toko.nama}.`,
};

export default function HalamanTentang() {
  const nomorWA = toko.nomorWhatsApp?.replace(/[^0-9]/g, "") || "";
  const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(
    `Halo ${toko.nama}, saya ingin bertanya tentang produk Anda.`
  )}`;

  return (
    <div className="mx-auto max-w-3xl py-8 md:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-teks-lembut underline underline-offset-4 hover:text-utama"
      >
        ← Kembali ke katalog
      </Link>

      <div className="flex flex-col gap-8">
        {/* Header Profil */}
        <section className="flex flex-col gap-3 border-b border-garis pb-8">
          <span className="self-start rounded-md bg-permukaan px-3 py-1 text-xs font-bold uppercase tracking-wider text-utama">
            Profil Toko
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-teks sm:text-4xl">
            Tentang {toko.nama}
          </h1>
          <p className="text-lg leading-relaxed text-teks-lembut">
            {toko.tagline}
          </p>
        </section>

        {/* Cerita & Nilai Usaha */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-tight text-teks">
            Karya Warisan Nusantara untuk Anda
          </h2>
          <p className="leading-relaxed text-teks-lembut">
            {toko.nama} adalah usaha mikro, kecil, dan menengah (UMKM) yang berkomitmen
            menghadirkan kain dan busana batik berkualitas tinggi. Setiap helai batik dibuat
            dengan ketelitian dan dedikasi oleh para pengrajin lokal untuk menjaga kelestarian
            budaya Nusantara sekaligus tampil elegan dalam berbagai kesempatan.
          </p>
          <p className="leading-relaxed text-teks-lembut">
            Kami melayani pembelian eceran maupun seragam dalam partai besar. Kepuasan dan kenyamanan
            Anda berbelanja adalah prioritas utama kami.
          </p>
        </section>

        {/* Informasi Kontak & Operasional */}
        <section className="grid gap-6 rounded-2xl border border-garis bg-permukaan p-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teks-lembut">
              📍 Alamat Toko
            </h3>
            <p className="font-semibold text-teks">{toko.alamat}</p>
            <p className="text-xs text-teks-lembut">
              Kunjungi gerai kami untuk melihat dan mencoba koleksi batik secara langsung.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teks-lembut">
              ⏰ Jam Operasional
            </h3>
            <p className="font-semibold text-teks">{toko.jamBuka}</p>
            <p className="text-xs text-teks-lembut">
              Pesanan online di luar jam operasional akan kami respon pada hari kerja berikutnya.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 border-t border-garis pt-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teks-lembut">
              💬 Hubungi Kami
            </h3>
            <p className="text-sm text-teks-lembut">
              Punya pertanyaan seputar produk, ukuran, atau pesanan khusus? Hubungi kami langsung melalui WhatsApp:
            </p>
            <div>
              <a
                href={linkWA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi via WhatsApp ({toko.nomorWhatsApp})
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
