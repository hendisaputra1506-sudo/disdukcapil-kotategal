# Pengaduan Specification: Disdukcapil Kota Tegal

Dokumen ini adalah *blueprint* spesifikasi teknis antarmuka (UI Specification) untuk **Halaman Pengaduan**. Spesifikasi ini disusun berdasarkan prinsip **Conservative Redesign** dan bertujuan menyediakan informasi pengaduan yang jelas bagi masyarakat tanpa membangun sistem *backend* pengaduan baru (tetap berada di dalam ruang lingkup BRD).

---

## A. Spesifikasi Desain: Halaman Pengaduan

### 1. Global Navigation & Header
- **Komponen:** Top Header, Main Header, Navbar.
- **Status:** Menggunakan komponen global tanpa perubahan.

### 2. Page Banner & Breadcrumb
- **Tujuan Section:** Penanda lokasi halaman pengguna dan orientasi navigasi.
- **Komponen:** Latar belakang gambar terkait pelayanan masyarakat dengan *dark overlay*, Judul ("Layanan Pengaduan"), Breadcrumb (`Beranda / Pengaduan`).
- **Typography:** Judul Halaman `text-3xl` atau `text-4xl` font-bold putih, Breadcrumb `text-sm`.

### 3. Main Content (Kolom Kiri - 70% Lebar Desktop)

Area utama disusun menjadi beberapa *section* berurutan secara vertikal:

#### 3.1. Pengantar Pengaduan
- **Tujuan:** Menjelaskan komitmen instansi terhadap keluhan masyarakat secara formal namun ramah.
- **Komponen:** Judul Section (misal: "Sampaikan Keluhan & Masukan Anda"), Teks Paragraf Deskriptif.
- **Typography:** Judul `text-2xl font-bold text-gray-900`, Teks `text-base text-gray-700 leading-relaxed`.

#### 3.2. Kanal Pengaduan (Grid Cards)
- **Tujuan:** Memberikan opsi media kontak resmi untuk menyampaikan aduan masyarakat.
- **Layout:** Tersusun dalam Grid 2 kolom (Desktop) atau menyusut menjadi 1 kolom (Mobile).
- **Komponen Card:** Ikon layanan (WhatsApp, Email, Telepon, SP4N LAPOR, dll), Nama Layanan, Deskripsi Singkat, Tombol visual eksternal (misal: "Hubungi via WhatsApp").
- **Spacing:** Jarak antar Card `gap-6`, Padding di dalam Card `p-6`.

#### 3.3. Alur Pengaduan (Timeline)
- **Tujuan:** Menampilkan Standar Operasional Prosedur (SOP) secara transparan.
- **Layout:** Menggunakan *Timeline* Horizontal (Desktop) / Vertical (Mobile).
- **Komponen:** Terdiri dari 4 fase utama:
  1. Menyampaikan Pengaduan
  2. Verifikasi
  3. Proses Tindak Lanjut
  4. Penyelesaian
- Dilengkapi dengan *badge* angka bertumpuk lingkaran, dan garis konektor (*connector line*) yang menghubungkan setiap langkah.
- **Typography:** Judul Langkah `text-lg font-semibold`, Teks Deskripsi `text-sm text-gray-600`.

#### 3.4. FAQ Singkat (Pertanyaan Umum)
- **Tujuan:** Mengedukasi pengunjung agar menemukan solusi sebelum mengajukan pertanyaan yang sudah sering dibahas.
- **Layout:** Tersusun vertikal menggunakan pola desain *Accordion*.
- **Komponen:** Terdiri dari 3–5 baris pertanyaan yang dapat diklik (dibuka/ditutup) untuk memunculkan jawaban statis.
- **Interaksi:** Ikon *Chevron* (panah ke bawah) yang akan berputar (*rotate/transition*) 180 derajat saat Accordion terbuka.

---

## B. Global Sidebar & Footer

### 1. Right Sidebar (Kolom Kanan - 30% Lebar Desktop)
- **Komponen Tetap:** 
  - **Sapahumanis**
  - **Stay Connected**
  - **Informasi Penting** (Placeholder e-flyer statis)
  - **Berita Pilihan**
- **Responsive Behavior:** Pada perangkat dengan layar kecil (*Tablet/Mobile*), Sidebar akan didorong ke bawah di bawah keseluruhan blok *Main Content* menjadi tampilan selebar 100%.

### 2. Footer
- Menggunakan komponen global Footer standar.

---

## C. Component Reusability

Bab ini bertujuan sebagai acuan implementasi kode agar Frontend Developer dapat memisahkan dan memetakan *Reusable Component* secara terstruktur sebelum merancang kode React.

### 1. Global Reusable Components
Daftar seluruh komponen struktur kerangka utama yang dirender persis seperti di halaman lainnya:
- `TopHeader`
- `MainHeader`
- `Navbar`
- `PageBanner`
- `Breadcrumb`
- `RightSidebar`
- `Footer`

### 2. Shared UI Components
Daftar *UI element* generik yang dirancang *reusable* sehingga bisa dipakai kembali di fitur lain:
- `SectionTitle` (Judul tiap segmen)
- `Card` (Wadah bersudut *rounded* dan *shadow* halus)
- `Button` (Tombol standar yang dapat diubah status atau ikonnya)
- `Accordion` atau `Collapse` (Komponen fungsional untuk FAQ yang mengatur *state* buka-tutup teks)
- `IconBox` (Boks dengan elemen latar untuk melingkari ikon *Timeline*)

### 3. Page Specific Components
Daftar komponen yang hanya ada dan spesifik digunakan untuk Halaman Pengaduan:
- `ComplaintChannelsGrid` (Wadah orkestrasi pemetaan daftar kanal pengaduan)
- `ComplaintStepTimeline` (Komponen *Timeline* yang menghubungkan visual langkah-langkah alur pengaduan)
- `FAQSection` (Wadah khusus merender daftar *Accordion* FAQ)

### 4. Data Source Mapping

Tabel pemetaan arah data dan status fungsional konten.

| Komponen | Sumber Data | Keterangan |
|---|---|---|
| Teks Pengantar | Statis | Hardcoded (Informasi baku) |
| Kanal Pengaduan (Card) | Statis | Hardcoded (Tautan menuju WhatsApp / Email / SP4N LAPOR) |
| Alur Pengaduan (Timeline)| Statis | Hardcoded teks penjelasan langkah |
| Konten FAQ Singkat | Statis | Hardcoded 3-5 pertanyaan dan jawaban baku |
| Right Sidebar (Berita) | Dinamis (API) | Mengambil berita pilihan |
| Right Sidebar (Lainnya) | Statis | Hardcoded placeholder e-flyer dan utilitas |
| Footer | Statis | Hardcoded |

### 5. React Readiness Checklist

Daftar pemeriksaan akhir spesifikasi desain ini:

- [x] Apakah layout sudah reusable?
- [x] Apakah komponen dapat dipisah?
- [x] Apakah data dinamis sudah dipetakan? (Meskipun sebagian besar statis, pola pendataan jelas)
- [x] Apakah responsive behavior sudah jelas?
- [x] Apakah sudah sesuai BRD? (Tetap sebagai halaman statis informatif, bukan sistem *backend* baru)
- [x] Apakah sudah sesuai Sitemap?
- [x] Apakah sudah sesuai Design System?
- [x] Apakah siap diimplementasikan menggunakan React + Vite?

**Penilaian Kesiapan Implementasi: 100% Siap**
