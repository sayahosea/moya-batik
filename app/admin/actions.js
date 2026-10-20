"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";

export async function login(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  const email = data?.get("email")?.toString().trim();
  const password = data?.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatKoneksiAdmin();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Email atau password salah. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function keluar() {
  const supabase = await buatKoneksiAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  const passwordBaru = data?.get("password_baru")?.toString();
  const konfirmasiPassword = data?.get("konfirmasi_password")?.toString();

  if (!passwordBaru || passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sesuai." };
  }

  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Sesi tidak valid atau belum masuk. Silakan login terlebih dahulu.",
    };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: passwordBaru,
  });

  if (updateError) {
    return { error: `Gagal mengganti password: ${updateError.message}` };
  }

  return { success: true, message: "Password berhasil diperbarui." };
}

export async function tambahProduk(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  if (!data) {
    return { error: "Data form tidak valid." };
  }

  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Aksi ditolak: Anda harus login sebagai admin." };
  }

  const nama = data.get("nama")?.toString().trim();
  const hargaRaw = data.get("harga")?.toString().trim();
  const harga = parseInt(hargaRaw || "0", 10);
  const kategori = data.get("kategori")?.toString().trim() || null;
  const foto_url = data.get("foto_url")?.toString().trim() || null;
  const deskripsi = data.get("deskripsi")?.toString().trim() || null;

  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka positif." };
  }

  const { error } = await supabase.from("produk").insert({
    nama,
    harga,
    kategori,
    foto_url,
    deskripsi,
  });

  if (error) {
    return { error: `Gagal menyimpan produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  if (!data) {
    return { error: "Data form tidak valid." };
  }

  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Aksi ditolak: Anda harus login sebagai admin." };
  }

  const id = data.get("id")?.toString();
  const nama = data.get("nama")?.toString().trim();
  const hargaRaw = data.get("harga")?.toString().trim();
  const harga = parseInt(hargaRaw || "0", 10);
  const kategori = data.get("kategori")?.toString().trim() || null;
  const foto_url = data.get("foto_url")?.toString().trim() || null;
  const deskripsi = data.get("deskripsi")?.toString().trim() || null;

  if (!id) {
    return { error: "ID produk tidak valid." };
  }
  if (!nama) {
    return { error: "Nama produk wajib diisi." };
  }
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka positif." };
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama,
      harga,
      kategori,
      foto_url,
      deskripsi,
    })
    .eq("id", id);

  if (error) {
    return { error: `Gagal memperbarui produk: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const supabase = await buatKoneksiAdmin();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Aksi ditolak: Anda harus login sebagai admin.");
  }

  const id = formData.get("id");
  if (!id) {
    throw new Error("ID produk tidak valid.");
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);
  if (error) {
    throw new Error(`Gagal menghapus produk: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
