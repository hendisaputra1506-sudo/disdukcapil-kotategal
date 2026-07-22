# USER FLOW ADMIN PANEL

## Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal

**Versi Dokumen:** 1.0
**Tanggal:** 21 Juli 2026
**Status:** Draft
**Modul:** Admin Panel (Content Management System)

---

# 1. Pendahuluan

Dokumen ini mendefinisikan alur interaksi pengguna (User Flow) pada Admin Panel sebagai bagian dari proyek redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

User Flow disusun berdasarkan:

1. Business Requirements Document (BRD) Admin Panel versi 1.1.
2. Sitemap Admin Panel versi 1.0.

Dokumen ini menjelaskan langkah-langkah yang dilakukan oleh Administrator ketika berinteraksi dengan sistem, mulai dari proses login, mengakses Dashboard, mengelola konten, mengelola dokumen, mengatur informasi website, hingga mengubah password.

User Flow ini menjadi acuan untuk tahap perancangan:

* Wireframe.
* UI/UX Design.
* API Specification.
* Implementasi Frontend.
* Implementasi Backend.

---

# 2. Tujuan

User Flow Admin Panel dibuat dengan tujuan:

1. Mendefinisikan alur interaksi Administrator dengan sistem.
2. Memastikan setiap fitur dalam Sitemap memiliki alur penggunaan yang jelas.
3. Mengidentifikasi kondisi berhasil dan gagal pada setiap proses.
4. Menjadi dasar perancangan halaman dan komponen UI.
5. Menjadi acuan dalam menentukan kebutuhan API dan proses backend.
6. Menjaga agar alur sistem tetap sederhana dan sesuai dengan ruang lingkup BRD.

---

# 3. Pengguna Sistem

Admin Panel versi pertama hanya memiliki satu jenis pengguna.

| Pengguna      | Deskripsi                                   | Hak Akses                                      |
| ------------- | ------------------------------------------- | ---------------------------------------------- |
| Administrator | Staf yang bertugas mengelola konten website | Akses penuh terhadap seluruh fitur Admin Panel |

Administrator memiliki akses ke:

* Dashboard.
* Berita.
* Banner.
* Galeri.
* Dokumen.
* Pengaturan Website.
* Ubah Password.

Tidak terdapat role Editor, Kontributor, atau role lainnya pada versi pertama.

---

# 4. Prinsip User Flow

User Flow Admin Panel menggunakan prinsip berikut:

### 4.1 Authentication First

Administrator harus berhasil login sebelum dapat mengakses Admin Area.

### 4.2 Protected Route

Halaman internal Admin Panel hanya dapat diakses oleh Administrator yang telah terautentikasi.

### 4.3 Clear Feedback

Setiap aksi yang dilakukan Administrator harus memberikan feedback yang jelas, seperti:

* Berhasil disimpan.
* Berhasil diperbarui.
* Berhasil dihapus.
* Gagal disimpan.
* Data tidak ditemukan.
* Kredensial tidak valid.

### 4.4 Confirmation Before Destructive Action

Aksi yang bersifat destruktif, terutama penghapusan data, harus meminta konfirmasi Administrator sebelum dilakukan.

### 4.5 Return to Context

Setelah aksi selesai, Administrator diarahkan kembali ke halaman yang relevan dan dapat melihat hasil perubahan.

---

# 5. Gambaran Umum User Flow

Alur utama Admin Panel:

```text
Administrator
      │
      ▼
    Login
      │
      ├── Gagal ──► Tampilkan Pesan Error
      │                  │
      │                  └──► Kembali ke Login
      │
      ▼
  Login Berhasil
      │
      ▼
   Dashboard
      │
      ├──► Kelola Berita
      │
      ├──► Kelola Banner
      │
      ├──► Kelola Galeri
      │
      ├──► Kelola Dokumen
      │
      ├──► Pengaturan Website
      │
      └──► Akun
               │
               └──► Ubah Password
      │
      ▼
    Logout
      │
      ▼
    Login
```

---

# 6. User Flow Login

## 6.1 Tujuan

Memungkinkan Administrator masuk ke Admin Panel menggunakan kredensial yang valid.

## 6.2 Alur Utama

```text
Mulai
  │
  ▼
Buka /login
  │
  ▼
Masukkan Email/Username
  │
  ▼
Masukkan Password
  │
  ▼
Klik "Login"
  │
  ▼
Validasi Form
  │
  ├── Tidak Valid
  │       │
  │       ▼
  │   Tampilkan Pesan Validasi
  │       │
  │       └──► Kembali ke Form Login
  │
  ▼
Kirim Kredensial ke Backend
  │
  ▼
Validasi Kredensial
  │
  ├── Tidak Valid
  │       │
  │       ▼
  │   Tampilkan "Username/Password Salah"
  │       │
  │       └──► Kembali ke Form Login
  │
  ▼
Login Berhasil
  │
  ▼
Buat Sesi/Token Autentikasi
  │
  ▼
Redirect ke Dashboard
  │
  ▼
Selesai
```

## 6.3 Kondisi Alternatif

### Kredensial Tidak Valid

```text
Input Login
    │
    ▼
Validasi Backend
    │
    ▼
Kredensial Salah
    │
    ▼
Tampilkan Pesan Error
    │
    ▼
Administrator Mencoba Login Kembali
```

### Field Kosong

```text
Klik Login
    │
    ▼
Validasi Form
    │
    ▼
Field Wajib Kosong
    │
    ▼
Tampilkan Pesan Validasi
```

---

# 7. User Flow Dashboard

## 7.1 Tujuan

Memberikan ringkasan informasi mengenai kondisi konten website.

## 7.2 Alur

```text
Login Berhasil
      │
      ▼
Dashboard
      │
      ├──► Lihat Total Berita
      │
      ├──► Lihat Status Draft/Publish
      │
      ├──► Lihat Total Banner
      │
      ├──► Lihat Status Aktif/Nonaktif
      │
      ├──► Lihat Total Galeri
      │
      ├──► Lihat Total Dokumen
      │
      └──► Lihat Aktivitas Terbaru
```

Dashboard bersifat informatif dan tidak digunakan untuk melakukan CRUD secara langsung.

Administrator dapat berpindah dari Dashboard menuju modul pengelolaan melalui Sidebar.

---

# 8. User Flow Manajemen Berita

Manajemen Berita merupakan salah satu fitur utama Admin Panel.

Fitur yang tersedia:

* Melihat daftar berita.
* Mencari berita.
* Memfilter berita.
* Menambah berita.
* Mengedit berita.
* Menghapus berita.
* Mengubah status Draft/Publish.

---

## 8.1 Melihat Daftar Berita

```text
Dashboard
    │
    ▼
Klik "Konten"
    │
    ▼
Klik "Berita"
    │
    ▼
Halaman Daftar Berita
    │
    ├──► Lihat Daftar Berita
    │
    ├──► Gunakan Pagination
    │
    ├──► Cari Berdasarkan Judul
    │
    ├──► Filter Berdasarkan Kategori
    │
    ├──► Filter Berdasarkan Status
    │
    ├──► Klik "Tambah Berita"
    │
    ├──► Klik "Edit"
    │
    └──► Klik "Hapus"
```

---

## 8.2 Menambah Berita

### Alur Utama

```text
Daftar Berita
    │
    ▼
Klik "Tambah Berita"
    │
    ▼
Form Tambah Berita
    │
    ▼
Isi Judul
    │
    ▼
Slug Dibuat Otomatis
    │
    ▼
Isi Ringkasan
    │
    ▼
Isi Konten Berita
    │
    ▼
Upload Thumbnail
    │
    ▼
Pilih Kategori
    │
    ▼
Pilih Status
    │
    ├── Draft
    │
    └── Publish
    │
    ▼
Isi/Atur Tanggal Publish
    │
    ▼
Klik "Simpan"
    │
    ▼
Validasi Form
    │
    ├── Gagal
    │      │
    │      ▼
    │   Tampilkan Error
    │      │
    │      └──► Kembali ke Form
    │
    ▼
Kirim Data ke Backend
    │
    ▼
Berita Berhasil Disimpan
    │
    ▼
Tampilkan Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Berita
```

### Kondisi Alternatif

Jika terdapat data yang tidak valid:

```text
Klik Simpan
    │
    ▼
Validasi Gagal
    │
    ▼
Tampilkan Field Error
    │
    ▼
Administrator Memperbaiki Data
    │
    ▼
Klik Simpan Kembali
```

Jika upload thumbnail gagal:

```text
Upload Thumbnail
    │
    ▼
Validasi File
    │
    ├── Tidak Valid
    │      │
    │      ▼
    │   Tampilkan Pesan Error
    │
    ▼
Upload Berhasil
```

---

## 8.3 Mengedit Berita

```text
Daftar Berita
    │
    ▼
Pilih Berita
    │
    ▼
Klik "Edit"
    │
    ▼
Halaman Edit Berita
    │
    ▼
Sistem Memuat Data Berita
    │
    ├── Data Tidak Ditemukan
    │      │
    │      ▼
    │   Tampilkan Error
    │
    ▼
Data Berita Ditampilkan
    │
    ▼
Administrator Mengubah Data
    │
    ▼
Klik "Simpan Perubahan"
    │
    ▼
Validasi Data
    │
    ├── Gagal
    │      │
    │      ▼
    │   Tampilkan Error
    │
    ▼
Kirim Perubahan ke Backend
    │
    ▼
Data Berhasil Diperbarui
    │
    ▼
Tampilkan Notifikasi
    │
    ▼
Kembali ke Daftar Berita
```

---

## 8.4 Menghapus Berita

Penghapusan berita merupakan aksi destruktif sehingga memerlukan konfirmasi.

```text
Daftar Berita
    │
    ▼
Klik "Hapus"
    │
    ▼
Tampilkan Dialog Konfirmasi
    │
    ├── Batal
    │    │
    │    └──► Kembali ke Daftar
    │
    └── Konfirmasi Hapus
           │
           ▼
       Kirim Request Delete
           │
           ▼
       Hapus Data
           │
           ▼
       Hapus Berhasil
           │
           ▼
       Tampilkan Notifikasi
           │
           ▼
       Refresh Daftar Berita
```

---

## 8.5 Mengubah Status Berita

```text
Daftar Berita
    │
    ▼
Pilih Berita
    │
    ▼
Ubah Status
    │
    ├── Draft
    │
    └── Publish
    │
    ▼
Konfirmasi Perubahan
    │
    ▼
Kirim Perubahan ke Backend
    │
    ▼
Status Berhasil Diubah
    │
    ▼
Website Publik Memperbarui Tampilan
```

Berita dengan status `Draft` tidak ditampilkan pada website publik.

Berita dengan status `Publish` dapat ditampilkan pada website publik sesuai aturan tampilan yang ditentukan pada sistem publik.

---

# 9. User Flow Manajemen Banner

Modul Manajemen Banner digunakan khusus untuk mengelola gambar Banner Header/Hero pada halaman Beranda website publik.

## 9.1 Melihat Daftar Banner

```text
Dashboard
    │
    ▼
Konten
    │
    ▼
Banner
    │
    ▼
Daftar Banner
```

Administrator dapat:

* Melihat daftar banner.
* Menambah banner.
* Mengedit banner.
* Menghapus banner.
* Mengaktifkan/nonaktifkan banner.
* Mengatur urutan banner.

---

## 9.2 Menambah Banner

```text
Daftar Banner
    │
    ▼
Klik "Tambah Banner"
    │
    ▼
Isi Nama/Judul
    │
    ▼
Upload Gambar
    │
    ▼
Pilih Status
    │
    ▼
Atur Urutan Tampil
    │
    ▼
Klik "Simpan"
    │
    ▼
Validasi
    │
    ├── Gagal ──► Tampilkan Error
    │
    ▼
Simpan ke Backend
    │
    ▼
Berhasil
    │
    ▼
Kembali ke Daftar Banner
```

---

## 9.3 Mengedit Banner

```text
Daftar Banner
    │
    ▼
Klik "Edit"
    │
    ▼
Tampilkan Form Edit
    │
    ▼
Ubah Data
    │
    ▼
Klik "Simpan Perubahan"
    │
    ▼
Validasi
    │
    ▼
Simpan Perubahan
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Banner
```

---

## 9.4 Menghapus Banner

```text
Daftar Banner
    │
    ▼
Klik "Hapus"
    │
    ▼
Dialog Konfirmasi
    │
    ├── Batal ──► Kembali
    │
    └── Konfirmasi
           │
           ▼
       Hapus Banner
           │
           ▼
       Notifikasi Berhasil
           │
           ▼
       Refresh Daftar
```

---

## 9.5 Mengaktifkan/Nonaktifkan Banner

```text
Daftar Banner
    │
    ▼
Pilih Banner
    │
    ▼
Ubah Status
    │
    ├── Aktif
    │
    └── Nonaktif
    │
    ▼
Simpan Perubahan
    │
    ▼
Status Berubah
    │
    ▼
Website Publik Menyesuaikan Tampilan
```

---

# 10. User Flow Manajemen Galeri

## 10.1 Melihat Daftar Galeri

```text
Dashboard
    │
    ▼
Konten
    │
    ▼
Galeri
    │
    ▼
Daftar Galeri
```

Administrator dapat melihat foto galeri berdasarkan kategori yang telah ditentukan.

Kategori merupakan data referensi tetap dan tidak dikelola melalui modul CRUD tersendiri.

---

## 10.2 Menambah Foto Galeri

```text
Daftar Galeri
    │
    ▼
Klik "Tambah Galeri"
    │
    ▼
Isi Judul/Deskripsi
    │
    ▼
Upload Foto
    │
    ▼
Pilih Kategori
    │
    ▼
Klik "Simpan"
    │
    ▼
Validasi
    │
    ├── Gagal ──► Tampilkan Error
    │
    ▼
Simpan Data
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Galeri
```

---

## 10.3 Mengedit Galeri

```text
Daftar Galeri
    │
    ▼
Klik "Edit"
    │
    ▼
Tampilkan Data Foto
    │
    ▼
Ubah Data
    │
    ▼
Klik "Simpan Perubahan"
    │
    ▼
Validasi
    │
    ▼
Simpan Perubahan
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Galeri
```

---

## 10.4 Menghapus Galeri

```text
Daftar Galeri
    │
    ▼
Klik "Hapus"
    │
    ▼
Dialog Konfirmasi
    │
    ├── Batal ──► Kembali
    │
    └── Konfirmasi
           │
           ▼
       Hapus Foto
           │
           ▼
       Notifikasi Berhasil
           │
           ▼
       Refresh Daftar
```

---

# 11. User Flow Manajemen Dokumen

## 11.1 Melihat Daftar Dokumen

```text
Dashboard
    │
    ▼
Klik "Dokumen"
    │
    ▼
Daftar Dokumen
```

Administrator dapat:

* Melihat dokumen.
* Menambah dokumen.
* Mengedit dokumen.
* Menghapus dokumen.

---

## 11.2 Menambah Dokumen

```text
Daftar Dokumen
    │
    ▼
Klik "Tambah Dokumen"
    │
    ▼
Isi Judul Dokumen
    │
    ▼
Isi Deskripsi (Opsional)
    │
    ▼
Upload File PDF
    │
    ▼
Klik "Simpan"
    │
    ▼
Validasi Data
    │
    ├── Gagal ──► Tampilkan Error
    │
    ▼
Simpan Dokumen
    │
    ▼
Tanggal Upload Dibuat Otomatis
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Dokumen
```

---

## 11.3 Mengedit Dokumen

```text
Daftar Dokumen
    │
    ▼
Klik "Edit"
    │
    ▼
Tampilkan Data Dokumen
    │
    ▼
Ubah Judul/Deskripsi
    │
    ▼
Opsional: Ganti File PDF
    │
    ▼
Klik "Simpan Perubahan"
    │
    ▼
Validasi
    │
    ▼
Simpan Perubahan
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Kembali ke Daftar Dokumen
```

---

## 11.4 Menghapus Dokumen

```text
Daftar Dokumen
    │
    ▼
Klik "Hapus"
    │
    ▼
Dialog Konfirmasi
    │
    ├── Batal ──► Kembali
    │
    └── Konfirmasi
           │
           ▼
       Hapus Dokumen
           │
           ▼
       Notifikasi Berhasil
           │
           ▼
       Refresh Daftar
```

---

# 12. User Flow Pengaturan Website

## 12.1 Membuka Pengaturan Website

```text
Dashboard
    │
    ▼
Klik "Pengaturan Website"
    │
    ▼
Sistem Memuat Data Pengaturan
    │
    ▼
Tampilkan Form
```

---

## 12.2 Mengubah Pengaturan Website

```text
Halaman Pengaturan
    │
    ▼
Administrator Mengubah Data
    │
    ├── Logo
    ├── Alamat
    ├── Email
    ├── Nomor Telepon
    └── Tautan Media Sosial
    │
    ▼
Klik "Simpan Perubahan"
    │
    ▼
Validasi Data
    │
    ├── Gagal ──► Tampilkan Error
    │
    ▼
Simpan Perubahan
    │
    ▼
Notifikasi Berhasil
    │
    ▼
Website Publik Menggunakan Data Terbaru
```

---

# 13. User Flow Ubah Password

## 13.1 Alur Utama

```text
Dashboard
    │
    ▼
Klik "Akun"
    │
    ▼
Klik "Ubah Password"
    │
    ▼
Masukkan Password Lama
    │
    ▼
Masukkan Password Baru
    │
    ▼
Konfirmasi Password Baru
    │
    ▼
Klik "Simpan"
    │
    ▼
Validasi Password Lama
    │
    ├── Salah
    │    │
    │    ▼
    │ Tampilkan Error
    │
    ▼
Validasi Password Baru
    │
    ├── Tidak Sesuai
    │    │
    │    ▼
    │ Tampilkan Error
    │
    ▼
Password Berhasil Diubah
    │
    ▼
Tampilkan Notifikasi
```

Setelah password berhasil diubah, sistem dapat meminta Administrator untuk melakukan login kembali menggunakan password baru sebagai langkah keamanan.

---

# 14. User Flow Logout

```text
Administrator Berada di Admin Area
    │
    ▼
Klik Profil/Akun
    │
    ▼
Klik "Logout"
    │
    ▼
Sistem Menghapus/Mengakhiri Sesi Autentikasi
    │
    ▼
Redirect ke /login
    │
    ▼
Selesai
```

Setelah logout, Administrator tidak dapat mengakses halaman Admin Area tanpa melakukan login kembali.

---

# 15. User Flow Protected Route

Seluruh halaman internal Admin Panel harus dilindungi oleh autentikasi.

```text
User Mengakses Halaman Admin
          │
          ▼
    Cek Autentikasi
          │
          ├── Belum Login
          │      │
          │      ▼
          │   Redirect /login
          │
          ▼
    Sudah Login
          │
          ▼
    Izinkan Akses
          │
          ▼
    Tampilkan Halaman
```

Contoh halaman yang harus dilindungi:

```text
/dashboard
/content/news
/content/news/create
/content/news/:id/edit
/content/banners
/content/banners/create
/content/banners/:id/edit
/content/gallery
/content/gallery/create
/content/gallery/:id/edit
/documents
/documents/create
/documents/:id/edit
/settings
/account/change-password
```

---

# 16. Pola Umum CRUD

Seluruh modul yang mendukung CRUD menggunakan pola alur yang serupa.

```text
LIST
 │
 ├──► CREATE
 │      │
 │      ├── Isi Form
 │      ├── Validasi
 │      ├── Simpan
 │      └── Kembali ke LIST
 │
 ├──► READ
 │      │
 │      └── Lihat Data
 │
 ├──► UPDATE
 │      │
 │      ├── Buka Data
 │      ├── Ubah Data
 │      ├── Validasi
 │      ├── Simpan
 │      └── Kembali ke LIST
 │
 └──► DELETE
        │
        ├── Klik Hapus
        ├── Konfirmasi
        ├── Hapus Data
        └── Refresh LIST
```

Pola ini berlaku pada:

* Berita.
* Banner.
* Galeri.
* Dokumen.

---

# 17. Matriks User Flow dan Fitur

| Modul              | Lihat | Tambah | Edit | Hapus | Status         | Pencarian/Filter     |
| ------------------ | ----- | ------ | ---- | ----- | -------------- | -------------------- |
| Berita             | ✓     | ✓      | ✓    | ✓     | Draft/Publish  | ✓                    |
| Banner             | ✓     | ✓      | ✓    | ✓     | Aktif/Nonaktif | -                    |
| Galeri             | ✓     | ✓      | ✓    | ✓     | -              | Berdasarkan kategori |
| Dokumen            | ✓     | ✓      | ✓    | ✓     | -              | -                    |
| Pengaturan Website | ✓     | -      | ✓    | -     | -              | -                    |
| Akun               | ✓     | -      | ✓    | -     | -              | -                    |

---

# 18. Alur Integrasi Admin Panel dan Website Publik

Admin Panel dan Website Publik menggunakan data yang sama melalui backend dan database.

Alur umum:

```text
Administrator
      │
      ▼
Admin Panel
      │
      ▼
Backend API
      │
      ▼
Database
      │
      ▼
Backend API
      │
      ▼
Website Publik
```

Contoh perubahan berita:

```text
Administrator
      │
      ▼
Tambah/Edit/Publish Berita
      │
      ▼
Admin Panel
      │
      ▼
Backend API
      │
      ▼
Database
      │
      ▼
Website Publik
      │
      ▼
Berita Terbaru Ditampilkan
```

Perubahan yang dilakukan Administrator pada Admin Panel harus dapat tercermin pada website publik sesuai status dan aturan publikasi konten.

---

# 19. Alur Utama Administrator

Secara keseluruhan, aktivitas Administrator dapat digambarkan sebagai berikut:

```text
                    ┌───────────┐
                    │   LOGIN   │
                    └─────┬─────┘
                          │
                    Berhasil Login
                          │
                          ▼
                   ┌─────────────┐
                   │  DASHBOARD  │
                   └──────┬──────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
      ┌────────┐     ┌──────────┐    ┌───────────┐
      │ KONTEN │     │ DOKUMEN  │    │ PENGATURAN│
      └────┬───┘     └────┬─────┘    └───────────┘
           │              │
     ┌─────┼─────┐        │
     │     │     │        │
     ▼     ▼     ▼        ▼
   Berita Banner Galeri  Dokumen
     │
     ▼
   CRUD
     │
     ▼
 Database
     │
     ▼
Website Publik

                          │
                          ▼
                       AKUN
                          │
                          ▼
                    Ubah Password
                          │
                          ▼
                        LOGOUT
                          │
                          ▼
                        LOGIN
```

---

# 20. Kesimpulan

User Flow Admin Panel versi 1.0 menetapkan alur interaksi utama Administrator dalam mengelola website publik.

Alur utama terdiri dari:

1. Login dan autentikasi.
2. Mengakses Dashboard.
3. Mengelola Berita.
4. Mengelola Banner.
5. Mengelola Galeri.
6. Mengelola Dokumen.
7. Mengelola Pengaturan Website.
8. Mengubah Password.
9. Logout.

Fokus utama Admin Panel adalah menyediakan alur pengelolaan konten yang sederhana, konsisten, dan mudah digunakan oleh Administrator.

Alur CRUD pada modul Berita menjadi salah satu alur paling penting karena berita merupakan konten dinamis utama yang perlu diperbarui secara berkala.

Dokumen User Flow ini menjadi dasar untuk tahap berikutnya, yaitu perancangan **ERD/Database Design dan API Specification**, serta digunakan sebagai acuan dalam pembuatan **Wireframe Admin Panel**.
