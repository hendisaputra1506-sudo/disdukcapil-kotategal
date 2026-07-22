# PRODUCTION HARDENING & HANDOVER READINESS AUDIT

## 1. Executive Summary
Sistem secara keseluruhan telah diaudit untuk memastikan portabilitas lingkungan, keamanan tingkat produksi, dan kelayakan *handover*. Arsitektur sistem sudah kokoh dan berbasis pada desain *Single Backend API* dengan *Shared MySQL Database*. Tidak ada kebocoran rahasia (*secrets*) pada *source code*. Beberapa perbaikan minor (Hardening) telah diaplikasikan untuk memisahkan konfigurasi *environment variables*. Sistem kini **READY FOR STAGING**.

## 2. Current Architecture
```text
                         INTERNET
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
      PUBLIC WEBSITE                 ADMIN PANEL
      React + Vite                   React + Vite
     (VITE_API_URL)                 (VITE_API_URL)
             │                             │
             │ GET                         │ CRUD
             │                             │
             └──────────────┬──────────────┘
                            │
                            ▼
                      BACKEND API
                    Node.js + Express
                            │
                  ┌─────────┴─────────┐
                  │                   │
                  ▼                   ▼
               MySQL              /uploads
          Shared Database         File Storage
```

## 3. Database Architecture
Sistem ini dengan sengaja dirancang menggunakan **satu (1) Shared MySQL Database** untuk melayani *Admin Panel* dan *Public Website*.
Alasan arsitektural:
- **Konsistensi Real-time:** Konten yang di-Publish oleh Admin langsung tersedia untuk Publik tanpa penundaan sinkronisasi.
- **Keamanan Melalui API:** Website Publik TIDAK KONEK LANGSUNG ke MySQL. Akses ke tabel `users` dan data *Draft* diblokir dengan ketat oleh *Backend API (optionalAuthMiddleware)*.
- **Isolasi Logis (Logical Isolation):** Alih-alih memisah *database* secara fisik, isolasi dilakukan pada lapisan *Controller* backend.

## 4. Public Frontend Configuration
*   **Lokasi:** `frontend/public`
*   **Portabilitas:** 100%. Komunikasi ke backend dipandu oleh variabel lingkungan `VITE_API_URL`.
*   **Hardcoding:** Tidak ada ekstensi *hardcoded* atau URL statis yang memaksa penggunaan `localhost`.
*   **Perbaikan (Hardening):** `.env.example` telah ditambahkan dengan *placeholder* (`https://API_DOMAIN`).

## 5. Admin Frontend Configuration
*   **Lokasi:** `frontend/admin`
*   **Portabilitas:** 100%. Menggunakan `VITE_API_URL`.
*   **Autentikasi:** Menerapkan `credentials: 'include'` pada pembungkus *fetch* agar *HttpOnly Cookie* selalu dikirim otomatis ke backend. Tidak ada token sensitif yang disimpan di *localStorage*.
*   **Perbaikan (Hardening):** `.env.example` telah ditambahkan dengan *placeholder*.

## 6. Backend Configuration
*   **Lokasi:** `backend`
*   **Portabilitas:** 100%. Semua koneksi database (`DB_HOST`, dll), port, dan URL CORS diatur melalui variabel lingkungan di dalam file `.env`.
*   **Perbaikan (Hardening):** File `backend/.env.example` telah diperbarui untuk menghapus *default value* lokal dan menggantinya dengan *placeholder* (seperti `https://PUBLIC_DOMAIN`) demi mencegah admin lupa mengganti kredensial saat di server *production*.

## 7. File Storage Architecture
*   **Lokasi Penyimpanan:** Fisik di `backend/uploads/` (dibagi menjadi direktori `news`, `banners`, `gallery`, `documents`).
*   **Format DB:** Jalur disimpan secara **relatif** di database (contoh: `/uploads/news/file.jpg`). Ini menjamin gambar tidak akan rusak meskipun *domain API* berubah (sangat portabel).
*   **Siklus Hidup:** Fungsionalitas hapus data (CRUD Delete) secara otomatis mengeksekusi `fs.unlinkSync` untuk menghapus *file* fisik, mencegah penumpukan berkas tak terpakai.

## 8. CORS Configuration
CORS (*Cross-Origin Resource Sharing*) pada backend dikonfigurasi secara ketat dan aman:
*   Tidak pernah menggunakan *wildcard* `*` bersamaan dengan *credentials*.
*   Membaca *Allowed Origins* dari `FRONTEND_ADMIN_URL` dan `FRONTEND_PUBLIC_URL` via *environment variables*.
*   Request ditolak jika *Origin* tidak cocok (kecuali dari perangkat tanpa *origin* seperti agen *mobile*/*curl*).

## 9. Cookie & Authentication Configuration
Sistem autentikasi menggunakan **JWT yang dibungkus dalam HttpOnly Cookie**.
*   `HttpOnly`: Aktif (Mencegah pencurian XSS).
*   `Secure`: Membaca variabel `COOKIE_SECURE` atau diaktifkan paksa jika `NODE_ENV === 'production'`. Wajib menggunakan HTTPS.
*   `SameSite`: Dapat dikonfigurasi melalui `.env` (`lax` atau `none`). Disarankan `lax` jika *frontend* dan *backend* menggunakan satu domain root yang sama (contoh: `tegal.go.id`).

## 10. Database Initialization
Proyek menyediakan 2 skrip Node.js (bukan *migration framework*). Keduanya aman untuk dijalankan kapan saja (Idempotent):
*   **`update_schema.js`:** Berjalan PERTAMA. Membuat *database* `disdukcapil_admin` (jika belum ada), membuat tabel `users`, dan memastikan kolom seperti `password_changed_at` ada.
*   **`prepare_db.js`:** Berjalan KEDUA. Memastikan data *seeding* (seperti `categories`) diisi. Tidak akan merusak baris yang sudah ada.

## 11. Build & Startup Commands
*   **Public Frontend:** `npm install`, `npm run build` (Output di direktori `dist`).
*   **Admin Frontend:** `npm install`, `npm run build` (Output di direktori `dist`).
*   **Backend API:** `npm install`, `npm start` (atau menggunakan `pm2 start src/server.js`).

## 12. Environment Portability
Dapat dipindah antar lingkungan (Lokal → Staging → Production)?
| Component | Local | Staging | Production | Source Code Change Needed? |
| :--- | :--- | :--- | :--- | :--- |
| Public Frontend | Ya | Ya | Ya | **TIDAK** (Hanya `.env`) |
| Admin Frontend | Ya | Ya | Ya | **TIDAK** (Hanya `.env`) |
| Backend | Ya | Ya | Ya | **TIDAK** (Hanya `.env`) |
| Database | Ya | Ya | Ya | **TIDAK** (Gunakan SQL Dump) |
| File Storage | Ya | Ya | Ya | **TIDAK** (Cukup salin folder `uploads`) |
| Authentication | Ya | Ya | Ya | **TIDAK** (Konfigurasi flag via `.env`) |
| CORS | Ya | Ya | Ya | **TIDAK** (Ubah URL via `.env`) |

## 13. Security Readiness
- [x] Tidak ada rahasia/token (*secrets*) *hardcoded* di *repository*.
- [x] File `.env` diabaikan oleh Git (`.gitignore` valid).
- [x] *Password Hash* menggunakan `bcrypt`.
- [x] API Admin dilindungi middleware `authMiddleware`.
- [x] Data *Draft* tidak terekspos ke publik (`optionalAuthMiddleware` aktif).
- [x] Tipe file gambar dan batas ukuran diatur di *uploadMiddleware*.
- [x] *Stack Trace Errors* dinonaktifkan untuk publik.
- [x] Parameter *Database Connection* diparameterisasi (*Prepared Statements* `mysql2/promise`) menangkal *SQL Injection*.

## 14. Handover Readiness
*Project* ini telah dikemas rapi. Namun, untuk serah terima penuh, beberapa panduan tambahan disarankan dibuat oleh pengguna (Tim Disdukcapil):
*   *Deployment Guide* (Sudah ada via blueprint).
*   *Database Setup Guide*.
*   *API Documentation* (Postman Collection).

## 15. Issues Found

| Issue | Severity | Impact | Status |
| :--- | :--- | :--- | :--- |
| **Missing `.env.example`** | Low | Menghambat *Deployment* & Konfigurasi | **RESOLVED** |
| **Hardcoded Default Secrets** | Medium | Admin berpotensi menggunakan token & password default saat di Production | **RESOLVED** |

## 16. Fixes Applied
1.  **Frontend Public & Admin:** Menambahkan `frontend/public/.env.example` dan `frontend/admin/.env.example` yang hanya berisikan `VITE_API_URL=https://API_DOMAIN`.
2.  **Backend:** Memperbarui `backend/.env.example` untuk menetralkan nilai seperti `root`, `localhost`, dan memberikan *placeholder* domain yang bersih.

## 17. Remaining Manual Configuration
Tidak ada kode yang perlu diubah. Semua pengaturan hanya sebatas pemasangan Server DNS, Web Server (Nginx), Let's Encrypt (HTTPS), serta menyetel nilai-nilai rahasia ke dalam `.env` (*Production*).

## 18. Final Readiness Status
**READY FOR STAGING**
