"use client";

import { useActionState, useState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { buatDeskripsiAI } from "@/app/admin/actions";

// Dipakai untuk tambah produk (US-08) dan ubah produk (US-09). Keduanya bonus di jalur offline.
// Nama field sama dengan kolom tabel "produk".
export default function FormProduk({ produk = {}, labelTombol, action }) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [deskripsiValue, setDeskripsiValue] = useState(produk.deskripsi || "");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiError, setAiError] = useState("");

  const handleBuatDeskripsiAI = async () => {
    const form = document.querySelector("form");
    const namaInput = form?.querySelector('input[name="nama"]')?.value;
    const kategoriInput = form?.querySelector('input[name="kategori"]')?.value;

    if (!namaInput || !namaInput.trim()) {
      setAiError("Isi nama produk terlebih dahulu.");
      return;
    }

    setAiError("");
    setIsGeneratingAI(true);
    try {
      const result = await buatDeskripsiAI(namaInput, kategoriInput);
      if (result?.error) {
        setAiError(result.error);
      } else if (result?.deskripsi) {
        setDeskripsiValue(result.deskripsi);
      }
    } catch {
      setAiError("Gagal membuat deskripsi dengan AI.");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {state?.error && (
        <div className="rounded-lg border border-garis bg-permukaan p-3 text-sm text-bahaya">
          {state.error}
        </div>
      )}
      {produk.id && <input type="hidden" name="id" value={produk.id} />}
      <Input label="Nama produk" name="nama" defaultValue={produk.nama} required />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        defaultValue={produk.harga}
        required
      />
      <Input label="Kategori" name="kategori" defaultValue={produk.kategori} />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... (pisahkan dengan koma jika lebih dari satu foto)"
        defaultValue={produk.foto_url}
      />
      
      {/* Kolom Deskripsi dengan tombol AI (US-14) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="deskripsi" className="text-sm font-semibold">
            Deskripsi
          </label>
          <button
            type="button"
            onClick={handleBuatDeskripsiAI}
            disabled={isGeneratingAI}
            className="text-xs font-semibold text-utama transition-colors hover:underline disabled:opacity-50"
          >
            {isGeneratingAI ? "Membuat dengan AI..." : "✨ Buat deskripsi otomatis (AI)"}
          </button>
        </div>
        {aiError && <p className="text-xs text-bahaya">{aiError}</p>}
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={4}
          value={deskripsiValue}
          onChange={(e) => setDeskripsiValue(e.target.value)}
          className="w-full rounded-lg border border-garis bg-latar px-3 py-2.5 text-base text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}
