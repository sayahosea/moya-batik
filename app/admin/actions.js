"use server";

import { redirect } from "next/navigation";
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
