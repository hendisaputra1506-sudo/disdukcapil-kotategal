# Layanan Specification: Disdukcapil Kota Tegal

Dokumen ini adalah *blueprint* spesifikasi teknis antarmuka (UI Specification) untuk halaman **Layanan**. Spesifikasi ini disusun dengan berpedoman pada prinsip **Conservative Redesign** (mempertahankan struktur hierarki asli namun mengoptimalkan kualitas visual dan aksesibilitas) dan menggunakan *Design System* yang telah disetujui.

Halaman Layanan memiliki layout yang konsisten dengan Homepage dan Profil, yang terdiri dari Header, Page Banner, Main Content, Right Sidebar, dan Footer.

---

## 1. Top Header & Main Navigation (Global Component)

Komponen navigasi utama yang seragam di seluruh halaman publik.

- **Tujuan Section:** Menyediakan navigasi utama yang konsisten.
- **Komponen:** Top Header (Tanggal, Link Statis, Media Sosial), Logo Instansi, Menu Utama (dengan *Dropdown* untuk submenu Layanan), Ikon Pencarian.
- **Status:** Menggunakan komponen global yang sama persis dengan Homepage. Tidak ada perubahan struktur.

---

## 2. Page Banner & Breadcrumb

Area penyambutan spesifik untuk halaman Layanan yang memberikan konteks lokasi pengguna.

- **Tujuan Section:** Memberikan penanda visual yang jelas bahwa pengguna sedang berada di bagian Layanan.
- **Komponen yang ada:** Latar belakang gambar (berkaitan dengan pelayanan publik) dengan *overlay* gelap, Judul Halaman ("Layanan" atau nama spesifik layanan), dan Breadcrumb (misal: `Beranda / Layanan / Persyaratan KTP`).
- **Struktur Layout:** *Full-width horizontal band*. Teks rata tengah (Center-aligned) atau rata kiri (Left-aligned) tergantung *Design System*.
- **Responsive Behavior:** Tinggi (*height*) *banner* mengecil pada layar *mobile*. Teks judul menyesuaikan ukuran agar tidak terpotong.
- **Spacing:** *Padding* vertikal lega (misal: `py-12` atau `py-16`) untuk memberikan ruang napas yang cukup.
- **Typography:** Judul Halaman (`text-3xl` atau `text-4xl`, `font-bold`, putih). Breadcrumb (`text-sm`, `text-gray-200` atau putih transparan).

| Item | Penjelasan |
|---|---|
| **Nama** | Page Banner & Breadcrumb |
| **Tujuan** | Orientasi navigasi dan konteks halaman |
| **Layout** | Flexbox / Block standard |
| **Spacing** | py-12 / py-16 |
| **Typography** | Judul: text-3xl/4xl font-bold text-white. Breadcrumb: text-sm |
| **Warna** | Background Image dengan Dark Overlay |
| **Responsive** | Padding vertikal dan ukuran teks menyusut di layar kecil |

---

## 3. Main Content: Daftar Layanan (Halaman Utama Layanan)

Area utama yang menampilkan daftar layanan yang tersedia di Disdukcapil Kota Tegal (KTP, KK, Akta Kelahiran, dll).

- **Tujuan Section:** Memberikan rute yang jelas bagi masyarakat untuk memilih layanan yang ingin diketahui persyaratannya.
- **Komponen yang ada:** Grid Card Layanan. Setiap Card berisi Ikon/Ilustrasi layanan, Judul Layanan, Deskripsi Singkat, dan Tombol "Lihat Persyaratan".
- **Struktur Layout:** Berada di kolom kiri (*Main Content*) mengambil lebar ~70% (`col-span-8` dari 12 kolom pada layar Desktop). Daftar layanan ditampilkan dalam bentuk Grid 2 kolom (atau 3 kolom jika area mencukupi).
- **Responsive Behavior:** Pada Desktop, Main Content berdampingan dengan Right Sidebar. Pada *Mobile*, Main Content mengambil 100% lebar, dan Right Sidebar akan didorong ke bawah (Stack). Grid Card pada *Mobile* menjadi 1 kolom penuh.
- **Spacing:** Jarak antar Card (`gap-6`), *padding* di dalam Card (`p-6`).
- **Typography:** Judul Card (`text-lg font-bold`), Deskripsi (`text-sm text-gray-600`), Tombol (`text-sm font-medium`).
- **Interaksi:** Efek *hover* pada Card (sedikit terangkat / *shadow* membesar) untuk menandakan elemen interaktif.

| Item | Penjelasan |
|---|---|
| **Nama** | Main Content: Daftar Layanan |
| **Tujuan** | Menampilkan pilihan layanan publik |
| **Layout** | Desktop: Kiri (70%), Grid Layanan. Mobile: Lebar Penuh, Tumpuk. |
| **Spacing** | Grid gap-6, Card p-6 |
| **Typography** | Judul Layanan: text-lg font-bold |
| **Warna** | Latar Card: Putih dengan border/shadow halus |
| **Responsive** | Grid 2 kolom di Desktop menjadi 1 kolom di Mobile |

---

## 4. Main Content: Detail Layanan (Sub-Halaman)

Tampilan ketika pengguna mengklik salah satu layanan (misalnya: Persyaratan KTP).

- **Tujuan Section:** Menjelaskan secara rinci apa saja persyaratan, prosedur, dan ketentuan terkait suatu layanan spesifik.
- **Komponen yang ada:** Judul Detail Layanan, Deskripsi Teks, *Unordered/Ordered List* untuk rincian persyaratan, dan opsional tombol *Download* formulir (jika ada).
- **Struktur Layout:** Berada di kolom kiri (*Main Content*). Teks disusun dalam bentuk artikel/dokumen berurutan.
- **Responsive Behavior:** Sama seperti Daftar Layanan, akan mengambil lebar 100% pada *mobile*.
- **Spacing:** *Line-height* lega (`leading-relaxed`), jarak antar paragraf/list yang jelas (`mb-4` atau `space-y-4`).
- **Typography:** Judul Seksi (`text-2xl font-bold`), Teks Paragraf dan List (`text-base text-gray-700`). Penggunaan *Bullet points* yang dirapikan dengan *padding* kiri (`pl-5`).

| Item | Penjelasan |
|---|---|
| **Nama** | Main Content: Detail Layanan |
| **Tujuan** | Menjabarkan syarat dan ketentuan layanan |
| **Layout** | Artikel / Dokumen teks |
| **Spacing** | Paragraf gap/margin mb-4, leading-relaxed |
| **Typography** | Teks konten: text-base text-gray-700 |
| **Responsive** | Menyempit sesuai *container* di Mobile |

---

## 5. Right Sidebar (Global Component)

Bilah di sisi kanan yang berisi pintasan fungsional dan informasi promosi/berita. Digunakan secara konsisten di seluruh halaman publik.

- **Tujuan Section:** Memberikan akses cepat ke layanan eksternal, sosial media, dan menarik perhatian ke konten prioritas tanpa mengganggu informasi utama.
- **Komponen yang ada:**
  1. **Sapahumanis:** Tombol CTA (*Call to Action*) khusus menuju layanan Sapahumanis.
  2. **Stay Connected:** Blok berisi tautan/ikon sosial media resmi (Instagram, Facebook, YouTube, dll).
  3. **Informasi Penting:** *Placeholder* untuk e-flyer/banner gambar.
  4. **Berita Pilihan:** Daftar vertikal 3-5 tautan berita populer/pilihan.
- **Struktur Layout:** Berada di kolom kanan mengambil lebar ~30% (`col-span-4` dari 12 kolom pada layar Desktop). Tersusun secara vertikal bertumpuk (*Stack*).
- **Responsive Behavior:** Disembunyikan di sebelah kanan pada Desktop. Pada *Mobile*, seluruh blok ini akan didorong ke bagian bawah (di bawah *Main Content*) dengan lebar 100%.
- **Spacing:** Jarak antar blok/widget di dalam *sidebar* (`space-y-8`), *padding* di dalam masing-masing *widget* (`p-4` atau `p-6`).
- **Warna:** *Widget* memiliki latar belakang yang berbeda (misalnya putih dengan *shadow*, atau warna aksen muda) untuk membedakannya dari warna latar utama situs.

| Item | Penjelasan |
|---|---|
| **Nama** | Right Sidebar |
| **Tujuan** | Wadah utilitas, promosi, dan navigasi silang |
| **Layout** | Flex Vertical (Stack), Lebar 30% di Desktop |
| **Spacing** | Antar widget: space-y-8 |
| **Warna** | Latar widget: Putih/Abu-abu muda dengan border halus |
| **Responsive** | Pindah ke bagian bawah (*below main content*) pada Mobile |

---

## 6. Footer (Global Component)

Bagian paling bawah halaman yang seragam di seluruh situs.

- **Tujuan Section:** Informasi kontak lengkap, jam operasional umum, *link* navigasi cepat, dan hak cipta.
- **Komponen yang ada:** Identitas Instansi (Logo & Alamat), Tautan Cepat (*Quick Links*), Peta/Kontak, Teks *Copyright*.
- **Status:** Menggunakan komponen global yang sama persis dengan Homepage. Tidak ada perubahan struktur.
