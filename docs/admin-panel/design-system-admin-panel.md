# DESIGN SYSTEM

## Admin Panel — Content Management System

### Redesain Website Dinas Kependudukan dan Pencatatan Sipil (Disdukcapil) Kota Tegal

**Versi Dokumen:** 1.0
**Status:** Final
**Modul:** Admin Panel
**Platform:** Web Desktop & Tablet
**Frontend:** React + Vite + JavaScript
**Styling:** Tailwind CSS

---

# 1. Tujuan Design System

Design System Admin Panel merupakan pedoman visual dan komponen antarmuka yang digunakan sebagai acuan dalam pengembangan seluruh halaman Admin Panel.

Design System ini bertujuan untuk:

1. Menjaga konsistensi visual pada seluruh halaman Admin Panel.
2. Memastikan antarmuka mudah dipahami oleh Administrator.
3. Menciptakan pengalaman penggunaan yang sederhana dan efisien.
4. Memudahkan pengembang dalam membangun komponen UI secara konsisten.
5. Mengurangi perbedaan desain antarhalaman dan antarfitur.
6. Memastikan Admin Panel tetap memiliki identitas visual yang selaras dengan website publik Disdukcapil Kota Tegal.

Design System ini berfokus pada kebutuhan operasional administrator, sehingga prioritas utama adalah **clarity, usability, consistency, dan efficiency**, bukan dekorasi visual.

---

# 2. Prinsip Desain

## 2.1 Simple

Admin Panel harus memiliki tampilan yang sederhana dan tidak membebani pengguna dengan elemen visual yang tidak diperlukan.

Setiap halaman hanya menampilkan informasi dan tindakan yang relevan dengan tugas administrator.

---

## 2.2 Clear

Informasi harus mudah dibaca dan dipahami.

Label tombol, status, navigasi, dan pesan sistem harus menggunakan istilah yang familiar bagi administrator.

Contoh:

* Tambah Berita
* Edit
* Hapus
* Simpan
* Batal
* Draft
* Publish
* Aktif
* Nonaktif

Hindari penggunaan istilah teknis yang tidak diperlukan.

---

## 2.3 Consistent

Komponen dengan fungsi yang sama harus memiliki tampilan dan perilaku yang sama di seluruh Admin Panel.

Contoh:

* Semua tombol aksi utama menggunakan gaya yang sama.
* Semua form menggunakan struktur input yang konsisten.
* Semua tabel menggunakan pola layout yang sama.
* Semua status menggunakan pola badge yang sama.

---

## 2.4 Efficient

Administrator harus dapat menyelesaikan tugas dengan jumlah langkah seminimal mungkin.

Contoh:

* Tombol "Tambah Berita" selalu mudah ditemukan.
* Pencarian tersedia pada halaman daftar data.
* Filter tersedia ketika data memiliki status atau kategori.
* Aksi Edit dan Hapus tersedia langsung pada tabel.
* Form tidak meminta data yang tidak diperlukan.

---

## 2.5 Safe

Tindakan yang berpotensi menyebabkan kehilangan data harus memiliki perlindungan.

Contoh:

* Konfirmasi sebelum menghapus data.
* Validasi input sebelum menyimpan.
* Peringatan ketika terjadi kesalahan.
* Pesan sukses setelah data berhasil disimpan.

---

# 3. Struktur Layout Admin Panel

Struktur layout utama Admin Panel terdiri dari:

```text
┌──────────────────────────────────────────────────────────┐
│                       TOPBAR                             │
│ Logo / Nama Sistem             Admin ▼                   │
├───────────────┬──────────────────────────────────────────┤
│               │                                          │
│   SIDEBAR     │              MAIN CONTENT                │
│               │                                          │
│ Dashboard     │  Page Title                              │
│               │  Breadcrumb                              │
│ Konten     >  │                                          │
│   Berita      │  Content Area                            │
│   Banner      │                                          │
│   Galeri      │                                          │
│               │                                          │
│ Dokumen       │                                          │
│               │                                          │
│ Pengaturan    │                                          │
│               │                                          │
│ Akun          │                                          │
│               │                                          │
└───────────────┴──────────────────────────────────────────┘
```

Layout Admin Panel menggunakan tiga area utama:

1. **Sidebar**
2. **Topbar**
3. **Main Content**

---

# 4. Sidebar Navigation

Sidebar merupakan navigasi utama Admin Panel.

## 4.1 Struktur Navigasi

```text
Dashboard

Konten
├── Berita
├── Banner
└── Galeri

Dokumen

Pengaturan Website

Akun
└── Ubah Password
```

---

## 4.2 Sidebar Behavior

Pada desktop:

* Sidebar selalu terlihat.
* Lebar sidebar bersifat tetap.
* Sidebar berada di sisi kiri layar.
* Menu aktif memiliki indikator visual yang jelas.

Pada tablet:

* Sidebar dapat diperkecil menjadi mode collapsed.
* Icon tetap terlihat.
* Label menu dapat disembunyikan.

Pada layar kecil:

* Sidebar berubah menjadi drawer.
* Sidebar dibuka melalui tombol menu pada Topbar.

---

# 5. Topbar

Topbar berada di bagian atas area utama Admin Panel.

Elemen Topbar:

* Tombol toggle sidebar.
* Breadcrumb atau informasi halaman.
* Nama administrator.
* Avatar atau inisial administrator.
* Dropdown akun.
* Opsi Ubah Password.
* Opsi Logout.

Contoh:

```text
[☰]  Dashboard                         Hendi ▼
```

Dropdown akun:

```text
Hendi Saputra
Administrator
────────────────
Ubah Password
Logout
```

---

# 6. Warna (Color Palette)

Palet warna Admin Panel menggunakan warna utama yang selaras dengan identitas visual website Disdukcapil.

## 6.1 Brand Colors

| Nama                | HEX       | Penggunaan                             |
| ------------------- | --------- | -------------------------------------- |
| Brand Primary       | `#1E3A8A` | Tombol utama, link aktif, elemen brand |
| Brand Primary Dark  | `#172554` | Hover dan elemen emphasis              |
| Brand Primary Light | `#DBEAFE` | Background informasi brand             |
| Brand Secondary     | `#0F172A` | Sidebar, heading, teks utama           |

---

## 6.2 Neutral Colors

| Nama     | HEX       | Penggunaan                         |
| -------- | --------- | ---------------------------------- |
| White    | `#FFFFFF` | Background card                    |
| Gray 50  | `#F8FAFC` | Background halaman                 |
| Gray 100 | `#F1F5F9` | Background input dan elemen ringan |
| Gray 200 | `#E2E8F0` | Border                             |
| Gray 300 | `#CBD5E1` | Border input                       |
| Gray 500 | `#64748B` | Teks sekunder                      |
| Gray 700 | `#334155` | Teks utama sekunder                |
| Gray 900 | `#0F172A` | Heading dan teks utama             |

---

## 6.3 Semantic Colors

### Success

**Primary:** `#16A34A`

Digunakan untuk:

* Status Publish
* Status Aktif
* Pesan sukses
* Konfirmasi berhasil

### Warning

**Primary:** `#D97706`

Digunakan untuk:

* Peringatan
* Status yang membutuhkan perhatian

### Error / Danger

**Primary:** `#DC2626`

Digunakan untuk:

* Tombol Hapus
* Status error
* Validasi form
* Pesan kegagalan

### Info

**Primary:** `#2563EB`

Digunakan untuk:

* Informasi
* Notifikasi
* Status informatif

---

# 7. Typography

Admin Panel menggunakan font **Roboto** agar konsisten dengan website publik.

## 7.1 Font Family

```text
Roboto, sans-serif
```

---

## 7.2 Typography Scale

| Elemen          | Ukuran | Weight |
| --------------- | -----: | -----: |
| Page Title      |   24px |    700 |
| Section Heading |   20px |    600 |
| Card Title      |   16px |    600 |
| Body            |   14px |    400 |
| Small Text      |   12px |    400 |
| Button          |   14px |    500 |
| Table Header    |   13px |    600 |
| Table Body      |   14px |    400 |

---

## 7.3 Hierarchy

Contoh struktur:

```text
Manajemen Berita
24px / Bold

Kelola berita yang ditampilkan pada website publik.
14px / Regular

Daftar Berita
16px / Semibold
```

---

# 8. Spacing System

Sistem spacing menggunakan kelipatan 4px.

| Token      | Nilai |
| ---------- | ----: |
| `space-1`  |   4px |
| `space-2`  |   8px |
| `space-3`  |  12px |
| `space-4`  |  16px |
| `space-5`  |  20px |
| `space-6`  |  24px |
| `space-8`  |  32px |
| `space-10` |  40px |
| `space-12` |  48px |

Penggunaan umum:

* Jarak antar elemen form: 16px.
* Padding card: 24px.
* Jarak antar section: 32px.
* Jarak antara page title dan konten: 24px.

---

# 9. Border Radius

Admin Panel menggunakan radius yang sederhana dan tidak terlalu membulat.

| Komponen | Radius |
| -------- | -----: |
| Button   |    6px |
| Input    |    6px |
| Card     |    8px |
| Modal    |    8px |
| Badge    | 9999px |

Gaya visual harus tetap formal dan sesuai dengan karakter website instansi pemerintah.

---

# 10. Shadow

Shadow digunakan secara minimal.

### Card

```text
shadow-sm
```

### Dropdown

```text
shadow-md
```

### Modal

```text
shadow-lg
```

Hindari penggunaan shadow yang terlalu tebal atau dekoratif.

---

# 11. Button

## 11.1 Primary Button

Digunakan untuk tindakan utama.

Contoh:

```text
+ Tambah Berita
Simpan
Login
```

Karakteristik:

* Background: Brand Primary
* Text: White
* Radius: 6px
* Height: sekitar 40px
* Font: 14px / Medium

---

## 11.2 Secondary Button

Digunakan untuk tindakan sekunder.

Contoh:

```text
Batal
Kembali
```

Karakteristik:

* Background: White
* Border: Gray 200
* Text: Gray 700

---

## 11.3 Danger Button

Digunakan untuk tindakan destruktif.

Contoh:

```text
Hapus
```

Karakteristik:

* Background: Red 600
* Text: White

Tombol Hapus harus selalu meminta konfirmasi sebelum data benar-benar dihapus.

---

## 11.4 Icon Button

Digunakan untuk tindakan sederhana pada tabel.

Contoh:

```text
[Edit] [Hapus]
```

Icon button harus memiliki tooltip atau accessible label.

---

# 12. Form Components

Form digunakan untuk:

* Login.
* Tambah berita.
* Edit berita.
* Tambah banner.
* Edit banner.
* Tambah galeri.
* Edit galeri.
* Upload dokumen.
* Pengaturan website.
* Ubah password.

---

## 12.1 Input

Setiap input harus memiliki:

1. Label.
2. Input field.
3. Helper text jika diperlukan.
4. Error message jika terjadi kesalahan.

Contoh:

```text
Judul Berita *
[ Masukkan judul berita                    ]

Judul berita harus diisi.
```

---

## 12.2 Required Field

Field wajib diberi tanda:

```text
*
```

Contoh:

```text
Judul Berita *
```

---

## 12.3 Textarea

Digunakan untuk:

* Ringkasan berita.
* Deskripsi.
* Alamat.
* Konten panjang.

---

## 12.4 Rich Text Editor

Digunakan pada konten berita.

Toolbar minimal:

```text
B  I  U
H1 H2
• List
1. List
Link
```

Editor harus tetap sederhana dan tidak menyediakan fitur kompleks seperti page builder.

---

## 12.5 Select

Digunakan untuk:

* Kategori.
* Status.
* Pilihan lainnya.

Contoh:

```text
Kategori
[ Informasi ▼ ]
```

---

## 12.6 File Upload

Digunakan untuk:

* Thumbnail berita.
* Banner.
* Foto galeri.
* Dokumen PDF.

Komponen upload harus menampilkan:

* Nama file.
* Preview gambar jika memungkinkan.
* Ukuran file.
* Tombol hapus/ganti file.

---

# 13. Data Table

Data Table merupakan komponen utama pada halaman pengelolaan konten.

Digunakan pada:

* Berita.
* Banner.
* Galeri.
* Dokumen.

Struktur umum:

```text
┌─────────────────────────────────────────────────────────┐
│ Daftar Berita                       [+ Tambah Berita]   │
├─────────────────────────────────────────────────────────┤
│ [ 🔍 Cari berita... ] [Kategori ▼] [Status ▼]         │
├─────────────────────────────────────────────────────────┤
│ No │ Judul │ Kategori │ Status │ Tanggal │ Aksi       │
├─────────────────────────────────────────────────────────┤
│ 1  │ ...   │ Informasi│ Publish│ ...     │ Edit Hapus │
│ 2  │ ...   │ Kegiatan │ Draft  │ ...     │ Edit Hapus │
└─────────────────────────────────────────────────────────┘
```

---

## 13.1 Pagination

Pagination berada di bagian bawah tabel.

Contoh:

```text
Menampilkan 1–10 dari 45 data

[←] [1] [2] [3] [...] [5] [→]
```

---

## 13.2 Empty State

Jika belum ada data:

```text
Belum ada berita

Belum ada berita yang ditambahkan.
Klik tombol "Tambah Berita" untuk membuat berita pertama.

[ + Tambah Berita ]
```

---

## 13.3 Loading State

Saat data sedang dimuat:

* Gunakan skeleton loading atau loading indicator.
* Jangan menampilkan tabel kosong yang dapat disalahartikan sebagai tidak adanya data.

---

# 14. Status Badge

Status ditampilkan menggunakan badge.

## Publish

```text
[ Publish ]
```

Warna:

* Background: Green 100
* Text: Green 700

---

## Draft

```text
[ Draft ]
```

Warna:

* Background: Gray 100
* Text: Gray 700

---

## Aktif

```text
[ Aktif ]
```

Warna:

* Background: Green 100
* Text: Green 700

---

## Nonaktif

```text
[ Nonaktif ]
```

Warna:

* Background: Gray 100
* Text: Gray 700

---

# 15. Modal dan Confirmation Dialog

Modal digunakan untuk:

* Konfirmasi penghapusan.
* Informasi penting.
* Tindakan yang membutuhkan perhatian pengguna.

Contoh konfirmasi:

```text
Hapus Berita?

Apakah Anda yakin ingin menghapus berita
"Judul Berita Contoh"?

Data yang telah dihapus tidak dapat dikembalikan.

[ Batal ] [ Hapus ]
```

Tombol Hapus menggunakan warna Danger.

---

# 16. Notification / Toast

Toast digunakan untuk memberikan feedback setelah tindakan administrator.

## Success

```text
✓ Berita berhasil ditambahkan.
```

## Update

```text
✓ Berita berhasil diperbarui.
```

## Delete

```text
✓ Berita berhasil dihapus.
```

## Error

```text
✕ Terjadi kesalahan. Silakan coba lagi.
```

Toast muncul sementara dan tidak mengganggu pekerjaan administrator.

---

# 17. Dashboard Components

Dashboard terdiri dari beberapa komponen utama.

## 17.1 Statistic Card

Digunakan untuk menampilkan:

* Total Berita.
* Total Banner.
* Total Galeri.
* Total Dokumen.

Contoh:

```text
┌────────────────────┐
│ Total Berita       │
│                    │
│ 124                │
│ 100 Publish        │
│ 24 Draft           │
└────────────────────┘
```

---

## 17.2 Recent Activity

Menampilkan aktivitas terbaru administrator.

Contoh:

```text
Aktivitas Terbaru

Hendi menambahkan berita baru
5 menit yang lalu

Hendi mengubah banner
20 menit yang lalu

Hendi menghapus dokumen
1 jam yang lalu
```

---

# 18. Login Page

Halaman login memiliki desain sederhana dan fokus pada autentikasi.

Struktur:

```text
┌─────────────────────────────┐
│                             │
│       [LOGO]                │
│                             │
│    Admin Panel              │
│    Disdukcapil Kota Tegal   │
│                             │
│    Email                    │
│    [___________________]    │
│                             │
│    Password                 │
│    [___________________]    │
│                             │
│    [       Login        ]   │
│                             │
└─────────────────────────────┘
```

Login Page tidak menggunakan sidebar dan topbar Admin Panel.

---

# 19. Responsive Design

Admin Panel diprioritaskan untuk penggunaan desktop dan tablet.

## Desktop

Breakpoint:

```text
≥ 1024px
```

Karakteristik:

* Sidebar terbuka.
* Data table ditampilkan penuh.
* Form menggunakan layout dua kolom jika diperlukan.

---

## Tablet

Breakpoint:

```text
768px – 1023px
```

Karakteristik:

* Sidebar dapat collapsed.
* Tabel dapat menggunakan horizontal scrolling.
* Form dapat berubah menjadi satu kolom.

---

## Mobile

Breakpoint:

```text
< 768px
```

Karakteristik:

* Sidebar menjadi drawer.
* Tabel menggunakan horizontal scrolling atau layout card.
* Form menggunakan satu kolom.
* Tombol utama tetap mudah dijangkau.

---

# 20. Iconography

Icon digunakan untuk membantu pemahaman visual.

Icon yang digunakan harus:

* Sederhana.
* Konsisten.
* Mudah dipahami.
* Tidak menggantikan label pada tindakan penting.

Rekomendasi library:

```text
Lucide React
```

Contoh:

| Fungsi     | Icon            |
| ---------- | --------------- |
| Dashboard  | LayoutDashboard |
| Berita     | Newspaper       |
| Banner     | Image           |
| Galeri     | Images          |
| Dokumen    | FileText        |
| Pengaturan | Settings        |
| Akun       | User            |
| Edit       | Pencil          |
| Hapus      | Trash2          |
| Tambah     | Plus            |
| Cari       | Search          |
| Logout     | LogOut          |

---

# 21. Accessibility

Admin Panel harus memperhatikan aksesibilitas dasar.

Ketentuan:

1. Semua input memiliki label.
2. Semua tombol memiliki teks atau accessible label.
3. Icon-only button memiliki tooltip atau `aria-label`.
4. Kontras warna teks dan background harus mudah dibaca.
5. Navigasi dapat diakses menggunakan keyboard.
6. Status tidak hanya dibedakan berdasarkan warna.
7. Error message ditampilkan dekat dengan field terkait.

---

# 22. Design Token untuk Implementasi

Design Token dapat diterjemahkan ke dalam konfigurasi Tailwind CSS.

Contoh:

```javascript
const colors = {
  brand: {
    primary: '#1E3A8A',
    secondary: '#0F172A',
  },

  accent: {
    red: '#DC2626',
  },

  success: '#16A34A',
  warning: '#D97706',
  info: '#2563EB',

  gray: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    500: '#64748B',
    700: '#334155',
    900: '#0F172A',
  },
};
```

Nilai tersebut menjadi acuan utama dalam implementasi UI Admin Panel.

---

# 23. Komponen UI yang Harus Dikembangkan

Komponen reusable yang direkomendasikan:

```text
src/
├── components/
│   ├── layout/
│   │   ├── AdminLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   └── MobileSidebar.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Textarea.jsx
│       ├── Select.jsx
│       ├── FileUpload.jsx
│       ├── RichTextEditor.jsx
│       ├── Modal.jsx
│       ├── ConfirmDialog.jsx
│       ├── Badge.jsx
│       ├── Toast.jsx
│       ├── DataTable.jsx
│       ├── Pagination.jsx
│       ├── EmptyState.jsx
│       ├── LoadingState.jsx
│       └── StatisticCard.jsx
```

Komponen tersebut digunakan kembali oleh berbagai halaman agar tampilan tetap konsisten.

---

# 24. Halaman yang Menggunakan Design System

Design System ini diterapkan pada seluruh halaman Admin Panel:

```text
Login
│
├── Dashboard
│
├── Konten
│   ├── Berita
│   │   ├── Daftar Berita
│   │   ├── Tambah Berita
│   │   └── Edit Berita
│   │
│   ├── Banner
│   │   ├── Daftar Banner
│   │   ├── Tambah Banner
│   │   └── Edit Banner
│   │
│   └── Galeri
│       ├── Daftar Galeri
│       ├── Tambah Galeri
│       └── Edit Galeri
│
├── Dokumen
│   ├── Daftar Dokumen
│   ├── Tambah Dokumen
│   └── Edit Dokumen
│
├── Pengaturan Website
│
└── Akun
    └── Ubah Password
```

---

# 25. Aturan Implementasi

Dalam implementasi Admin Panel:

1. Gunakan komponen reusable sebanyak mungkin.
2. Hindari membuat komponen UI yang sama berulang kali.
3. Gunakan Tailwind CSS sebagai styling utama.
4. Gunakan JavaScript, bukan TypeScript.
5. Gunakan React + Vite.
6. Gunakan layout Admin Panel yang konsisten pada seluruh halaman setelah login.
7. Gunakan warna dari Design Token yang telah ditentukan.
8. Jangan menambahkan warna baru tanpa alasan desain yang jelas.
9. Jangan menggunakan animasi berlebihan.
10. Prioritaskan kecepatan dan kemudahan penggunaan administrator.
11. Setiap tindakan destruktif harus memiliki confirmation dialog.
12. Setiap aksi CRUD harus memberikan feedback kepada pengguna.
13. Semua halaman harus memiliki loading state, empty state, dan error state yang sesuai.
14. UI Admin Panel harus tetap selaras dengan identitas visual website publik Disdukcapil Kota Tegal.
15. Perubahan desain pada tahap implementasi harus tetap mengacu pada dokumen Design System ini.

---

# 26. Kesimpulan

Design System Admin Panel dirancang sebagai fondasi visual dan komponen UI untuk membangun sistem administrasi konten yang sederhana, formal, konsisten, dan mudah digunakan.

Fokus utama desain adalah membantu Administrator mengelola konten website secara efisien, terutama pada proses:

* Menambah berita.
* Mengedit berita.
* Menghapus berita.
* Mengelola banner.
* Mengelola galeri.
* Mengelola dokumen.
* Mengubah informasi website.
* Mengelola akun administrator.

Design System ini menjadi acuan implementasi UI Admin Panel dan dapat dikembangkan lebih lanjut apabila terdapat kebutuhan baru yang telah disepakati dalam proses pengembangan.
