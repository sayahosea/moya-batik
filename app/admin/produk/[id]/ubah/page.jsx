import { notFound } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";
import { buatKoneksiServer } from "@/lib/supabase/server";
import { ubahProduk } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;

  let produk = null;
  try {
    const supabase = await buatKoneksiAdmin();
    const { data } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (data) {
      produk = data;
    } else {
      const serverClient = buatKoneksiServer();
      const { data: sData } = await serverClient
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      produk = sData;
    }
  } catch {
    try {
      const serverClient = buatKoneksiServer();
      const { data: sData } = await serverClient
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      produk = sData;
    } catch {
      produk = null;
    }
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <h1 className="text-2xl font-extrabold">Ubah produk</h1>
      <FormProduk produk={produk} action={ubahProduk} labelTombol="Simpan perubahan" />
    </div>
  );
}
