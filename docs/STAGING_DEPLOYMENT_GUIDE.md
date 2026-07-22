# STAGING DEPLOYMENT GUIDE

## 1. Prerequisites
- Server (VPS disarankan, contoh: DigitalOcean, Hetzner, Vultr) dengan minimal 1GB RAM.
- OS: Ubuntu 22.04 / 24.04 LTS
- Node.js (v18.x atau v20.x)
- MySQL 8.x
- Git
- Nginx
- Akses domain untuk 3 *subdomains* (Public, Admin, API).

## 2. Backend Setup
1. **Clone & Install:**
   ```bash
   git clone <repo_url> disdukcapil
   cd disdukcapil/backend
   npm install
   ```
2. **Environment Configuration:**
   Salin `.env.example` ke `.env` dan konfigurasikan dengan kredensial database staging dan URL staging.
3. **Startup Command:**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "disdukcapil-backend"
   pm2 save
   pm2 startup
   ```

## 3. Database Setup
Di server MySQL staging:
1. Buat database dan user:
   ```sql
   CREATE DATABASE IF NOT EXISTS disdukcapil_admin;
   CREATE USER 'staging_user'@'localhost' IDENTIFIED BY 'Staging_Passw0rd!';
   GRANT ALL PRIVILEGES ON disdukcapil_admin.* TO 'staging_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
2. Impor struktur *database* dari SQL dump lokal (karena `news`, `banners`, `gallery`, `documents` tidak otomatis terbuat di skrip inisialisasi).
3. Inisialisasi tambahan via Backend:
   ```bash
   cd backend
   node src/config/update_schema.js
   node src/config/prepare_db.js
   ```

## 4. File Storage
Berkas fisik disimpan secara langsung di dalam direktori `backend/uploads/`.
*   **Persyaratan Persistensi:** *Staging platform* harus memiliki *Persistent Disk*. Platform PaaS gratis seperti Render (Free Tier) atau Heroku akan menghapus direktori ini setiap kali *server sleep* atau di-*deploy* ulang. Jika VPS digunakan, direktori ini dipertahankan aman di disk.
*   **Hak Akses:** Pastikan direktori dapat ditulis oleh proses Node.js (`chmod 755 -R uploads/`).
*   **Backup:** Lihat `BACKUP_AND_RESTORE_GUIDE.md`.

## 5. Public Frontend
1. **Instalasi & Build:**
   ```bash
   cd frontend/public
   npm install
   npm run build
   ```
2. **Environment Variable (`.env.production`):**
   ```env
   VITE_API_URL=https://API_STAGING_DOMAIN
   ```
3. **Output Directory:** Hasil build berada di `dist/`. Pindahkan ini ke `/var/www/public_staging` dan arahkan *Virtual Host* Nginx ke direktori tersebut.
4. **SPA Fallback:** Di Nginx, pastikan ada aturan: `try_files $uri $uri/ /index.html;`.

## 6. Admin Frontend
1. **Instalasi & Build:**
   ```bash
   cd frontend/admin
   npm install
   npm run build
   ```
2. **Environment Variable (`.env.production`):**
   ```env
   VITE_API_URL=https://API_STAGING_DOMAIN
   ```
3. **Output Directory:** Hasil build berada di `dist/`. Pindahkan ke `/var/www/admin_staging`.
4. **SPA Fallback:** Nginx: `try_files $uri $uri/ /index.html;`.

## 7. CORS
Pastikan `backend/.env` mencantumkan origin staging secara tepat:
```env
FRONTEND_PUBLIC_URL=https://PUBLIC_STAGING_DOMAIN
FRONTEND_ADMIN_URL=https://ADMIN_STAGING_DOMAIN
```

## 8. Authentication
*   **HttpOnly Cookie:** Mencegah XSS.
*   **Secure Cookie:** Aktif secara otomatis di `NODE_ENV=production`. HTTPS *wajib* dipasang di *Staging API*.
*   **SameSite:** Disarankan `.env` menggunakan `COOKIE_SAME_SITE=lax`. Jika domain Admin berbeda root dengan API, ubah menjadi `none` (dengan `Secure: true`).
*   **Credentials Include:** *Frontend* sudah dikonfigurasi mengirim kredensial pada `fetchApi.js`.

## 9. Verification
- Buka `https://PUBLIC_STAGING_DOMAIN`. Pastikan *loading* berhasil.
- Buka `https://ADMIN_STAGING_DOMAIN`. Lakukan *Login*, buat *News* dengan gambar.
- Buka `https://PUBLIC_STAGING_DOMAIN/informasi`. Pastikan *News* dan gambar termuat dengan baik.
- Lakukan *Restart* pada *Backend* API (PM2 restart). Pastikan gambar yang tadi diunggah tidak hilang.
