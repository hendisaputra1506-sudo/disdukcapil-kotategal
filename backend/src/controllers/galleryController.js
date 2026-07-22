const db = require('../config/database');
const path = require('path');
const fs = require('fs');
const { logActivity } = require('../utils/activityLogger');

// 1. GET GALLERY LIST (PAGINATION, SEARCH & CATEGORY FILTER)
exports.getGalleryList = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { search, category } = req.query;

    let whereConditions = ["c.type = 'gallery'"];
    let params = [];

    // Search Filter
    if (search && search.trim() !== '') {
      whereConditions.push('g.title LIKE ?');
      params.push(`%${search.trim()}%`);
    }

    // Category Filter (support ID or Name)
    if (category) {
      if (!isNaN(category)) {
        whereConditions.push('g.category_id = ?');
        params.push(parseInt(category, 10));
      } else {
        whereConditions.push('c.name = ?');
        params.push(category);
      }
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Count Query
    const countSql = `
      SELECT COUNT(*) as total 
      FROM galleries g 
      JOIN categories c ON g.category_id = c.id 
      ${whereClause}
    `;
    const [countRows] = await db.execute(countSql, params);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit) || 1;

    // Data Query
    const dataSql = `
      SELECT 
        g.id, 
        g.title, 
        g.image_path AS image, 
        g.category_id AS categoryId, 
        c.name AS categoryName, 
        g.created_at AS createdAt, 
        g.updated_at AS updatedAt
      FROM galleries g
      JOIN categories c ON g.category_id = c.id
      ${whereClause}
      ORDER BY g.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // mysql2 limit dan offset harus dikirim sebagai integer (number)
    const [rows] = await db.query(dataSql, [...params, limit, offset]);

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('GetGalleryList Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil data galeri'
    });
  }
};

// 2. GET GALLERY BY ID
exports.getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        g.id, 
        g.title, 
        g.image_path AS image, 
        g.category_id AS categoryId, 
        c.name AS categoryName, 
        g.created_at AS createdAt, 
        g.updated_at AS updatedAt
      FROM galleries g
      JOIN categories c ON g.category_id = c.id
      WHERE g.id = ? AND c.type = 'gallery'
    `;

    const [rows] = await db.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Galeri tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('GetGalleryById Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil detail galeri'
    });
  }
};

// Helper internal: Validasi Kategori Gallery
async function validateGalleryCategory(categoryId) {
  if (!categoryId) return false;
  const [rows] = await db.execute('SELECT id, type FROM categories WHERE id = ?', [categoryId]);
  if (rows.length === 0) return false;
  return rows[0].type === 'gallery';
}

// 3. CREATE GALLERY
exports.createGallery = async (req, res) => {
  try {
    const { title, category_id, categoryId } = req.body;
    const catId = category_id || categoryId;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Judul galeri wajib diisi' });
    }
    if (title.length > 255) {
      return res.status(400).json({ success: false, message: 'Judul galeri maksimal 255 karakter' });
    }

    if (!catId) {
      return res.status(400).json({ success: false, message: 'Kategori galeri wajib dipilih' });
    }

    // Validasi Kategori Galeri
    const isValidCategory = await validateGalleryCategory(catId);
    if (!isValidCategory) {
      return res.status(400).json({
        success: false,
        message: 'Kategori yang dipilih tidak valid atau bukan kategori galeri'
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Gambar galeri wajib diunggah' });
    }

    const imagePath = `/uploads/gallery/${req.file.filename}`;

    const insertSql = `
      INSERT INTO galleries (title, category_id, image_path, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(insertSql, [
      title.trim(),
      parseInt(catId, 10),
      imagePath
    ]);

    const galleryId = result.insertId;

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'CREATE', 'GALLERY', galleryId, `Menambahkan galeri: "${title.trim()}"`);

    res.status(201).json({
      success: true,
      message: 'Galeri berhasil dibuat',
      data: {
        id: galleryId,
        title: title.trim(),
        categoryId: parseInt(catId, 10),
        image: imagePath
      }
    });

  } catch (error) {
    console.error('CreateGallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat membuat galeri'
    });
  }
};

// 4. UPDATE GALLERY
exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category_id, categoryId } = req.body;

    const [existingRows] = await db.execute('SELECT * FROM galleries WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Galeri tidak ditemukan' });
    }

    const currentGallery = existingRows[0];

    const updatedTitle = title !== undefined ? title.trim() : currentGallery.title;
    const rawCatId = category_id || categoryId;
    const updatedCatId = rawCatId !== undefined ? parseInt(rawCatId, 10) : currentGallery.category_id;

    if (!updatedTitle) {
      return res.status(400).json({ success: false, message: 'Judul galeri tidak boleh kosong' });
    }

    // Validasi Kategori jika diisi/diubah
    if (rawCatId !== undefined) {
      const isValidCategory = await validateGalleryCategory(updatedCatId);
      if (!isValidCategory) {
        return res.status(400).json({
          success: false,
          message: 'Kategori yang dipilih tidak valid atau bukan kategori galeri'
        });
      }
    }

    let updatedImagePath = currentGallery.image_path;

    // Jika gambar baru diunggah
    if (req.file) {
      updatedImagePath = `/uploads/gallery/${req.file.filename}`;

      // Hapus gambar lama dari disk
      if (currentGallery.image_path) {
        const oldRelativePath = currentGallery.image_path.replace(/^\/uploads\/gallery\//, '');
        const oldFullPath = path.join(__dirname, '../../uploads/gallery', oldRelativePath);
        if (fs.existsSync(oldFullPath)) {
          try {
            fs.unlinkSync(oldFullPath);
          } catch (unlinkErr) {
            console.error('⚠️ Gagal menghapus gambar galeri lama:', unlinkErr.message);
          }
        }
      }
    }

    const updateSql = `
      UPDATE galleries 
      SET title = ?, category_id = ?, image_path = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await db.execute(updateSql, [
      updatedTitle,
      updatedCatId,
      updatedImagePath,
      id
    ]);

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'UPDATE', 'GALLERY', id, `Mengubah galeri: "${updatedTitle}"`);

    res.status(200).json({
      success: true,
      message: 'Galeri berhasil diperbarui',
      data: {
        id: parseInt(id, 10),
        title: updatedTitle,
        categoryId: updatedCatId,
        image: updatedImagePath
      }
    });

  } catch (error) {
    console.error('UpdateGallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui galeri'
    });
  }
};

// 5. DELETE GALLERY
exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const [existingRows] = await db.execute('SELECT * FROM galleries WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Galeri tidak ditemukan' });
    }

    const galleryToDelete = existingRows[0];

    // Hapus dari DB
    await db.execute('DELETE FROM galleries WHERE id = ?', [id]);

    // Hapus file gambar dari disk
    if (galleryToDelete.image_path) {
      const relativeFileName = galleryToDelete.image_path.replace(/^\/uploads\/gallery\//, '');
      const fullFilePath = path.join(__dirname, '../../uploads/gallery', relativeFileName);
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath);
        } catch (unlinkErr) {
          console.error('⚠️ Gagal menghapus file gambar galeri fisik:', unlinkErr.message);
        }
      }
    }

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'DELETE', 'GALLERY', id, `Menghapus galeri: "${galleryToDelete.title}"`);

    res.status(200).json({
      success: true,
      message: 'Galeri berhasil dihapus'
    });

  } catch (error) {
    console.error('DeleteGallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menghapus galeri'
    });
  }
};
