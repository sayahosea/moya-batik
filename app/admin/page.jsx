import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin() {
  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabaseAdmin = await buatKoneksiAdmin();
    const { data, error } = await supabaseAdmin
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      const supabaseServer = buatKoneksiServer();
      const { data: serverData, error: serverError } = await supabaseServer
        .from("produk")
        .select("*")
        .order("id", { ascending: true });

      if (serverError) {
        pesanError = serverError.message;
      } else {
        daftarProduk = serverData || [];
      }
    } else {
      daftarProduk = data;
    }
  } catch {
    try {
      const supabaseServer = buatKoneksiServer();
      const { data: serverData, error: serverError } = await supabaseServer
        .from("produk")
        .select("*")
        .order("id", { ascending: true });

      if (serverError) {
        pesanError = serverError.message;
      } else {
        daftarProduk = serverData || [];
      }
    } catch (fallbackErr) {
      pesanError = fallbackErr.message;
    }
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>
      {pesanError ? (
        <div className="rounded-xl border border-garis bg-permukaan p-6 text-bahaya">
          <p className="font-semibold">Gagal memuat daftar produk</p>
          <p className="mt-1 text-sm text-teks-lembut">{pesanError}</p>
        </div>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
