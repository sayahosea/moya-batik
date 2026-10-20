# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**[SENDIRI]**: buat teks untuk Hasil dan Perbaikan.

**Hasil:**
- Modul koneksi Supabase untuk server berhasil dibuat di `lib/supabase/server.js` dan diekspor lewat `lib/supabase/index.js` menggunakan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`.
- Halaman `app/page.jsx` berhasil diubah menjadi Server Component yang mengambil data produk langsung dari tabel `produk` di Supabase.
- Daftar produk ditampilkan rapi dengan komponen `KartuProduk` yang sudah ada.
- Ketergantungan pada `lib/data-contoh.js` serta komponen `CatatanBelumAktif` sudah dihapus dari halaman katalog.
- Pesan error jelas jika pengambilan data gagal, dan tulisan "Belum ada produk" ditampilkan jika tabel kosong.
- Build Next.js sukses tanpa error.

**Perbaikan:**
- Tidak ada perbaikan tambahan; implementasi langsung berhasil dan memenuhi seluruh kriteria US-01 pada percobaan pertama.

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
- Halaman `app/produk/[id]/page.jsx` berhasil diubah menjadi Server Component yang mengambil satu produk dari tabel `produk` di Supabase berdasarkan parameter `id`.
- Ketergantungan pada `lib/data-contoh.js` dan komponen `CatatanBelumAktif` telah dihapus.
- Memanggil `notFound()` jika produk tidak ditemukan atau ID tidak valid, sehingga menampilkan halaman 404 kustom.
- Tampilan detail produk dan tombol WhatsApp tetap dipertahankan.
- Build Next.js sukses tanpa kendala.

**Perbaikan:**
- Tidak ada perbaikan tambahan; fitur langsung berfungsi sesuai kriteria US-02 pada percobaan pertama.

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
- Komponen `TombolWhatsApp` berhasil diubah menjadi tautan `<a>` ke `https://wa.me/` menggunakan nomor dari `lib/toko.js`.
- Pesan otomatis memuat nama dan harga produk berformat rupiah yang di-encode dengan `encodeURIComponent`.
- Tautan membuka di tab baru (`target="_blank"`, `rel="noopener noreferrer"`) dengan tampilan tombol yang tetap konsisten.
- CatatanBelumAktif terkait US-03 di halaman detail produk sudah dihapus.
- Build Next.js sukses tanpa error.

**Perbaikan:**
- Tidak ada perbaikan tambahan; tombol berfungsi sesuai kriteria US-03 pada percobaan pertama.

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
- Modul koneksi sesi admin berbasis `@supabase/ssr` dan cookie dibuat di `lib/supabase/admin.js` memakai `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY`.
- Server Action `login` dan `keluar` dibuat di `app/admin/actions.js`.
- Form di `app/admin/login/page.jsx` terhubung ke Server Action dengan `useActionState`, menampilkan pesan error saat gagal login, dan mengarahkan ke `/admin` saat berhasil.
- Tombol "Keluar" di `components/NavAdmin.jsx` berhasil mengakhiri sesi admin dan kembali ke `/admin/login`.
- Komponen `CatatanBelumAktif` telah dihapus dari halaman login tanpa mengubah tampilan form.
- Next.js build sukses.

**Perbaikan:**
- Menghindari alias re-export pada Server Action di `app/admin/actions.js` agar Turbopack dapat melakukan static analysis dengan lancar.

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
- Server Action `gantiPassword` berhasil dibuat di `app/admin/actions.js` dengan validasi server (minimal 8 karakter dan konfirmasi cocok) serta verifikasi sesi admin aktif.
- Form di `app/admin/password/page.jsx` terhubung ke Server Action via `useActionState`, menampilkan pesan sukses maupun error secara jelas.
- Komponen `CatatanBelumAktif` telah dihapus dari halaman ganti password tanpa mengubah tampilan form.
- Next.js build sukses.

**Perbaikan:**
- Tidak ada perbaikan tambahan; validasi dan penggantian password berfungsi sesuai kriteria US-05 pada percobaan pertama.

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
- Dibuat file `proxy.js` di root proyek untuk memproteksi semua rute `/admin/:path*` (kecuali `/admin/login`) menggunakan Supabase Auth dan cookie.
- Pengguna yang belum terautentikasi dialihkan ke `/admin/login` saat mengakses rute admin mana pun.
- Setiap Server Action yang melakukan modifikasi data dipastikan memvalidasi login admin di server.
- Komponen `CatatanBelumAktif` telah dihapus dari halaman `/admin`.
- Next.js build sukses dengan deteksi otomatis rute `ƒ Proxy (Middleware)`.

**Perbaikan:**
- Tidak ada perbaikan tambahan; proteksi rute berfungsi sesuai kriteria US-06 pada percobaan pertama.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

## US-07 List Produk

**Prompt:**
Baca app/docs/user-stories.md US-07 List Produk.

Kerjakan sesuai bagian itu yaitu:
Sebagai admin, saya ingin produk pada page `/admin` mengambil data dari database.

Kriteria selesai:
- Daftar produk di `/admin` diambil dari database, bukan data contoh.

Abaikan teks poin itu.

**Hasil:**
- Halaman `app/admin/page.jsx` berhasil diubah untuk mengambil seluruh daftar produk langsung dari tabel `produk` di database Supabase secara server-side.
- Ketergantungan terhadap `lib/data-contoh.js` telah dihapus.
- Data produk dari database berhasil ditampilkan menggunakan komponen `TabelProduk` yang sudah ada.
- Next.js build sukses.

**Perbaikan:**
- Tidak ada perbaikan tambahan; daftar produk di `/admin` langsung terhubung ke database dan berfungsi sesuai kriteria US-07 pada percobaan pertama.

## US-08 Tambah produk
## US-09 Ubah produk
## US-10 Hapus produk

**Prompt:**
Baca app/docs/user-stories.md:
- US-08 Tambah produk
- US-09 Ubah produk
- US-10 Hapus produk.

Kerjakan sesuai bagian itu, dan sesuaikan dengan Kriteria selesai.

**Hasil:**
- Dibuat Server Action `tambahProduk`, `ubahProduk`, dan `hapusProduk` di `app/admin/actions.js` dengan proteksi login server (`supabase.auth.getUser()`).
- Form tambah produk di `/admin/produk/baru` berhasil menyimpan data baru ke database dan mengarahkan kembali ke `/admin`.
- Form ubah produk di `/admin/produk/[id]/ubah` memuat data lama dari Supabase dan menyimpan perubahannya.
- Tombol hapus di `components/TabelProduk.jsx` menampilkan konfirmasi dialog sebelum menghapus data dari database.
- Komponen `CatatanBelumAktif` telah dihapus dari seluruh halaman terkait.
- Next.js build sukses.

**Perbaikan:**
- Menambahkan penanganan fallback aman pada pembacaan `cookies()` di `lib/supabase/admin.js` untuk memastikan Server Action dapat dievaluasi secara konsisten tanpa error konteks request.

## US-11 Filter kategori atau pencarian

**Prompt:**
Baca app/docs/user-stories.md:
- US-11 Filter kategori atau pencarian

Kerjakan sesuai bagian itu, dan sesuaikan dengan Kriteria selesai.

**Hasil:**
- Halaman `app/page.jsx` berhasil mengimplementasikan filter kategori dinamis dan pencarian nama produk berbasis `searchParams`.
- Query Supabase menggunakan `.ilike()` untuk pencarian nama produk dan `.eq()` untuk filter kategori.
- Antarmuka pencarian dan barisan pill filter kategori terintegrasi rapi dengan mempertahankan token desain Tailwind yang ada.
- Tombol Reset otomatis tampil jika ada filter atau kata kunci yang aktif.
- Next.js build sukses.

**Perbaikan:**
- Tidak ada perbaikan tambahan; filter kategori dan pencarian berfungsi sesuai kriteria US-11 pada percobaan pertama.
