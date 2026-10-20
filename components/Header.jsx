import Link from "next/link";
import { toko } from "@/lib/toko";
import IkonKeranjang from "@/components/IkonKeranjang";
import IkonFavorit from "@/components/IkonFavorit";
import TombolTema from "@/components/TombolTema";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-garis bg-latar transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-utama hover:opacity-90">
            {toko.nama}
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-teks-lembut sm:flex">
            <Link href="/" className="transition-colors hover:text-utama">
              Katalog
            </Link>
            <Link href="/tentang" className="transition-colors hover:text-utama">
              Tentang
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/tentang"
            className="px-2 py-1 text-xs font-semibold text-teks-lembut hover:text-utama sm:hidden"
          >
            Tentang
          </Link>
          <TombolTema />
          <IkonFavorit />
          <IkonKeranjang />
        </div>
      </div>
    </header>
  );
}
