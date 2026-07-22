const db = require('../config/database');
const path = require('path');
const fs = require('fs');
const { logActivity } = require('../utils/activityLogger');

// 1. GET LIST BANNERS
exports.getBanners = async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT 
        id, 
        title, 
        image_path AS image, 
        status, 
        display_order AS displayOrder, 
        created_at AS createdAt, 
        updated_at AS updatedAt 
      FROM banners
    `;
    const params = [];

    // Filter status
    if (!req.user) {
      // Jika bukan admin (guest), paksa hanya melihat yang active
      query += ' WHERE status = ?';
      params.push('active');
    } else if (status) {
      // Jika admin dan ada filter status
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const [rows] = await db.execute(query, params);

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar banner',
      data: rows
    });
  } catch (error) {
    console.error('GetBanners Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil data banner'
    });
  }
};

// 2. GET BANNER BY ID
exports.getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        id, 
        title, 
        image_path AS image, 
        status, 
        display_order AS displayOrder, 
        created_at AS createdAt, 
        updated_at AS updatedAt 
      FROM banners 
      WHERE id = ?
    `;

    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Banner tidak ditemukan'
      });
    }

    const item = rows[0];

    // Filter visibility: jika bukan admin (guest) dan status bukan active
    if (!req.user && item.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Banner tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('GetBannerById Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil detail banner'
    });
  }
};

// 3. CREATE BANNER
exports.createBanner = async (req, res) => {
  try {
    const { title, status, display_order, displayOrder } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Judul banner wajib diisi' });
    }
    if (title.length > 255) {
      return res.status(400).json({ success: false, message: 'Judul banner maksimal 255 karakter' });
    }

    const bannerStatus = status || 'active';
    if (!['active', 'inactive'].includes(bannerStatus)) {
      return res.status(400).json({ success: false, message: 'Status banner harus active atau inactive' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Gambar banner wajib diunggah' });
    }

    const orderValue = parseInt(display_order !== undefined ? display_order : displayOrder, 10) || 0;
    const imagePath = `/uploads/banners/${req.file.filename}`;

    const insertQuery = `
      INSERT INTO banners (title, image_path, status, display_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(insertQuery, [
      title.trim(),
      imagePath,
      bannerStatus,
      orderValue
    ]);

    const bannerId = result.insertId;

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'CREATE', 'BANNER', bannerId, `Menambahkan banner: "${title.trim()}"`);

    res.status(201).json({
      success: true,
      message: 'Banner berhasil dibuat',
      data: {
        id: bannerId,
        title: title.trim(),
        image: imagePath,
        status: bannerStatus,
        displayOrder: orderValue
      }
    });

  } catch (error) {
    console.error('CreateBanner Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat membuat banner'
    });
  }
};

// 4. UPDATE BANNER
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, display_order, displayOrder } = req.body;

    const [existingRows] = await db.execute('SELECT * FROM banners WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Banner tidak ditemukan' });
    }

    const currentBanner = existingRows[0];

    const updatedTitle = title !== undefined ? title.trim() : currentBanner.title;
    const updatedStatus = status !== undefined ? status : currentBanner.status;
    const rawOrder = display_order !== undefined ? display_order : displayOrder;
    const updatedOrder = rawOrder !== undefined ? parseInt(rawOrder, 10) : currentBanner.display_order;

    if (!updatedTitle) {
      return res.status(400).json({ success: false, message: 'Judul banner tidak boleh kosong' });
    }
    if (!['active', 'inactive'].includes(updatedStatus)) {
      return res.status(400).json({ success: false, message: 'Status banner harus active atau inactive' });
    }

    let updatedImagePath = currentBanner.image_path;

    // Jika gambar baru diunggah
    if (req.file) {
      updatedImagePath = `/uploads/banners/${req.file.filename}`;

      // Hapus gambar lama dari disk
      if (currentBanner.image_path) {
        const oldRelativePath = currentBanner.image_path.replace(/^\/uploads\/banners\//, '');
        const oldFullPath = path.join(__dirname, '../../uploads/banners', oldRelativePath);
        if (fs.existsSync(oldFullPath)) {
          try {
            fs.unlinkSync(oldFullPath);
          } catch (unlinkErr) {
            console.error('⚠️ Gagal menghapus gambar banner lama:', unlinkErr.message);
          }
        }
      }
    }

    const updateQuery = `
      UPDATE banners 
      SET title = ?, image_path = ?, status = ?, display_order = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await db.execute(updateQuery, [
      updatedTitle,
      updatedImagePath,
      updatedStatus,
      updatedOrder,
      id
    ]);

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'UPDATE', 'BANNER', id, `Mengubah banner: "${updatedTitle}"`);

    res.status(200).json({
      success: true,
      message: 'Banner berhasil diperbarui',
      data: {
        id: parseInt(id, 10),
        title: updatedTitle,
        image: updatedImagePath,
        status: updatedStatus,
        displayOrder: updatedOrder
      }
    });

  } catch (error) {
    console.error('UpdateBanner Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui banner'
    });
  }
};

// 5. DELETE BANNER
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const [existingRows] = await db.execute('SELECT * FROM banners WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Banner tidak ditemukan' });
    }

    const bannerToDelete = existingRows[0];

    // Hapus Record dari DB
    await db.execute('DELETE FROM banners WHERE id = ?', [id]);

    // Hapus file fisik dari disk
    if (bannerToDelete.image_path) {
      const relativeFileName = bannerToDelete.image_path.replace(/^\/uploads\/banners\//, '');
      const fullFilePath = path.join(__dirname, '../../uploads/banners', relativeFileName);
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath);
        } catch (unlinkErr) {
          console.error('⚠️ Gagal menghapus file gambar banner fisik:', unlinkErr.message);
        }
      }
    }

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'DELETE', 'BANNER', id, `Menghapus banner: "${bannerToDelete.title}"`);

    res.status(200).json({
      success: true,
      message: 'Banner berhasil dihapus'
    });

  } catch (error) {
    console.error('DeleteBanner Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menghapus banner'
    });
  }
};
