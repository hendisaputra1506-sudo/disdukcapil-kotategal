# Homepage Specification: Disdukcapil Kota Tegal

Dokumen ini adalah *blueprint* spesifikasi teknis antarmuka (UI Specification) untuk halaman Beranda (Homepage). Spesifikasi ini dirumuskan berdasarkan analisis mendalam terhadap rancangan *wireframe* dan struktur situs *legacy*, berpedoman pada prinsip **Conservative Redesign** (mempertahankan struktur hierarki asli namun mengoptimalkan kualitas visual dan aksesibilitas).

---

## 1. Top Header (Bilah Utilitas)

Bilah paling atas dari website yang menyediakan informasi pendukung.

- **Tujuan Section:** Menyediakan akses instan ke tanggal hari ini, halaman statis pendukung, dan kanal media sosial resmi.
- **Komponen yang ada:** Teks Kalender, Link "Tentang Kami" & "Hubungi Kami", Deretan Ikon Media Sosial.
- **Struktur Layout:** *Single horizontal bar*, rata tengah vertikal. Sisi kiri untuk tanggal, sisi kanan untuk *link* dan ikon.
- **Hierarki Informasi:** Tanggal (Kiri) -> Navigasi Statis (Tengah Kanan) -> Media Sosial (Kanan Ujung).
- **Responsive Behavior:** Disembunyikan total (*hidden*) pada layar ponsel (*Mobile*) untuk menghemat ruang vertikal; tampil penuh pada Tablet dan Desktop.
- **Spacing:** *Padding* vertikal sangat tipis (`py-2`), jarak antar ikon `gap-3`.
- **Typography:** `text-xs`, *uppercase*, *medium weight*.
- **Komponen yang dipertahankan:** Seluruh elemen fungsional.
- **Komponen yang dimodernisasi:** Keselarasan vertikal (*vertical alignment*), ukuran ikon menggunakan pustaka SVG Lucide.
- **Alasan perubahan:** Sebelumnya terlihat terlalu kecil dan rapat. Modernisasi memberikan ruang napas (*whitespace*) yang presisi.

| Item | Penjelasan |
|---|---|
| **Nama** | Top Header |
| **Tujuan** | Utilitas sekunder dan kanal sosial |
| **Layout** | Flexbox Horizontal (Space-between) |
| **Grid** | N/A (Flex) |
| **Spacing** | py-2, gap-4 |
| **Typography** | Roboto, text-xs, font-medium, uppercase |
| **Warna** | Background: Putih. Teks: Gray-500 |
| **Responsive** | Hidden di mobile. Muncul di md (Tablet/Desktop) |
| **Status** | Dipertahankan (dengan perbaikan tipografi & spacing) |

---

## 2. Main Navigation (Header Logo & Menu Utama)

Pusat kendali navigasi situs dan identitas *branding* instansi.

- **Tujuan Section:** Memperkuat *branding* instansi dan menyediakan rute utama ke seluruh fitur publik.
- **Komponen yang ada:** Logo Daerah, Teks Nama Instansi bertingkat, *Banner* "Stop Pungli", Bilah Menu Horizontal, Ikon Pencarian.
- **Struktur Layout:** Terdiri dari dua baris. Baris atas untuk Logo & Banner, baris bawah (hitam) untuk rentetan Menu Utama.
- **Hierarki Informasi:** Logo (Kiri Atas) -> Menu Utama (Kiri Bawah) -> Pencarian (Kanan Bawah).
- **Responsive Behavior:** Logo mengecil di *mobile*. Baris menu horizontal menghilang, digantikan oleh tombol *Hamburger Menu* yang memicu navigasi tumpuk (*dropdown*).
- **Spacing:** *Padding* lega di area logo (`py-4`). Menu *item* memiliki *padding* seragam untuk memperlebar area sentuh.
- **Typography:** Logo dengan hierarki tebal (`font-bold`, `text-xl`), Menu dengan huruf kapital (`uppercase`, `text-sm`, `font-bold`).
- **Komponen yang dipertahankan:** Identitas teks logo dan daftar menu asli (PPID, Profil, Layanan, Berita, Pengaduan, Kontak).
- **Komponen yang dimodernisasi:** *Active & Hover state* pada menu, integrasi pencarian yang lebih mulus, *hamburger menu* yang *accessible*.
- **Alasan perubahan:** Menu *legacy* rentan tumpang tindih di layar sempit. Pendekatan baru sangat solid di berbagai ukuran layar.

| Item | Penjelasan |
|---|---|
| **Nama** | Main Navigation |
| **Tujuan** | Branding dan rute navigasi utama |
| **Layout** | Header (Flex Space-between), Navbar (Flex Horizontal) |
| **Grid** | N/A |
| **Spacing** | Header: py-6. Menu: px-4 py-4 |
| **Typography** | Menu: Roboto, text-sm, font-bold, uppercase |
| **Warna** | Header: Latar putih. Navbar: Latar Gray-900 (Gelap), Teks Putih |
| **Responsive** | Mobile: Logo menyesuaikan, Menu jadi Hamburger |
| **Status** | Dipertahankan (dengan perbaikan *hover state* & Mobile Menu) |

---

## 3. Hero Banner (Headline & Featured News)

Area visual pertama yang memikat mata (*above the fold*), menampilkan informasi paling krusial/terbaru.

- **Tujuan Section:** Menyoroti berita utama dan memberikan gambaran cepat kegiatan terbaru Disdukcapil.
- **Komponen yang ada:** Ticker "HEADLINE", Gambar *Slider* Utama (Kiri), 4 *Thumbnail* Berita Terkini (Kanan).
- **Struktur Layout:** Tata letak terbelah (*Split/Grid Layout*). Kiri mengambil 60% layar, Kanan mengambil 40% layar dalam wujud grid 2x2.
- **Hierarki Informasi:** Ticker Headline -> Judul Slider Utama -> Judul 4 Berita Terkini.
- **Responsive Behavior:** Di perangkat *mobile*, tata letak kiri-kanan akan dipatahkan menjadi vertikal murni (Atas-Bawah).
- **Spacing:** Menggunakan `gap-4` antar elemen gambar, dan `mb-8` (margin bawah) sebelum masuk ke seksi selanjutnya.
- **Typography:** Judul berita *overlay* (di atas gambar) dengan `text-xl` (kiri) dan `text-sm` (kanan), tebal pekat warna putih.
- **Komponen yang dipertahankan:** Konsep "1 besar, 4 kecil" di sampingnya.
- **Komponen yang dimodernisasi:** Pemotongan gambar (*aspect-ratio*), lapisan gradasi hitam (*overlay gradient*), indikator *slider*.
- **Alasan perubahan:** Pada situs lama, gambar merusak tata letak karena proporsinya bervariasi. Teks sering tak terbaca karena menabrak latar gambar cerah. Modernisasi akan memastikan rasio gambar terkunci (*aspect-video/16:9*) dan teks selalu berlatar gradien gelap (*high contrast*).

| Item | Penjelasan |
|---|---|
| **Nama** | Hero Banner |
| **Tujuan** | Menyoroti berita *headline* |
| **Layout** | Grid CSS |
| **Grid** | Desktop: Kiri (Span 2) / Kanan (Grid 2x2). Mobile: Tumpuk 1 kolom. |
| **Spacing** | gap-4 (antar gambar), mb-8 |
| **Typography** | Judul Hero: text-2xl font-bold text-white |
| **Warna** | Overlay gradient hitam transparan (menjaga kontras teks) |
| **Responsive** | Berubah dari Grid horizontal menjadi *Stack* vertikal di HP |
| **Status** | Direvisi (standardisasi aspect ratio & kontras typography) |

---

## 4. Shortcut Layanan & Widget (Sidebar Atas)

Kumpulan aksi instan dan informasi krusial operasional instansi.

- **Tujuan Section:** Memberikan info jam pelayanan operasional dan akses layanan eksternal (Sapahumanis).
- **Komponen yang ada:** Tombol "Sapahumanis", Tombol "Stay Connected", Boks "Jam Pelayanan".
- **Struktur Layout:** Berada di kolom kanan (Sidebar) dengan lebar sekitar 30% dari keseluruhan kontainer, bertumpuk secara vertikal (Stack).
- **Hierarki Informasi:** Sapahumanis (Tombol Aksi Utama) -> Jam Pelayanan (Utilitas Info).
- **Responsive Behavior:** Di desktop terletak di Sidebar Kanan. Di *mobile*, ini akan disisipkan di antara Hero Banner dan Berita Terbaru, atau dipindah ke paling bawah (menjadi 100% *width*).
- **Spacing:** Jarak antar elemen (*widget*) di sidebar menggunakan `gap-6` vertikal. Boks Jam Pelayanan memiliki *inner padding* `p-6`.
- **Typography:** Judul "Jam Pelayanan" menggunakan gaya stiker tebal (khas desain kuning lama).
- **Komponen yang dipertahankan:** Kotak informasi jam operasional dengan komposisi bentuk aslinya.
- **Komponen yang dimodernisasi:** Warna latar yang sebelumnya terlalu menusuk mata dihaluskan; bentuk sudut membulat (`rounded-md`).
- **Alasan perubahan:** Boks Jam Pelayanan asli menggunakan palet yang menyalahi aturan rasio kontras warna WCAG. Revisi ini menjaga warna kuning ikonik namun dengan saturasi dan kontras teks yang tepat.

| Item | Penjelasan |
|---|---|
| **Nama** | Shortcut Layanan (Sidebar) |
| **Tujuan** | Akses layanan cepat & informasi jam operasional |
| **Layout** | Stack Vertikal (Sisi Kanan Desktop) |
| **Grid** | Desktop: Mengisi 1 kolom dari 3 kolom utama (Sidebar 30%) |
| **Spacing** | Vertikal gap-6, inner p-4/p-6 |
| **Typography** | Judul widget tebal (text-lg font-bold uppercase) |
| **Warna** | Aksen hijau (Sapahumanis), Kuning (Jam Pelayanan) |
| **Responsive** | Mobile: Sidebar turun ke kolom bawah / tumpuk 100% |
| **Status** | Direvisi (perbaikan komposisi rasio kontras warna) |

---

## 5. Berita Terbaru (Main Feed)

Aliran kronologis rilis pers, kegiatan, dan pembaruan instansi.

- **Tujuan Section:** Menyajikan pakan berita (*news feed*) utama untuk publik.
- **Komponen yang ada:** *Card* Berita (Gambar kiri, teks kanan / Gambar atas, teks bawah), Tombol "Lihat Semua Berita".
- **Struktur Layout:** Berada di kolom utama (Main Content - Kiri). Menggunakan bentuk daftar menurun (*List Layout*).
- **Hierarki Informasi:** Gambar (*Thumbnail*) -> Kategori/Pita -> Judul Berita -> Tanggal -> Kutipan Ringkas (*Excerpt*).
- **Responsive Behavior:** *Mobile* = Gambar di atas teks (`flex-col`). *Desktop* = Gambar di kiri teks (`flex-row`).
- **Spacing:** Jarak antar baris berita `gap-8`. *Padding* dalam *card* `p-4`.
- **Typography:** Judul Berita Utama (`text-lg font-bold`), Tanggal (`text-sm text-gray-500`).
- **Komponen yang dipertahankan:** Alur kronologis (*timeline*).
- **Komponen yang dimodernisasi:** Gaya *Card*. Tidak menggunakan garis tebal, namun menggunakan *border-gray-200* tipis atau pemisahan *whitespace* yang bersih, disempurnakan dengan *tag* kategori berita (misal: "Kegiatan").
- **Alasan perubahan:** Tampilan berita *legacy* tidak memiliki struktur grid yang sejajar (*alignment* berantakan). Pemisahan metadata (tanggal) dan judul sebelumnya tidak memiliki kontras yang jelas.

| Item | Penjelasan |
|---|---|
| **Nama** | Berita Terbaru |
| **Tujuan** | Menyajikan kronologi artikel / rilis rers |
| **Layout** | List (Vertikal) di dalam Main Column |
| **Grid** | Desktop: Memakan ruang 2 dari 3 kolom utama (70%) |
| **Spacing** | mb-6 antar artikel |
| **Typography** | Judul artikel: text-xl, bold, gray-900 |
| **Warna** | Latar putih bersih. Teks sekunder abu-abu. |
| **Responsive** | Desktop: Thumbnail di sisi kiri. Mobile: Thumbnail di atas teks. |
| **Status** | Direvisi (Standardisasi *Card* dan *Thumbnail ratio*) |

---

## 6. Berita Pilihan & Populer (Sidebar Bawah)

Rekomendasi bacaan di luar *timeline* urutan waktu utama.

- **Tujuan Section:** Menjaga pengunjung tetap berada di website dengan menyajikan artikel yang paling banyak dibaca.
- **Komponen yang ada:** Judul "Berita Pilihan", Daftar artikel ringkas (tanpa gambar besar, hanya teks judul dan tanggal).
- **Struktur Layout:** Daftar vertikal (*List*) berlapis garis pemisah (*divider*).
- **Hierarki Informasi:** Judul Widget -> List Artikel (Judul -> Tanggal).
- **Responsive Behavior:** Sama seperti *Shortcut Layanan*, akan dipindahkan ke paling bawah pada resolusi HP.
- **Spacing:** *Gap* antar item cukup rapat (`gap-3`) dengan garis batas tipis (`border-b pb-3`).
- **Typography:** Judul tautan tebal menengah (`text-sm font-semibold`), Tanggal (`text-xs text-gray-500`).
- **Komponen yang dipertahankan:** Penempatan di bilah sisi (*sidebar*).
- **Komponen yang dimodernisasi:** Penggunaan ruang (*whitespace*) dan konsistensi perataan margin.
- **Alasan perubahan:** Tampilan teks berita pilihan pada web lama sering tampak "menempel" satu sama lain. Garis pemisah akan merapikan ini.

| Item | Penjelasan |
|---|---|
| **Nama** | Berita Pilihan & Populer |
| **Tujuan** | Meningkatkan retensi / rekomendasi klik |
| **Layout** | List Vertikal dengan *divider* |
| **Grid** | Berada di dalam Sidebar (bersama Jam Pelayanan) |
| **Spacing** | py-3 tiap *item* baris, border bottom tipis |
| **Typography** | Teks judul artikel text-sm, font-medium |
| **Warna** | Teks: Brand Primary saat *hover* |
| **Responsive** | Bertumpuk penuh 100% *width* di versi Mobile |
| **Status** | Direvisi (Penambahan *divider* horizontal & tipografi seragam) |

---

## 7. Footer

Penutup navigasi di dasar halaman.

- **Tujuan Section:** Informasi kontak absolut, penegasan hak cipta, dan peta situs (*sitemap*).
- **Komponen yang ada:** Logo, Misi Instansi, Tautan Cepat (Berita, Profil, dsb), Kontak Institusi, Statistik (Jumlah Pengunjung).
- **Struktur Layout:** *Grid Horizontal* (4 Kolom pada versi desktop).
- **Hierarki Informasi:** Identitas/Branding -> Tautan Cepat -> Kontak Utama -> Sosial/Statistik.
- **Responsive Behavior:** 1 Kolom berurutan pada layar HP. Menjadi 2 kolom pada Tablet.
- **Spacing:** *Padding* internal `py-12`, celah antar kolom `gap-8`.
- **Typography:** Label kolom (`text-lg font-bold uppercase`). Isi tautan (`text-sm text-gray-400`).
- **Komponen yang dipertahankan:** Seluruh blok data dan skema warna gelap bawaan.
- **Komponen yang dimodernisasi:** Sistem CSS Grid untuk memastikan tinggi kolom sejajar (*alignment*) dan penggunaan ikon kontak modern (Lucide: Peta, Telepon, Amplop).
- **Alasan perubahan:** Peningkatkan keterbacaan data, khususnya alamat jalan dan nomor telepon yang krusial untuk warga.

| Item | Penjelasan |
|---|---|
| **Nama** | Footer |
| **Tujuan** | Area navigasi sekunder, peta situs & alamat |
| **Layout** | CSS Grid |
| **Grid** | Mobile: 1 Kolom, Tablet: 2 Kolom, Desktop: 4 Kolom |
| **Spacing** | py-12 (luar), gap-8 (antar kolom) |
| **Typography** | Roboto, text-sm untuk daftar tautan. |
| **Warna** | Background: Gray-900 (Gelap). Teks: Gray-400 & Putih |
| **Responsive** | Grid bertransformasi ke *Single Stack* vertikal di *Mobile* |
| **Status** | Dipertahankan (dengan modernisasi *grid layout* & Ikon) |

---

## 8. Homepage Design Guideline (Final Rules)

Untuk memastikan implementasi *High-Fidelity* dari dokumen spesifikasi di atas berjalan mulus tanpa cacat visual, pengembang **wajib** mengikuti pedoman berikut dalam penulisan `className` Tailwind:

1. **Aturan Alignment (Kesejajaran):**
   Seluruh bagian beranda (dari *Header* sampai *Footer*) **wajib** dibungkus atau dibatasi oleh kelas utilitas `.container-main` (`max-w-7xl mx-auto`). Margin luar halaman dipastikan ditarik garis lurus presisi tanpa ada yang condong atau meluber ke tepi (kecuali *background color* layernya).

2. **Aturan Penggunaan Warna:**
   Tidak boleh ada pencampuran warna di luar *Design System*. Gunakan `text-brand-primary` (Biru Disdukcapil) untuk *headline* atau tautan utama. Teks bodi harus menggunakan `text-text-main` (Gray-800).

3. **Aturan Penggunaan Card:**
   Hindari bayangan berat. Semua boks berita menggunakan `.card` dengan `.card-hoverable`. Sudut melengkung dilarang terlalu membulat (terkunci pada `rounded-md` atau 6px).

4. **Aturan Gambar Berita (Rasio Aset):**
   Gambar sangat berpotensi merusak *layout*. Implementasikan *Class* `aspect-[16/9] object-cover w-full` secara religius pada SEMUA elemen *thumbnail* berita (baik di slider *Hero* maupun daftar utama). Ini memaksa gambar dari sumber manapun terpotong sempurna tanpa penyok/distorsi.

5. **Aturan Button (Tombol):**
   Selalu gunakan utilitas `.btn` (seperti `.btn-primary` atau `.btn-secondary`). Jangan menambahkan kustomisasi internal (seperti tebal tipis/padding manual) yang mematahkan konsistensi bentuk utuh tombol di sepanjang halaman beranda.

6. **Aturan Icon:**
   Hanya gunakan `lucide-react`. Ukuran ikon pendukung teks selalu ditetapkan di resolusi `16px` (`size={16}`) atau `18px`, diimbuhi jarak `mr-2` (8px) dari teks di kanannya.

7. **Aturan Whitespace (Ruang Kosong):**
   Dalam *Conservative Redesign*, elegan tidaknya situs pemerintahan bergantung pada ketepatan napas (spasi). Gunakan spasi vertikal minimum `my-12` atau `mb-12` (48px) sebagai pemisah tegas antar *section* raksasa di Beranda (antara Hero -> Daftar Berita).

8. **Aturan Responsive:**
   Jangan merancang layar ganda (*hidden desktop vs hidden mobile*) jika bisa menggunakan satu komponen fleksibel (*flex-wrap / grid*). Pendekatan pembangunan dimulai dari koding HP (`flex-col`), lalu ditambal dengan utilitas `md:` atau `lg:` (misal `md:flex-row`).
