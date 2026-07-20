TECHNICAL SPECIFICATION DOCUMENT (TECH SPEC)
Modernisasi Website Disdukcapil Kota Tegal Berbasis JavaScript
(Studi Kasus Pembelajaran)
1. Informasi Dokumen
Keterangan	Detail
Nama Dokumen	Technical Specification Document
Nama Proyek	Modernisasi Website Disdukcapil Kota Tegal
Penyusun	Hendi Saputra
Versi	1.0
Tanggal	14 Juli 2026
Status	Draft
2. Tujuan Dokumen

Dokumen Technical Specification disusun sebagai pedoman implementasi teknis sistem berdasarkan Business Requirements Document (BRD) dan Sitemap yang telah disusun sebelumnya.

Dokumen ini menjelaskan arsitektur aplikasi, teknologi yang digunakan, struktur folder, desain database, komunikasi antara frontend dan backend, serta standar implementasi yang akan digunakan selama proses pengembangan.

3. Gambaran Sistem

Website merupakan aplikasi web berbasis Client–Server Architecture yang terdiri atas:

Frontend berbasis React.
Backend berbasis Node.js dan Express.
Database MySQL yang dijalankan menggunakan DBngin.
REST API sebagai media komunikasi antara frontend dan backend.
4. Arsitektur Sistem
┌───────────────────────────┐
│         Browser           │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ React + Vite Frontend     │
└─────────────┬─────────────┘
              │ REST API
              ▼
┌───────────────────────────┐
│ Node.js + Express Backend │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│ MySQL Database (DBngin)   │
└───────────────────────────┘
5. Technology Stack
Layer	Teknologi
Programming Language	JavaScript (ES6+)
Frontend	React
Build Tool	Vite
Styling	Tailwind CSS
Routing	React Router DOM
Backend Runtime	Node.js
Backend Framework	Express.js
Database	MySQL
Database Server	DBngin
HTTP Client	Axios
Version Control	Git
API Testing	Postman
6. Struktur Proyek
project-root
│
├── client
│   ├── public
│   ├── src
│   │
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── services
│   ├── hooks
│   ├── utils
│   ├── routes
│   ├── App.jsx
│   └── main.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── app.js
│   └── server.js
│
└── database
    ├── schema.sql
    ├── seed.sql
    └── erd.drawio
7. Modul Sistem
Website Publik
Beranda
Profil
Layanan
Berita & Galeri
Pengaduan
Kontak
Panel Admin
Login
Dashboard
Kelola Berita
8. Alur Sistem
Pengunjung
Pengunjung

↓

Membuka Website

↓

Memilih Menu

↓

Membaca Informasi

↓

Selesai
Admin
Login

↓

Dashboard

↓

Kelola Berita

↓

Tambah / Edit / Hapus

↓

Database
9. Struktur Database
Tabel Admin
Field	Tipe
id	INT
username	VARCHAR
password	VARCHAR
created_at	TIMESTAMP
Tabel Berita
Field	Tipe
id	INT
title	VARCHAR
slug	VARCHAR
excerpt	TEXT
content	LONGTEXT
thumbnail	VARCHAR
created_at	TIMESTAMP
updated_at	TIMESTAMP
10. Relasi Database
Admin (1)

↓

Berita (N)

Satu administrator dapat membuat banyak berita.

11. REST API
Authentication
Method	Endpoint	Fungsi
POST	/api/login	Login Admin
Berita
Method	Endpoint	Fungsi
GET	/api/news	Semua berita
GET	/api/news/:slug	Detail berita
POST	/api/news	Tambah berita
PUT	/api/news/:id	Edit berita
DELETE	/api/news/:id	Hapus berita
12. Routing Frontend
Halaman	Route
Beranda	/
Profil	/profil
Layanan	/layanan
Berita	/berita
Detail Berita	/berita/:slug
Pengaduan	/pengaduan
Kontak	/kontak
Login	/admin/login
Dashboard	/admin
13. Komponen Frontend
Layout
Navbar
Footer
Main Layout
Section
Hero
Services
About
Latest News
Complaint
Contact
Reusable Component
Button
Card
Badge
Modal
Input
Textarea
Breadcrumb
14. Desain UI

Website mengikuti identitas visual website Disdukcapil Kota Tegal dengan beberapa penyempurnaan.

Dipertahankan
Logo
Warna utama
Struktur menu
Hirarki navigasi
Identitas instansi
Disempurnakan
White space
Typography
Card
Responsivitas
Konsistensi komponen
Accessibility
15. Aturan Pengembangan
Frontend
Menggunakan Functional Component.
Menggunakan JavaScript.
Menggunakan Tailwind CSS.
Komponen dibuat reusable.
Tidak menggunakan jQuery.
Tidak menggunakan Bootstrap.
Backend
Menggunakan arsitektur MVC.
REST API.
Validasi input.
JSON sebagai format pertukaran data.
Database
Menggunakan MySQL.
Primary Key pada setiap tabel.
Menggunakan Foreign Key sesuai relasi.
Mendukung operasi CRUD.
16. Keamanan
Password administrator disimpan dalam bentuk hash menggunakan bcrypt.
Validasi input dilakukan pada backend.
Endpoint admin hanya dapat diakses setelah autentikasi.
Menggunakan JWT untuk autentikasi sesi admin.
17. Standar Kode
Penamaan file menggunakan PascalCase untuk komponen React.
Penamaan fungsi menggunakan camelCase.
Menggunakan ESLint untuk menjaga kualitas kode.
Struktur folder konsisten dengan Tech Spec.
Setiap komponen memiliki satu tanggung jawab (Single Responsibility Principle).
18. Kriteria Keberhasilan

Sistem dinyatakan berhasil apabila:

Seluruh halaman publik dapat diakses dengan baik.
Admin dapat login ke sistem.
Admin dapat menambah, mengubah, dan menghapus berita.
Berita terbaru otomatis ditampilkan pada halaman Beranda.
Seluruh data berita tersimpan di database MySQL.
Website responsif pada desktop, tablet, dan mobile.
Tidak terdapat error pada proses build maupun saat menjalankan aplikasi.
19. Catatan Implementasi
Website dikembangkan sebagai studi kasus pembelajaran dan bukan merupakan website resmi Disdukcapil Kota Tegal.
Struktur navigasi mengacu pada website referensi dengan ruang lingkup yang disederhanakan.
Konten Profil, Layanan, Pengaduan, dan Kontak bersifat statis, sedangkan modul Berita merupakan satu-satunya konten dinamis yang dikelola melalui panel admin.
Pengembangan dilakukan menggunakan arsitektur full-stack JavaScript, sehingga frontend dan backend dikembangkan secara terpisah namun saling terhubung melalui REST API.