# utils/

Folder ini berisi **pure utility functions** — fungsi murni tanpa ketergantungan React.

## Konvensi
- Tidak boleh menggunakan hooks atau komponen React di sini
- Fungsi harus pure dan mudah di-unit test
- Kelompokkan berdasarkan domain (format, string, date, dll.)

## Contoh utils yang akan dibuat
| File | Kegunaan |
|---|---|
| `formatDate.js` | Format tanggal ke Bahasa Indonesia |
| `truncateText.js` | Potong teks panjang dengan elipsis |
| `cn.js` | Wrapper clsx untuk conditional className |
