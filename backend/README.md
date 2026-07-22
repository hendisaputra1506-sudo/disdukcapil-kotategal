# Backend API - Disdukcapil Website

Backend API untuk Content Management System (Admin Panel) dan Website Publik Disdukcapil Kota Tegal.

## Teknologi yang Digunakan
* **Node.js**
* **Express.js**
* **JavaScript (CommonJS)**

## Cara Instalasi Dependency
1. Buka terminal di folder `backend`.
2. Jalankan perintah:
   ```bash
   npm install
   ```

## Cara Konfigurasi `.env`
1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
2. Sesuaikan nilai di dalam file `.env` dengan environment lokal Anda.

## Cara Menjalankan Development Server
Gunakan perintah berikut untuk menjalankan server dalam mode development (menggunakan nodemon):
```bash
npm run dev
```

## Cara Menjalankan Production Server
Gunakan perintah berikut untuk menjalankan server dalam mode production:
```bash
npm start
```

## URL Health Check
Untuk memastikan server backend berjalan dengan baik, Anda dapat mengakses:
```
GET /api/health
```
Respons sukses akan mengembalikan JSON:
```json
{
  "success": true,
  "message": "Backend API is running"
}
```
