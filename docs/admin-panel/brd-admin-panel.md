# BUSINESS REQUIREMENTS DOCUMENT (BRD)

## ADMIN PANEL (CONTENT MANAGEMENT SYSTEM)

### REDESAIN WEBSITE DINAS KEPENDUDUKAN DAN PENCATATAN SIPIL KOTA TEGAL

**Versi Dokumen:** 1.1
**Tanggal:** 21 Juli 2026
**Status:** Final Draft
**Disusun oleh:** Hendi
**Peran:** Business Analyst / Pengembang

---

# INFORMASI DOKUMEN

| Atribut            | Keterangan                              |
| ------------------ | --------------------------------------- |
| Nama Proyek        | Redesain Website Disdukcapil Kota Tegal |
| Modul              | Admin Panel (Content Management System) |
| Jenis Dokumen      | Business Requirements Document (BRD)    |
| Versi Dokumen      | 1.1                                     |
| Tanggal Penyusunan | 21 Juli 2026                            |
| Disusun oleh       | Hendi — Business Analyst / Pengembang   |
| Status Dokumen     | Final Draft                             |

---

# RIWAYAT REVISI

| No | Tanggal     | Versi | Deskripsi Perubahan                                                                                                                              | Disusun Oleh |
| -- | ----------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| 1  | 21 Jul 2026 | 1.0   | Penyusunan dokumen awal BRD Admin Panel                                                                                                          | Hendi        |
| 2  | 21 Jul 2026 | 1.1   | Penegasan fungsi Manajemen Banner sebagai pengelola Banner Header pada halaman Beranda website publik dan penyelarasan ruang lingkup Admin Panel | Hendi        |

---

# 1. RINGKASAN EKSEKUTIF

Dokumen ini menjelaskan kebutuhan bisnis untuk pengembangan **Admin Panel (Content Management System)** sebagai bagian dari proyek redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal.

Admin Panel dirancang sebagai sistem pengelolaan konten sederhana yang memungkinkan administrator mengelola konten website publik yang bersifat dinamis tanpa perlu melakukan perubahan langsung pada kode program.

Konten yang dikelola melalui Admin Panel meliputi **Berita, Banner Header pada halaman Beranda, Galeri, Dokumen/File yang dapat diunduh publik, Pengaturan Website, dan Akun Administrator**.

Khusus untuk fitur **Manajemen Banner**, banner yang dikelola melalui Admin Panel digunakan untuk mengubah gambar pada area **Header/Hero Banner yang telah tersedia pada halaman Beranda website publik**. Fitur ini **tidak menambahkan section baru** pada halaman Beranda dan tidak mengubah struktur layout website publik yang telah ditetapkan dalam desain.

Sementara itu, konten **Informasi Penting berupa dua slot e-flyer pada sidebar Beranda** tidak termasuk dalam pengelolaan Admin Panel pada versi pertama dan tetap berada di luar cakupan pengelolaan konten dinamis Admin Panel.

Dokumen ini menjadi acuan untuk tahap perancangan dan pengembangan teknis, meliputi perancangan database, API Specification, Wireframe, Design System, Technical Design, dan implementasi frontend serta backend.

---

# 2. LATAR BELAKANG

Website Disdukcapil Kota Tegal memerlukan pembaruan dari sisi tampilan antarmuka dan pengalaman pengguna sebagai bagian dari proses redesain website.

Selain pembaruan tampilan, diperlukan pula mekanisme pengelolaan konten yang lebih mudah agar informasi yang bersifat dinamis dapat diperbarui oleh administrator tanpa ketergantungan langsung kepada developer.

Oleh karena itu, dikembangkan Admin Panel sederhana yang berfungsi sebagai pusat pengelolaan konten website publik.

Admin Panel tidak dirancang sebagai CMS umum dengan fitur kompleks seperti page builder, theme builder, atau plugin manager. Sistem hanya menyediakan fitur yang relevan dengan kebutuhan website profil instansi pemerintah.

Website publik tetap menggunakan struktur halaman dan desain yang telah ditentukan. Administrator hanya mengelola data dan konten yang telah disediakan slot atau komponennya pada website publik.

---

# 3. TUJUAN BISNIS

Pengembangan Admin Panel bertujuan untuk:

1. Mempermudah administrator dalam mengelola konten dinamis website.
2. Mengurangi ketergantungan terhadap developer untuk perubahan konten rutin.
3. Memastikan informasi yang ditampilkan pada website publik dapat diperbarui dengan mudah.
4. Menjaga konsistensi struktur dan tampilan website publik.
5. Menyediakan antarmuka administrasi yang sederhana dan mudah digunakan.
6. Memungkinkan pengelolaan berita, banner, galeri, dan dokumen secara terpusat.
7. Menyediakan sistem pengelolaan konten yang dapat dikembangkan pada tahap berikutnya.

---

# 4. RUANG LINGKUP

## 4.1 Ruang Lingkup Dalam (In-Scope)

Admin Panel versi pertama mencakup modul berikut:

| No | Modul              | Deskripsi                                                       |
| -- | ------------------ | --------------------------------------------------------------- |
| 1  | Autentikasi        | Login dan logout administrator serta proteksi akses Admin Panel |
| 2  | Dashboard          | Menampilkan ringkasan statistik dan aktivitas konten            |
| 3  | Manajemen Berita   | Mengelola berita yang ditampilkan pada website publik           |
| 4  | Manajemen Banner   | Mengelola gambar Banner Header/Hero pada halaman Beranda        |
| 5  | Manajemen Galeri   | Mengelola foto dan dokumentasi kegiatan                         |
| 6  | Manajemen Dokumen  | Mengelola file publik seperti formulir dan dokumen PDF          |
| 7  | Pengaturan Website | Mengelola informasi umum website yang bersifat dinamis          |
| 8  | Akun               | Mengelola password akun administrator                           |

---

## 4.2 Ruang Lingkup Out of Scope

Fitur berikut tidak termasuk dalam Admin Panel versi pertama:

| No | Fitur                                 | Alasan                                                                            |
| -- | ------------------------------------- | --------------------------------------------------------------------------------- |
| 1  | Page Builder                          | Struktur halaman telah ditentukan melalui desain website                          |
| 2  | Theme Builder                         | Tampilan website menggunakan desain yang telah ditetapkan                         |
| 3  | Plugin Manager                        | Sistem tidak dirancang sebagai CMS dengan ekstensi pihak ketiga                   |
| 4  | Drag & Drop Page Builder              | Tidak diperlukan untuk website profil instansi                                    |
| 5  | Multi Website                         | Sistem hanya digunakan untuk satu website                                         |
| 6  | Multi Bahasa                          | Website menggunakan Bahasa Indonesia                                              |
| 7  | Workflow Approval                     | Tahap pertama hanya memiliki satu role Administrator                              |
| 8  | Integrasi Media Sosial                | Media sosial hanya berupa tautan eksternal                                        |
| 9  | Manajemen Menu Dinamis                | Struktur navigasi ditentukan oleh desain website                                  |
| 10 | Manajemen Informasi Penting / E-Flyer | Dua slot e-flyer pada sidebar tidak dikelola melalui Admin Panel versi pertama    |
| 11 | Pengelolaan Profil Statis             | Profil, sejarah, visi & misi, dan struktur organisasi tetap dikelola melalui kode |
| 12 | Sistem Pengaduan Internal             | Tidak terdapat modul pengaduan internal pada Admin Panel                          |

---

# 5. DEFINISI DAN ISTILAH

| Istilah       | Definisi                                                                             |
| ------------- | ------------------------------------------------------------------------------------ |
| BRD           | Business Requirements Document, dokumen yang menjelaskan kebutuhan bisnis sistem     |
| CMS           | Content Management System, sistem untuk mengelola konten tanpa mengubah kode program |
| Admin Panel   | Antarmuka backend untuk mengelola konten website                                     |
| CRUD          | Create, Read, Update, Delete                                                         |
| Banner Header | Gambar visual utama pada area Header/Hero halaman Beranda website publik             |
| Berita        | Konten artikel informasi yang ditampilkan pada website publik                        |
| Galeri        | Kumpulan foto dan dokumentasi kegiatan                                               |
| Dokumen       | File yang dapat diakses atau diunduh oleh masyarakat                                 |
| Draft         | Status konten yang belum dipublikasikan                                              |
| Publish       | Status konten yang telah ditampilkan kepada publik                                   |
| Slug          | Representasi URL yang ramah mesin pencari dari judul berita                          |
| Administrator | Pengguna yang memiliki hak akses untuk mengelola Admin Panel                         |

---

# 6. PEMANGKU KEPENTINGAN DAN PENGGUNA SISTEM

| Peran                         | Deskripsi                                                  |
| ----------------------------- | ---------------------------------------------------------- |
| Disdukcapil Kota Tegal        | Pemilik dan pemberi kebutuhan sistem                       |
| Administrator                 | Pengguna utama Admin Panel yang mengelola konten           |
| Business Analyst / Pengembang | Pihak yang menganalisis kebutuhan dan mengembangkan sistem |
| Dosen / Pembimbing Akademik   | Pihak yang mengawasi proyek dalam konteks akademik/magang  |

Pada versi pertama, sistem hanya memiliki satu role yaitu **Administrator** dengan akses penuh terhadap seluruh modul Admin Panel.

Pembagian role seperti Editor, Contributor, atau Super Administrator tidak termasuk dalam scope versi pertama.

---

# 7. ASUMSI

1. Administrator memiliki kemampuan dasar dalam menggunakan aplikasi berbasis web.
2. Administrator memiliki akses terhadap konten yang akan dipublikasikan.
3. Website publik telah memiliki struktur halaman dan komponen yang sesuai dengan desain yang telah ditetapkan.
4. Banner Header telah memiliki area khusus pada halaman Beranda website publik.
5. Admin Panel hanya mengubah data dan konten pada komponen yang telah disediakan.
6. Informasi Penting berupa dua e-flyer tidak dikelola melalui Admin Panel versi pertama.
7. Konten statis seperti Profil, Sejarah, Visi & Misi, dan Struktur Organisasi dikelola melalui kode.
8. Infrastruktur backend dan database tersedia untuk mendukung penyimpanan data Admin Panel.
9. Administrator bertanggung jawab terhadap kebenaran konten yang dimasukkan ke dalam sistem.

---

# 8. DEPENDENSI

| No | Dependensi           | Keterangan                                                             |
| -- | -------------------- | ---------------------------------------------------------------------- |
| 1  | Node.js & Express.js | Digunakan untuk backend API                                            |
| 2  | React + Vite         | Digunakan untuk frontend Admin Panel                                   |
| 3  | MySQL                | Digunakan sebagai database                                             |
| 4  | Penyimpanan File     | Diperlukan untuk gambar dan dokumen                                    |
| 5  | HTTPS                | Diperlukan untuk keamanan komunikasi                                   |
| 6  | Website Publik       | Admin Panel harus terhubung dengan website publik melalui API          |
| 7  | Data Konten          | Data berita, galeri, banner, dan dokumen disediakan oleh administrator |

---

# 9. KEBUTUHAN FUNGSIONAL

## 9.1 Autentikasi

| ID         | Kebutuhan                                                  | Prioritas |
| ---------- | ---------------------------------------------------------- | --------- |
| FR-AUTH-01 | Sistem menyediakan halaman login administrator             | Must Have |
| FR-AUTH-02 | Sistem memvalidasi username/email dan password             | Must Have |
| FR-AUTH-03 | Sistem menolak login dengan kredensial tidak valid         | Must Have |
| FR-AUTH-04 | Sistem menyediakan fitur logout                            | Must Have |
| FR-AUTH-05 | Sistem melindungi halaman Admin Panel dari akses tidak sah | Must Have |

---

## 9.2 Dashboard

| ID         | Kebutuhan                                                         | Prioritas   |
| ---------- | ----------------------------------------------------------------- | ----------- |
| FR-DASH-01 | Sistem menampilkan jumlah total berita                            | Must Have   |
| FR-DASH-02 | Sistem menampilkan jumlah berita berdasarkan status Draft/Publish | Must Have   |
| FR-DASH-03 | Sistem menampilkan jumlah banner                                  | Must Have   |
| FR-DASH-04 | Sistem menampilkan jumlah foto galeri                             | Must Have   |
| FR-DASH-05 | Sistem menampilkan jumlah dokumen                                 | Must Have   |
| FR-DASH-06 | Sistem menampilkan aktivitas terbaru administrator                | Should Have |

---

## 9.3 Manajemen Berita

| ID         | Kebutuhan                                                    | Prioritas   |
| ---------- | ------------------------------------------------------------ | ----------- |
| FR-NEWS-01 | Administrator dapat melihat daftar berita                    | Must Have   |
| FR-NEWS-02 | Administrator dapat menambahkan berita                       | Must Have   |
| FR-NEWS-03 | Administrator dapat mengubah berita                          | Must Have   |
| FR-NEWS-04 | Administrator dapat menghapus berita                         | Must Have   |
| FR-NEWS-05 | Administrator dapat mengunggah thumbnail berita              | Must Have   |
| FR-NEWS-06 | Administrator dapat menentukan kategori berita               | Must Have   |
| FR-NEWS-07 | Administrator dapat mengatur status Draft atau Publish       | Must Have   |
| FR-NEWS-08 | Sistem menyediakan pencarian berita                          | Should Have |
| FR-NEWS-09 | Sistem menyediakan filter berita berdasarkan kategori/status | Should Have |
| FR-NEWS-10 | Sistem menghasilkan slug berita secara otomatis              | Should Have |

Berita yang berstatus **Publish** akan ditampilkan pada website publik.

Berita terbaru dapat ditampilkan pada bagian **Berita Pilihan/berita terbaru di halaman Beranda**, sesuai dengan desain website publik.

---

## 9.4 Manajemen Banner

Modul Manajemen Banner digunakan khusus untuk mengelola **gambar Banner Header/Hero yang berada pada halaman Beranda website publik**.

Modul ini **tidak membuat section baru** pada website publik.

| ID           | Kebutuhan                                                            | Prioritas   |
| ------------ | -------------------------------------------------------------------- | ----------- |
| FR-BANNER-01 | Administrator dapat melihat daftar Banner Header                     | Must Have   |
| FR-BANNER-02 | Administrator dapat menambahkan Banner Header baru                   | Must Have   |
| FR-BANNER-03 | Administrator dapat mengubah Banner Header                           | Must Have   |
| FR-BANNER-04 | Administrator dapat menghapus Banner Header                          | Must Have   |
| FR-BANNER-05 | Administrator dapat mengaktifkan atau menonaktifkan Banner Header    | Must Have   |
| FR-BANNER-06 | Administrator dapat mengatur urutan Banner Header                    | Should Have |
| FR-BANNER-07 | Sistem memvalidasi format file gambar yang diunggah (JPG, JPEG, PNG, WebP) | Must Have   |
| FR-BANNER-08 | Sistem menerapkan batas ukuran file gambar sesuai konfigurasi teknis | Must Have   |
| FR-BANNER-09 | Sistem memvalidasi aspect ratio gambar Banner Header (idealnya 16:5 dengan toleransi ±5%) | Must Have   |
| FR-BANNER-10 | Sistem menolak gambar yang aspect rationya berada di luar rentang toleransi (3.04 - 3.36) | Must Have   |
| FR-BANNER-11 | Sistem memberikan informasi ukuran ideal (1920 × 600 px) kepada admin sebelum upload | Must Have   |
| FR-BANNER-12 | Sistem menampilkan preview gambar sebelum administrator menyimpan Banner | Must Have   |

Banner yang aktif akan ditampilkan pada area **Header/Hero halaman Beranda website publik**.

Jika terdapat lebih dari satu banner aktif, sistem dapat menampilkan banner berdasarkan urutan yang telah ditentukan.

---

## 9.5 Manajemen Galeri

| ID        | Kebutuhan                                      | Prioritas |
| --------- | ---------------------------------------------- | --------- |
| FR-GAL-01 | Administrator dapat melihat daftar galeri      | Must Have |
| FR-GAL-02 | Administrator dapat menambahkan foto galeri    | Must Have |
| FR-GAL-03 | Administrator dapat mengubah data galeri       | Must Have |
| FR-GAL-04 | Administrator dapat menghapus foto galeri      | Must Have |
| FR-GAL-05 | Administrator dapat mengunggah file gambar     | Must Have |
| FR-GAL-06 | Administrator dapat menentukan kategori galeri | Must Have |

Galeri digunakan untuk menampilkan foto kegiatan dan dokumentasi pada website publik.

---

## 9.6 Manajemen Dokumen

Modul Dokumen digunakan untuk mengelola file yang dapat diakses atau diunduh masyarakat, seperti formulir, persyaratan, panduan, dan dokumen pelayanan.

| ID        | Kebutuhan                                      | Prioritas |
| --------- | ---------------------------------------------- | --------- |
| FR-DOC-01 | Administrator dapat melihat daftar dokumen     | Must Have |
| FR-DOC-02 | Administrator dapat mengunggah dokumen         | Must Have |
| FR-DOC-03 | Administrator dapat mengubah informasi dokumen | Must Have |
| FR-DOC-04 | Administrator dapat mengganti file dokumen     | Must Have |
| FR-DOC-05 | Administrator dapat menghapus dokumen          | Must Have |
| FR-DOC-06 | Sistem memvalidasi format file dokumen         | Must Have |

Format utama dokumen yang digunakan pada versi pertama adalah **PDF**.

---

## 9.7 Pengaturan Website

| ID        | Kebutuhan                                        | Prioritas |
| --------- | ------------------------------------------------ | --------- |
| FR-SET-01 | Administrator dapat mengubah logo website        | Must Have |
| FR-SET-02 | Administrator dapat mengubah alamat instansi     | Must Have |
| FR-SET-03 | Administrator dapat mengubah email kontak        | Must Have |
| FR-SET-04 | Administrator dapat mengubah nomor telepon       | Must Have |
| FR-SET-05 | Administrator dapat mengubah tautan media sosial | Must Have |

Perubahan pengaturan website akan diterapkan pada bagian website publik yang menggunakan data tersebut.

---

## 9.8 Akun Administrator

| ID            | Kebutuhan                                          | Prioritas |
| ------------- | -------------------------------------------------- | --------- |
| FR-ACCOUNT-01 | Administrator dapat mengubah password akun sendiri | Must Have |
| FR-ACCOUNT-02 | Sistem memvalidasi password lama sebelum perubahan | Must Have |
| FR-ACCOUNT-03 | Sistem menyimpan password dalam bentuk hash        | Must Have |

---

# 10. KEBUTUHAN DATA

## 10.1 Data Berita

| Atribut         | Keterangan            |
| --------------- | --------------------- |
| ID              | Identitas unik berita |
| Judul           | Judul berita          |
| Slug            | URL berita            |
| Ringkasan       | Ringkasan berita      |
| Isi             | Isi lengkap berita    |
| Thumbnail       | Gambar thumbnail      |
| Kategori        | Kategori berita       |
| Status          | Draft atau Publish    |
| Tanggal Publish | Waktu publikasi       |
| Created At      | Waktu pembuatan       |
| Updated At      | Waktu perubahan       |

---

## 10.2 Data Banner Header

| Atribut    | Keterangan                |
| ---------- | ------------------------- |
| ID         | Identitas unik banner     |
| Nama       | Nama/banner title         |
| Gambar     | File gambar Banner Header |
| Status     | Aktif atau Nonaktif       |
| Urutan     | Urutan tampilan banner    |
| Created At | Waktu pembuatan           |
| Updated At | Waktu perubahan           |

**Catatan:** Data Banner Header digunakan oleh website publik untuk menampilkan gambar pada area Header/Hero di halaman Beranda.

---

## 10.3 Data Galeri

| Atribut         | Keterangan            |
| --------------- | --------------------- |
| ID              | Identitas unik galeri |
| Judul/Deskripsi | Informasi foto        |
| Gambar          | File foto             |
| Kategori        | Kategori galeri       |
| Created At      | Waktu pembuatan       |
| Updated At      | Waktu perubahan       |

---

## 10.4 Data Dokumen

| Atribut        | Keterangan             |
| -------------- | ---------------------- |
| ID             | Identitas unik dokumen |
| Judul          | Nama dokumen           |
| Deskripsi      | Penjelasan dokumen     |
| File           | File PDF               |
| Tanggal Upload | Waktu upload           |
| Created At     | Waktu pembuatan        |
| Updated At     | Waktu perubahan        |

---

## 10.5 Data Pengaturan Website

| Atribut       | Keterangan           |
| ------------- | -------------------- |
| ID            | Identitas pengaturan |
| Logo          | File logo            |
| Alamat        | Alamat instansi      |
| Email         | Email kontak         |
| Nomor Telepon | Nomor kontak         |
| Media Sosial  | Link media sosial    |

---

# 11. KEBUTUHAN NON-FUNGSIONAL

## 11.1 Keamanan

* Sistem wajib menggunakan autentikasi untuk mengakses Admin Panel.
* Password administrator wajib disimpan dalam bentuk hash.
* Endpoint API Admin Panel harus dilindungi dari akses tidak sah.
* Sistem harus melakukan validasi input.
* Sistem harus melakukan validasi format dan ukuran file upload.

## 11.2 Performa

* Dashboard harus dapat dimuat dalam waktu yang wajar.
* Data dengan jumlah besar menggunakan pagination.
* File gambar dan dokumen harus dikelola dengan efisien.

## 11.3 Usability

* Admin Panel harus mudah digunakan oleh administrator dengan kemampuan komputer dasar.
* Navigasi harus konsisten.
* Istilah dan label harus menggunakan bahasa yang mudah dipahami.
* Form input harus memberikan feedback yang jelas ketika terjadi kesalahan.

## 11.4 Responsivitas

Admin Panel harus dapat digunakan pada:

* Desktop
* Laptop
* Tablet

Dukungan perangkat mobile menjadi pertimbangan tambahan, tetapi fokus utama penggunaan Admin Panel adalah perangkat desktop/laptop.

## 11.5 Maintainability

* Struktur kode frontend dan backend harus modular.
* Setiap modul memiliki pemisahan tanggung jawab yang jelas.
* Kode harus menggunakan penamaan yang konsisten.
* Struktur sistem harus memungkinkan pengembangan fitur tambahan di masa depan.

---

# 12. RINGKASAN TEKNOLOGI

| Komponen                    | Teknologi                        |
| --------------------------- | -------------------------------- |
| Frontend Website Publik     | React + Vite                     |
| Frontend Admin Panel        | React + Vite                     |
| Bahasa Pemrograman Frontend | JavaScript                       |
| Styling                     | Tailwind CSS                     |
| Backend                     | Node.js + Express.js             |
| Database                    | MySQL                            |
| API                         | REST API                         |
| Autentikasi                 | Ditentukan pada Technical Design |
| File Storage                | Ditentukan pada Technical Design |

Detail implementasi teknis seperti struktur database, endpoint API, autentikasi, penyimpanan file, dan struktur folder dijelaskan pada dokumen teknis terpisah.

---

# 13. RISIKO DAN MITIGASI

| No | Risiko                      | Dampak                                                   | Mitigasi                                                  |
| -- | --------------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| 1  | File upload terlalu besar   | Membebani storage dan server                             | Terapkan validasi ukuran file                             |
| 2  | Format file tidak sesuai    | File tidak dapat digunakan                               | Terapkan validasi MIME type dan ekstensi                  |
| 3  | Konten tidak sesuai         | Informasi publik menjadi tidak akurat                    | Administrator melakukan verifikasi sebelum publish        |
| 4  | Akses Admin Panel tidak sah | Risiko perubahan konten ilegal                           | Gunakan autentikasi dan proteksi endpoint                 |
| 5  | Data hilang                 | Konten website tidak tersedia                            | Terapkan backup database dan file                         |
| 6  | Banner tidak sesuai rasio   | Tampilan Banner Header terpotong atau tidak proporsional | Terapkan validasi aspect ratio (16:5 ±5%) pada sistem dan tolak upload jika tidak sesuai |

---

# 14. KRITERIA PENERIMAAN

Sistem dianggap memenuhi kebutuhan apabila:

1. Administrator dapat login ke Admin Panel menggunakan kredensial yang valid.
2. Administrator tidak dapat mengakses Admin Panel tanpa autentikasi.
3. Administrator dapat melakukan CRUD Berita.
4. Berita berstatus Publish dapat ditampilkan pada website publik.
5. Administrator dapat melakukan CRUD Banner Header.
6. Banner aktif dari Admin Panel dapat ditampilkan pada area Header/Hero halaman Beranda website publik.
7. Admin Panel tidak menambahkan section baru pada halaman Beranda hanya karena adanya fitur Manajemen Banner.
8. Administrator dapat melakukan CRUD Galeri.
9. Administrator dapat mengunggah dan mengelola dokumen PDF.
10. Dokumen yang dikelola dapat diakses atau diunduh dari website publik.
11. Administrator dapat mengubah pengaturan website yang telah ditentukan.
12. Administrator dapat mengubah password akun sendiri.
13. File upload divalidasi berdasarkan format dan ukuran yang telah ditentukan.
14. Sistem menolak upload gambar Banner Header yang memiliki aspect ratio di luar rentang toleransi 3.04 – 3.36.
15. Sistem menampilkan preview gambar Banner sebelum disimpan.
16. Seluruh perubahan data melalui Admin Panel dapat tercermin pada website publik melalui API.
17. Website publik tetap mempertahankan struktur dan desain yang telah disepakati.

---

# 15. BATASAN IMPLEMENTASI

Untuk menjaga agar Admin Panel tetap sederhana dan sesuai tujuan proyek, sistem tidak dirancang untuk menjadi CMS umum.

Admin Panel hanya mengelola konten yang telah memiliki komponen atau slot pada website publik.

Dengan demikian:

* Admin tidak dapat membuat halaman baru secara bebas.
* Admin tidak dapat mengubah struktur layout website.
* Admin tidak dapat mengubah menu navigasi secara dinamis.
* Admin tidak dapat mengubah desain atau tema website.
* Admin tidak dapat mengubah konten statis melalui Admin Panel.
* Admin hanya dapat mengelola data yang telah disediakan oleh sistem.

Fitur **Manajemen Banner** hanya berfungsi untuk mengelola gambar pada area **Header/Hero yang telah tersedia di halaman Beranda**, bukan untuk membuat section banner baru.

---

# 16. PERSETUJUAN DOKUMEN

Dokumen ini digunakan sebagai dasar untuk melanjutkan tahap perancangan dan pengembangan Admin Panel.

| Nama  | Jabatan / Peran                              | Tanda Tangan | Tanggal |
| ----- | -------------------------------------------- | ------------ | ------- |
|       | Pembimbing Lapangan — Disdukcapil Kota Tegal |              |         |
|       | Dosen Pembimbing                             |              |         |
| Hendi | Business Analyst / Pengembang                |              |         |

---

## STATUS DOKUMEN

**Status:** Final Draft — Menjadi baseline untuk tahap desain teknis.

Dokumen selanjutnya yang mengacu pada BRD ini:

1. Sitemap Admin Panel
2. User Flow Admin Panel
3. ERD / Database Design
4. API Specification
5. Wireframe Admin Panel
6. Design System Admin Panel
7. Technical Design
8. High-Fidelity UI Implementation
9. Backend API Implementation
10. Integrasi Frontend Admin Panel dengan Backend dan Website Publik
