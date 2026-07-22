# STAGING READINESS REPORT

## 1. Overall Status
**PASS — READY FOR STAGING DEPLOYMENT**

Sistem siap dideploy ke lingkungan Staging/Simulasi. Arsitektur kode terpisah dengan bersih antara konfigurasi lingkungan dan aplikasi inti, tidak ada kredensial (*secrets*) yang bocor, serta manajemen persisten file telah teridentifikasi dengan jelas batasan platformnya.

## 2. Recommended Staging Architecture
```text
                 STAGING INTERNET
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼ (HTTPS)                   ▼ (HTTPS)
   PUBLIC FRONTEND              ADMIN FRONTEND
  (Cloudflare Pages / VPS)     (Cloudflare Pages / VPS)
          │                           │
          └─────────────┬─────────────┘
                        │
                        ▼ (HTTPS)
                   BACKEND API
                   Node + Express
                        │
                 ┌──────┴──────┐
                 │             │
                 ▼             ▼
              MySQL       Persistent Files
             (Aiven/VPS)   (/uploads on VPS)
```

## 3. Platform Selection
Memilih platform gratis atau berbiaya rendah untuk Staging memiliki implikasi besar:
*   **Public & Admin Frontend:** Dapat dengan aman (dan disarankan) di-*host* di **Cloudflare Pages**, **Vercel**, atau **Netlify** secara gratis karena bentuknya berupa *static site* (*React SPA*). 
*   **Backend & File Storage:** PaaS gratis seperti **Render / Railway / Fly.io** menggunakan *ephemeral storage* di mana direktori `uploads/` akan HILANG setiap kali aplikasi mati sementara (*sleep*) atau *redeploy*.
*   **Rekomendasi Staging Backend:** Sebuah **VPS (Virtual Private Server)** berbiaya rendah (misal DigitalOcean Droplet $5-$6) sangat direkomendasikan untuk Backend API + MySQL lokal + penyimpanan `uploads/` guna menjamin persistensi gambar/dokumen selama masa UAT Staging berlangsung.

## 4. Environment Configuration
Template konfigurasi `.env.example` sudah sepenuhnya siap. Tim *deployment* hanya perlu menduplikasi dan mengisi variabel `DB_*`, `JWT_*`, serta `VITE_API_URL` sesuai domain *staging*.

## 5. Database Connectivity
Basis data dikonfigurasi melalui sekumpulan *environment variables*. Backend dapat terhubung ke MySQL *remote* (misal: *Aiven*) maupun MySQL lokal secara fleksibel.

## 6. Authentication
Telah divalidasi bahwa pembungkus API (`fetchApi.js`) selalu menyertakan `credentials: 'include'`. Flag keamanan *HttpOnly* dan perlindungan lingkungan *HTTPS* terkonfigurasi secara adaptif.

## 7. CORS
Aman. *Staging backend API* hanya akan merespons domain *Staging Frontend* spesifik yang diatur via `.env`.

## 8. Public Website
Tersedia *fallback URL* apabila terjadi 404 pada URL spesifik. Kompilasi mandiri (`npm run build`) berjalan bersih.

## 9. Admin Panel
Tidak ada token bocor di *LocalStorage*. Penanganan rute *protected* (HOC React) siap mendegradasi secara anggun (*graceful*) jika akses ditolak *backend*.

## 10. File Storage
Gambar dan dokumen divalidasi selalu membentuk URL *portable* (bukan *localhost*) berkat konstruksi string terpadu pada frontend: `${VITE_API_URL}/uploads/...`.

## 11. Persistent Storage
Seperti diuraikan di Poin 3, persistensi *Storage* adalah satu-satunya risiko infrastruktur (*Risk*). Aplikasi bergantung mutlak pada disk *persistent* untuk menyimpan `backend/uploads/`.

## 12. SPA Routing
Telah dievaluasi. Di *hosting* Nginx atau Cloudflare Pages, interaksi *Refresh Browser* pada URL bertingkat seperti `https://PUBLIC_STAGING_DOMAIN/informasi/1` dipastikan mengembalikan layar putih (404) JIKA TIDAK DITAMBAHKAN *Rewrite Rule* (*SPA Fallback*). Dokumentasi pengalihan rute (misal `_redirects` atau `try_files`) wajib diterapkan.

## 13. Security
- API menolak kueri anonim (*Guest*) ke konten *Draft*.
- `authMiddleware` aktif.
- `.gitignore` menyembunyikan `.env` dan `uploads/`.

## 14. Backup & Restore
*Backup & Restore Guide* telah disusun di `docs/BACKUP_AND_RESTORE_GUIDE.md` yang meliputi strategi pencadangan *MySQL Dump* dan kompresi *Uploads Tar*.

## 15. Staging UAT Results
*(Menunggu proses Staging Deployment sebenarnya selesai dilaksanakan)*. Pada *Local Environment*, UAT memberikan rasio kelulusan 100%.

## 16. Issues Found
- *Potential Data Loss* jika menggunakan PaaS Ephemeral gratisan untuk Node.js.
- *Potential 404 Routing* jika SPA Fallback diabaikan penyedia infrastruktur.

## 17. Fixes Applied
- Menerbitkan dokumentasi mitigasi *SPA Fallback*.
- Mengeluarkan larangan keras penggunaan PaaS Gratisan (*ephemeral*) tanpa *Persistent Storage* untuk backend.

## 18. Remaining Risks
Kesalahan konfigurasi *SameSite Cookie*. Jika `API_DOMAIN` dan `ADMIN_DOMAIN` sangat terpisah secara topologi (misal `api-staging.onrender.com` vs `admin-staging.vercel.app`), browser berpotensi memblokir sesi (*Third-Party Cookies blocker*). *Mitigasi:* Gunakan subdomain terpadu di *Cloudflare* untuk seluruh layanan *staging*.

## 19. Production Readiness Gap
| Fitur | Staging | Production |
| :--- | :--- | :--- |
| **Domain** | *Placeholder* (Subdomain Dummy) | Domain Publik Institusi Resmi |
| **Data Database** | *Dummy Data* Simulasi | Impor Skema & Data Sebenarnya |
| **Penyimpanan Uploads** | Boleh menggunakan *Disk Server* Staging lokal | Wajib memiliki *Volume Block Backup* otomatis |
| **Performa (Opsional)** | 1 instances PM2 Node.js | Skalabilitas (Cluster Mode PM2 / Docker) |

---
**KEPUTUSAN AKHIR:**
### OPTION A: READY TO DEPLOY TO STAGING
