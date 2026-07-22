# BACKUP AND RESTORE GUIDE (STAGING)

*PERINGATAN: Dokumen ini disusun khusus untuk lingkungan Staging / Simulasi. Jangan gunakan data produksi nyata pada tahap ini untuk menghindari kebocoran data sensitif.*

## 1. Arsitektur Backup
Penyimpanan aplikasi ini terdiri dari 2 (dua) pilar utama yang wajib disinkronisasi saat pencadangan:
1. **MySQL Database** (`disdukcapil_admin`)
2. **Uploads Directory** (`backend/uploads/`)

Keduanya harus dibackup secara berkala.

## 2. Prosedur Backup (Staging)

### A. MySQL Backup
Gunakan perintah `mysqldump` untuk menghasilkan berkas SQL:
```bash
mysqldump -u staging_user -p disdukcapil_admin > /path/to/backup/db_staging_$(date +%F).sql
```
*Frekuensi Staging:* Mingguan atau sebelum pengujian destruktif UAT.

### B. Uploads Backup
Gunakan `tar` untuk mengompresi direktori unggahan fisik:
```bash
cd /path/to/disdukcapil/backend
tar -czvf /path/to/backup/uploads_staging_$(date +%F).tar.gz uploads/
```
*Frekuensi Staging:* Mingguan atau saat akan me-*redeploy* server.

## 3. Prosedur Restore (Staging)

### A. MySQL Restore
Jika database *staging* rusak atau dihapus secara tak sengaja:
```bash
# Pastikan database telah dibuat
mysql -u staging_user -p -e "CREATE DATABASE IF NOT EXISTS disdukcapil_admin;"

# Kembalikan struktur dan data
mysql -u staging_user -p disdukcapil_admin < /path/to/backup/db_staging_YYYY-MM-DD.sql
```

### B. Uploads Restore
Jika direktori berkas *staging* hilang (misal akibat pergantian instance VPS):
```bash
cd /path/to/disdukcapil/backend
# Hapus direktori uploads lama jika masih ada residu
rm -rf uploads/

# Ekstrak arsip backup
tar -xzvf /path/to/backup/uploads_staging_YYYY-MM-DD.tar.gz

# Pastikan permission aman
chmod -R 755 uploads/
```

## 4. Retensi
Di lingkungan *staging*, disarankan menyimpan 3 versi cadangan terbaru (Rotasi mingguan). Berkas cadangan yang melampaui batas ini dapat dihapus untuk menghemat ruang disk VPS.
