# Kontak Specification: Disdukcapil Kota Tegal

Dokumen ini adalah *blueprint* spesifikasi teknis antarmuka (UI Specification) untuk **Halaman Kontak**. Halaman ini berfungsi sebagai pusat informasi statis bagi masyarakat yang ingin mengetahui lokasi fisik, jam operasional, dan detail nomor darurat/operasional instansi, mengedepankan prinsip **Conservative Redesign** tanpa tambahan fungsionalitas formulir di luar ruang lingkup (sesuai arahan BRD).

---

## A. Spesifikasi Desain: Halaman Kontak

### 1. Global Navigation & Header
- **Komponen:** Top Header, Main Header, Navbar.
- **Status:** Menggunakan komponen global secara penuh.

### 2. Page Banner & Breadcrumb
- **Tujuan Section:** Orientasi visual halaman.
- **Komponen:** Latar belakang gambar gedung instansi atau layanan dengan *dark overlay*, Judul ("Hubungi Kami" atau "Kontak"), Breadcrumb (`Beranda / Kontak`).
- **Typography:** Judul Halaman `text-3xl` atau `text-4xl font-bold` teks putih, Breadcrumb `text-sm`.

### 3. Main Content (Kolom Kiri - 70% Lebar Desktop)

Area *Main Content* untuk Halaman Kontak dibagi menjadi dua fokus utama: Rincian Informasi dan Peta Lokasi.

#### 3.1. Informasi Kontak Instansi (Grid Layout)
- **Tujuan:** Menampilkan detail alamat dan nomor fungsional dengan kejelasan tinggi.
- **Layout:** Menggunakan formasi Grid 2 kolom (Desktop) yang otomatis berubah menjadi 1 kolom (Mobile).
- **Komponen Utama:**
  - **Alamat Kantor:** Menampilkan Ikon Map Pin, nama instansi, alamat lengkap beserta kode pos.
  - **Kontak:** Ikon Telepon / Amplop Email, beserta nomor Call Center resmi dan alamat surat elektronik.
  - **Jam Operasional:** Ikon Jam, menjabarkan hari kerja (Senin - Jumat) beserta durasi pelayanannya.
- **Spacing:** Jarak vertikal antar item di set dengan `gap-6` atau `gap-8`.
- **Typography:** Menggunakan *heading* kecil `text-lg font-semibold` untuk nama item, dan `text-base text-gray-700` untuk teks deskripsi.

#### 3.2. Peta Lokasi (Google Maps Embed)
- **Tujuan:** Memberikan kemudahan pencarian lokasi melalui panduan spasial *real-time*.
- **Layout:** Lebar penuh (*Full-width*) membentang pada area kolom kontainer *Main Content*.
- **Komponen:** *Iframe embed* langsung dari Google Maps.
- **Styling UI:** Area peta diberikan efek *rounded-lg* pada setiap sudutnya, bingkai *border* tipis yang halus, dan dikunci pada tinggi absolut (*fixed height*) sekitar `h-96` (sekitar 380px - 400px) agar tidak memakan ruang vertikal secara berlebih pada layar *mobile*.

---

## B. Global Sidebar & Footer

### 1. Right Sidebar (Kolom Kanan - 30% Lebar Desktop)
- **Komponen Tetap:** 
  - **Sapahumanis**
  - **Stay Connected**
  - **Informasi Penting** (Placeholder e-flyer statis)
  - **Berita Pilihan**
- **Responsive Behavior:** Akan pindah memposisikan diri di bawah *Main Content* pada ukuran layar yang lebih kecil.

### 2. Footer
- Menggunakan Footer yang sudah distandarisasi, memastikan bahwa alamat yang ada di Halaman Kontak dan Footer sinkron dengan data instansi.

---

## C. Component Reusability

Tahapan ini merinci struktur kerangka komponen UI (berbasis fungsionalitas) agar Frontend Developer dapat mulai merancang modularitas kode di tahap *development*.

### 1. Global Reusable Components
Daftar komponen arsitektur utama yang sama dengan seluruh *pages* publik lainnya:
- `TopHeader`
- `MainHeader`
- `Navbar`
- `PageBanner`
- `Breadcrumb`
- `RightSidebar`
- `Footer`

### 2. Shared UI Components
Daftar komponen yang lebih granular dan dapat didaur ulang penggunaannya:
- `SectionTitle` (Tipografi terstandar untuk *heading*)
- `IconBox` (Boks aksen yang memuat ikon informasional)
- `MapEmbed` (Wadah pembungkus iframe dengan standar proporsi lebar/tinggi)
- `Card` atau wadah `List` generik.

### 3. Page Specific Components
Komponen khusus yang menjadi karakteristik eksklusif Halaman Kontak:
- `ContactInfoGrid` (Wadah atau struktur grid spesifik yang mengatur urutan rincian operasional instansi)

### 4. Data Source Mapping

Tabel yang memetakan arah *data fetching* konten. Seluruh konten inti Halaman Kontak merupakan data statis (hardcoded).

| Komponen | Sumber Data | Keterangan |
|---|---|---|
| Rincian Alamat & Telepon | Statis | *Hardcoded* berdasarkan data instansi resmi |
| Peta Lokasi (Iframe URL) | Statis | *Hardcoded url params* dari Google Maps |
| Jam Operasional | Statis | *Hardcoded* |
| Right Sidebar (Berita) | Dinamis (API) | *Fetching* berita pilihan dari *database* |
| Right Sidebar (Widget Lain) | Statis | Placeholder *hardcoded* |

### 5. React Readiness Checklist

Verifikasi kesesuaian dokumen desain ini dengan parameter pengembangan UI:

- [x] Apakah layout sudah reusable?
- [x] Apakah komponen dapat dipisah?
- [x] Apakah data dinamis sudah dipetakan? (Sebagian besar statis, jelas batasannya)
- [x] Apakah responsive behavior sudah jelas?
- [x] Apakah sudah sesuai BRD? (Menghindari penambahan *backend form* yang tidak diminta)
- [x] Apakah sudah sesuai Sitemap?
- [x] Apakah sudah sesuai Design System?
- [x] Apakah siap diimplementasikan menggunakan React + Vite?

**Penilaian Kesiapan Implementasi: 100% Siap**
