# ERD / DATABASE DESIGN

## Admin Panel Website Disdukcapil Kota Tegal

**Versi Dokumen:** 1.1
**Status:** Final
**Modul:** Admin Panel (Content Management System)
**Proyek:** Redesain Website Dinas Kependudukan dan Pencatatan Sipil Kota Tegal

---

# 1. Pendahuluan

Dokumen ini menjelaskan rancangan struktur basis data yang digunakan oleh Admin Panel sebagai bagian dari proyek redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

Basis data dirancang untuk mendukung pengelolaan konten dinamis yang ditampilkan pada website publik melalui Admin Panel.

Rancangan ini menjadi acuan teknis awal dalam proses pengembangan database, backend API, dan integrasi antara Admin Panel dengan website publik.

Struktur basis data dirancang secara sederhana dan disesuaikan dengan kebutuhan proyek. Sistem tidak dirancang sebagai CMS umum seperti WordPress, sehingga hanya data yang benar-benar membutuhkan pengelolaan melalui Admin Panel yang disimpan dan dikelola secara dinamis.

Konten yang bersifat statis dan jarang berubah, seperti Sejarah, Visi dan Misi, Profil Instansi, dan Struktur Organisasi, tidak termasuk dalam pengelolaan database Admin Panel pada versi pertama.

---

# 2. Tujuan

Perancangan database ini bertujuan untuk:

1. Menentukan struktur data yang dibutuhkan oleh Admin Panel.
2. Menentukan hubungan antar-entitas dalam sistem.
3. Menjadi acuan dalam pembuatan database MySQL.
4. Menjadi dasar pengembangan REST API pada backend.
5. Memastikan data yang dikelola Admin Panel dapat ditampilkan pada website publik.
6. Menjaga konsistensi dan integritas data.
7. Menyediakan struktur yang dapat dikembangkan pada tahap berikutnya.

---

# 3. Ruang Lingkup Database

Database Admin Panel mencakup entitas berikut:

1. `admins`
2. `news_categories`
3. `news`
4. `header_banners`
5. `gallery_categories`
6. `gallery`
7. `documents`
8. `website_settings`
9. `admin_activities`

Struktur hubungan utama:

```text
admins
    │
    └── admin_activities

news_categories
    │
    └── news

header_banners

gallery_categories
    │
    └── gallery

documents

website_settings
```

---

# 4. ERD (Entity Relationship Diagram)

Secara konseptual, hubungan antar-entitas dalam database Admin Panel adalah sebagai berikut:

```text
┌─────────────────────┐
│       ADMINS        │
├─────────────────────┤
│ PK id               │
│    name             │
│    email            │
│    password         │
│    created_at       │
│    updated_at       │
└──────────┬──────────┘
           │
           │ 1
           │
           │ N
┌──────────▼──────────┐
│  ADMIN_ACTIVITIES   │
├─────────────────────┤
│ PK id               │
│ FK admin_id         │
│    action           │
│    module           │
│    description      │
│    created_at       │
└─────────────────────┘


┌─────────────────────┐
│   NEWS_CATEGORIES   │
├─────────────────────┤
│ PK id               │
│    name             │
└──────────┬──────────┘
           │
           │ 1
           │
           │ N
┌──────────▼──────────┐
│        NEWS         │
├─────────────────────┤
│ PK id               │
│ FK category_id      │
│    title            │
│    slug             │
│    excerpt          │
│    content          │
│    thumbnail        │
│    status            │
│    published_at     │
│    created_at       │
│    updated_at       │
└─────────────────────┘


┌─────────────────────┐
│   HEADER_BANNERS    │
├─────────────────────┤
│ PK id               │
│    title            │
│    image            │
│    status            │
│    display_order    │
│    created_at       │
│    updated_at       │
└─────────────────────┘


┌─────────────────────┐
│ GALLERY_CATEGORIES  │
├─────────────────────┤
│ PK id               │
│    name             │
└──────────┬──────────┘
           │
           │ 1
           │
           │ N
┌──────────▼──────────┐
│       GALLERY       │
├─────────────────────┤
│ PK id               │
│ FK category_id      │
│    title            │
│    image            │
│    created_at       │
│    updated_at       │
└─────────────────────┘


┌─────────────────────┐
│      DOCUMENTS      │
├─────────────────────┤
│ PK id               │
│    title            │
│    description      │
│    file_path        │
│    uploaded_at      │
│    updated_at       │
└─────────────────────┘


┌─────────────────────┐
│   WEBSITE_SETTINGS  │
├─────────────────────┤
│ PK id               │
│    logo             │
│    address          │
│    email            │
│    phone            │
│    facebook_url     │
│    instagram_url    │
│    x_url            │
│    tiktok_url       │
│    updated_at       │
└─────────────────────┘
```

---

# 5. Daftar Entitas

| No | Entitas              | Deskripsi                                                        |
| -- | -------------------- | ---------------------------------------------------------------- |
| 1  | `admins`             | Menyimpan akun administrator yang dapat mengakses Admin Panel.   |
| 2  | `news_categories`    | Menyimpan kategori referensi untuk berita.                       |
| 3  | `news`               | Menyimpan konten berita yang ditampilkan pada website publik.    |
| 4  | `header_banners`     | Menyimpan gambar Header/Hero utama website publik.               |
| 5  | `gallery_categories` | Menyimpan kategori referensi untuk galeri.                       |
| 6  | `gallery`            | Menyimpan foto dokumentasi yang ditampilkan pada website publik. |
| 7  | `documents`          | Menyimpan dokumen PDF yang dapat diunduh masyarakat.             |
| 8  | `website_settings`   | Menyimpan pengaturan umum website publik.                        |
| 9  | `admin_activities`   | Menyimpan catatan aktivitas administrator.                       |

---

# 6. Detail Struktur Tabel

## 6.1 Tabel `admins`

Tabel `admins` digunakan untuk menyimpan data akun administrator yang memiliki akses ke Admin Panel.

| Field        | Tipe Data       | Key    | Null | Keterangan                       |
| ------------ | --------------- | ------ | ---- | -------------------------------- |
| `id`         | BIGINT UNSIGNED | PK     | No   | ID unik administrator            |
| `name`       | VARCHAR(100)    | -      | No   | Nama administrator               |
| `email`      | VARCHAR(150)    | UNIQUE | No   | Email yang digunakan untuk login |
| `password`   | VARCHAR(255)    | -      | No   | Password yang telah di-hash      |
| `created_at` | DATETIME        | -      | No   | Waktu pembuatan akun             |
| `updated_at` | DATETIME        | -      | No   | Waktu perubahan data             |

### Catatan

Pada versi pertama, sistem hanya memiliki satu role, yaitu Administrator.

Pembagian role seperti:

* Super Admin
* Editor
* Contributor

belum diterapkan.

Struktur tabel dapat dikembangkan pada masa mendatang apabila sistem membutuhkan multi-role.

---

## 6.2 Tabel `news_categories`

Tabel `news_categories` digunakan untuk menyimpan kategori referensi yang digunakan oleh berita.

| Field  | Tipe Data       | Key    | Null | Keterangan    |
| ------ | --------------- | ------ | ---- | ------------- |
| `id`   | BIGINT UNSIGNED | PK     | No   | ID kategori   |
| `name` | VARCHAR(100)    | UNIQUE | No   | Nama kategori |

Contoh kategori:

* Informasi
* Pelayanan
* Pengumuman
* Kegiatan

### Catatan

Kategori berita pada versi pertama merupakan **data referensi tetap**.

Kategori tidak memiliki menu CRUD tersendiri di Admin Panel.

Data kategori dapat dimasukkan melalui database seeder atau migrasi awal.

---

## 6.3 Tabel `news`

Tabel `news` digunakan untuk menyimpan berita yang dikelola oleh administrator dan ditampilkan pada website publik.

| Field          | Tipe Data       | Key    | Null | Keterangan                    |
| -------------- | --------------- | ------ | ---- | ----------------------------- |
| `id`           | BIGINT UNSIGNED | PK     | No   | ID unik berita                |
| `category_id`  | BIGINT UNSIGNED | FK     | No   | Relasi ke `news_categories`   |
| `title`        | VARCHAR(255)    | -      | No   | Judul berita                  |
| `slug`         | VARCHAR(255)    | UNIQUE | No   | URL unik berita               |
| `excerpt`      | TEXT            | -      | Yes  | Ringkasan berita              |
| `content`      | LONGTEXT        | -      | No   | Isi lengkap berita            |
| `thumbnail`    | VARCHAR(255)    | -      | No   | Path atau nama file thumbnail |
| `status`       | ENUM            | -      | No   | `draft` atau `publish`        |
| `published_at` | DATETIME        | -      | Yes  | Waktu publikasi               |
| `created_at`   | DATETIME        | -      | No   | Waktu pembuatan               |
| `updated_at`   | DATETIME        | -      | No   | Waktu perubahan               |

### Relasi

```text
news_categories (1)
        │
        │
        │ N
        ▼
      news
```

Satu kategori dapat digunakan oleh banyak berita.

---

## 6.4 Tabel `header_banners`

Tabel `header_banners` digunakan untuk menyimpan dan mengelola gambar Header/Hero utama yang ditampilkan pada website publik.

Banner digunakan untuk kebutuhan visual khusus, misalnya:

* Hari Kemerdekaan Republik Indonesia
* Hari Jadi Kota Tegal
* Hari Raya
* Kampanye pelayanan publik
* Informasi khusus instansi
* Perayaan atau momentum tertentu

Banner **bukan merupakan section konten baru** pada website publik.

Banner berfungsi untuk mengganti visual pada area Header/Hero yang telah ditentukan dalam desain website publik.

| Field           | Tipe Data       | Key | Null | Keterangan                        |
| --------------- | --------------- | --- | ---- | --------------------------------- |
| `id`            | BIGINT UNSIGNED | PK  | No   | ID unik banner                    |
| `title`         | VARCHAR(255)    | -   | No   | Nama atau identitas banner        |
| `image`         | VARCHAR(255)    | -   | No   | Path atau nama file gambar banner |
| `status`        | ENUM            | -   | No   | `active` atau `inactive`          |
| `display_order` | INT UNSIGNED    | -   | No   | Urutan tampilan banner            |
| `created_at`    | DATETIME        | -   | No   | Waktu pembuatan                   |
| `updated_at`    | DATETIME        | -   | No   | Waktu perubahan                   |

### Standar Ukuran Banner

Untuk menjaga konsistensi tampilan pada website publik, banner menggunakan standar ukuran:

```text
Ukuran Ideal : 1920 × 600 px
Aspect Ratio : 16:5
```

Format gambar yang direkomendasikan:

```text
JPG / JPEG
PNG
WebP
```

Admin Panel harus menampilkan informasi ukuran yang direkomendasikan pada halaman upload banner.

Contoh:

```text
Ukuran yang disarankan: 1920 × 600 px
Rasio gambar: 16:5
Format: JPG, JPEG, PNG, WebP
```

Validasi teknis terhadap format, dimensi, dan ukuran maksimum file akan diterapkan pada backend.

### Mekanisme Tampilan

Website publik hanya menampilkan banner dengan status:

```text
active
```

Banner dengan status:

```text
inactive
```

tidak ditampilkan kepada pengunjung.

Field `display_order` digunakan untuk menentukan urutan apabila terdapat lebih dari satu banner aktif.

---

## 6.5 Tabel `gallery_categories`

Tabel `gallery_categories` digunakan untuk menyimpan kategori referensi galeri.

| Field  | Tipe Data       | Key    | Null | Keterangan    |
| ------ | --------------- | ------ | ---- | ------------- |
| `id`   | BIGINT UNSIGNED | PK     | No   | ID kategori   |
| `name` | VARCHAR(100)    | UNIQUE | No   | Nama kategori |

Contoh kategori:

* Kegiatan
* Dokumentasi

Kategori bersifat referensi tetap dan tidak memiliki menu CRUD tersendiri pada versi pertama.

---

## 6.6 Tabel `gallery`

Tabel `gallery` digunakan untuk menyimpan foto dokumentasi yang ditampilkan pada website publik.

| Field         | Tipe Data       | Key | Null | Keterangan                     |
| ------------- | --------------- | --- | ---- | ------------------------------ |
| `id`          | BIGINT UNSIGNED | PK  | No   | ID unik galeri                 |
| `category_id` | BIGINT UNSIGNED | FK  | No   | Relasi ke `gallery_categories` |
| `title`       | VARCHAR(255)    | -   | No   | Judul atau deskripsi foto      |
| `image`       | VARCHAR(255)    | -   | No   | Path atau nama file foto       |
| `created_at`  | DATETIME        | -   | No   | Waktu pembuatan                |
| `updated_at`  | DATETIME        | -   | No   | Waktu perubahan                |

### Relasi

```text
gallery_categories (1)
        │
        │
        │ N
        ▼
      gallery
```

Satu kategori dapat memiliki banyak foto galeri.

---

## 6.7 Tabel `documents`

Tabel `documents` digunakan untuk menyimpan dokumen PDF yang dapat diunduh oleh masyarakat melalui website publik.

| Field         | Tipe Data       | Key | Null | Keterangan        |
| ------------- | --------------- | --- | ---- | ----------------- |
| `id`          | BIGINT UNSIGNED | PK  | No   | ID unik dokumen   |
| `title`       | VARCHAR(255)    | -   | No   | Judul dokumen     |
| `description` | TEXT            | -   | Yes  | Deskripsi dokumen |
| `file_path`   | VARCHAR(255)    | -   | No   | Lokasi file PDF   |
| `uploaded_at` | DATETIME        | -   | No   | Waktu upload      |
| `updated_at`  | DATETIME        | -   | No   | Waktu perubahan   |

Format dokumen yang didukung pada versi pertama:

```text
PDF
```

---

## 6.8 Tabel `website_settings`

Tabel `website_settings` digunakan untuk menyimpan pengaturan umum website publik.

| Field           | Tipe Data       | Key | Null | Keterangan               |
| --------------- | --------------- | --- | ---- | ------------------------ |
| `id`            | BIGINT UNSIGNED | PK  | No   | ID konfigurasi           |
| `logo`          | VARCHAR(255)    | -   | Yes  | Path atau nama file logo |
| `address`       | TEXT            | -   | Yes  | Alamat instansi          |
| `email`         | VARCHAR(150)    | -   | Yes  | Email resmi              |
| `phone`         | VARCHAR(50)     | -   | Yes  | Nomor telepon            |
| `facebook_url`  | VARCHAR(255)    | -   | Yes  | URL Facebook             |
| `instagram_url` | VARCHAR(255)    | -   | Yes  | URL Instagram            |
| `x_url`         | VARCHAR(255)    | -   | Yes  | URL X                    |
| `tiktok_url`    | VARCHAR(255)    | -   | Yes  | URL TikTok               |
| `updated_at`    | DATETIME        | -   | No   | Waktu perubahan          |

### Karakteristik

Tabel ini bersifat **singleton**.

Artinya, hanya terdapat satu konfigurasi website yang digunakan secara global oleh website publik.

---

## 6.9 Tabel `admin_activities`

Tabel `admin_activities` digunakan untuk mencatat aktivitas administrator dalam Admin Panel.

| Field         | Tipe Data       | Key | Null | Keterangan                             |
| ------------- | --------------- | --- | ---- | -------------------------------------- |
| `id`          | BIGINT UNSIGNED | PK  | No   | ID aktivitas                           |
| `admin_id`    | BIGINT UNSIGNED | FK  | No   | Administrator yang melakukan aktivitas |
| `action`      | VARCHAR(50)     | -   | No   | Jenis aktivitas                        |
| `module`      | VARCHAR(50)     | -   | No   | Modul yang terpengaruh                 |
| `description` | TEXT            | -   | Yes  | Deskripsi aktivitas                    |
| `created_at`  | DATETIME        | -   | No   | Waktu aktivitas                        |

Contoh `action`:

```text
LOGIN
CREATE
UPDATE
DELETE
```

Contoh `module`:

```text
NEWS
BANNER
GALLERY
DOCUMENT
SETTINGS
```

### Relasi

```text
admins (1)
    │
    │
    │ N
    ▼
admin_activities
```

Satu administrator dapat memiliki banyak aktivitas.

---

# 7. Relasi Antar-Entitas

## 7.1 Relasi Administrator dan Aktivitas

```text
admins
   │
   │ 1 : N
   ▼
admin_activities
```

Satu administrator dapat menghasilkan banyak catatan aktivitas.

---

## 7.2 Relasi Kategori Berita dan Berita

```text
news_categories
   │
   │ 1 : N
   ▼
news
```

Satu kategori dapat digunakan oleh banyak berita.

Setiap berita wajib memiliki satu kategori.

---

## 7.3 Relasi Kategori Galeri dan Galeri

```text
gallery_categories
   │
   │ 1 : N
   ▼
gallery
```

Satu kategori dapat digunakan oleh banyak foto galeri.

Setiap foto galeri wajib memiliki satu kategori.

---

# 8. Entitas Tanpa Relasi

Beberapa entitas tidak memiliki relasi langsung dengan entitas lain:

```text
header_banners
documents
website_settings
```

Hal tersebut disebabkan karena:

* `header_banners` berdiri sebagai data visual Header/Hero website.
* `documents` merupakan kumpulan dokumen publik yang berdiri sendiri.
* `website_settings` merupakan konfigurasi global website.

Ketiga entitas tersebut tetap digunakan oleh website publik melalui API backend.

---

# 9. Aturan Integritas Data

Sistem harus menerapkan aturan integritas berikut:

1. Setiap tabel memiliki primary key yang unik.
2. `email` pada tabel `admins` harus unik.
3. `slug` pada tabel `news` harus unik.
4. `category_id` pada `news` harus mengacu pada kategori yang valid.
5. `category_id` pada `gallery` harus mengacu pada kategori yang valid.
6. Data kategori tidak boleh dihapus apabila masih digunakan oleh data berita atau galeri.
7. File gambar harus memiliki format yang didukung sistem.
8. Banner yang berstatus `inactive` tidak ditampilkan pada website publik.
9. Berita dengan status `draft` tidak ditampilkan pada website publik.
10. Hanya berita dengan status `publish` yang dapat ditampilkan kepada pengunjung.
11. Hanya banner dengan status `active` yang dapat ditampilkan pada Header/Hero website publik.
12. Dokumen yang dihapus dari database tidak boleh lagi tersedia melalui daftar dokumen publik.
13. Password administrator wajib disimpan dalam bentuk hash dan tidak boleh disimpan sebagai plain text.
14. `website_settings` hanya memiliki satu konfigurasi aktif yang digunakan secara global.

---

# 10. Alur Data Admin Panel dan Website Publik

Secara umum, alur data sistem adalah:

```text
                  ┌───────────────────┐
                  │   ADMIN PANEL     │
                  └─────────┬─────────┘
                            │
                            │ HTTP Request
                            ▼
                  ┌───────────────────┐
                  │    BACKEND API    │
                  │ Node.js + Express │
                  └─────────┬─────────┘
                            │
                            │ Query / Mutation
                            ▼
                  ┌───────────────────┐
                  │      MySQL        │
                  │     DATABASE      │
                  └─────────┬─────────┘
                            │
                            │ Read Data
                            ▼
                  ┌───────────────────┐
                  │   WEBSITE PUBLIC  │
                  │   React + Vite    │
                  └───────────────────┘
```

Contoh alur pengelolaan banner:

```text
Administrator
      │
      │ Upload Banner
      ▼
Admin Panel
      │
      │ POST /api/admin/banners
      ▼
Backend API
      │
      ├──── Simpan File Gambar
      │
      └──── Simpan Metadata
                 │
                 ▼
          header_banners
                 │
                 │
                 ▼
          Website Publik
                 │
                 ▼
         Header / Hero Area
```

---

# 11. Struktur Database Final

Struktur database Admin Panel versi 1.1 adalah:

```text
DATABASE
│
├── admins
│
├── admin_activities
│
├── news_categories
│
├── news
│
├── header_banners
│
├── gallery_categories
│
├── gallery
│
├── documents
│
└── website_settings
```

---

# 12. Ringkasan Keputusan Desain

| Komponen                      | Keputusan                                   |
| ----------------------------- | ------------------------------------------- |
| Database                      | MySQL                                       |
| Administrator                 | Satu role Administrator                     |
| Berita                        | CRUD melalui Admin Panel                    |
| Kategori Berita               | Data referensi tetap                        |
| Banner                        | CRUD melalui Admin Panel                    |
| Fungsi Banner                 | Mengelola gambar Header/Hero website publik |
| Ukuran Banner Ideal           | 1920 × 600 px                               |
| Rasio Banner                  | 16:5                                        |
| Status Banner                 | Active / Inactive                           |
| Urutan Banner                 | Menggunakan `display_order`                 |
| Galeri                        | CRUD melalui Admin Panel                    |
| Kategori Galeri               | Data referensi tetap                        |
| Dokumen                       | CRUD dokumen PDF                            |
| Pengaturan Website            | Satu konfigurasi global                     |
| Konten Statis                 | Tidak dikelola Admin Panel                  |
| Aktivitas Admin               | Dicatat melalui `admin_activities`          |
| Multi-role                    | Belum diterapkan                            |
| Integrasi Sistem Kependudukan | Tidak termasuk                              |

---

# 13. Kesimpulan

Rancangan ERD dan Database Design ini telah disesuaikan dengan kebutuhan Admin Panel Website Disdukcapil Kota Tegal versi 1.1.

Struktur database berfokus pada pengelolaan konten dinamis yang dibutuhkan oleh website publik, yaitu Berita, Banner Header/Hero, Galeri, Dokumen, dan Pengaturan Website.

Banner secara khusus dirancang sebagai entitas tersendiri karena digunakan untuk mengelola gambar Header/Hero website publik yang dapat diganti sesuai kebutuhan atau momentum tertentu, seperti peringatan Hari Kemerdekaan.

Dengan struktur ini, Admin Panel dapat mengelola konten website secara terpusat tanpa mengubah kode pada website publik untuk setiap pembaruan konten.

Dokumen ini menjadi acuan untuk tahap berikutnya, yaitu perancangan dan implementasi **API Specification**, **Backend Database Migration**, dan **Integrasi Frontend Admin Panel dengan Backend API**.
