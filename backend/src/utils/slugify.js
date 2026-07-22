/**
 * Utility untuk membuat slug dari judul berita
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Ganti spasi dengan -
    .replace(/[^\w\-]+/g, '')       // Hapus karakter non-alphanumeric selain -
    .replace(/\-\-+/g, '-')         // Ganti ganda - dengan single -
    .replace(/^-+/, '')             // Hapus - di awal string
    .replace(/-+$/, '');            // Hapus - di akhir string
}

/**
 * Memastikan slug unik di dalam tabel news
 * @param {Object} db - Koneksi database/pool MySQL
 * @param {string} title - Judul berita
 * @param {number|null} currentId - ID berita saat ini (untuk abaikan self saat update)
 */
async function generateUniqueSlug(db, title, currentId = null) {
  const baseSlug = slugify(title) || 'berita';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let query = 'SELECT id FROM news WHERE slug = ?';
    const params = [slug];

    if (currentId) {
      query += ' AND id != ?';
      params.push(currentId);
    }

    const [rows] = await db.execute(query, params);

    if (rows.length === 0) {
      return slug; // Slug unik ditemukan
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

module.exports = {
  slugify,
  generateUniqueSlug
};
