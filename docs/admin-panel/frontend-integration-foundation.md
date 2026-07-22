# FRONTEND INTEGRATION FOUNDATION DOCUMENTATION

**Proyek:** Website Publik & Admin Panel Disdukcapil Kota Tegal  
**Fokus:** Arsitektur Fondasi Integrasi Frontend Admin Panel ke Backend REST API  
**Status:** `VERIFIED & OPERATIONAL (100% READY)`  
**Tanggal:** 22 Juli 2026

---

## 1. Architecture Overview

Fondasi integrasi antara **React Admin Panel** dengan **Express.js REST API** dibangun berlandaskan prinsip **Security-First**, **Centralized Data Fetching**, dan **HttpOnly Cookie Authentication**.

```text
               ┌─────────────────────────────┐
               │    REACT ADMIN PANEL (VITE) │
               └──────────────┬──────────────┘
                              │
                              ▼
               ┌─────────────────────────────┐
               │   AuthContext & Protected   │
               │   Route (useAuth Hook)      │
               └──────────────┬──────────────┘
                              │
                              ▼
               ┌─────────────────────────────┐
               │   Centralized fetchApi      │
               │  (credentials: 'include')   │
               └──────────────┬──────────────┘
                              │
                    HTTP Cookie (adminToken)
                              │
                              ▼
               ┌─────────────────────────────┐
               │  NODE.JS + EXPRESS BACKEND  │
               │  authMiddleware & Endpoints │
               └─────────────────────────────┘
```

---

## 2. API Service Layer (`api.js`)

Centralized HTTP client terletak pada `frontend/admin/src/services/api.js`.

### Fitur Utama `fetchApi(endpoint, options)`:
1. **Dynamic Base URL:** `import.meta.env.VITE_API_URL || 'http://localhost:3000'`
2. **Strict Session Inclusion:** Memasang `credentials: 'include'` pada setiap HTTP request untuk pengiriman otomatis Cookie HttpOnly.
3. **FormData Boundary Auto-Resolution:** Jika `options.body` merupakan instance dari `FormData`, header `Content-Type: application/json` secara otomatis dihapus agar peramban membuat multipart boundary header yang valid (`multipart/form-data; boundary=...`).
4. **Global 401 Interceptor:** Menginisiasi `CustomEvent('auth:unauthorized')` ke `window` untuk mereset state autentikasi React saat token/sesi kadaluarsa.

---

## 3. Authentication Flow (`AuthContext.jsx`)

* **Token Isolation:** Tidak ada JWT yang disimpan di `localStorage` maupun `sessionStorage`.
* **Session Check (`checkAuth`):** Dipanggil saat provider pertama kali di-mount untuk memverifikasi sesi melalui `GET /api/auth/me`.
* **Login Flow:** Memanggil `POST /api/auth/login`. Server menetapkan Cookie `adminToken` (`HttpOnly`, `SameSite=Lax`), dan frontend memperbarui `user` state.
* **Logout Flow:** Memanggil `POST /api/auth/logout`. Server membersihkan cookie, dan frontend mereset `user` state ke `null`.

---

## 4. Protected Route Guard (`ProtectedRoute.jsx`)

* Seluruh halaman administratif (seperti `/dashboard`, `/news`, `/banner`, `/gallery`, `/documents`, `/account/change-password`, `/settings`) dibungkus oleh `<ProtectedRoute>`.
* Apabila `loading === true`, menampilkan spinner pemuatan sesi.
* Apabila `loading === false` dan `user === null`, otomatis mengarahkan peramban ke `/login`.

---

## 5. HTTP Error Handling Matrix

| HTTP Status Code | Frontend Behavioral Response |
| :--- | :--- |
| **401 Unauthorized** | Memicu event `auth:unauthorized`, mereset `user` state, dan mengarahkan pengguna ke `/login`. |
| **403 Forbidden** | Menampilkan banner alert `"Anda tidak memiliki izin untuk melakukan tindakan ini."` (Tanpa mereset sesi). |
| **404 Not Found** | Menampilkan pesan error `"Resource / Data tidak ditemukan."` |
| **400 / 422 Bad Request** | Menampilkan pesan error validasi spesifik yang dikirim oleh backend API. |
| **429 Too Many Requests** | Menampilkan alert `"Terlalu banyak percobaan. Silakan coba kembali beberapa saat lagi."` |
| **500 Internal Server Error** | Menampilkan pesan generik `"Terjadi kesalahan pada server. Silakan coba kembali."` |

---

## 6. FormData Handling Standards

Pengiriman file (thumbnail, banner, gallery image, document) WAJIB menggunakan `FormData` tanpa menyetel header `Content-Type`:

```javascript
// CONTOH POLA PENGGUNAAN FORMDATA
const formData = new FormData();
formData.append('title', title);
formData.append('file', selectedFile);

const response = await fetchApi('/api/documents', {
  method: 'POST',
  body: formData
});
```

---

## 7. Security Rules Checklist

- [x] Sesi login menggunakan HttpOnly Cookie `adminToken`.
- [x] Zero JWT leakage pada `localStorage` atau `sessionStorage`.
- [x] Flag `credentials: 'include'` aktif pada seluruh endpoint.
- [x] Boundary FormData tidak di-hardcode.
- [x] `ProtectedRoute` melindungi seluruh route admin.
- [x] Logout memanggil API backend `POST /api/auth/logout`.
- [x] Ubah password menginvalidasi sesi via backend (`password_changed_at`).
