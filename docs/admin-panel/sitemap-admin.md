# SITEMAP ADMIN PANEL

## Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal

**Versi Dokumen:** 1.0
**Tanggal:** 21 Juli 2026
**Status:** Draft
**Modul:** Admin Panel (Content Management System)

---

# 1. Pendahuluan

Dokumen ini mendefinisikan struktur informasi dan hierarki navigasi pada Admin Panel sebagai bagian dari proyek redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

Sitemap ini disusun berdasarkan kebutuhan yang telah ditetapkan dalam **Business Requirements Document (BRD) Admin Panel versi 1.1**.

Tujuan utama sitemap adalah memberikan gambaran mengenai:

* Struktur halaman Admin Panel.
* Hierarki navigasi antarhalaman.
* Pengelompokan fitur berdasarkan fungsi.
* Hubungan antara menu utama dan submenu.
* Batasan halaman yang dapat diakses oleh Administrator.

Sitemap ini menjadi acuan untuk tahap selanjutnya, yaitu **User Flow, Wireframe, Design System, Technical Design, dan Implementasi Frontend Admin Panel**.

---

# 2. Tujuan Sitemap

Sitemap Admin Panel dibuat dengan tujuan:

1. Menentukan struktur navigasi Admin Panel secara jelas.
2. Memastikan seluruh fitur dalam BRD memiliki tempat yang sesuai dalam struktur aplikasi.
3. Menjaga agar navigasi Admin Panel tetap sederhana dan mudah dipahami.
4. Memudahkan administrator dalam mengakses fungsi pengelolaan konten.
5. Menjadi dasar pembuatan User Flow dan Wireframe Admin Panel.
6. Mencegah penambahan fitur di luar ruang lingkup BRD tanpa proses perubahan requirement.

---

# 3. Prinsip Struktur Navigasi

Struktur navigasi Admin Panel menggunakan beberapa prinsip berikut:

### 3.1 Sederhana

Admin Panel dirancang sebagai CMS sederhana untuk website profil instansi pemerintah. Navigasi tidak dibuat kompleks seperti CMS umum dengan banyak fitur tambahan.

### 3.2 Berbasis Fungsi

Menu dikelompokkan berdasarkan fungsi utama, bukan berdasarkan struktur teknis database.

### 3.3 Konsisten dengan BRD

Setiap menu utama harus memiliki dasar kebutuhan pada BRD Admin Panel versi 1.1.

### 3.4 Konten Dinamis sebagai Fokus Utama

Admin Panel hanya digunakan untuk mengelola konten yang bersifat dinamis dan membutuhkan pembaruan secara berkala.

### 3.5 Konten Statis di Luar Admin Panel

Konten yang jarang berubah seperti Sejarah, Visi & Misi, Profil Instansi, dan Struktur Organisasi tidak dikelola melalui Admin Panel versi pertama.

---

# 4. Struktur Sitemap

Struktur utama Admin Panel adalah sebagai berikut:

```text
Admin Panel
│
├── Login
│
└── Admin Area
    │
    ├── Dashboard
    │
    ├── Konten
    │   │
    │   ├── Berita
    │   │   ├── Daftar Berita
    │   │   ├── Tambah Berita
    │   │   └── Edit Berita
    │   │
    │   ├── Banner
    │   │   ├── Daftar Banner
    │   │   ├── Tambah Banner
    │   │   └── Edit Banner
    │   │
    │   └── Galeri
    │       ├── Daftar Galeri
    │       ├── Tambah Galeri
    │       └── Edit Galeri
    │
    ├── Dokumen
    │   ├── Daftar Dokumen
    │   ├── Tambah Dokumen
    │   └── Edit Dokumen
    │
    ├── Pengaturan Website
    │
    └── Akun
        └── Ubah Password
```

---

# 5. Detail Struktur Halaman

## 5.1 Login

**Path:** `/login`

Halaman Login merupakan pintu masuk Administrator ke Admin Panel.

### Fungsi

* Memasukkan kredensial Administrator.
* Melakukan autentikasi pengguna.
* Mengarahkan Administrator ke Dashboard setelah login berhasil.
* Menolak akses apabila kredensial tidak valid.

### Elemen Utama

* Username atau Email.
* Password.
* Tombol Login.

### Catatan

Fitur Reset Password otomatis melalui email tidak termasuk dalam versi pertama Admin Panel.

Apabila Administrator lupa password, pemulihan akses dilakukan secara manual oleh developer atau database administrator sesuai prosedur operasional yang telah ditetapkan.

---

## 5.2 Admin Area

Setelah berhasil login, Administrator diarahkan ke area utama Admin Panel.

Admin Area menggunakan layout utama yang terdiri dari:

* Sidebar navigasi.
* Header/topbar.
* Area konten utama.
* Informasi akun Administrator.

Seluruh halaman di dalam Admin Area hanya dapat diakses oleh Administrator yang telah terautentikasi.

---

# 6. Dashboard

**Path:** `/dashboard`

Dashboard merupakan halaman utama setelah Administrator berhasil login.

### Fungsi

Memberikan ringkasan kondisi konten website dan aktivitas terbaru.

### Informasi yang Ditampilkan

* Total berita.
* Jumlah berita Draft.
* Jumlah berita Publish.
* Total banner.
* Jumlah banner Aktif.
* Jumlah banner Nonaktif.
* Total foto galeri.
* Total dokumen.
* Aktivitas terbaru Administrator.

### Catatan

Dashboard berfungsi sebagai halaman ringkasan dan monitoring sederhana. Dashboard tidak digunakan untuk mengelola data secara langsung.

---

# 7. Konten

**Path:** `/content`

Menu Konten merupakan kelompok menu yang digunakan untuk mengelola konten utama website publik.

Menu Konten terdiri dari:

* Berita.
* Banner.
* Galeri.

---

## 7.1 Berita

**Path:** `/content/news`

Modul Berita digunakan untuk mengelola berita yang ditampilkan pada website publik.

### Halaman

```text
Berita
├── Daftar Berita
├── Tambah Berita
└── Edit Berita
```

### 7.1.1 Daftar Berita

**Path:** `/content/news`

Menampilkan seluruh berita yang tersimpan di dalam sistem.

### Fungsi

* Melihat daftar berita.
* Mencari berita berdasarkan judul.
* Memfilter berdasarkan kategori.
* Memfilter berdasarkan status.
* Melihat status Draft atau Publish.
* Membuka halaman Edit.
* Menghapus berita.
* Membuka halaman Tambah Berita.

### Aksi Utama

* Tambah Berita.
* Edit.
* Hapus.
* Ubah status Draft/Publish.

### 7.1.2 Tambah Berita

**Path:** `/content/news/create`

Digunakan untuk menambahkan berita baru.

### Data yang Dikelola

* Judul.
* Slug.
* Ringkasan.
* Isi Berita.
* Thumbnail.
* Kategori.
* Status.
* Tanggal Publish.

### Catatan

Slug dihasilkan secara otomatis dari judul dan harus memiliki nilai unik.

### 7.1.3 Edit Berita

**Path:** `/content/news/:id/edit`

Digunakan untuk mengubah data berita yang sudah tersimpan.

Administrator dapat mengubah data berita sesuai kebutuhan.

---

## 7.2 Banner

**Path:** `/content/banners`

Modul Banner digunakan khusus untuk mengelola gambar Banner Header/Hero yang berada pada halaman Beranda website publik.

Modul ini tidak membuat section baru pada website publik.

### Halaman

```text
Banner
├── Daftar Banner
├── Tambah Banner
└── Edit Banner
```

### 7.2.1 Daftar Banner

**Path:** `/content/banners`

Menampilkan seluruh banner yang tersedia.

### Fungsi

* Melihat daftar banner.
* Menambahkan banner.
* Mengedit banner.
* Menghapus banner.
* Mengaktifkan banner.
* Menonaktifkan banner.
* Mengatur urutan tampil banner.

### 7.2.2 Tambah Banner

**Path:** `/content/banners/create`

Digunakan untuk menambahkan banner baru.

### Data yang Dikelola

* Nama/Judul Banner.
* Gambar Banner.
* Status Aktif/Nonaktif.
* Urutan Tampil.

### 7.2.3 Edit Banner

**Path:** `/content/banners/:id/edit`

Digunakan untuk mengubah data banner yang telah tersimpan.

---

## 7.3 Galeri

**Path:** `/content/gallery`

Modul Galeri digunakan untuk mengelola foto dokumentasi yang ditampilkan pada website publik.

Galeri juga digunakan untuk menampilkan dokumentasi kegiatan tanpa membuat modul Kegiatan terpisah.

### Halaman

```text
Galeri
├── Daftar Galeri
├── Tambah Galeri
└── Edit Galeri
```

### 7.3.1 Daftar Galeri

**Path:** `/content/gallery`

Menampilkan daftar foto galeri yang tersedia.

### Fungsi

* Melihat foto galeri.
* Melihat kategori foto.
* Menambahkan foto.
* Mengedit data foto.
* Menghapus foto.

### 7.3.2 Tambah Galeri

**Path:** `/content/gallery/create`

Digunakan untuk menambahkan foto baru.

### Data yang Dikelola

* Judul/Deskripsi Foto.
* File Foto.
* Kategori.

### 7.3.3 Edit Galeri

**Path:** `/content/gallery/:id/edit`

Digunakan untuk mengubah data foto galeri yang telah tersimpan.

---

# 8. Dokumen

**Path:** `/documents`

Modul Dokumen digunakan untuk mengelola dokumen PDF yang dapat diunduh oleh masyarakat melalui website publik.

### Halaman

```text
Dokumen
├── Daftar Dokumen
├── Tambah Dokumen
└── Edit Dokumen
```

### 8.1 Daftar Dokumen

**Path:** `/documents`

Menampilkan seluruh dokumen yang tersedia.

### Fungsi

* Melihat daftar dokumen.
* Menambahkan dokumen.
* Mengedit dokumen.
* Menghapus dokumen.

### 8.2 Tambah Dokumen

**Path:** `/documents/create`

Digunakan untuk mengunggah dokumen baru.

### Data yang Dikelola

* Judul Dokumen.
* Deskripsi.
* Berkas PDF.

Tanggal unggah dihasilkan secara otomatis oleh sistem.

### 8.3 Edit Dokumen

**Path:** `/documents/:id/edit`

Digunakan untuk mengubah informasi atau mengganti berkas dokumen.

---

# 9. Pengaturan Website

**Path:** `/settings`

Halaman Pengaturan Website digunakan untuk mengelola informasi umum website yang bersifat dinamis.

### Data yang Dikelola

* Logo Website.
* Alamat Instansi.
* Email Kontak.
* Nomor Telepon.
* Tautan Media Sosial Resmi.

### Catatan

Media sosial hanya dikelola sebagai tautan menuju platform resmi instansi. Tidak terdapat integrasi API atau fitur posting otomatis ke media sosial.

### Konten yang Tidak Dikelola

Pengaturan Website tidak mencakup:

* Footer dinamis.
* Struktur menu dinamis.
* Theme Builder.
* Page Builder.

Footer dan struktur navigasi tetap mengikuti desain website yang telah ditentukan.

---

# 10. Akun

**Path:** `/account`

Menu Akun digunakan untuk mengelola informasi keamanan akun Administrator.

## 10.1 Ubah Password

**Path:** `/account/change-password`

Digunakan oleh Administrator untuk mengubah password akun yang sedang digunakan.

### Data yang Diperlukan

* Password Lama.
* Password Baru.
* Konfirmasi Password Baru.

### Catatan

Sistem versi pertama hanya memiliki satu role, yaitu Administrator.

Fitur multi-role seperti Editor atau Kontributor belum termasuk dalam ruang lingkup versi pertama.

---

# 11. Struktur Navigasi Sidebar

Struktur navigasi utama yang direkomendasikan:

```text
SIDEBAR
│
├── Dashboard
│
├── Konten
│   ├── Berita
│   ├── Banner
│   └── Galeri
│
├── Dokumen
│
├── Pengaturan Website
│
└── Akun
    └── Ubah Password
```

Menu `Konten` menggunakan pola **dropdown/collapsible submenu**.

Contoh:

```text
Konten ▾
├── Berita
├── Banner
└── Galeri
```

Menu lainnya dapat langsung mengarah ke halaman masing-masing.

---

# 12. Halaman yang Tidak Termasuk Sitemap Admin Panel

Berdasarkan BRD Admin Panel versi 1.1, halaman berikut tidak termasuk dalam sitemap Admin Panel versi pertama:

| No | Fitur/Halaman        | Keterangan                                                 |
| -- | -------------------- | ---------------------------------------------------------- |
| 1  | Manajemen Kategori   | Kategori merupakan data referensi tetap.                   |
| 2  | Manajemen Kegiatan   | Dokumentasi kegiatan dikelola melalui Galeri.              |
| 3  | Pengaduan            | Tidak terdapat sistem pengaduan internal pada Admin Panel. |
| 4  | Sejarah              | Konten statis.                                             |
| 5  | Visi & Misi          | Konten statis.                                             |
| 6  | Profil Instansi      | Konten statis.                                             |
| 7  | Struktur Organisasi  | Konten statis.                                             |
| 8  | Footer Dinamis       | Footer bersifat statis.                                    |
| 9  | Manajemen Menu       | Struktur menu ditentukan melalui kode/desain.              |
| 10 | Reset Password Email | Pemulihan dilakukan secara manual pada versi pertama.      |
| 11 | Page Builder         | Tidak diperlukan.                                          |
| 12 | Theme Builder        | Tidak diperlukan.                                          |
| 13 | Plugin Manager       | Tidak diperlukan.                                          |
| 14 | Multi Bahasa         | Tidak diperlukan.                                          |
| 15 | Multi Website        | Sistem hanya untuk satu website.                           |
| 16 | Workflow Approval    | Hanya terdapat satu role Administrator.                    |

---

# 13. Ringkasan Sitemap

Struktur final Admin Panel versi 1.1 dapat diringkas sebagai berikut:

```text
ADMIN PANEL
│
├── /login
│
└── ADMIN AREA
    │
    ├── /dashboard
    │
    ├── /content
    │   │
    │   ├── /content/news
    │   │   ├── /content/news/create
    │   │   └── /content/news/:id/edit
    │   │
    │   ├── /content/banners
    │   │   ├── /content/banners/create
    │   │   └── /content/banners/:id/edit
    │   │
    │   └── /content/gallery
    │       ├── /content/gallery/create
    │       └── /content/gallery/:id/edit
    │
    ├── /documents
    │   ├── /documents/create
    │   └── /documents/:id/edit
    │
    ├── /settings
    │
    └── /account
        └── /account/change-password
```

---

# 14. Kesimpulan

Sitemap Admin Panel versi 1.0 menetapkan struktur navigasi yang sederhana dan berfokus pada kebutuhan utama pengelolaan website publik.

Struktur utama terdiri dari:

1. Login.
2. Dashboard.
3. Konten.

   * Berita.
   * Banner.
   * Galeri.
4. Dokumen.
5. Pengaturan Website.
6. Akun.

   * Ubah Password.

Struktur ini menjadi acuan untuk pembuatan **User Flow Admin Panel** dan selanjutnya digunakan sebagai dasar dalam perancangan **Wireframe dan UI Admin Panel**.

Setiap penambahan menu atau fitur yang tidak tercantum dalam sitemap ini harus mengacu pada BRD dan, apabila berada di luar ruang lingkup yang telah ditetapkan, harus melalui proses perubahan requirement.
