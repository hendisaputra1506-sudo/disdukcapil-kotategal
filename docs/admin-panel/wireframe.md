# WIREFRAME ADMIN PANEL

## Redesain Website Dinas Kependudukan dan Pencatatan Sipil Kota Tegal

**Versi Dokumen:** 1.1
**Tanggal:** 21 Juli 2026
**Status:** Final
**Modul:** Admin Panel / Content Management System
**Frontend:** React + Vite + JavaScript

---

# 1. Pendahuluan

Dokumen ini mendefinisikan wireframe untuk antarmuka Admin Panel pada proyek Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

Wireframe digunakan sebagai acuan struktur dan tata letak antarmuka sebelum implementasi UI High-Fidelity. Dokumen ini berfokus pada struktur halaman, susunan komponen, navigasi, serta interaksi utama pengguna.

Admin Panel dirancang sebagai sistem pengelolaan konten sederhana yang digunakan oleh Administrator untuk mengelola konten dinamis pada website publik.

Ruang lingkup utama Admin Panel meliputi:

1. Login Administrator.
2. Dashboard.
3. Manajemen Berita.
4. Manajemen Banner Header.
5. Manajemen Galeri.
6. Manajemen Dokumen.
7. Pengaturan Website.
8. Pengaturan Akun dan Ubah Password.

---

# 2. Prinsip Perancangan Wireframe

Wireframe Admin Panel mengikuti prinsip berikut:

* Sederhana dan mudah digunakan.
* Fokus pada pengelolaan konten.
* Navigasi konsisten pada seluruh halaman.
* Meminimalkan langkah yang diperlukan untuk melakukan operasi CRUD.
* Memisahkan navigasi utama dengan area konten.
* Menggunakan komponen UI yang konsisten.
* Responsif untuk desktop, tablet, dan perangkat mobile.
* Menggunakan struktur yang dapat dikembangkan ke tahap integrasi API.

Admin Panel tidak dirancang sebagai CMS kompleks seperti WordPress dan tidak menyediakan Page Builder, Theme Builder, atau pengelolaan struktur halaman secara bebas.

---

# 3. Struktur Navigasi Admin Panel

Struktur navigasi utama Admin Panel adalah:

```text
ADMIN PANEL
│
├── Dashboard
│
├── Konten
│   ├── Berita
│   ├── Banner Header
│   └── Galeri
│
├── Dokumen
│
├── Pengaturan Website
│
└── Akun
    └── Ubah Password
```

### Keterangan

**Dashboard**

* Menampilkan ringkasan kondisi konten website.
* Menampilkan statistik konten.
* Menampilkan aktivitas terbaru.

**Konten**

* Berita
* Banner Header
* Galeri

**Dokumen**

* Mengelola dokumen PDF yang tersedia untuk diunduh masyarakat.

**Pengaturan Website**

* Mengelola informasi kontak dan identitas website yang bersifat dinamis.

**Akun**

* Mengelola password akun Administrator.

---

# 4. Struktur Layout Global

Seluruh halaman Admin Panel setelah Administrator berhasil login menggunakan layout utama yang terdiri dari:

```text
┌─────────────────────────────────────────────────────────────┐
│                         TOPBAR                              │
│  ☰  Breadcrumb                              Admin ▼         │
├───────────────┬─────────────────────────────────────────────┤
│               │                                             │
│   SIDEBAR     │                                             │
│               │              CONTENT AREA                   │
│  Dashboard    │                                             │
│               │                                             │
│  KONTEN       │                                             │
│   ├ Berita    │                                             │
│   ├ Banner    │                                             │
│   └ Galeri    │                                             │
│               │                                             │
│  Dokumen      │                                             │
│               │                                             │
│  Pengaturan   │                                             │
│               │                                             │
│  Akun         │                                             │
│               │                                             │
└───────────────┴─────────────────────────────────────────────┘
```

## 4.1 Sidebar

Sidebar berada di sebelah kiri halaman.

Isi sidebar:

* Logo / Identitas Admin Panel.
* Dashboard.
* Konten.

  * Berita.
  * Banner Header.
  * Galeri.
* Dokumen.
* Pengaturan Website.
* Akun.

  * Ubah Password.

Sidebar menampilkan indikator halaman aktif.

Pada perangkat mobile, Sidebar berubah menjadi drawer yang dapat dibuka melalui tombol menu pada Topbar.

---

## 4.2 Topbar

Topbar berada di bagian atas area utama.

Komponen:

* Tombol toggle Sidebar.
* Breadcrumb.
* Nama Administrator.
* Menu akun.

Contoh:

```text
┌─────────────────────────────────────────────────────────────┐
│ ☰   Konten / Berita                         Administrator ▼ │
└─────────────────────────────────────────────────────────────┘
```

---

## 4.3 Content Area

Content Area merupakan area utama untuk menampilkan isi setiap halaman.

Struktur umum:

```text
┌───────────────────────────────────────────────┐
│ Page Title                                     │
│ Deskripsi singkat halaman                      │
│                                                │
│                              [+ Tambah Data]   │
│                                                │
│ ┌───────────────────────────────────────────┐  │
│ │ Filter / Search                           │  │
│ └───────────────────────────────────────────┘  │
│                                                │
│ ┌───────────────────────────────────────────┐  │
│ │ Data Table / Content                      │  │
│ │                                           │  │
│ └───────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

---

# 5. Wireframe Halaman Login

Halaman Login tidak menggunakan Sidebar dan Topbar.

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                    [ LOGO DISDUKCAPIL ]                     │
│                                                             │
│                     ADMIN PANEL                             │
│                                                             │
│               ┌─────────────────────────┐                   │
│               │ Email / Username        │                   │
│               └─────────────────────────┘                   │
│                                                             │
│               ┌─────────────────────────┐                   │
│               │ Password                │                   │
│               └─────────────────────────┘                   │
│                                                             │
│               [        MASUK          ]                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Komponen

* Logo Disdukcapil.
* Judul Admin Panel.
* Input Email / Username.
* Input Password.
* Tombol Masuk.
* Pesan error apabila login gagal.

## Interaksi

Jika kredensial valid:

```text
Login → Dashboard
```

Jika kredensial tidak valid:

```text
Login → Pesan Error → Tetap di Halaman Login
```

---

# 6. Wireframe Dashboard

Dashboard merupakan halaman utama setelah Administrator berhasil login.

```text
┌─────────────────────────────────────────────────────────────┐
│ Dashboard                                                   │
│ Ringkasan pengelolaan konten website                        │
│                                                             │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐│
│ │ Total Berita│ │Banner Aktif │ │Foto Galeri  │ │Dokumen ││
│ │     24      │ │      2      │ │     120     │ │   15   ││
│ └─────────────┘ └─────────────┘ └─────────────┘ └────────┘│
│                                                             │
│ ┌───────────────────────────┐ ┌───────────────────────────┐ │
│ │ Berita Terbaru            │ │ Aktivitas Terbaru         │ │
│ │                           │ │                           │ │
│ │ • Berita 1                │ │ • Menambah berita         │ │
│ │ • Berita 2                │ │ • Mengubah banner         │ │
│ │ • Berita 3                │ │ • Menghapus galeri        │ │
│ │                           │ │                           │ │
│ └───────────────────────────┘ └───────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Komponen

* Statistik Total Berita.
* Statistik Banner Aktif.
* Statistik Foto Galeri.
* Statistik Dokumen.
* Berita terbaru.
* Aktivitas terbaru.

Dashboard hanya berfungsi sebagai ringkasan dan tidak menjadi tempat utama pengelolaan data.

---

# 7. Wireframe Manajemen Berita

## 7.1 Halaman Daftar Berita

```text
┌─────────────────────────────────────────────────────────────┐
│ Berita                                      [+ Tambah Berita]│
│ Kelola berita yang ditampilkan pada website publik          │
│                                                             │
│ ┌─────────────────────┐ ┌─────────────┐ ┌────────────────┐ │
│ │ 🔍 Cari berita...   │ │ Kategori ▼  │ │ Status ▼       │ │
│ └─────────────────────┘ └─────────────┘ └────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Thumbnail │ Judul │ Kategori │ Status │ Tanggal │ Aksi │ │
│ ├───────────┼───────┼──────────┼────────┼─────────┼──────┤ │
│ │ [ IMG ]   │ ...   │ ...      │Publish │ ...     │ ✎ 🗑 │ │
│ │ [ IMG ]   │ ...   │ ...      │ Draft  │ ...     │ ✎ 🗑 │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                    ‹ 1 2 3 ... ›                            │
└─────────────────────────────────────────────────────────────┘
```

## Fitur

* Pencarian berita.
* Filter kategori.
* Filter status.
* Pagination.
* Tambah berita.
* Edit berita.
* Hapus berita.
* Status Draft / Publish.

---

## 7.2 Form Tambah / Edit Berita

```text
┌─────────────────────────────────────────────────────────────┐
│ Tambah Berita                                                │
│                                                             │
│ Judul Berita                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Slug                                                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ judul-berita                                             │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Ringkasan                                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Isi Berita                                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [B] [I] [U] [Link]                                      │ │
│ │                                                         │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Thumbnail                                                    │
│ ┌───────────────────────────┐                               │
│ │       Upload Gambar       │                               │
│ │       [ Pilih File ]      │                               │
│ └───────────────────────────┘                               │
│                                                             │
│ Kategori                     Status                          │
│ ┌──────────────────┐         ┌──────────────────┐            │
│ │ Pilih Kategori ▼ │         │ Draft / Publish ▼│            │
│ └──────────────────┘         └──────────────────┘            │
│                                                             │
│                         [Batal] [Simpan]                     │
└─────────────────────────────────────────────────────────────┘
```

---

# 8. Wireframe Manajemen Banner Header

## 8.1 Konsep Banner

Banner Admin Panel digunakan untuk mengelola **gambar header/hero pada website publik**.

Banner tidak merupakan section tambahan yang berdiri sendiri pada halaman Beranda.

Banner berfungsi sebagai gambar utama pada area header/hero website publik yang dapat diganti secara dinamis.

Contoh penggunaan:

* Banner normal website.
* Banner peringatan Hari Kemerdekaan.
* Banner Hari Jadi Kota Tegal.
* Banner Hari Raya.
* Banner kampanye pelayanan tertentu.
* Banner informasi khusus lainnya.

Administrator dapat mengganti gambar header tanpa perlu mengubah kode frontend website publik.

---

## 8.2 Halaman Daftar Banner Header

```text
┌─────────────────────────────────────────────────────────────┐
│ Banner Header                               [+ Tambah Banner]│
│ Kelola gambar header/hero yang tampil pada website publik   │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Preview │ Nama Banner │ Status │ Urutan │ Periode │ Aksi│ │
│ ├─────────┼─────────────┼────────┼────────┼─────────┼─────┤ │
│ │ [ IMG ] │ Normal      │ Aktif  │ 1      │ -       │ ✎ 🗑│ │
│ │ [ IMG ] │ Kemerdekaan │ Nonaktif│ 2     │ -       │ ✎ 🗑│ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Komponen

* Preview gambar banner.
* Nama banner.
* Status Aktif / Nonaktif.
* Urutan tampil.
* Aksi Edit.
* Aksi Hapus.

---

## 8.3 Form Tambah / Edit Banner Header

```text
┌─────────────────────────────────────────────────────────────┐
│ Tambah Banner Header                                         │
│                                                             │
│ Nama Banner                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Contoh: Banner Hari Kemerdekaan                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Gambar Banner                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ │                    [ PREVIEW ]                           │ │
│ │                                                         │ │
│ │                [ Pilih Gambar ]                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Ukuran yang Direkomendasikan                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 1920 × 600 px                                            │ │
│ │ Rasio 16:5                                               │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Status                       Urutan Tampil                  │
│ ┌──────────────────┐         ┌───────────────────────────┐  │
│ │ Aktif ▼          │         │ 1                         │  │
│ └──────────────────┘         └───────────────────────────┘  │
│                                                             │
│                         [Batal] [Simpan]                     │
└─────────────────────────────────────────────────────────────┘
```

## Ketentuan Gambar Banner

Ukuran gambar banner harus mengikuti standar yang ditentukan oleh sistem.

**Ukuran ideal yang diwajibkan:**

```text
Lebar  : 1920 px
Tinggi : 600 px
Rasio  : 16:5 (dengan toleransi ±5% atau rentang 3.04 – 3.36)
```

Sistem harus memberikan informasi ukuran ideal (1920 × 600 px) kepada Administrator sebelum memilih atau mengunggah gambar.

Sistem juga harus melakukan validasi terhadap:

* Format gambar.
* Ukuran file maksimum.
* Rasio gambar (harus berada dalam rentang toleransi 3.04 – 3.36).

Jika gambar tidak memenuhi ketentuan rasio, sistem akan menolak upload dan menampilkan pesan validasi.

Contoh:

```text
⚠ Ukuran atau rasio gambar Banner tidak sesuai. Gunakan gambar dengan ukuran ideal 1920 × 600 px atau rasio sekitar 16:5.
```

## Catatan Implementasi

Ukuran `1920 × 600 px` merupakan ukuran standar desain yang diwajibkan untuk menghasilkan tampilan header yang konsisten.

Berdasarkan spesifikasi teknis final, sistem:

1. Wajib menolak gambar dengan rasio yang berada di luar rentang toleransi 3.04 - 3.36.
2. Tidak melakukan auto-crop otomatis.
3. Melakukan validasi di sisi frontend untuk memberikan feedback awal kepada admin, serta divalidasi ulang di backend.
4. Menampilkan preview gambar sebelum Admin menyimpan Banner.

---

# 9. Wireframe Manajemen Galeri

## 9.1 Halaman Daftar Galeri

```text
┌─────────────────────────────────────────────────────────────┐
│ Galeri                                      [+ Tambah Foto]  │
│ Kelola dokumentasi foto kegiatan dan informasi              │
│                                                             │
│ ┌─────────────────────┐ ┌────────────────────────────────┐ │
│ │ 🔍 Cari galeri...   │ │ Kategori ▼                     │ │
│ └─────────────────────┘ └────────────────────────────────┘ │
│                                                             │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐                  │
│ │  [ FOTO ] │ │  [ FOTO ] │ │  [ FOTO ] │                  │
│ │  Kegiatan │ │  Kegiatan │ │  Dokument │                  │
│ │  ✎   🗑   │ │  ✎   🗑   │ │  ✎   🗑   │                  │
│ └───────────┘ └───────────┘ └───────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 9.2 Form Tambah / Edit Galeri

Komponen:

* Judul / Deskripsi.
* Upload foto.
* Preview foto.
* Kategori.
* Tombol Batal.
* Tombol Simpan.

Kategori merupakan data referensi tetap dan tidak memiliki menu CRUD tersendiri pada Admin Panel versi pertama.

---

# 10. Wireframe Manajemen Dokumen

## 10.1 Halaman Daftar Dokumen

```text
┌─────────────────────────────────────────────────────────────┐
│ Dokumen                                    [+ Tambah Dokumen]│
│ Kelola dokumen PDF yang dapat diunduh masyarakat            │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔍 Cari dokumen...                                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Nama Dokumen │ Deskripsi │ Tanggal │ Aksi              │ │
│ ├──────────────┼───────────┼─────────┼───────────────────┤ │
│ │ Dokumen 1    │ ...       │ ...     │ 👁 ✎ 🗑            │ │
│ │ Dokumen 2    │ ...       │ ...     │ 👁 ✎ 🗑            │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 10.2 Form Tambah / Edit Dokumen

```text
┌─────────────────────────────────────────────────────────────┐
│ Tambah Dokumen                                               │
│                                                             │
│ Judul Dokumen                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Deskripsi                                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ File PDF                                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │              [ Pilih File PDF ]                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                         [Batal] [Simpan]                     │
└─────────────────────────────────────────────────────────────┘
```

---

# 11. Wireframe Pengaturan Website

Halaman Pengaturan Website digunakan untuk mengelola informasi dinamis yang ditampilkan pada website publik.

```text
┌─────────────────────────────────────────────────────────────┐
│ Pengaturan Website                                           │
│ Kelola informasi identitas dan kontak website               │
│                                                             │
│ Identitas Website                                            │
│                                                             │
│ Logo                                                         │
│ ┌──────────────────────────┐                                 │
│ │       [ LOGO ]           │                                 │
│ │    [ Ganti Logo ]        │                                 │
│ └──────────────────────────┘                                 │
│                                                             │
│ Informasi Kontak                                             │
│                                                             │
│ Alamat                                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Email                                                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Nomor Telepon                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Media Sosial                                                 │
│                                                             │
│ Facebook                                                     │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Instagram                                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                         [Simpan Perubahan]                   │
└─────────────────────────────────────────────────────────────┘
```

## Catatan

Pengaturan Website hanya mencakup informasi yang telah ditetapkan sebagai konten dinamis.

Konten statis seperti:

* Sejarah.
* Visi dan Misi.
* Profil Instansi.
* Struktur Organisasi.
* Struktur navigasi utama.
* Footer statis.

tidak dikelola melalui halaman ini.

---

# 12. Wireframe Ubah Password

```text
┌─────────────────────────────────────────────────────────────┐
│ Ubah Password                                                │
│ Ubah password akun Administrator                             │
│                                                             │
│ Password Saat Ini                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Password Baru                                                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Konfirmasi Password Baru                                    │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                             │
│                         [Batal] [Simpan]                     │
└─────────────────────────────────────────────────────────────┘
```

Validasi:

* Password saat ini harus benar.
* Password baru wajib memenuhi aturan keamanan.
* Konfirmasi password harus sama dengan password baru.

---

# 13. Wireframe Modal Konfirmasi Hapus

Digunakan sebelum Administrator menghapus data.

```text
┌───────────────────────────────────────────────┐
│              Hapus Data?                      │
│                                               │
│ Apakah Anda yakin ingin menghapus data ini?   │
│ Tindakan ini tidak dapat dibatalkan.          │
│                                               │
│                 [Batal]  [Hapus]              │
└───────────────────────────────────────────────┘
```

Modal digunakan pada:

* Berita.
* Banner Header.
* Galeri.
* Dokumen.

---

# 14. Wireframe Empty State

Jika belum terdapat data:

```text
┌───────────────────────────────────────────────┐
│                                               │
│                 [ ICON ]                      │
│                                               │
│             Belum Ada Data                    │
│                                               │
│  Belum terdapat data yang dapat ditampilkan.  │
│                                               │
│             [+ Tambah Data]                   │
│                                               │
└───────────────────────────────────────────────┘
```

---

# 15. Wireframe Responsif

## Desktop

```text
┌──────────────┬────────────────────────────────┐
│              │                                │
│   SIDEBAR    │         CONTENT AREA           │
│   240px      │                                │
│              │                                │
└──────────────┴────────────────────────────────┘
```

## Tablet

```text
┌──────────────┬───────────────────────────────┐
│ SIDEBAR      │                               │
│ Compact      │       CONTENT AREA             │
│              │                               │
└──────────────┴───────────────────────────────┘
```

## Mobile

```text
┌───────────────────────────────────────────────┐
│ ☰       Admin Panel                 Admin ▼   │
├───────────────────────────────────────────────┤
│                                               │
│             CONTENT AREA                      │
│                                               │
│                                               │
└───────────────────────────────────────────────┘
```

Sidebar pada mobile ditampilkan sebagai drawer.

Tabel data harus dapat digunakan pada layar kecil melalui:

* Horizontal scrolling.
* Penyederhanaan kolom.
* Prioritas informasi utama.
* Aksi tetap mudah diakses.

---

# 16. Pola Interaksi CRUD

Seluruh modul yang memiliki operasi CRUD menggunakan pola interaksi yang konsisten.

```text
DAFTAR DATA
     │
     ├── Tambah ──────→ FORM TAMBAH
     │                       │
     │                       └── Simpan → DAFTAR DATA
     │
     ├── Edit ────────→ FORM EDIT
     │                       │
     │                       └── Simpan → DAFTAR DATA
     │
     └── Hapus ───────→ KONFIRMASI
                             │
                             ├── Batal → DAFTAR DATA
                             │
                             └── Hapus → DAFTAR DATA
```

---

# 17. Ringkasan Halaman

| Halaman            | Fungsi Utama                           |
| ------------------ | -------------------------------------- |
| Login              | Autentikasi Administrator              |
| Dashboard          | Ringkasan statistik dan aktivitas      |
| Berita             | CRUD berita                            |
| Form Berita        | Tambah dan edit berita                 |
| Banner Header      | CRUD gambar header/hero website publik |
| Form Banner        | Upload dan pengaturan banner           |
| Galeri             | CRUD dokumentasi foto                  |
| Form Galeri        | Tambah dan edit foto                   |
| Dokumen            | CRUD dokumen PDF                       |
| Form Dokumen       | Upload dan edit dokumen                |
| Pengaturan Website | Mengelola informasi website dinamis    |
| Ubah Password      | Mengubah password Administrator        |

---

# 18. Alur Navigasi Utama

```text
LOGIN
  │
  ▼
DASHBOARD
  │
  ├── KONTEN
  │     ├── BERITA
  │     │     ├── Daftar
  │     │     ├── Tambah
  │     │     └── Edit
  │     │
  │     ├── BANNER HEADER
  │     │     ├── Daftar
  │     │     ├── Tambah
  │     │     └── Edit
  │     │
  │     └── GALERI
  │           ├── Daftar
  │           ├── Tambah
  │           └── Edit
  │
  ├── DOKUMEN
  │     ├── Daftar
  │     ├── Tambah
  │     └── Edit
  │
  ├── PENGATURAN WEBSITE
  │
  └── AKUN
        └── Ubah Password
```

---

# 19. Catatan Implementasi

Wireframe ini merupakan acuan struktur dan tata letak, bukan spesifikasi visual final.

Implementasi High-Fidelity UI harus mengikuti dokumen:

* `design-system-admin-panel.md`
* `technical-design.md`
* `api-specification.md`
* `erd-database-design.md`

Khusus modul **Banner Header**, implementasi frontend dan backend harus memastikan bahwa banner yang berstatus **Aktif** dapat digunakan oleh website publik sebagai sumber gambar header/hero.

Website publik tidak menambahkan section Banner baru. Sistem Banner hanya menyediakan mekanisme pengelolaan gambar yang digunakan pada area header/hero yang sudah tersedia pada desain website publik.

Alur data yang diharapkan:

```text
ADMIN PANEL
     │
     │ Administrator mengunggah
     │ gambar banner
     ▼
BACKEND API
     │
     ▼
DATABASE + FILE STORAGE
     │
     │ Banner Aktif
     ▼
WEBSITE PUBLIK
     │
     ▼
HEADER / HERO IMAGE
```

Dengan demikian, perubahan banner dapat dilakukan Administrator melalui Admin Panel tanpa mengubah source code website publik.
