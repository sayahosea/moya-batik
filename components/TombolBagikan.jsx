"use client";

import { useState } from "react";

export default function TombolBagikan({ judul, deskripsi, className = "" }) {
  const [tersalin, setTersalin] = useState(false);

  const handleBagikan = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const dataBagikan = {
      title: judul || "Produk Moya Batik",
      text: deskripsi || `Lihat ${judul} di Moya Batik!`,
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(dataBagikan)) {
      try {
        await navigator.share(dataBagikan);
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    // Fallback: Salin ke clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch {
      // Ignore clipboard write error
    }
  };

  return (
    <button
      type="button"
      onClick={handleBagikan}
      aria-label="Bagikan atau salin link produk"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-garis bg-latar px-4 py-2.5 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama ${className}`}
    >
      {tersalin ? (
        <>
          <svg className="h-4 w-4 text-utama" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          <span className="text-utama">Link tersalin!</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
          <span>Bagikan produk</span>
        </>
      )}
    </button>
  );
}
