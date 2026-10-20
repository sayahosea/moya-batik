"use client";

import { useState } from "react";

export default function GaleriFoto({ fotoUrl, namaProduk }) {
  const daftarFoto = Array.isArray(fotoUrl)
    ? fotoUrl
    : fotoUrl
      ? fotoUrl.split(",").map((f) => f.trim()).filter(Boolean)
      : ["/produk/batik.svg"];

  const [fotoAktif, setFotoAktif] = useState(daftarFoto[0] || "/produk/batik.svg");

  return (
    <div className="flex flex-col gap-3">
      {/* Foto Utama */}
      <img
        src={fotoAktif}
        alt={namaProduk}
        className="aspect-square w-full rounded-2xl border border-garis bg-permukaan object-cover"
      />

      {/* Gambar kecil / Thumbnail (Hanya tampil jika produk memiliki lebih dari 1 foto) */}
      {daftarFoto.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {daftarFoto.map((foto, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setFotoAktif(foto)}
              className={`overflow-hidden rounded-lg border-2 transition-all ${
                fotoAktif === foto
                  ? "border-utama scale-105"
                  : "border-garis opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={foto}
                alt={`${namaProduk} ${index + 1}`}
                className="h-16 w-16 bg-permukaan object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
