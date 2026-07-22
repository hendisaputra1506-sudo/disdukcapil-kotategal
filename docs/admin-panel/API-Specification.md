# API SPECIFICATION

## Admin Panel — Website Disdukcapil Kota Tegal

**Versi Dokumen:** 1.1
**Tanggal:** 21 Juli 2026
**Status:** Final Draft
**Backend:** Node.js + Express.js
**Database:** MySQL
**Frontend:** React + Vite (JavaScript)

---

# 1. Pendahuluan

Dokumen ini mendefinisikan spesifikasi Application Programming Interface (API) yang digunakan untuk menghubungkan **Admin Panel** dengan **Backend** pada proyek Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

API berfungsi sebagai penghubung antara antarmuka Admin Panel dan database. Administrator melakukan pengelolaan data melalui Admin Panel, kemudian frontend mengirimkan request ke Backend API untuk diproses dan disimpan ke database.

API pada sistem ini mencakup:

1. Autentikasi Administrator
2. Dashboard
3. Manajemen Berita
4. Manajemen Banner Header
5. Manajemen Galeri
6. Manajemen Dokumen
7. Pengaturan Website
8. Pengelolaan Akun Administrator

Dokumen ini menjadi acuan implementasi API Backend dan integrasi dengan Frontend Admin Panel.

---

# 2. Arsitektur API

Arsitektur API menggunakan pola **REST API**.

```text
Admin Panel (React + Vite)
        │
        │ HTTP Request
        ▼
Backend API (Node.js + Express.js)
        │
        ├── Authentication
        ├── Validation
        ├── Business Logic
        └── File Upload
                │
                ▼
          MySQL Database
                │
                ▼
        File Storage Server
```

Website publik juga dapat mengambil data konten yang berstatus publik melalui API Backend.

```text
Website Publik
      │
      │ GET Request
      ▼
Backend API
      │
      ├── Berita Published
      ├── Banner Aktif
      ├── Galeri
      ├── Dokumen
      └── Pengaturan Website
```

---

# 3. Base URL

Pada lingkungan development:

```text
http://localhost:3000/api
```

Contoh:

```text
GET http://localhost:3000/api/news
```

Pada lingkungan production:

```text
https://domain-disdukcapil.go.id/api
```

Base URL production ditentukan pada tahap deployment.

---

# 4. Format Response

## 4.1 Response Berhasil

Format umum:

```json
{
  "success": true,
  "message": "Data berhasil diproses",
  "data": {}
}
```

## 4.2 Response Gagal

Format umum:

```json
{
  "success": false,
  "message": "Terjadi kesalahan",
  "errors": []
}
```

## 4.3 HTTP Status Code

| Status Code | Keterangan           |
| ----------- | -------------------- |
| 200         | Request berhasil     |
| 201         | Data berhasil dibuat |
| 400         | Request tidak valid  |
| 401         | Belum terautentikasi |
| 403         | Tidak memiliki akses |
| 404         | Data tidak ditemukan |
| 422         | Validasi data gagal  |
| 500         | Kesalahan server     |

---

# 5. Autentikasi

Autentikasi digunakan untuk melindungi seluruh endpoint Admin Panel. Sistem menggunakan **HttpOnly Cookie** (`adminToken`) untuk menyimpan JWT token secara aman di sisi client, dilindungi dari serangan XSS (Cross-Site Scripting). Setiap request dilindungi dengan mekanisme CORS Strict (`credentials: true`), Rate Limiting (maksimal 5 percobaan login gagal dalam 15 menit), serta Session Invalidation otomatis apabila password diubah.

## 5.1 Login Administrator

**Endpoint:**

```http
POST /api/auth/login
```

**Rate Limiting:** Active (Maks 5 percobaan gagal / 15 menit, HTTP 429)

**Request Body:**

```json
{
  "email": "admin@disdukcapil.go.id",
  "password": "rahasia123"
}
```

**Response Berhasil (200 OK):**
*(Set-Cookie: `adminToken=<JWT>`; HttpOnly; Secure; SameSite=Lax/Strict; Path=/)*

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "Hendi Saputra",
      "email": "admin@disdukcapil.go.id",
      "role": "admin"
    }
  }
}
```

**Response Gagal Kredensial (401 Unauthorized):**

```json
{
  "success": false,
  "message": "Email atau password tidak valid",
  "errors": []
}
```

---

## 5.2 Logout

**Endpoint:**

```http
POST /api/auth/logout
```

**Authentication:** Required (HttpOnly Cookie)

**Response (200 OK):**
*(Set-Cookie: `adminToken=; Max-Age=0; Path=/`)*

```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

## 5.3 Mendapatkan Informasi Administrator (`/me`)

**Endpoint:**

```http
GET /api/auth/me
```

**Authentication:** Required (HttpOnly Cookie)

**Response Berhasil (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Hendi Saputra",
      "email": "admin@disdukcapil.go.id",
      "role": "admin",
      "created_at": "2026-07-22T00:00:00.000Z",
      "updated_at": "2026-07-22T00:00:00.000Z"
    }
  }
}
```

---

## 5.4 Mengubah Password Administrator

**Endpoint:**

```http
PUT /api/auth/change-password
```

**Authentication:** Required (HttpOnly Cookie)

**Request Body:**

```json
{
  "currentPassword": "password_lama",
  "newPassword": "password_baru_min_8_char",
  "confirmPassword": "password_baru_min_8_char"
}
```

**Response Berhasil (200 OK):**
*(Sesi di-invalidate & Set-Cookie: `adminToken=; Max-Age=0; Path=/`)*

```json
{
  "success": true,
  "message": "Password berhasil diubah. Sesi Anda telah berakhir, silakan login kembali."
}
```


---

# 6. Dashboard API

## 6.1 Mendapatkan Statistik Dashboard

**Endpoint:**

```http
GET /api/dashboard/stats
```

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "data": {
    "news": {
      "total": 20,
      "published": 15,
      "draft": 5
    },
    "banners": {
      "total": 4,
      "active": 2,
      "inactive": 2
    },
    "gallery": {
      "total": 50
    },
    "documents": {
      "total": 10
    }
  }
}
```

---

## 6.2 Aktivitas Terbaru

**Endpoint:**

```http
GET /api/dashboard/activities
```

**Authentication:** Required

**Query Parameter:**

```text
?page=1&limit=10
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "action": "CREATE",
      "module": "NEWS",
      "description": "Menambahkan berita baru",
      "createdAt": "2026-07-21T10:00:00Z"
    }
  ]
}
```

---

# 7. API Manajemen Berita

Berita merupakan konten dinamis yang dapat dikelola Administrator.

## 7.1 Mendapatkan Daftar Berita

**Endpoint:**

```http
GET /api/news
```

**Authentication:** Required untuk Admin Panel.

**Query Parameter:**

```text
?page=1
&limit=10
&search=pelayanan
&category=informasi
&status=published
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Informasi Pelayanan Administrasi Kependudukan",
      "slug": "informasi-pelayanan-administrasi-kependudukan",
      "excerpt": "Informasi terbaru mengenai pelayanan...",
      "thumbnail": "/uploads/news/thumbnail.jpg",
      "category": "Informasi",
      "status": "published",
      "publishedAt": "2026-07-21T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20,
    "totalPages": 2
  }
}
```

---

## 7.2 Mendapatkan Detail Berita

**Endpoint:**

```http
GET /api/news/:id
```

**Authentication:** Required untuk Admin Panel.

---

## 7.3 Menambahkan Berita

**Endpoint:**

```http
POST /api/news
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

**Form Data:**

| Field       | Tipe   | Required |
| ----------- | ------ | -------- |
| title       | String | Ya       |
| slug        | String | Tidak    |
| excerpt     | String | Ya       |
| content     | Text   | Ya       |
| category    | String | Ya       |
| status      | String | Ya       |
| publishedAt | Date   | Tidak    |
| thumbnail   | File   | Ya       |

**Status yang diperbolehkan:**

```text
draft
published
```

---

## 7.4 Mengubah Berita

**Endpoint:**

```http
PUT /api/news/:id
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

Field mengikuti endpoint Create News.

---

## 7.5 Menghapus Berita

**Endpoint:**

```http
DELETE /api/news/:id
```

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "message": "Berita berhasil dihapus"
}
```

---

# 8. API Manajemen Banner Header

Banner digunakan untuk mengelola **gambar header/hero pada website publik**.

Banner bukan merupakan section terpisah pada halaman publik. Banner digunakan untuk mengganti atau menampilkan gambar visual pada area header/hero sesuai desain website.

Administrator dapat mengatur banner yang aktif dan urutan tampilannya.

## 8.1 Struktur Banner

Atribut utama:

| Field     | Tipe     | Keterangan           |
| --------- | -------- | -------------------- |
| id        | Integer  | ID banner            |
| title     | String   | Nama internal banner |
| image     | File     | Gambar banner        |
| status    | Enum     | active / inactive    |
| sortOrder | Integer  | Urutan banner        |
| createdAt | DateTime | Waktu dibuat         |
| updatedAt | DateTime | Waktu diperbarui     |

---

## 8.2 Ukuran Gambar Banner

Untuk menjaga konsistensi tampilan website publik, gambar banner wajib mengikuti rasio yang telah ditentukan.

**Rasio yang direkomendasikan:**

```text
16 : 5 (dengan rentang toleransi ±5% atau 3.04 – 3.36)
```

**Ukuran rekomendasi:**

```text
1920 × 600 px
```

**Ukuran minimum:**

```text
1280 × 400 px
```

**Format yang diperbolehkan:**

```text
JPG
JPEG
PNG
WebP
```

**Batas ukuran file:**

```text
Maksimal 2 MB
```

Jika gambar tidak sesuai dengan rasio yang ditentukan (berada di luar rentang toleransi 3.04 – 3.36), sistem akan menolak unggahan dan tidak melakukan auto-crop otomatis. Validasi dilakukan di sisi frontend untuk feedback awal, serta di backend sebagai keamanan.

---

## 8.3 Mendapatkan Daftar Banner

**Endpoint:**

```http
GET /api/banners
```

**Authentication:** Required untuk Admin Panel.

---

## 8.4 Mendapatkan Banner Aktif untuk Website Publik

**Endpoint:**

```http
GET /api/public/banners
```

**Authentication:** Tidak diperlukan.

Endpoint ini digunakan oleh Website Publik untuk mendapatkan banner yang berstatus aktif.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Hari Kemerdekaan Republik Indonesia",
      "image": "/uploads/banners/kemerdekaan.jpg",
      "sortOrder": 1
    }
  ]
}
```

---

## 8.5 Menambahkan Banner

**Endpoint:**

```http
POST /api/banners
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

**Form Data:**

| Field     | Tipe    | Required |
| --------- | ------- | -------- |
| title     | String  | Ya       |
| image     | File    | Ya       |
| status    | String  | Ya       |
| sortOrder | Integer | Ya       |

---

## 8.6 Mengubah Banner

**Endpoint:**

```http
PUT /api/banners/:id
```

**Authentication:** Required

---

## 8.7 Menghapus Banner

**Endpoint:**

```http
DELETE /api/banners/:id
```

**Authentication:** Required

---

## 8.8 Mengubah Status Banner

**Endpoint:**

```http
PATCH /api/banners/:id/status
```

**Authentication:** Required

**Request Body:**

```json
{
  "status": "active"
}
```

Status yang diperbolehkan:

```text
active
inactive
```

---

## 8.9 Mengubah Urutan Banner

**Endpoint:**

```http
PATCH /api/banners/order
```

**Authentication:** Required

**Request Body:**

```json
{
  "items": [
    {
      "id": 1,
      "sortOrder": 1
    },
    {
      "id": 2,
      "sortOrder": 2
    }
  ]
}
```

---

# 9. API Manajemen Galeri

## 9.1 Mendapatkan Daftar Galeri

**Endpoint:**

```http
GET /api/gallery
```

**Query Parameter:**

```text
?page=1
&limit=12
&category=kegiatan
```

---

## 9.2 Mendapatkan Detail Galeri

**Endpoint:**

```http
GET /api/gallery/:id
```

---

## 9.3 Menambahkan Foto Galeri

**Endpoint:**

```http
POST /api/gallery
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

**Form Data:**

| Field    | Tipe   | Required |
| -------- | ------ | -------- |
| title    | String | Ya       |
| category | String | Ya       |
| image    | File   | Ya       |

---

## 9.4 Mengubah Galeri

**Endpoint:**

```http
PUT /api/gallery/:id
```

**Authentication:** Required

---

## 9.5 Menghapus Galeri

**Endpoint:**

```http
DELETE /api/gallery/:id
```

**Authentication:** Required

---

# 10. API Manajemen Dokumen

Dokumen digunakan untuk menyediakan file PDF yang dapat diakses dan diunduh oleh masyarakat.

## 10.1 Mendapatkan Daftar Dokumen

**Endpoint:**

```http
GET /api/documents
```

---

## 10.2 Mendapatkan Dokumen Publik

**Endpoint:**

```http
GET /api/public/documents
```

**Authentication:** Tidak diperlukan.

---

## 10.3 Menambahkan Dokumen

**Endpoint:**

```http
POST /api/documents
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

**Form Data:**

| Field       | Tipe   | Required |
| ----------- | ------ | -------- |
| title       | String | Ya       |
| description | String | Tidak    |
| file        | PDF    | Ya       |

---

## 10.4 Mengubah Dokumen

**Endpoint:**

```http
PUT /api/documents/:id
```

**Authentication:** Required

---

## 10.5 Menghapus Dokumen

**Endpoint:**

```http
DELETE /api/documents/:id
```

**Authentication:** Required

---

# 11. API Pengaturan Website

Pengaturan website merupakan data global yang digunakan oleh Website Publik.

## 11.1 Mendapatkan Pengaturan Website

**Endpoint:**

```http
GET /api/settings
```

**Authentication:** Required untuk Admin Panel.

---

## 11.2 Mendapatkan Pengaturan Publik

**Endpoint:**

```http
GET /api/public/settings
```

**Authentication:** Tidak diperlukan.

Data yang dikembalikan dapat meliputi:

```json
{
  "logo": "/uploads/settings/logo.png",
  "address": "Jl. ... Kota Tegal",
  "email": "disdukcapil@tegalkota.go.id",
  "phone": "0283...",
  "socialMedia": {
    "facebook": "...",
    "instagram": "...",
    "x": "...",
    "tiktok": "..."
  }
}
```

---

## 11.3 Mengubah Pengaturan Website

**Endpoint:**

```http
PUT /api/settings
```

**Authentication:** Required

**Content-Type:**

```text
multipart/form-data
```

Field:

| Field     | Tipe   | Required |
| --------- | ------ | -------- |
| logo      | File   | Tidak    |
| address   | Text   | Tidak    |
| email     | String | Tidak    |
| phone     | String | Tidak    |
| facebook  | String | Tidak    |
| instagram | String | Tidak    |
| x         | String | Tidak    |
| tiktok    | String | Tidak    |

**Catatan:**

Footer tidak dikelola melalui API karena telah ditetapkan sebagai konten statis pada Website Publik.

---

# 12. API Akun Administrator

## 12.1 Mengubah Password

**Endpoint:**

```http
PUT /api/account/change-password
```

**Authentication:** Required

**Request Body:**

```json
{
  "currentPassword": "password-lama",
  "newPassword": "password-baru",
  "confirmPassword": "password-baru"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password berhasil diubah"
}
```

---

# 13. Public API vs Admin API

API dibagi menjadi dua kelompok utama.

## 13.1 Admin API

Digunakan oleh Admin Panel dan membutuhkan autentikasi.

```text
/api/auth/*
/api/dashboard/*
/api/news/*
/api/banners/*
/api/gallery/*
/api/documents/*
/api/settings
/api/account/*
```

## 13.2 Public API

Digunakan oleh Website Publik dan tidak membutuhkan autentikasi.

```text
/api/public/news
/api/public/news/:slug
/api/public/banners
/api/public/gallery
/api/public/documents
/api/public/settings
```

Public API hanya mengembalikan data yang memang boleh ditampilkan kepada masyarakat.

Contoh:

* Berita hanya berstatus `published`.
* Banner hanya berstatus `active`.
* Dokumen yang tersedia untuk publik.
* Pengaturan website yang bersifat publik.

---

# 14. File Upload

API menggunakan `multipart/form-data` untuk proses upload file.

Jenis file yang digunakan:

| Modul   | Format               |
| ------- | -------------------- |
| Berita  | JPG, JPEG, PNG, WebP |
| Banner  | JPG, JPEG, PNG, WebP |
| Galeri  | JPG, JPEG, PNG, WebP |
| Dokumen | PDF                  |
| Logo    | JPG, JPEG, PNG, WebP |

Validasi ukuran maksimum dan strategi penyimpanan file ditentukan pada tahap Technical Design dan implementasi backend.

Untuk Banner Header, rasio gambar yang digunakan adalah **16:5** dengan ukuran rekomendasi **1920 × 600 px** agar tampilan pada Website Publik tetap konsisten.

---

# 15. Authentication & Authorization

Seluruh endpoint Admin API wajib dilindungi autentikasi.

Request tanpa autentikasi yang valid akan menghasilkan:

```http
401 Unauthorized
```

Contoh:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Sistem pada versi pertama hanya memiliki satu role:

```text
admin
```

Administrator memiliki akses penuh terhadap seluruh Admin API.

Struktur autentikasi teknis dapat menggunakan session-based authentication atau token-based authentication. Keputusan implementasi ditentukan pada tahap Technical Design.

---

# 16. Validasi Data

Backend wajib melakukan validasi terhadap data yang diterima dari frontend.

Validasi minimum:

1. Field wajib tidak boleh kosong.
2. Email harus memiliki format yang valid.
3. Slug berita harus unik.
4. Status hanya menerima nilai yang telah ditentukan.
5. File harus memiliki format yang diizinkan.
6. File harus berada di bawah batas ukuran maksimum.
7. ID data harus valid.
8. Data yang tidak ditemukan menghasilkan status `404`.
9. Input pengguna harus divalidasi dan disanitasi untuk mengurangi risiko keamanan.

---

# 17. Keamanan API

Backend wajib menerapkan:

* Authentication pada seluruh Admin API.
* Password disimpan menggunakan hashing seperti bcrypt.
* Validasi input.
* Validasi tipe dan ukuran file.
* Proteksi terhadap akses endpoint tanpa autentikasi.
* Sanitasi input untuk mengurangi risiko XSS.
* Penggunaan parameterized query/ORM untuk mengurangi risiko SQL Injection.
* HTTPS pada lingkungan production.

---

# 18. Ringkasan Endpoint

| Modul            | Method | Endpoint                       | Auth |
| ---------------- | ------ | ------------------------------ | ---- |
| Login            | POST   | `/api/auth/login`              | No   |
| Logout           | POST   | `/api/auth/logout`             | Yes  |
| Current User     | GET    | `/api/auth/me`                 | Yes  |
| Dashboard Stats  | GET    | `/api/dashboard/stats`         | Yes  |
| Activities       | GET    | `/api/dashboard/activities`    | Yes  |
| News List        | GET    | `/api/news`                    | Yes  |
| News Detail      | GET    | `/api/news/:id`                | Yes  |
| Create News      | POST   | `/api/news`                    | Yes  |
| Update News      | PUT    | `/api/news/:id`                | Yes  |
| Delete News      | DELETE | `/api/news/:id`                | Yes  |
| Banner List      | GET    | `/api/banners`                 | Yes  |
| Public Banner    | GET    | `/api/public/banners`          | No   |
| Create Banner    | POST   | `/api/banners`                 | Yes  |
| Update Banner    | PUT    | `/api/banners/:id`             | Yes  |
| Delete Banner    | DELETE | `/api/banners/:id`             | Yes  |
| Banner Status    | PATCH  | `/api/banners/:id/status`      | Yes  |
| Banner Order     | PATCH  | `/api/banners/order`           | Yes  |
| Gallery List     | GET    | `/api/gallery`                 | Yes  |
| Gallery Detail   | GET    | `/api/gallery/:id`             | Yes  |
| Create Gallery   | POST   | `/api/gallery`                 | Yes  |
| Update Gallery   | PUT    | `/api/gallery/:id`             | Yes  |
| Delete Gallery   | DELETE | `/api/gallery/:id`             | Yes  |
| Document List    | GET    | `/api/documents`               | Yes  |
| Public Documents | GET    | `/api/public/documents`        | No   |
| Create Document  | POST   | `/api/documents`               | Yes  |
| Update Document  | PUT    | `/api/documents/:id`           | Yes  |
| Delete Document  | DELETE | `/api/documents/:id`           | Yes  |
| Settings         | GET    | `/api/settings`                | Yes  |
| Public Settings  | GET    | `/api/public/settings`         | No   |
| Update Settings  | PUT    | `/api/settings`                | Yes  |
| Change Password  | PUT    | `/api/account/change-password` | Yes  |

---

# 19. Catatan Implementasi

Dokumen API Specification ini merupakan acuan kontrak komunikasi antara Frontend dan Backend.

Implementasi backend wajib mengikuti endpoint, method, struktur request, dan response yang telah ditetapkan dalam dokumen ini.

Apabila terdapat perubahan terhadap struktur API setelah tahap implementasi dimulai, perubahan harus disesuaikan kembali pada:

1. API Specification
2. ERD / Database Design
3. Technical Design
4. Backend API
5. Frontend API Service
6. Integrasi Website Publik

Perubahan tersebut harus dilakukan secara konsisten agar tidak menyebabkan ketidaksesuaian antara Admin Panel, Backend, Database, dan Website Publik.

**Status dokumen:** Baseline API Specification untuk tahap implementasi Backend.
