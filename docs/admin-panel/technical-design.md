# TECHNICAL DESIGN DOCUMENT

## Admin Panel (Content Management System)

### Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal

**Versi Dokumen:** 1.0
**Tanggal:** 21 Juli 2026
**Status:** Draft / Implementation Ready
**Disusun oleh:** Hendi
**Modul:** Admin Panel

---

# 1. Pendahuluan

## 1.1 Tujuan Dokumen

Dokumen Technical Design ini menjelaskan rancangan teknis untuk pengembangan Admin Panel sebagai bagian dari proyek Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

Dokumen ini menjadi acuan teknis bagi pengembang dalam mengimplementasikan sistem berdasarkan kebutuhan yang telah ditetapkan pada:

* Business Requirements Document (BRD)
* Sitemap Admin Panel
* User Flow Admin Panel
* ERD / Database Design
* API Specification
* Wireframe Admin Panel
* Design System Admin Panel

Dokumen ini berfokus pada bagaimana sistem akan dibangun secara teknis, termasuk arsitektur aplikasi, struktur folder, komunikasi frontend dan backend, autentikasi, pengelolaan file, basis data, keamanan, serta strategi integrasi dengan website publik.

---

## 1.2 Ruang Lingkup

Technical Design ini mencakup:

1. Arsitektur sistem.
2. Arsitektur frontend Admin Panel.
3. Arsitektur backend API.
4. Struktur folder proyek.
5. Integrasi Admin Panel dengan backend.
6. Integrasi Admin Panel dengan database.
7. Mekanisme autentikasi dan otorisasi.
8. Pengelolaan konten dinamis.
9. Pengelolaan file dan gambar.
10. Mekanisme sinkronisasi data dengan website publik.
11. Keamanan aplikasi.
12. Validasi data.
13. Penanganan error.
14. Logging dan aktivitas sistem.
15. Deployment dan konfigurasi environment.

---

# 2. Gambaran Umum Sistem

Admin Panel merupakan aplikasi internal yang digunakan oleh Administrator Disdukcapil Kota Tegal untuk mengelola konten dinamis yang ditampilkan pada website publik.

Secara umum, sistem terdiri dari tiga komponen utama:

1. **Website Publik**

   * Digunakan oleh masyarakat.
   * Menampilkan informasi yang telah dipublikasikan.
   * Dibangun menggunakan React + Vite.
   * Mengambil data dinamis dari Backend API.

2. **Admin Panel**

   * Digunakan oleh Administrator.
   * Digunakan untuk mengelola Berita, Banner, Galeri, Dokumen, Pengaturan Website, dan Akun.
   * Dibangun menggunakan React + Vite.
   * Berkomunikasi dengan Backend melalui REST API.

3. **Backend API**

   * Menangani autentikasi.
   * Menangani business logic.
   * Menangani CRUD data.
   * Menangani validasi.
   * Mengakses database.
   * Mengelola file upload.
   * Menyediakan API untuk Website Publik dan Admin Panel.

Database menggunakan MySQL sebagai penyimpanan data utama.

---

# 3. Arsitektur Sistem

Arsitektur sistem menggunakan pendekatan client-server dengan REST API.

```text
┌──────────────────────────────┐
│        WEBSITE PUBLIK        │
│       React + Vite           │
│                              │
│  Masyarakat / Pengunjung     │
└──────────────┬───────────────┘
               │
               │ HTTP Request
               │
               ▼
┌──────────────────────────────┐
│          BACKEND API         │
│       Node.js + Express      │
│                              │
│  Authentication              │
│  Authorization               │
│  Business Logic              │
│  Validation                  │
│  File Upload                 │
│  REST API                    │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌───────────────┐
│   MySQL     │  │ File Storage  │
│  Database   │  │ Images / PDF  │
└─────────────┘  └───────────────┘
       ▲
       │
       │ HTTP Request
       │
┌──────┴───────────────────────┐
│         ADMIN PANEL           │
│          React + Vite         │
│                               │
│       Administrator           │
└───────────────────────────────┘
```

Admin Panel dan Website Publik tidak berkomunikasi secara langsung satu sama lain.

Keduanya mengakses sumber data yang sama melalui Backend API.

Pendekatan ini digunakan agar:

* Data memiliki satu sumber utama.
* Business logic tidak berada di frontend.
* Admin Panel dan Website Publik dapat dikembangkan secara terpisah.
* Keamanan akses dapat dikontrol melalui Backend.
* Perubahan data dari Admin Panel dapat langsung digunakan Website Publik.

---

# 4. Struktur Repository

Struktur utama proyek ditetapkan sebagai berikut:

```text
disdukcapil_website/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── ...
│   │
│   └── admin/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── vite.config.js
│       └── ...
│
├── backend/
│   ├── src/
│   ├── uploads/
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── public-website/
│   │   └── ...
│   │
│   └── admin-panel/
│       ├── brd-admin-panel.md
│       ├── sitemap.md
│       ├── user-flow.md
│       ├── erd-database-design.md
│       ├── api-specification.md
│       ├── wireframe.md
│       ├── design-system.md
│       └── technical-design.md
│
└── README.md
```

Struktur ini merupakan struktur final yang digunakan untuk pengembangan proyek.

Website publik dan Admin Panel merupakan dua aplikasi frontend terpisah yang berada di bawah folder `frontend`.

Backend berada pada folder `backend`.

Dokumentasi proyek berada pada folder `docs`.

---

# 5. Struktur Frontend Website Publik

Website publik menggunakan React + Vite dan JavaScript.

Struktur dasar:

```text
frontend/public/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── pages/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── ...
```

Website publik bertanggung jawab terhadap:

* Menampilkan halaman informasi.
* Menampilkan berita yang berstatus Publish.
* Menampilkan banner yang berstatus Aktif.
* Menampilkan galeri.
* Menampilkan dokumen yang tersedia untuk publik.
* Mengambil pengaturan website dari Backend API.

Website publik tidak memiliki akses untuk membuat, mengubah, atau menghapus data.

---

# 6. Struktur Frontend Admin Panel

Admin Panel menggunakan React + Vite dan JavaScript.

Struktur dasar:

```text
frontend/admin/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       ├── Table.jsx
│   │       ├── Pagination.jsx
│   │       └── ...
│   │
│   ├── pages/
│   │   ├── Login/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── Dashboard/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── News/
│   │   │   ├── NewsList.jsx
│   │   │   ├── NewsCreate.jsx
│   │   │   └── NewsEdit.jsx
│   │   │
│   │   ├── Banners/
│   │   │   ├── BannerList.jsx
│   │   │   ├── BannerCreate.jsx
│   │   │   └── BannerEdit.jsx
│   │   │
│   │   ├── Gallery/
│   │   │   ├── GalleryList.jsx
│   │   │   ├── GalleryCreate.jsx
│   │   │   └── GalleryEdit.jsx
│   │   │
│   │   ├── Documents/
│   │   │   ├── DocumentList.jsx
│   │   │   ├── DocumentCreate.jsx
│   │   │   └── DocumentEdit.jsx
│   │   │
│   │   ├── Settings/
│   │   │   └── WebsiteSettings.jsx
│   │   │
│   │   └── Account/
│   │       └── ChangePassword.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── newsService.js
│   │   ├── bannerService.js
│   │   ├── galleryService.js
│   │   ├── documentService.js
│   │   └── settingsService.js
│   │
│   ├── hooks/
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── utils/
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── ...
```

Struktur folder menggunakan pendekatan modular berdasarkan fitur.

Setiap modul memiliki halaman tersendiri dan menggunakan service API yang sesuai.

---

# 7. Struktur Backend

Backend menggunakan Node.js dan Express.js.

Struktur yang direkomendasikan:

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── newsController.js
│   │   ├── bannerController.js
│   │   ├── galleryController.js
│   │   ├── documentController.js
│   │   ├── settingsController.js
│   │   └── accountController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── newsRoutes.js
│   │   ├── bannerRoutes.js
│   │   ├── galleryRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── settingsRoutes.js
│   │   └── accountRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   ├── validationMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── services/
│   │
│   ├── models/
│   │
│   ├── validators/
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/
│   ├── news/
│   ├── banners/
│   ├── gallery/
│   └── documents/
│
├── package.json
└── .env
```

Pembagian tanggung jawab:

* **Routes** menangani definisi endpoint.
* **Controllers** menangani request dan response.
* **Services** menangani business logic.
* **Models** menangani interaksi data.
* **Middleware** menangani autentikasi, upload, validasi, dan error.
* **Validators** menangani validasi input.
* **Config** menangani konfigurasi aplikasi dan database.

---

# 8. Arsitektur Routing

## 8.1 Admin Panel

URL dasar:

```text
http://localhost:5174
```

Routing utama:

```text
/login
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

Semua route selain `/login` harus dilindungi oleh `ProtectedRoute`.

---

## 8.2 Website Publik

URL dasar:

```text
http://localhost:5173
```

Website publik menggunakan route yang telah ditetapkan dalam Sitemap Website Publik.

Contoh:

```text
/
/profil
/layanan
/berita
/berita/:slug
/galeri
/dokumen
/pengaduan
```

Route dapat disesuaikan dengan Sitemap final Website Publik.

---

# 9. API Architecture

Backend menyediakan REST API dengan prefix:

```text
/api
```

Endpoint Admin menggunakan prefix:

```text
/api/admin
```

Contoh:

```text
/api/admin/news
/api/admin/banners
/api/admin/gallery
/api/admin/documents
/api/admin/settings
```

Endpoint publik menggunakan prefix:

```text
/api/public
```

Contoh:

```text
/api/public/news
/api/public/banners
/api/public/gallery
/api/public/documents
/api/public/settings
```

Pemisahan endpoint dilakukan agar:

* API publik hanya mengembalikan data yang boleh ditampilkan.
* API Admin dapat melakukan operasi CRUD.
* Hak akses lebih mudah dikontrol.
* Struktur API lebih jelas.

---

# 10. Autentikasi dan Otorisasi

Mekanisme autentikasi menggunakan **HttpOnly Cookie** (`adminToken`) berbasis JSON Web Token (JWT) yang diterbitkan oleh backend.

Mekanisme Keamanan:
- **HttpOnly Cookie**: Token disimpan dalam cookie ber-atribut `httpOnly: true`, `secure` (pada production HTTPS), `sameSite` (`lax`/`strict`), dan `path: '/'`. Token tidak dapat dibaca oleh JavaScript client-side untuk mencegah pencurian token via XSS.
- **Strict CORS**: Mengizinkan origin terdaftar (`FRONTEND_ADMIN_URL` dan `FRONTEND_PUBLIC_URL`) dengan `credentials: true`.
- **Security Headers**: Dilindungi oleh middleware `helmet()` di backend.
- **Rate Limiting**: Endpoint `POST /api/auth/login` dilindungi `loginRateLimiter` (maksimal 5 percobaan gagal dalam 15 menit).
- **Session Invalidation**: Kolom `password_changed_at` di MySQL digunakan untuk menandai perubahan password. Jika `password_changed_at` > timestamp penerbitan token (`iat`), `authMiddleware` akan menolak request (`401 Unauthorized`) dan memaksa login ulang.

Alur login:

```text
Administrator
      │
      ▼
Masukkan Email + Password
      │
      ▼
POST /api/auth/login (credentials: 'include')
      │
      ▼
Backend Validasi Kredensial + Rate Limiter
      │
      ├── Tidak Valid → 401 Unauthorized (Pesan Generik)
      │
      ▼
Kredensial Valid
      │
      ▼
Membuat JWT + Set HttpOnly Cookie (adminToken)
      │
      ▼
Frontend Menyimpan User State di Memori (Auth Context)
      │
      ▼
Redirect ke Dashboard
```

---

# 11. Proteksi Route Frontend

Admin Panel menggunakan `ProtectedRoute` yang terintegrasi dengan `AuthContext` dan verifikasi backend async `GET /api/auth/me`.

Konsep:

```text
User membuka /dashboard
        │
        ▼
ProtectedRoute Memeriksa Sesi via GET /api/auth/me
        │
    ┌───┴───┐
    │       │
  200 OK  401 / Err
    │       │
    ▼       ▼
Dashboard  Clear User State & Redirect /login
```

Jika sesi autentikasi tidak valid atau telah berakhir, cookie dibersihkan oleh backend/browser, dan pengguna diarahkan kembali ke halaman Login.


---

# 12. Database

Database menggunakan MySQL.

Entitas utama:

```text
users
news
categories
banners
gallery
documents
website_settings
activity_logs
```

Relasi utama:

```text
users
  │
  └──── activity_logs

categories
  │
  ├──── news
  │
  └──── gallery

news
  │
  └──── users

banners
  │
  └──── users

gallery
  │
  └──── users

documents
  │
  └──── users
```

Struktur detail tabel mengikuti dokumen ERD / Database Design.

Technical Design tidak mengubah struktur data yang telah disepakati dalam ERD tanpa proses revisi dokumen.

---

# 13. Manajemen Berita

Modul Berita merupakan fitur utama Admin Panel.

Operasi yang tersedia:

```text
Create
Read
Update
Delete
Search
Filter
Publish / Draft
```

Alur tambah berita:

```text
Administrator
      │
      ▼
Klik "Tambah Berita"
      │
      ▼
Isi Form
      │
      ├── Judul
      ├── Slug
      ├── Ringkasan
      ├── Isi
      ├── Thumbnail
      ├── Kategori
      └── Status
      │
      ▼
Validasi Frontend
      │
      ▼
POST /api/admin/news
      │
      ▼
Validasi Backend
      │
      ▼
Simpan Database
      │
      ▼
Upload Thumbnail
      │
      ▼
Response Success
      │
      ▼
Daftar Berita
```

Ketika berita berstatus `Draft`, berita tidak ditampilkan pada Website Publik.

Ketika berita berstatus `Publish`, berita dapat ditampilkan pada Website Publik.

---

# 14. Manajemen Banner

Modul Banner digunakan khusus untuk mengelola gambar Banner Header/Hero yang berada pada halaman Beranda Website Publik.

Modul ini tidak membuat section baru pada website publik.

Data utama:

* Judul/nama banner.
* Gambar banner.
* Status aktif/nonaktif.
* Urutan tampil.

Administrator dapat:

* Menambahkan banner.
* Mengubah banner.
* Menghapus banner.
* Mengaktifkan banner.
* Menonaktifkan banner.
* Mengatur urutan tampil.

Sistem melakukan validasi berikut saat upload banner:
* Sistem memvalidasi ukuran ideal (1920 × 600 px) dan aspect ratio ideal (16:5).
* Gambar dengan rasio di luar rentang toleransi (3.04 – 3.36) akan ditolak oleh sistem.
* Sistem tidak melakukan auto-crop otomatis.
* Admin harus mendapatkan informasi ukuran ideal sebelum memilih gambar.
* Admin mendapatkan preview gambar sebelum menyimpan Banner.
* Validasi dilakukan di sisi frontend untuk memberikan feedback awal, dan divalidasi ulang di sisi backend sebagai pengamanan.

Website Publik hanya mengambil banner dengan status:

```text
Aktif
```

Data diurutkan berdasarkan field urutan tampil.

---

# 15. Manajemen Galeri

Modul Galeri digunakan untuk mengelola dokumentasi foto.

Data utama:

* Judul/deskripsi.
* File foto.
* Kategori.

Kategori Galeri merupakan data referensi tetap pada versi pertama.

Administrator dapat:

* Menambahkan foto.
* Mengubah data foto.
* Menghapus foto.
* Melihat daftar foto.

Galeri dapat digunakan untuk menampilkan dokumentasi kegiatan tanpa membuat modul Kegiatan terpisah.

---

# 16. Manajemen Dokumen

Modul Dokumen digunakan untuk mengelola file PDF yang dapat diunduh publik.

Administrator dapat:

* Mengunggah dokumen.
* Mengubah judul.
* Mengubah deskripsi.
* Mengganti file.
* Menghapus dokumen.

File yang diperbolehkan:

```text
PDF
```

File disimpan pada storage yang telah ditentukan pada konfigurasi deployment.

Database menyimpan metadata file, bukan isi binary file secara langsung.

---

# 17. Pengaturan Website

Pengaturan Website bersifat global.

Data yang dikelola:

* Logo.
* Alamat.
* Email.
* Nomor telepon.
* Tautan media sosial.

Data pengaturan website digunakan oleh Website Publik.

Ketika Administrator mengubah pengaturan, perubahan akan digunakan oleh Website Publik melalui API.

Footer statis tidak dikelola melalui modul Pengaturan Website sesuai keputusan BRD.

---

# 18. Pengelolaan File

File yang diunggah dikelompokkan berdasarkan jenis:

```text
uploads/
├── news/
├── banners/
├── gallery/
└── documents/
```

Aturan umum:

* Nama file disimpan secara unik.
* File lama yang diganti harus ditangani dengan benar.
* File yang tidak lagi digunakan sebaiknya dihapus dari storage.
* Validasi MIME type wajib dilakukan.
* Validasi ukuran file wajib dilakukan.
* File upload tidak boleh menerima ekstensi berbahaya.

Gambar digunakan untuk:

```text
JPG
JPEG
PNG
```

Dukungan WebP bersifat opsional dan mengikuti hasil konfirmasi kebutuhan.

Dokumen menggunakan:

```text
PDF
```

---

# 19. Validasi

Validasi dilakukan pada dua lapisan.

## 19.1 Frontend Validation

Digunakan untuk memberikan feedback cepat kepada Administrator.

Contoh:

* Field wajib tidak boleh kosong.
* Email harus valid.
* File harus memiliki format yang sesuai.
* Ukuran file tidak boleh melebihi batas.

## 19.2 Backend Validation

Backend tetap melakukan validasi ulang.

Frontend validation tidak dianggap sebagai mekanisme keamanan.

Backend wajib memvalidasi seluruh request sebelum data diproses.

---

# 20. Penanganan Error

Backend menggunakan format response error yang konsisten.

Contoh:

```json
{
  "success": false,
  "message": "Data berita tidak ditemukan"
}
```

Untuk validasi:

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": {
    "title": "Judul wajib diisi"
  }
}
```

HTTP status code yang digunakan:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

Frontend harus menampilkan pesan error yang mudah dipahami oleh Administrator.

---

# 21. Dashboard

Dashboard mengambil data ringkasan dari Backend API.

Informasi yang ditampilkan:

* Total berita.
* Total berita Draft.
* Total berita Publish.
* Total banner.
* Total banner aktif.
* Total banner nonaktif.
* Total foto galeri.
* Total dokumen.
* Aktivitas terbaru.

Dashboard tidak melakukan kalkulasi utama secara manual di frontend.

Data statistik dihitung oleh Backend berdasarkan data aktual pada database.

---

# 22. Activity Log

Activity Log digunakan untuk mencatat aktivitas penting Administrator.

Aktivitas yang dapat dicatat:

```text
CREATE
UPDATE
DELETE
LOGIN
LOGOUT
```

Contoh:

```text
Administrator menambahkan berita "Informasi Pelayanan KTP"
Administrator mengubah banner "Pelayanan Online"
Administrator menghapus foto galeri
Administrator login
```

Activity Log digunakan untuk kebutuhan audit dan monitoring.

Activity Log tidak harus memiliki halaman manajemen tersendiri pada versi pertama, tetapi data dapat ditampilkan sebagai aktivitas terbaru pada Dashboard.

---

# 23. Keamanan

Sistem menerapkan prinsip keamanan dasar sebagai berikut:

1. Password disimpan menggunakan hashing.
2. Seluruh endpoint Admin membutuhkan autentikasi.
3. Input pengguna divalidasi.
4. File upload divalidasi berdasarkan tipe dan ukuran.
5. Database menggunakan query terparameterisasi atau ORM untuk mencegah SQL Injection.
6. Output yang berasal dari pengguna harus ditangani untuk mencegah XSS.
7. Environment variable digunakan untuk menyimpan credential.
8. Credential database tidak boleh ditulis langsung dalam source code.
9. HTTPS digunakan pada production.
10. Error internal tidak menampilkan detail sensitif kepada pengguna.

---

# 24. Environment Configuration

Konfigurasi sensitif disimpan menggunakan environment variable.

Contoh:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=disdukcapil
DB_USER=root
DB_PASSWORD=

JWT_SECRET=
SESSION_SECRET=

UPLOAD_DIR=uploads
```

File `.env` tidak boleh di-commit ke repository publik.

File `.env.example` digunakan sebagai template konfigurasi.

Contoh:

```env
PORT=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_SECRET=
SESSION_SECRET=

UPLOAD_DIR=
```

---

# 25. Konfigurasi Development

Website Publik:

```text
http://localhost:5173
```

Admin Panel:

```text
http://localhost:5174
```

Backend API:

```text
http://localhost:5000
```

Contoh komunikasi:

```text
Admin Panel
localhost:5174
       │
       ▼
Backend API
localhost:5000/api
       │
       ▼
MySQL
localhost:3306
```

Website Publik:

```text
Website Publik
localhost:5173
       │
       ▼
Backend API
localhost:5000/api/public
```

Port dapat disesuaikan apabila terdapat konflik pada environment development.

---

# 26. Sinkronisasi Website Publik dan Admin Panel

Admin Panel dan Website Publik menggunakan database yang sama melalui Backend API.

Contoh:

```text
Administrator
     │
     ▼
Admin Panel
     │
     ▼
POST /api/admin/news
     │
     ▼
Backend
     │
     ▼
MySQL
     │
     ▼
News Status = Publish
     │
     ▼
Website Publik
     │
     ▼
GET /api/public/news
     │
     ▼
Berita tampil
```

Tidak diperlukan proses sinkronisasi manual antara Admin Panel dan Website Publik.

Perubahan data akan tersedia melalui API setelah berhasil disimpan pada database.

---

# 27. Deployment

Deployment production terdiri dari:

```text
Internet
   │
   ▼
Web Server / Reverse Proxy
   │
   ├───────────────┐
   ▼               ▼
Public Frontend  Admin Frontend
   │               │
   └───────┬───────┘
           ▼
       Backend API
           │
      ┌────┴────┐
      ▼         ▼
    MySQL    File Storage
```

Website publik dan Admin Panel dapat di-host sebagai aplikasi frontend terpisah.

Backend berjalan sebagai service Node.js.

Database menggunakan MySQL.

File upload disimpan pada storage yang tersedia di server atau storage eksternal sesuai keputusan deployment.

---

# 28. Backup

Backup dilakukan secara berkala terhadap:

1. Database MySQL.
2. File upload.
3. Konfigurasi penting.

Backup database dan file upload harus diperlakukan sebagai dua komponen terpisah karena file gambar dan dokumen tidak tersimpan langsung dalam database.

Frekuensi backup ditentukan pada tahap deployment dan operasional bersama pihak infrastruktur.

---

# 29. Urutan Implementasi

Implementasi Admin Panel dilakukan secara bertahap.

## Tahap 1 — Setup

* Membuat project React + Vite Admin Panel.
* Menentukan struktur folder.
* Mengatur Tailwind CSS.
* Mengatur routing.
* Membuat layout Admin Panel.

## Tahap 2 — Authentication

* Membuat halaman Login.
* Membuat endpoint login.
* Membuat autentikasi backend.
* Membuat Protected Route.
* Membuat Logout.

## Tahap 3 — Dashboard

* Membuat dashboard.
* Membuat endpoint statistik.
* Menampilkan aktivitas terbaru.

## Tahap 4 — Manajemen Berita

Prioritas utama:

* Daftar berita.
* Tambah berita.
* Edit berita.
* Hapus berita.
* Search.
* Filter.
* Draft / Publish.

## Tahap 5 — Manajemen Banner

* CRUD Banner.
* Status Aktif / Nonaktif.
* Pengaturan urutan.

## Tahap 6 — Manajemen Galeri

* CRUD Galeri.
* Upload foto.
* Kategori referensi.

## Tahap 7 — Manajemen Dokumen

* Upload PDF.
* Edit metadata.
* Ganti file.
* Hapus dokumen.

## Tahap 8 — Pengaturan Website

* Logo.
* Alamat.
* Email.
* Nomor telepon.
* Media sosial.

## Tahap 9 — Akun

* Ubah password.

## Tahap 10 — Integrasi Website Publik

* Menghubungkan API publik.
* Menampilkan berita Publish.
* Menampilkan banner Aktif.
* Menampilkan galeri.
* Menampilkan dokumen.
* Menampilkan pengaturan website.

## Tahap 11 — Testing

* Functional testing.
* API testing.
* Authentication testing.
* File upload testing.
* Responsive testing.
* Integration testing.
* User Acceptance Testing.

---

# 30. Kriteria Kesiapan Implementasi

Implementasi dapat dimulai apabila:

* BRD telah disepakati.
* Sitemap telah ditetapkan.
* User Flow telah ditetapkan.
* ERD telah ditetapkan.
* API Specification telah ditetapkan.
* Wireframe telah ditetapkan.
* Design System telah ditetapkan.
* Struktur repository telah ditetapkan.
* Struktur frontend Admin Panel telah dibuat.
* Struktur backend telah dibuat.
* Environment development telah berjalan.
* Database dapat diakses.
* Endpoint API utama telah tersedia.

---

# 31. Keputusan Teknis Final

Keputusan teknis utama yang digunakan sebagai baseline implementasi:

| Komponen               | Keputusan                                            |
| ---------------------- | ---------------------------------------------------- |
| Public Frontend        | React + Vite + JavaScript                            |
| Admin Frontend         | React + Vite + JavaScript                            |
| Styling                | Tailwind CSS                                         |
| Backend                | Node.js + Express.js                                 |
| Database               | MySQL                                                |
| API                    | REST API                                             |
| Admin Port             | 5174                                                 |
| Public Port            | 5173                                                 |
| Backend Port           | 5000                                                 |
| Authentication         | Session atau Token-based sesuai implementasi backend |
| Role                   | Administrator                                        |
| Image Storage          | File Storage                                         |
| Document Storage       | File Storage                                         |
| Image Format           | JPG/JPEG/PNG                                         |
| Document Format        | PDF                                                  |
| API Admin              | `/api/admin/*`                                       |
| API Public             | `/api/public/*`                                      |
| Public Frontend Folder | `frontend/public/`                                   |
| Admin Frontend Folder  | `frontend/admin/`                                    |
| Backend Folder         | `backend/`                                           |
| Documentation          | `docs/`                                              |

---

# 32. Penutup

Technical Design ini menjadi acuan teknis utama dalam implementasi Admin Panel Website Disdukcapil Kota Tegal.

Implementasi harus mengikuti requirement yang telah ditetapkan dalam BRD dan desain yang telah disepakati dalam dokumen pendukung.

Apabila ditemukan kebutuhan baru yang tidak tercantum dalam dokumen ini maupun BRD, kebutuhan tersebut harus dievaluasi terlebih dahulu sebelum diimplementasikan agar tidak terjadi perubahan scope yang tidak terkendali.

Prioritas implementasi utama adalah memastikan Admin Panel dapat digunakan secara stabil untuk mengelola konten dinamis, terutama Berita, Banner, Galeri, dan Dokumen, serta memastikan perubahan data dapat ditampilkan dengan benar pada Website Publik melalui Backend API.

Dokumen ini dapat diperbarui apabila terdapat perubahan arsitektur, teknologi, atau kebutuhan teknis yang telah disepakati secara resmi.
