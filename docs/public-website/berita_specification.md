# Galeri & Berita Specification: Disdukcapil Kota Tegal

Dokumen ini adalah *blueprint* spesifikasi teknis antarmuka (UI Specification) untuk modul **Galeri & Berita**. Spesifikasi ini memuat rancangan dua tampilan utama, yaitu **Halaman Daftar Berita** dan **Halaman Detail Berita**, disusun berdasarkan prinsip **Conservative Redesign** dan struktur layout global website Disdukcapil Kota Tegal.

---

## A. Spesifikasi Desain: Halaman Daftar Berita (Galeri)

Halaman ini berfungsi sebagai arsip utama untuk melihat seluruh berita dan publikasi yang dirilis oleh instansi.

### 1. Global Navigation & Header
- **Komponen:** Top Header, Main Header, Navbar.
- **Status:** Menggunakan komponen global tanpa perubahan.

### 2. Page Banner & Breadcrumb
- **Tujuan Section:** Orientasi navigasi pengguna.
- **Komponen:** Latar belakang gambar berita/galeri dengan *dark overlay*, Judul ("Galeri & Berita"), Breadcrumb (`Beranda / Galeri & Berita`).
- **Typography:** Judul Halaman `text-3xl` atau `text-4xl` font-bold putih, Breadcrumb `text-sm`.

### 3. Main Content: Grid/List Berita
- **Tujuan Section:** Menampilkan daftar artikel terbaru secara dinamis dari *database* beserta navigasi Pagination.
- **Struktur Layout:** *Main Content* di sebelah kiri (70% lebar Desktop). Berita disajikan dalam format Grid Card (2 kolom di Desktop) atau List vertikal.
- **Komponen Card Berita:** *Thumbnail* gambar (rasio 16:9), *Badge* Kategori, Tanggal rilis, Judul Berita (dibatasi 2 baris), Deskripsi Singkat (dibatasi 3 baris), dan link "Baca Selengkapnya".
- **Spacing:** Jarak antar berita `gap-6` atau `gap-8`.
- **Responsive Behavior:** Pada perangkat *Mobile*, grid menjadi 1 kolom yang memenuhi 100% layar.

### 4. Main Content: Pagination
- **Tujuan Section:** Membantu pengguna beralih antar halaman arsip berita dengan rapi.
- **Layout:** Flex horizontal rata tengah (*center-aligned*) di bagian paling bawah daftar berita.
- **Komponen:** Tombol navigasi (Prev, Angka Halaman, Next).
- **Typography & Interaksi:** Angka halaman aktif diberi warna aksen (misal biru primer), sedangkan yang pasif memiliki *hover state* yang interaktif.

---

## B. Spesifikasi Desain: Halaman Detail Berita

Halaman ini merender isi penuh dari sebuah artikel berita berdasarkan URL (slug) spesifik.

### 1. Judul Berita & Hero Image
- **Tujuan Section:** Memberikan konteks visual dan judul utama pada artikel yang sedang dibaca.
- **Layout:** Mengambil seluruh lebar *Main Content* (70% Desktop). Judul terletak di atas gambar.
- **Komponen:** Judul Artikel berukuran besar, *Hero Image* (rasio gambar spesifik 16:9) yang memiliki sudut *rounded-lg*, serta opsi untuk *Caption* gambar.
- **Typography:** Judul Artikel menggunakan `text-2xl` atau `text-3xl` *font-bold* berwana *gray-900*.

### 2. Metadata (Tanggal & Penulis)
- **Komponen:** Tanggal rilis, Nama Penulis/Admin, Kategori Berita.
- **Layout:** Berada persis di bawah Judul atau *Hero Image*, mengadopsi format *Flex horizontal inline* dengan jarak proporsional. Dilengkapi ikon kecil (misal Lucide Icons: Calendar, User, Tag).
- **Spacing:** Margin bawah `mb-6` sebelum isi teks, dengan jarak antar item `gap-4`.
- **Typography:** Teks sekunder `text-sm text-gray-500`.

### 3. Isi Artikel & Galeri Foto (Opsional)
- **Tujuan Section:** Wadah pembacaan teks panjang yang nyaman dan dokumentasi foto pendukung.
- **Layout:** Teks disusun vertikal. Galeri foto pendukung diletakkan di bagian paling bawah artikel menggunakan pola Grid Thumbnail.
- **Typography & Spacing:** Menggunakan ukuran `text-base` atau `text-lg` untuk keterbacaan tinggi, *line-height* lega (`leading-loose` atau `leading-relaxed`), serta jarak `mb-4` untuk memisahkan setiap paragraf baru.

---

## C. Global Sidebar & Footer (Berlaku untuk Kedua Halaman)

### 1. Right Sidebar
- **Struktur Layout:** Mengambil sisa ruang kanan (30% Desktop) secara berdampingan dengan *Main Content*.
- **Komponen Tetap:** 
  - **Sapahumanis**
  - **Stay Connected**
  - **Informasi Penting** (Placeholder e-flyer/banner statis)
  - **Berita Pilihan** (Dinamis mengambil dari *database*)
- **Responsive Behavior:** Pada ukuran layar *Mobile*, Sidebar akan turun ke tumpukan paling bawah dengan lebar penuh 100%.
- **Status:** Komponen global yang harus konsisten dengan Homepage, Profil, dan Layanan.

### 2. Footer
- **Komponen:** Menggunakan komponen Footer standar global.

---

## D. Component Reusability

Bab ini bertujuan sebagai acuan implementasi React agar Frontend Developer mengetahui komponen mana yang harus dibuat *reusable* dan mana yang bersifat khusus (*page-specific*), sehingga menyingkat proses perancangan komponen saat beralih ke fase *development*.

### 1. Global Reusable Components
Daftar seluruh komponen layout struktur global yang dirender tanpa modifikasi dasar:
- `TopHeader`
- `MainHeader`
- `Navbar`
- `PageBanner`
- `Breadcrumb`
- `RightSidebar`
- `Footer`

### 2. Shared UI Components
Daftar komponen UI *atomic/molecular* yang dirancang *reusable* dan dapat dipanggil berulang di halaman lain:
- `SectionTitle` (Judul dengan format tipografi konsisten)
- `NewsCard` (Kartu pratinjau berita dengan gambar, teks, dan meta)
- `Pagination` (Bilah navigasi perpindahan halaman)
- `SidebarWidget` (Kontainer dasar untuk elemen yang diletakkan di *Right Sidebar*)
- `Button` (Komponen tombol fungsional dan *call to action*)
- `Badge` (Label penanda kategori)
- `Card` (Boks dasar *layout* putih dengan *shadow/border*)

### 3. Page Specific Components
Daftar komponen fungsional yang dibangun khusus untuk modul Berita & Galeri:
- `NewsGrid` / `NewsList` (Wadah orkestrasi pemetaan daftar berita)
- `NewsMeta` (Komponen ikonografi metadata: tanggal, penulis, di dalam Detail Berita)
- `ArticleContent` (Wadah khusus tipografi *prose* untuk teks artikel panjang)
- `ArticleGallery` (Wadah *grid lightbox* opsional khusus foto di Detail Berita)

### 4. Data Source Mapping

Tabel pemetaan arah data konten yang dirender pada antarmuka.

| Komponen | Sumber Data | Keterangan |
|---|---|---|
| Judul Page Banner | Dinamis (Route) | Menyesuaikan navigasi halaman |
| Daftar Berita | Database (API) | Dinamis dengan perhitungan Pagination |
| Metadata & Konten Detail | Database (API) | Dinamis dipanggil berdasarkan parameter URL (*slug*) |
| Berita Pilihan (Sidebar) | Database (API) | Dinamis (menampilkan data terpopuler/terbaru terbatas) |
| Widget Right Sidebar Lainnya | Statis | Hardcoded (Sapahumanis, Stay Connected, Info Penting) |
| Footer & Header | Statis | Hardcoded |

### 5. React Readiness Checklist

Penilaian kepatuhan desain antarmuka sebelum diterjemahkan ke *framework* React + Vite:

- [x] Apakah layout sudah reusable?
- [x] Apakah komponen dapat dipisah?
- [x] Apakah data dinamis sudah dipetakan?
- [x] Apakah responsive behavior sudah jelas?
- [x] Apakah sudah sesuai BRD?
- [x] Apakah sudah sesuai Sitemap?
- [x] Apakah sudah sesuai Design System?
- [x] Apakah siap diimplementasikan menggunakan React + Vite?

**Penilaian Kesiapan Implementasi: 100% Siap**
