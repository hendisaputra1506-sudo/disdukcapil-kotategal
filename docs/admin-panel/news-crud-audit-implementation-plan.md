# NEWS CRUD — PRE-IMPLEMENTATION AUDIT & IMPLEMENTATION PLAN

**Proyek:** Website Publik & Admin Panel Disdukcapil Kota Tegal
**Modul:** Manajemen Berita (News Management)
**Dokumen:** Pre-Implementation Audit & Implementation Plan
**Versi:** 1.0
**Status:** READY FOR IMPLEMENTATION PLANNING
**Tanggal:** 22 Juli 2026

---

# 1. Tujuan Dokumen

Dokumen ini dibuat sebagai acuan sebelum implementasi modul **CRUD Berita (News CRUD)** pada Admin Panel Disdukcapil Kota Tegal.

Dokumen bertujuan untuk:

1. Memastikan kondisi aktual backend, frontend, database, dan dokumentasi sebelum implementasi.
2. Memastikan struktur tabel `news` dan relasinya dengan `categories` dapat mendukung kebutuhan modul Berita.
3. Menentukan endpoint API yang diperlukan untuk pengelolaan berita.
4. Menentukan aturan bisnis untuk pembuatan, pengubahan, penghapusan, draft, dan publikasi berita.
5. Menentukan kebutuhan upload dan pengelolaan thumbnail berita.
6. Menentukan mekanisme authorization untuk melindungi operasi CRUD.
7. Menentukan kebutuhan Activity Log untuk aktivitas administratif.
8. Mencegah implementasi kode yang bertentangan dengan BRD, ERD, API Specification, dan Technical Design yang sudah ada.
9. Menjadi dasar implementasi backend CRUD Berita secara bertahap sebelum integrasi ke Admin Panel dan website publik.

---

# 2. Prinsip Implementasi

Implementasi modul Berita wajib mengikuti prinsip berikut:

### 2.1 Audit Before Implementation

Sebelum membuat atau mengubah kode, agent wajib melakukan audit terhadap:

* Struktur backend aktual.
* Struktur frontend Admin Panel aktual.
* Struktur database aktual.
* Dokumen BRD.
* ERD Database Design.
* API Specification.
* Technical Design.
* Sitemap Admin Panel.
* User Flow Admin Panel.
* Wireframe Admin Panel.
* Design System Admin Panel.

Agent tidak boleh langsung mengasumsikan struktur file atau endpoint yang belum diverifikasi.

---

### 2.2 Tidak Mengubah Requirement Tanpa Alasan

Jika ditemukan perbedaan antara dokumen dan implementasi aktual:

1. Identifikasi perbedaannya.
2. Jelaskan dampaknya.
3. Tentukan apakah diperlukan perubahan dokumentasi atau kode.
4. Jangan mengubah requirement secara diam-diam.

Jika terdapat konflik antar dokumen, implementasi harus dihentikan sementara dan konflik harus dilaporkan sebelum coding dilanjutkan.

---

### 2.3 Tidak Mengimplementasikan Modul di Luar Scope

Tahap ini hanya berfokus pada:

* CRUD Berita.
* Kategori Berita.
* Thumbnail Berita.
* Draft dan Published.
* Authorization.
* Activity Log yang berkaitan dengan Berita.
* Integrasi Admin Panel untuk modul Berita.
* Integrasi website publik untuk menampilkan berita published.

Modul berikut belum menjadi fokus utama:

* Banner.
* Galeri.
* Dokumen.
* Website Settings.
* Manajemen User.

Modul tersebut hanya boleh disentuh jika diperlukan secara langsung oleh implementasi Berita.

---

# 3. Kondisi Sistem Saat Ini

Berdasarkan laporan progress terakhir, sistem telah memiliki fondasi berikut:

### Backend

* Node.js.
* Express.js.
* MySQL.
* `mysql2/promise`.
* JWT Authentication.
* HttpOnly Cookie.
* `authMiddleware`.
* `roleMiddleware`.
* Login Rate Limiter.
* Helmet.
* Strict CORS.
* Error Handler.

### Database

Database:

`disdukcapil_admin`

Tabel utama:

* `users`
* `categories`
* `news`
* `banners`
* `galleries`
* `documents`
* `website_settings`
* `activity_logs`

Database telah diverifikasi siap untuk pengembangan CRUD Berita.

### Authentication

Authentication telah menggunakan:

* JWT.
* HttpOnly Cookie.
* React Auth Context.
* Protected Route.
* Session Invalidation melalui `password_changed_at`.

### Kategori

Data kategori awal telah tersedia:

| ID | Nama        | Type    |
| -- | ----------- | ------- |
| 1  | Informasi   | news    |
| 2  | Pelayanan   | news    |
| 3  | Pengumuman  | news    |
| 4  | Kegiatan    | news    |
| 5  | Dokumentasi | gallery |

### Status Modul Berita

Status saat dokumen ini dibuat:

**Database:** READY
**Authentication:** READY
**Authorization Middleware:** READY
**News CRUD Backend:** NOT IMPLEMENTED
**News Admin UI:** Belum terintegrasi dengan API
**Public News Integration:** Belum terintegrasi dengan API

---

# 4. Tujuan Fitur Modul Berita

Modul Berita memungkinkan Administrator untuk:

1. Melihat daftar berita.
2. Melihat detail berita.
3. Membuat berita baru.
4. Menyimpan berita sebagai Draft.
5. Mempublikasikan berita.
6. Mengubah berita.
7. Mengubah status berita.
8. Menghapus berita.
9. Menambahkan thumbnail berita.
10. Mengganti thumbnail berita.
11. Mengelola kategori berita melalui kategori yang tersedia.
12. Melihat status publikasi berita.

Website publik hanya boleh menampilkan berita dengan status:

`published`

Berita dengan status:

`draft`

tidak boleh ditampilkan kepada pengunjung publik.

---

# 5. Audit Database

## 5.1 Tabel `news`

Struktur aktual yang telah diverifikasi:

| Kolom            | Tipe                      | Fungsi           |
| ---------------- | ------------------------- | ---------------- |
| `id`             | INT AUTO_INCREMENT        | Primary Key      |
| `category_id`    | INT                       | Relasi kategori  |
| `title`          | VARCHAR(255)              | Judul berita     |
| `slug`           | VARCHAR(255) UNIQUE       | URL berita       |
| `excerpt`        | TEXT NULL                 | Ringkasan berita |
| `content`        | LONGTEXT                  | Isi berita       |
| `thumbnail_path` | VARCHAR(500)              | Lokasi thumbnail |
| `status`         | ENUM('draft','published') | Status publikasi |
| `published_at`   | DATETIME NULL             | Waktu publikasi  |
| `created_at`     | DATETIME                  | Waktu dibuat     |
| `updated_at`     | DATETIME                  | Waktu diperbarui |

---

## 5.2 Relasi Kategori

Relasi:

`news.category_id → categories.id`

Foreign Key:

`ON DELETE RESTRICT`

Artinya kategori tidak dapat dihapus apabila masih digunakan oleh berita.

Kategori yang digunakan untuk berita harus memiliki:

`categories.type = 'news'`

Backend wajib memvalidasi bahwa `category_id` yang dikirim benar-benar merupakan kategori dengan tipe `news`.

---

# 6. Audit Requirement Modul Berita

Sebelum implementasi, agent wajib memverifikasi kesesuaian antara:

* BRD.
* ERD.
* API Specification.
* Technical Design.
* Database aktual.

Hasil audit wajib menghasilkan tabel:

| Area                   | Dokumen | Aktual | Status |
| ---------------------- | ------- | ------ | ------ |
| Struktur tabel news    |         |        |        |
| Kategori berita        |         |        |        |
| Status draft/published |         |        |        |
| Thumbnail              |         |        |        |
| Slug                   |         |        |        |
| Published date         |         |        |        |
| CRUD API               |         |        |        |
| Authorization          |         |        |        |
| Activity Log           |         |        |        |
| Public API             |         |        |        |

Jika seluruh komponen konsisten, implementasi dapat dilanjutkan.

---

# 7. Business Rules

## 7.1 Judul Berita

* Wajib diisi.
* Tidak boleh kosong.
* Maksimal 255 karakter.

---

## 7.2 Slug

Slug digunakan sebagai identifier URL berita.

Contoh:

Judul:

`Pelayanan Administrasi Kependudukan Terbaru`

Slug:

`pelayanan-administrasi-kependudukan-terbaru`

Aturan:

* Dibuat dari judul secara otomatis.
* Harus unik.
* Jika terjadi konflik slug, sistem harus menghasilkan slug unik.
* Slug tidak boleh menyebabkan duplikasi data.

---

## 7.3 Kategori

Berita wajib memiliki kategori.

Backend wajib memastikan:

* `category_id` valid.
* Kategori tersedia.
* Kategori memiliki `type = 'news'`.

Kategori `gallery` tidak boleh digunakan untuk berita.

---

## 7.4 Excerpt

Excerpt digunakan sebagai ringkasan berita.

Field bersifat opsional sesuai struktur database.

---

## 7.5 Content

Isi berita wajib diisi.

Content dapat berisi teks panjang sesuai kebutuhan berita.

Backend wajib memastikan content tidak kosong.

---

## 7.6 Status

Status yang tersedia:

* `draft`
* `published`

### Draft

Berita tersimpan tetapi belum ditampilkan di website publik.

### Published

Berita telah dipublikasikan dan dapat ditampilkan di website publik.

---

## 7.7 Published At

Jika berita berubah menjadi:

`published`

maka sistem harus mengatur `published_at`.

Jika berita kembali menjadi:

`draft`

maka implementasi harus mengikuti aturan yang ditetapkan API Specification dan Technical Design.

Jika dokumen belum menentukan perilaku tersebut, agent wajib melaporkan ambiguitas sebelum implementasi.

---

# 8. Authorization

Semua endpoint Admin CRUD Berita wajib dilindungi oleh:

`authMiddleware`

Endpoint yang memodifikasi data juga harus mempertimbangkan:

`roleMiddleware`

Implementasi role authorization harus mengikuti aturan role yang sudah tersedia.

Minimal:

* User tidak terautentikasi → `401 Unauthorized`.
* User terautentikasi tetapi tidak memiliki hak akses → `403 Forbidden`.

Agent tidak boleh mengubah sistem role yang sudah ada tanpa alasan dan persetujuan.

---

# 9. Rencana API Backend

Endpoint yang direncanakan:

### 9.1 List Berita

`GET /api/news`

Fungsi:

* Mengambil daftar berita.
* Mendukung pagination jika telah ditentukan dalam API Specification.
* Menampilkan kategori.
* Menampilkan status.
* Menampilkan tanggal publikasi.

---

### 9.2 Detail Berita

`GET /api/news/:id`

Fungsi:

* Mengambil detail satu berita berdasarkan ID.

---

### 9.3 Membuat Berita

`POST /api/news`

Fungsi:

* Membuat berita baru.
* Validasi input.
* Validasi kategori.
* Generate slug.
* Menyimpan thumbnail jika ada.
* Menentukan status.

Protected:

`authMiddleware`

---

### 9.4 Mengubah Berita

`PUT /api/news/:id`

Fungsi:

* Mengubah data berita.
* Mengubah judul.
* Mengubah kategori.
* Mengubah excerpt.
* Mengubah content.
* Mengubah thumbnail.
* Mengubah status.

Protected:

`authMiddleware`

---

### 9.5 Menghapus Berita

`DELETE /api/news/:id`

Fungsi:

* Menghapus berita.
* Mengelola penghapusan thumbnail terkait jika sesuai aturan storage.

Protected:

`authMiddleware`

Authorization:

Mengikuti aturan role yang ditetapkan.

---

### 9.6 Publish / Unpublish

Jika API Specification menetapkan endpoint khusus publish/unpublish, endpoint tersebut harus mengikuti spesifikasi yang sudah ada.

Jika belum ditentukan, agent tidak boleh membuat endpoint baru secara sepihak.

Alternatif yang dapat dipertimbangkan:

`PUT /api/news/:id/status`

Namun keputusan final harus mengikuti API Specification.

---

# 10. Upload Thumbnail

Upload thumbnail merupakan bagian dari CRUD Berita.

Sebelum implementasi, agent wajib melakukan audit terhadap:

* Library upload yang sudah tersedia.
* Struktur folder storage.
* Static file serving.
* Konfigurasi MIME validation.
* File size limit.
* Penamaan file.
* Penghapusan file lama.

Minimal validasi keamanan:

* Validasi MIME type.
* Validasi ekstensi.
* Batas ukuran file.
* Nama file aman.
* Tidak mempercayai filename dari client.
* File tidak dapat dieksekusi sebagai script.

Jenis file yang diperbolehkan harus mengikuti API Specification.

Jika belum ditentukan, agent harus melaporkan hal tersebut sebelum menetapkan aturan baru.

---

# 11. File Storage

Sebelum implementasi, agent wajib menentukan berdasarkan kondisi aktual proyek:

1. Lokasi penyimpanan file.
2. Apakah file disimpan lokal.
3. Apakah folder storage berada di luar folder source.
4. Bagaimana file disajikan kepada frontend.
5. Bagaimana URL/path file dibentuk.
6. Bagaimana file lama dihapus.
7. Apa yang terjadi jika database berhasil menyimpan tetapi upload gagal.
8. Apa yang terjadi jika upload berhasil tetapi database gagal.

Implementasi harus mencegah orphan files jika memungkinkan.

---

# 12. Activity Log

Setiap aktivitas administratif penting pada modul Berita sebaiknya dicatat ke:

`activity_logs`

Aktivitas yang dipertimbangkan:

* Create News.
* Update News.
* Delete News.
* Publish News.
* Unpublish News.

Log minimal dapat menyimpan:

* `user_id`.
* Aktivitas.
* Timestamp.

Struktur detail harus mengikuti ERD dan API/Technical Design yang telah tersedia.

---

# 13. Backend Architecture

Sebelum implementasi final, struktur modular yang direncanakan:

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    │   └── newsController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── roleMiddleware.js
    │   └── uploadMiddleware.js
    ├── routes/
    │   └── newsRoutes.js
    ├── services/
    │   └── newsService.js
    └── utils/
```

Struktur aktual harus diaudit terlebih dahulu.

Jika pola arsitektur yang sudah digunakan berbeda, agent harus mengikuti pola existing project daripada membuat arsitektur baru yang tidak konsisten.

---

# 14. Frontend Admin Panel

Setelah API backend selesai dan teruji, Admin Panel akan diintegrasikan dengan modul Berita.

Fitur UI yang dibutuhkan:

## 14.1 News List

Menampilkan:

* Judul.
* Kategori.
* Status.
* Thumbnail.
* Tanggal.
* Action.

Action:

* Lihat.
* Edit.
* Hapus.

---

## 14.2 Add News

Form:

* Judul.
* Kategori.
* Excerpt.
* Content.
* Thumbnail.
* Status.

---

## 14.3 Edit News

Admin dapat mengubah data berita.

Jika thumbnail diganti:

* Thumbnail lama dikelola sesuai aturan storage.
* Thumbnail baru divalidasi sebelum disimpan.

---

## 14.4 Delete News

Sebelum penghapusan:

* Tampilkan konfirmasi.
* Jangan langsung menghapus tanpa confirmation.

---

# 15. Public Website Integration

Website publik hanya boleh menampilkan berita:

`status = published`

Berita:

`draft`

tidak boleh muncul pada:

* Homepage.
* Gallery/News section.
* Halaman detail publik.

Jika website publik menggunakan endpoint yang sama dengan Admin Panel, endpoint publik harus memiliki aturan response yang berbeda dari endpoint admin jika diperlukan.

Data sensitif atau informasi internal admin tidak boleh dikirim ke public API.

---

# 16. Implementation Order

Implementasi wajib dilakukan secara bertahap:

### Phase 1 — Pre-Implementation Audit

Audit:

* Backend.
* Database.
* Dokumentasi.
* API.
* Authentication.
* Authorization.
* Upload infrastructure.

Output:

`NEWS CRUD AUDIT REPORT`

---

### Phase 2 — Backend CRUD

Implementasi:

1. News Controller.
2. News Routes.
3. News Service jika digunakan.
4. Validasi input.
5. Validasi kategori.
6. Generate slug.
7. CRUD database.
8. Authorization.
9. Error handling.

---

### Phase 3 — Thumbnail Upload

Implementasi:

1. Upload middleware.
2. Validasi MIME.
3. Validasi ukuran.
4. Storage.
5. File path.
6. Cleanup file.

---

### Phase 4 — Activity Log

Implementasi pencatatan aktivitas CRUD Berita sesuai struktur database.

---

### Phase 5 — Backend Testing

Semua endpoint diuji sebelum frontend diintegrasikan.

---

### Phase 6 — Admin Panel Integration

Implementasi:

* News List.
* Add News.
* Edit News.
* Delete News.
* Status management.

---

### Phase 7 — Public Website Integration

Implementasi:

* Latest News.
* News List.
* News Detail.

Hanya berita `published` yang ditampilkan.

---

# 17. Verification Plan

## Authentication

* Request tanpa cookie → `401`.
* Token invalid → `401`.
* Token expired → `401`.

---

## Authorization

* User tanpa role yang sesuai → `403`.

---

## Create

Test:

* Data valid.
* Judul kosong.
* Content kosong.
* Kategori invalid.
* Kategori type `gallery`.
* Slug duplicate.
* Thumbnail invalid.

---

## Read

Test:

* List berita.
* Detail berita.
* Berita tidak ditemukan.
* Public hanya melihat published.

---

## Update

Test:

* Update valid.
* Update ID tidak ditemukan.
* Update kategori invalid.
* Update thumbnail.
* Update status.

---

## Delete

Test:

* Delete valid.
* Delete ID tidak ditemukan.
* User tidak memiliki authorization.

---

## Security

Test:

* File executable ditolak.
* MIME type tidak sesuai ditolak.
* File terlalu besar ditolak.
* Request tanpa autentikasi ditolak.
* Request unauthorized ditolak.
* SQL Injection dicegah melalui parameterized query.
* XSS tidak disimpan atau dirender secara tidak aman.

---

# 18. Acceptance Criteria

Modul CRUD Berita dinyatakan siap apabila:

* [ ] Backend API CRUD tersedia.
* [ ] Semua protected endpoint menggunakan authentication middleware.
* [ ] Authorization diterapkan sesuai role.
* [ ] Validasi kategori berjalan.
* [ ] Slug unik.
* [ ] Status draft/published berjalan sesuai requirement.
* [ ] Thumbnail tervalidasi.
* [ ] File storage berjalan dengan aman.
* [ ] File lama ditangani dengan benar saat update/delete.
* [ ] Activity Log berjalan sesuai requirement.
* [ ] API telah diuji.
* [ ] Admin Panel berhasil terhubung ke API.
* [ ] Admin dapat membuat berita.
* [ ] Admin dapat mengubah berita.
* [ ] Admin dapat menghapus berita.
* [ ] Admin dapat mengelola status publikasi.
* [ ] Website publik hanya menampilkan berita published.
* [ ] Tidak terdapat error kritis pada backend maupun frontend.
* [ ] Production build frontend berhasil.
* [ ] Dokumentasi API diperbarui jika terdapat perubahan yang disetujui.

---

# 19. Output yang Wajib Dihasilkan Agent

Sebelum implementasi:

1. `NEWS CRUD AUDIT REPORT`
2. Daftar file yang akan dibuat.
3. Daftar file yang akan dimodifikasi.
4. Daftar endpoint yang akan dibuat.
5. Daftar perubahan database jika ada.
6. Daftar potensi konflik requirement.

Setelah implementasi:

1. `NEWS CRUD IMPLEMENTATION REPORT`
2. Daftar file yang dibuat.
3. Daftar file yang diubah.
4. Daftar endpoint yang tersedia.
5. Hasil pengujian API.
6. Hasil pengujian upload.
7. Hasil pengujian authorization.
8. Hasil frontend build.
9. Daftar masalah yang ditemukan.
10. Status akhir implementasi.

---

# 20. Aturan Penting untuk Agent

Agent WAJIB:

1. Melakukan audit terlebih dahulu sebelum coding.
2. Membaca dokumentasi yang relevan.
3. Memeriksa database aktual.
4. Memeriksa kode backend aktual.
5. Memeriksa kode frontend aktual.
6. Mengikuti struktur arsitektur existing project.
7. Menggunakan authentication dan authorization yang sudah tersedia.
8. Tidak menyimpan JWT di localStorage atau sessionStorage.
9. Tidak membuat endpoint yang bertentangan dengan API Specification.
10. Tidak mengubah schema database tanpa alasan yang jelas.
11. Tidak menghapus data existing.
12. Tidak melakukan perubahan pada modul Banner, Gallery, Documents, atau Settings kecuali diperlukan.
13. Tidak mengubah authentication architecture yang sudah berjalan.
14. Tidak melakukan auto-proceed ke modul berikutnya setelah menyelesaikan CRUD Berita.
15. Setelah selesai, berhenti dan berikan laporan implementasi.

---

# 21. Status Dokumen

**Current Status:**

`READY FOR PRE-IMPLEMENTATION AUDIT`

**Next Action:**

Melakukan audit aktual terhadap source code, database, dan dokumentasi untuk menghasilkan:

`NEWS CRUD AUDIT REPORT`

Setelah audit selesai dan tidak terdapat konflik requirement yang menghambat, implementasi CRUD Berita dapat dimulai secara bertahap sesuai Implementation Order.
