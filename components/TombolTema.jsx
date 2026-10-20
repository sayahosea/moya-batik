"use client";

import { useState, useEffect } from "react";

export default function TombolTema({ className = "" }) {
  const [tema, setTema] = useState("terang");
  const [sudahDimuat, setSudahDimuat] = useState(false);

  useEffect(() => {
    try {
      const tersimpan = localStorage.getItem("moya-batik-tema");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const temaAwal = tersimpan || (prefersDark ? "gelap" : "terang");

      setTema(temaAwal);
      if (temaAwal === "gelap") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Ignore storage errors
    }
    setSudahDimuat(true);
  }, []);

  const gantiTema = () => {
    const temaBaru = tema === "gelap" ? "terang" : "gelap";
    setTema(temaBaru);

    try {
      localStorage.setItem("moya-batik-tema", temaBaru);
    } catch {
      // Ignore storage errors
    }

    if (temaBaru === "gelap") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!sudahDimuat) {
    return (
      <div className={`h-9 w-9 rounded-lg border border-garis bg-latar ${className}`} />
    );
  }

  const isDark = tema === "gelap";

  return (
    <button
      type="button"
      onClick={gantiTema}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Mode Terang" : "Mode Gelap"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-latar text-teks transition-colors hover:border-utama hover:text-utama ${className}`}
    >
      {isDark ? (
        // Ikon Matahari (untuk kembali ke mode terang)
        <svg className="h-5 w-5 text-harga" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        // Ikon Bulan (untuk beralih ke mode gelap)
        <svg className="h-5 w-5 text-teks-lembut" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
}
