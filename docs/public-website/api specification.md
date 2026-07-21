API SPECIFICATION DOCUMENT
Modernisasi Website Disdukcapil Kota Tegal Berbasis JavaScript
(Studi Kasus Pembelajaran)
1. Informasi Dokumen
Keterangan	Detail
Nama Dokumen	API Specification Document
Nama Proyek	Modernisasi Website Disdukcapil Kota Tegal
Penyusun	Hendi Saputra
Versi	1.0
Tanggal	14 Juli 2026
Status	Draft
2. Tujuan Dokumen

Dokumen API Specification mendefinisikan komunikasi antara aplikasi Frontend dan Backend menggunakan REST API.

Seluruh pertukaran data menggunakan format JSON dan mengikuti prinsip RESTful API.

3. Base URL

Development

http://localhost:5000/api

Production

https://domain-website/api
4. Authentication

Seluruh endpoint administrator menggunakan autentikasi JWT (JSON Web Token).

Endpoint publik tidak memerlukan autentikasi.

5. Format Response
Success
{
  "success": true,
  "message": "Request berhasil.",
  "data": {}
}
Error
{
  "success": false,
  "message": "Terjadi kesalahan."
}
6. Authentication API
Login
Endpoint
POST /auth/login
Request
{
  "username": "admin",
  "password": "password"
}
Success Response
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
Logout
POST /auth/logout

Response

{
  "success": true,
  "message": "Logout berhasil."
}
7. Public API
Ambil Berita Terbaru
GET /news/latest

Digunakan pada section Berita Terbaru di halaman Beranda.

Response

[
  {
    "id":1,
    "title":"Pelayanan Jemput Bola",
    "thumbnail":"thumbnail.jpg",
    "created_at":"2026-07-14"
  }
]
Ambil Semua Berita
GET /news

Response

[
  {
    "id":1,
    "title":"Pelayanan Jemput Bola",
    "slug":"pelayanan-jemput-bola"
  }
]
Detail Berita
GET /news/{slug}

Response

{
  "id":1,
  "title":"Pelayanan Jemput Bola",
  "content":"....",
  "thumbnail":"..."
}
8. Admin API

Semua endpoint berikut membutuhkan JWT.

Tambah Berita
POST /admin/news

Request

{
  "title":"Judul",
  "excerpt":"Ringkasan",
  "content":"Isi berita"
}

Response

{
  "success":true,
  "message":"Berita berhasil ditambahkan."
}
Edit Berita
PUT /admin/news/{id}

Request

{
  "title":"Judul Baru",
  "excerpt":"Ringkasan",
  "content":"Isi Berita"
}
Hapus Berita
DELETE /admin/news/{id}

Response

{
  "success":true,
  "message":"Berita berhasil dihapus."
}
Upload Thumbnail
POST /admin/news/upload

Request

multipart/form-data

Field

thumbnail

Response

{
  "url":"uploads/news.jpg"
}
9. HTTP Status Code
Code	Keterangan
200	Berhasil
201	Data berhasil dibuat
400	Bad Request
401	Unauthorized
404	Data tidak ditemukan
500	Internal Server Error
10. API Flow
Public
Browser
      │
      ▼
GET /news/latest
      │
      ▼
Express API
      │
      ▼
MySQL
      │
      ▼
JSON Response
Admin
Login

↓

JWT

↓

POST /admin/news

↓

Database

↓

Success
11. Validasi Data
Login
Field	Rule
Username	Wajib diisi
Password	Wajib diisi
Berita
Field	Rule
Judul	Wajib diisi
Slug	Unik
Ringkasan	Wajib diisi
Isi Berita	Wajib diisi
Thumbnail	JPG, PNG, WEBP
12. Keamanan
Password administrator disimpan menggunakan bcrypt.
JWT digunakan untuk autentikasi endpoint admin.
Validasi seluruh input dilakukan pada backend.
Endpoint publik tidak memerlukan autentikasi.
Endpoint admin hanya dapat diakses oleh pengguna yang telah login.
13. Daftar Endpoint
Method	Endpoint	Akses	Deskripsi
POST	/api/auth/login	Public	Login administrator
POST	/api/auth/logout	Admin	Logout administrator
GET	/api/news/latest	Public	Mengambil 3 berita terbaru untuk Beranda
GET	/api/news	Public	Mengambil daftar seluruh berita
GET	/api/news/{slug}	Public	Mengambil detail berita berdasarkan slug
POST	/api/admin/news	Admin	Menambahkan berita baru
PUT	/api/admin/news/{id}	Admin	Memperbarui data berita
DELETE	/api/admin/news/{id}	Admin	Menghapus berita
POST	/api/admin/news/upload	Admin	Mengunggah thumbnail berita
14. Catatan Implementasi
API menggunakan arsitektur RESTful dengan format pertukaran data JSON.
Modul Berita merupakan satu-satunya modul yang bersifat dinamis dan dikelola melalui panel admin.
Halaman Beranda hanya menampilkan 3 berita terbaru yang diambil melalui endpoint GET /api/news/latest.
Halaman Profil, Layanan, Pengaduan, dan Kontak menggunakan data statis sehingga tidak memerlukan endpoint CRUD.
Semua endpoint admin dilindungi menggunakan autentikasi JWT untuk memastikan hanya administrator yang dapat mengelola konten berita.