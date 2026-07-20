SITE MAP DOCUMENT
Modernisasi Website Disdukcapil Kota Tegal Berbasis JavaScript
(Studi Kasus Pembelajaran)
1. Informasi Dokumen
Keterangan	Detail
Nama Dokumen	Sitemap / Information Architecture
Nama Proyek	Modernisasi Website Disdukcapil Kota Tegal
Penyusun	Hendi Saputra
Versi	1.0
Tanggal	14 Juli 2026
Status	Draft
2. Tujuan Dokumen

Dokumen Sitemap disusun untuk menggambarkan struktur navigasi dan hubungan antarhalaman pada website hasil pengembangan. Dokumen ini menjadi acuan dalam proses perancangan antarmuka (UI/UX), pengembangan frontend, backend, serta implementasi database agar seluruh struktur website tetap konsisten dengan kebutuhan yang telah didefinisikan pada Business Requirements Document (BRD).

3. Ruang Lingkup

Website terdiri atas dua bagian utama, yaitu Website Publik yang diakses oleh masyarakat serta Panel Admin yang digunakan untuk mengelola konten berita.

Website Publik
Beranda
Profil
Layanan
Galeri & Berita
Pengaduan
Kontak
Panel Admin
Login
Dashboard
Kelola Berita
4. Information Architecture
Website Publik
Website Disdukcapil
│
├── Beranda
│
├── Profil ▼
│   ├── Visi & Misi
│   ├── Struktur Organisasi
│   ├── Moto Pelayanan
│   ├── Sarana & Prasarana
│   └── Maklumat Pelayanan
│
├── Layanan ▼
│   ├── Jam Pelayanan
│   ├── Persyaratan KTP
│   ├── Persyaratan KK
│   ├── Persyaratan Akta Kelahiran
│   ├── Persyaratan Akta Kematian
│   ├── Persyaratan KIA
│   └── Alur Pelayanan
│
├── Galeri & Berita ▼
│   ├── Daftar Berita
│   └── Detail Berita
│
├── Pengaduan
│
└── Kontak
Panel Admin
Admin
│
├── Login
│
├── Dashboard
│
├── Kelola Berita
│   ├── Tambah Berita
│   ├── Edit Berita
│   ├── Hapus Berita
│   └── Upload Thumbnail
│
└── Logout
5. Struktur Navigasi
| Jenis Navigasi  | Keterangan                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------- |
| Navbar          | Menu utama website                                                                          |
| Dropdown Navbar | Digunakan pada menu Profil, Layanan, dan Galeri                                             |
| Breadcrumb      | Menunjukkan posisi halaman aktif                                                            |
| Right Sidebar   | Digunakan pada seluruh halaman publik (Beranda, Profil, Layanan, Galeri, Pengaduan, Kontak) |
| Footer          | Informasi kontak dan tautan penting                                                         |
| Sidebar Admin   | Digunakan pada Panel Admin                                                                  |

6. Struktur URL
Website Publik
Halaman	URL
Beranda	/
Profil	/profil
Visi & Misi	/profil/visi-misi
Struktur Organisasi	/profil/struktur-organisasi
Moto Pelayanan	/profil/moto-pelayanan
Sarana & Prasarana	/profil/sarana-prasarana
Maklumat Pelayanan	/profil/maklumat-pelayanan
Layanan	/layanan
Detail Layanan	/layanan/:slug
Galeri & Berita	/berita
Detail Berita	/berita/:slug
Pengaduan	/pengaduan
Kontak	/kontak
Panel Admin
Halaman	URL
Login	/admin/login
Dashboard	/admin
Kelola Berita	/admin/news
Tambah Berita	/admin/news/create
Edit Berita	/admin/news/edit/:id
7. User Flow
A. Masyarakat Melihat Persyaratan Layanan
Beranda
      │
      ▼
Layanan
      │
      ▼
Pilih Jenis Layanan
      │
      ▼
Melihat Persyaratan
B. Masyarakat Membaca Berita
Beranda
      │
      ▼
Section Berita Terbaru
      │
      ▼
Klik Berita
      │
      ▼
Detail Berita
C. Administrator Mengelola Berita
Login
      │
      ▼
Dashboard
      │
      ▼
Kelola Berita
      │
      ▼
Tambah / Edit / Hapus

D. Masyarakat Melihat Profil Instansi
Beranda

↓

Navbar

↓

Profil

↓

Pilih Submenu

↓

Visi & Misi
8. Content Inventory
Beranda
| Komponen         | Sumber Data |
| ---------------- | ----------- |
| Hero Banner      | Statis      |
| Layanan Unggulan | Statis      |
| Profil Singkat   | Statis      |
| Berita Terbaru   | Database    |
| Right Sidebar    | Statis      |
| Footer           | Statis      |

Profil
| Komponen         | Sumber Data | Status         |
| ---------------- | ----------- | -------------- |
| Page Banner      | Statis      | ✅ Sudah ada    |
| Breadcrumb       | Dinamis       | ✅ Sudah ada    |
| Konten Profil    | Statis      | ⚠️ Masih statis |
| Stay Connected   | Statis      | ✅ Sudah ada    |
| Informasi Penting| Statis      | ⚠️ Perlu diperbarui |
| Berita Pilihan   | Statis      | ⚠️ Perlu diperbarui |
| Footer           | Statis      | ✅ Sudah ada    |

Layanan
| Komponen          | Sumber Data                 |
| ----------------- | --------------------------- |
| Page Banner       | Statis                      |
| Breadcrumb        | Dinamis (berdasarkan route) |
| Konten Layanan    | Statis                      |
| Stay Connected    | Statis                      |
| Informasi Penting | Statis                      |
| Berita Pilihan    | Statis                      |
| Footer            | Statis                      |

Galeri
| Komponen         | Sumber Data | Status         |
| ---------------- | ----------- | -------------- |
| Page Banner      | Statis      | ✅ Sudah ada    |
| Breadcrumb       | Dinamis       | ✅ Sudah ada    |
| Daftar Berita    | Database    | ⚠️ Perlu dinamisasi |
| Stay Connected   | Statis      | ✅ Sudah ada    |
| Informasi Penting| Statis      | ⚠️ Perlu diperbarui |
| Berita Pilihan   | Statis      | ⚠️ Perlu diperbarui |
| Footer           | Statis      | ✅ Sudah ada    |

Detail Berita
| Komponen         | Sumber Data                 |
| ---------------- | --------------------------- |
| Page Banner      | Statis                      |
| Breadcrumb       | Dinamis (berdasarkan route) |
| Judul & Meta     | Dinamis (dari database)     |
| Konten Berita    | Dinamis (dari database)     |
| Stay Connected   | Statis                      |
| Informasi Penting| Statis                      |
| Berita Pilihan   | Statis                      |
| Footer           | Statis                      |

Pengaduan
| Komponen         | Sumber Data | Status         |
| ---------------- | ----------- | -------------- |
| Page Banner      | Statis      | ✅ Sudah ada    |
| Breadcrumb       | Dinamis       | ✅ Sudah ada    |
| Formulir       | Statis      | ✅ Sudah ada    |
| Informasi Penting| Statis      | ⚠️ Perlu diperbarui |
| Berita Pilihan   | Statis      | ⚠️ Perlu diperbarui |
| Footer           | Statis      | ✅ Sudah ada    |

Kontak
| Komponen         | Sumber Data | Status         |
| ---------------- | ----------- | -------------- |
| Page Banner      | Statis      | ✅ Sudah ada    |
| Breadcrumb       | Dinamis       | ✅ Sudah ada    |
| Informasi Kontak | Statis      | ⚠️ Perlu diperbarui |
| Stay Connected   | Statis      | ✅ Sudah ada    |
| Informasi Penting| Statis      | ⚠️ Perlu diperbarui |
| Berita Pilihan   | Statis      | ⚠️ Perlu diperbarui |
| Footer           | Statis      | ✅ Sudah ada    |

9. Hubungan Halaman
| Halaman             | Terhubung Dengan                           |
| ------------------- | ------------------------------------------ |
| Beranda             | Profil, Layanan, Berita, Pengaduan, Kontak |
| Profil              | Seluruh Submenu Profil                     |
| Visi & Misi         | Struktur Organisasi, Beranda               |
| Struktur Organisasi | Moto Pelayanan, Beranda                    |
| Moto Pelayanan      | Sarana & Prasarana, Beranda                |
| Sarana & Prasarana  | Maklumat Pelayanan, Beranda                |
| Maklumat Pelayanan  | Beranda                                    |
| Layanan             | Detail Layanan                             |
| Berita              | Detail Berita                              |
| Detail Berita       | Berita                                     |
| Pengaduan           | Beranda                                    |
| Kontak              | Beranda                                    |

10. Hubungan Data
Halaman	Data
Beranda	Mengambil 3 berita terbaru dari database
Halaman Berita	Mengambil seluruh berita
Detail Berita	Mengambil 1 berita berdasarkan slug
Halaman Lain	Menggunakan data statis
11. Catatan Implementasi

1. Struktur navigasi mengacu pada website resmi Disdukcapil Kota Tegal dengan penyederhanaan ruang lingkup sesuai kebutuhan proyek.
2. Modul Berita merupakan satu-satunya konten dinamis yang dikelola melalui Panel Admin.
3. Konten Profil, Layanan, Pengaduan, dan Kontak bersifat statis sehingga tidak memerlukan fitur CRUD.
4. Section Berita Terbaru pada halaman Beranda mengambil data langsung dari database sehingga tidak terjadi duplikasi data.
5. Seluruh halaman publik menggunakan layout yang konsisten, yaitu:
   Navbar -> Page Banner -> Breadcrumb -> Main Content + Right Sidebar -> Footer
6. Right Sidebar digunakan sebagai komponen reusable pada seluruh halaman publik dan terdiri dari:
   - Sapahumanis
   - Stay Connected
   - Informasi Penting (placeholder e-flyer/banner)
   - Berita Pilihan
7. Navigasi submenu Profil, Layanan, dan Galeri menggunakan Dropdown Navbar sehingga setiap submenu memiliki URL (route) tersendiri dan memanfaatkan React Router.