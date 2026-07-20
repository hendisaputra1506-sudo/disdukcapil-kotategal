# Project Architecture Document
**Proyek:** Modernisasi Website Disdukcapil Kota Tegal

Dokumen ini mendefinisikan standar arsitektur proyek, struktur direktori, konvensi kode, dan alur kerja pengembangan bagi seluruh tim pengembang (Frontend & Backend). Dokumen ini merupakan *Source of Truth* operasional pengembangan.

## 1. Project Structure

### Frontend (React + Vite + Tailwind)
- **Framework:** React 19 + Vite.
- **Styling:** Tailwind CSS v4.
- **Routing:** React Router v7.
- **Icons:** Lucide React.
- **Linter:** Oxlint.

### Backend (Node + Express)
- **Environment:** Node.js.
- **Framework:** Express.js.
- **Database:** MySQL.
*(Pengembangan bagian ini murni di-handle oleh Tim Backend)*

## 2. Folder Structure (Frontend)

Seluruh pengerjaan Frontend berpusat pada folder `frontend/src/`.
```
frontend/
├── public/              # Aset statis (favicon, manifest, e-flyer statis)
└── src/
    ├── assets/          # Aset internal (images, logo, local fonts)
    ├── components/      # Komponen React yang reusable
    │   ├── global/      # Komponen layout (Header, Navbar, Footer)
    │   ├── ui/          # Komponen micro/shared (Button, Card, Badge)
    │   └── specific/    # Komponen khusus modul (NewsList, ServiceGrid)
    ├── layouts/         # Komponen pembungkus halaman (RootLayout)
    ├── pages/           # Komponen representasi Halaman penuh
    ├── routes/          # Konfigurasi React Router DOM
    ├── services/        # Logika pemanggilan API / Mock Data fetcher
    ├── utils/           # Fungsi helper murni (formatDate, dll)
    ├── data/            # Penyimpanan Mock Data statis (.json)
    ├── App.jsx          # Entry point utama aplikasi
    └── index.css        # Konfigurasi Tailwind & Global styling
```

## 3. Coding Convention

- **Format File:** Gunakan ekstensi `.jsx` untuk file yang mengandung sintaks JSX, dan `.js` untuk file logika murni.
- **Impor (Imports):** Urutkan import secara hierarkis (Library eksternal -> Komponen absolut/Global -> Komponen relatif/Lokal).
- **Styling:** Dilarang menggunakan *inline-styles* (`style={{...}}`). Gunakan murni *utility classes* dari Tailwind CSS.
- **Props Validation:** Gunakan modul `prop-types` bawaan instalasi untuk memvalidasi *props* pada tiap komponen (karena tidak menggunakan TypeScript).

## 4. Naming Convention

- **Files & Folders Component:** `PascalCase` (contoh: `TopHeader.jsx`, `NewsCard.jsx`).
- **Files Utility/Service/Data:** `camelCase` (contoh: `apiService.js`, `formatDate.js`, `mockNews.json`).
- **Variabel & Fungsi:** `camelCase` (contoh: `const isMobile`, `const fetchNews = () => {}`).
- **Konstanta Global:** `UPPER_SNAKE_CASE` (contoh: `const MAX_ITEMS = 10`).
- **CSS Classes:** Penamaan kelas kustom (jarang dipakai berkat Tailwind) menggunakan `kebab-case`.

## 5. Reusable Components

Komponen harus dibangun secara atomik. Jika sebuah struktur UI diulang lebih dari 1 kali, wajib dipisahkan menjadi komponen dalam direktori `components/ui/` atau `components/shared/`. Rujuk pada Bab *Component Reusability* di spesifikasi High Fidelity untuk memetakan nama komponennya.

## 6. Development Rules

- **Source of Truth:** BRD -> Sitemap -> Design Spec -> Design System -> API Spec -> Wireframe.
- **Frontend Isolation:** Pada tahap awal (Sprint 7-15), Frontend *tidak boleh* bergantung pada API asli yang belum stabil. Wajib menggunakan **Mock Data** lokal.
- **No Direct DOM Manipulation:** Dilarang keras menggunakan `document.querySelector` atau intervensi langsung. Gunakan `useRef` atau manipulasi *state* React untuk mengontrol antarmuka.

## 7. Git Workflow & Branch Strategy

- **Master / Main:** Branch *production-ready*. Kode di sini harus 100% stabil.
- **Dev / Staging:** Branch pra-rilis tempat penggabungan fitur-fitur baru.
- **Feature Branches:** Semua pengerjaan dilakukan pada branch terisolasi dengan penamaan `feature/nama-fitur` (contoh: `feature/sprint-8-global-layout`).
- Penggabungan (Merge) hanya dilakukan setelah inspeksi *linter* (`npm run lint`).

## 8. Sprint Development

Siklus pengembangan mengadopsi model *Agile Sprints*:
- Frontend diisolasi ke dalam rentang *Sprint 7 hingga 16*.
- Setiap *Sprint* memiliki objektif tunggal (contoh: Sprint 10 khusus merakit Homepage statis).
- Pengerjaan tidak boleh lompat ke *Sprint* selanjutnya apabila visualisasi/fungsionalitas target *Sprint* sebelumnya belum presisi.

## 9. Deployment Plan

*(Akan disempurnakan di tahap akhir proyek)*
- Frontend akan di-*build* menjadi bundel statis (menggunakan Vite `npm run build`) di direktori `dist/`.
- Server *Backend* dapat menyajikan bundel statis ini, atau *Frontend* dapat di-*deploy* terpisah pada CDN / layanan *hosting static* (misal Vercel / Nginx) dengan melakukan *proxy pass* ke API *Backend*.