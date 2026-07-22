const db = require('../config/database');
const path = require('path');
const fs = require('fs');
const { generateUniqueSlug } = require('../utils/slugify');
const { logActivity } = require('../utils/activityLogger');

// 1. GET LIST NEWS (Mendapatkan daftar berita dengan pagination, search, filter kategori & status)
exports.getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { search, category, status } = req.query;

    let whereClauses = ["c.type = 'news'"];
    let queryParams = [];

    // Filter status
    if (!req.user) {
      // Jika bukan admin (guest), paksa hanya melihat yang published
      whereClauses.push("n.status = 'published'");
    } else if (status) {
      // Jika admin dan ada filter status
      whereClauses.push("n.status = ?");
      queryParams.push(status);
    }

    // Filter Kategori (bisa nama kategori atau ID kategori)
    if (category) {
      if (!isNaN(category)) {
        whereClauses.push("c.id = ?");
        queryParams.push(parseInt(category, 10));
      } else {
        whereClauses.push("LOWER(c.name) = LOWER(?)");
        queryParams.push(category.trim());
      }
    }

    // Filter Pencarian (Judul / Content)
    if (search && search.trim() !== '') {
      whereClauses.push("(n.title LIKE ? OR n.content LIKE ? OR n.excerpt LIKE ?)");
      const searchTerm = `%${search.trim()}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Hitung total record
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM news n 
      JOIN categories c ON n.category_id = c.id 
      ${whereSql}
    `;
    const [countRows] = await db.execute(countQuery, queryParams);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit) || 1;

    // Ambil data berita
    const selectQuery = `
      SELECT 
        n.id, 
        n.title, 
        n.slug, 
        n.excerpt, 
        n.content, 
        n.thumbnail_path AS thumbnail, 
        n.status, 
        n.published_at AS publishedAt, 
        n.created_at AS createdAt, 
        n.updated_at AS updatedAt,
        c.id AS category_id,
        c.name AS category_name
      FROM news n
      JOIN categories c ON n.category_id = c.id
      ${whereSql}
      ORDER BY n.created_at DESC
      LIMIT ? OFFSET ?
    `;

    // mysql2 limit dan offset harus dikirim sebagai integer
    const [newsRows] = await db.query(selectQuery, [...queryParams, limit, offset]);

    // Format data response sesuai spesifikasi API
    const formattedData = newsRows.map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      thumbnail: item.thumbnail,
      category: item.category_name,
      categoryId: item.category_id,
      status: item.status,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar berita',
      data: formattedData,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('GetNews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil data berita',
      errors: []
    });
  }
};

// 2. GET DETAIL NEWS BY ID
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        n.id, 
        n.title, 
        n.slug, 
        n.excerpt, 
        n.content, 
        n.thumbnail_path AS thumbnail, 
        n.status, 
        n.published_at AS publishedAt, 
        n.created_at AS createdAt, 
        n.updated_at AS updatedAt,
        c.id AS category_id,
        c.name AS category_name
      FROM news n
      JOIN categories c ON n.category_id = c.id
      WHERE n.id = ? AND c.type = 'news'
    `;

    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    const item = rows[0];

    // Filter visibility: jika bukan admin (guest) dan status bukan published
    if (!req.user && item.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        thumbnail: item.thumbnail,
        category: item.category_name,
        categoryId: item.category_id,
        status: item.status,
        publishedAt: item.publishedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }
    });

  } catch (error) {
    console.error('GetNewsById Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil detail berita'
    });
  }
};

// 3. CREATE NEWS (Tambah Berita Baru)
exports.createNews = async (req, res) => {
  try {
    const { title, excerpt, content, category, category_id, status, publishedAt } = req.body;

    // Validasi Field Wajib
    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Judul berita wajib diisi' });
    }
    if (title.length > 255) {
      return res.status(400).json({ success: false, message: 'Judul berita maksimal 255 karakter' });
    }
    if (!content || content.trim() === '') {
      return res.status(400).json({ success: false, message: 'Konten berita wajib diisi' });
    }

    const targetCategory = category_id || category;
    if (!targetCategory) {
      return res.status(400).json({ success: false, message: 'Kategori berita wajib dipilih' });
    }

    // Validasi Status
    const newsStatus = status || 'draft';
    if (!['draft', 'published'].includes(newsStatus)) {
      return res.status(400).json({ success: false, message: 'Status berita harus draft atau published' });
    }

    // Validasi File Thumbnail
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File thumbnail berita wajib diunggah' });
    }

    // Verifikasi Kategori di Database (Harus bertipe 'news')
    let catQuery = 'SELECT id, name, type FROM categories WHERE (id = ? OR LOWER(name) = LOWER(?)) AND type = \'news\'';
    const [catRows] = await db.execute(catQuery, [targetCategory, targetCategory]);

    if (catRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Kategori yang dipilih tidak valid atau bukan kategori berita'
      });
    }

    const validCategory = catRows[0];

    // Generate Unique Slug
    const slug = await generateUniqueSlug(db, title);

    // Formating Path Thumbnail
    const thumbnailPath = `/uploads/news/${req.file.filename}`;

    // Tentukan waktu publikasi
    let finalPublishedAt = null;
    if (newsStatus === 'published') {
      finalPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
    }

    // Simpan ke Database
    const insertQuery = `
      INSERT INTO news (category_id, title, slug, excerpt, content, thumbnail_path, status, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(insertQuery, [
      validCategory.id,
      title.trim(),
      slug,
      excerpt ? excerpt.trim() : null,
      content.trim(),
      thumbnailPath,
      newsStatus,
      finalPublishedAt
    ]);

    const newsId = result.insertId;

    // Catat ke Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'CREATE', 'NEWS', newsId, `Menambahkan berita baru: "${title.trim()}"`);

    res.status(201).json({
      success: true,
      message: 'Berita berhasil dibuat',
      data: {
        id: newsId,
        title: title.trim(),
        slug,
        excerpt: excerpt ? excerpt.trim() : null,
        content: content.trim(),
        thumbnail: thumbnailPath,
        category: validCategory.name,
        categoryId: validCategory.id,
        status: newsStatus,
        publishedAt: finalPublishedAt
      }
    });

  } catch (error) {
    console.error('CreateNews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat membuat berita'
    });
  }
};

// 4. UPDATE NEWS (Ubah Berita)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, category_id, status, publishedAt } = req.body;

    // Cek Keberadaan Berita
    const [existingRows] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
    }

    const currentNews = existingRows[0];

    // Data Baru / Fallback Data Lama
    const updatedTitle = title !== undefined ? title.trim() : currentNews.title;
    const updatedContent = content !== undefined ? content.trim() : currentNews.content;
    const updatedExcerpt = excerpt !== undefined ? excerpt.trim() : currentNews.excerpt;
    const updatedStatus = status !== undefined ? status : currentNews.status;

    // Validasi Title & Content jika diubah
    if (!updatedTitle) {
      return res.status(400).json({ success: false, message: 'Judul berita tidak boleh kosong' });
    }
    if (updatedTitle.length > 255) {
      return res.status(400).json({ success: false, message: 'Judul berita maksimal 255 karakter' });
    }
    if (!updatedContent) {
      return res.status(400).json({ success: false, message: 'Konten berita tidak boleh kosong' });
    }

    // Validasi Status
    if (!['draft', 'published'].includes(updatedStatus)) {
      return res.status(400).json({ success: false, message: 'Status berita harus draft atau published' });
    }

    // Verifikasi Kategori jika diubah
    let newCategoryId = currentNews.category_id;
    const targetCategory = category_id || category;
    
    if (targetCategory) {
      const [catRows] = await db.execute(
        'SELECT id, name, type FROM categories WHERE (id = ? OR LOWER(name) = LOWER(?)) AND type = \'news\'',
        [targetCategory, targetCategory]
      );
      if (catRows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Kategori yang dipilih tidak valid atau bukan kategori berita'
        });
      }
      newCategoryId = catRows[0].id;
    }

    // Update Slug jika Judul Berubah
    let updatedSlug = currentNews.slug;
    if (updatedTitle !== currentNews.title) {
      updatedSlug = await generateUniqueSlug(db, updatedTitle, id);
    }

    // Penanganan Thumbnail (Jika ada file baru yang diunggah)
    let updatedThumbnailPath = currentNews.thumbnail_path;
    if (req.file) {
      updatedThumbnailPath = `/uploads/news/${req.file.filename}`;

      // Hapus file thumbnail lama jika ada di disk
      if (currentNews.thumbnail_path) {
        const oldRelativePath = currentNews.thumbnail_path.replace(/^\/uploads\/news\//, '');
        const oldFullPath = path.join(__dirname, '../../uploads/news', oldRelativePath);
        if (fs.existsSync(oldFullPath)) {
          try {
            fs.unlinkSync(oldFullPath);
          } catch (unlinkErr) {
            console.error('⚠️ Gagal menghapus thumbnail lama:', unlinkErr.message);
          }
        }
      }
    }

    // Penanganan Published At
    let updatedPublishedAt = currentNews.published_at;
    if (updatedStatus === 'published') {
      if (!currentNews.published_at || publishedAt) {
        updatedPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
      }
    } else if (updatedStatus === 'draft') {
      updatedPublishedAt = null;
    }

    // Execute UPDATE Query
    const updateQuery = `
      UPDATE news 
      SET category_id = ?, title = ?, slug = ?, excerpt = ?, content = ?, thumbnail_path = ?, status = ?, published_at = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await db.execute(updateQuery, [
      newCategoryId,
      updatedTitle,
      updatedSlug,
      updatedExcerpt,
      updatedContent,
      updatedThumbnailPath,
      updatedStatus,
      updatedPublishedAt,
      id
    ]);

    // Catat ke Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'UPDATE', 'NEWS', id, `Mengubah berita: "${updatedTitle}"`);

    res.status(200).json({
      success: true,
      message: 'Berita berhasil diperbarui',
      data: {
        id: parseInt(id, 10),
        title: updatedTitle,
        slug: updatedSlug,
        excerpt: updatedExcerpt,
        content: updatedContent,
        thumbnail: updatedThumbnailPath,
        categoryId: newCategoryId,
        status: updatedStatus,
        publishedAt: updatedPublishedAt
      }
    });

  } catch (error) {
    console.error('UpdateNews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui berita'
    });
  }
};

// 5. DELETE NEWS (Hapus Berita)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek Keberadaan Berita
    const [existingRows] = await db.execute('SELECT * FROM news WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
    }

    const newsToDelete = existingRows[0];

    // Hapus Record dari Database
    await db.execute('DELETE FROM news WHERE id = ?', [id]);

    // Hapus file thumbnail fisik dari storage jika ada
    if (newsToDelete.thumbnail_path) {
      const relativeFileName = newsToDelete.thumbnail_path.replace(/^\/uploads\/news\//, '');
      const fullFilePath = path.join(__dirname, '../../uploads/news', relativeFileName);
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath);
        } catch (unlinkErr) {
          console.error('⚠️ Gagal menghapus file thumbnail fisik:', unlinkErr.message);
        }
      }
    }

    // Catat ke Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'DELETE', 'NEWS', id, `Menghapus berita: "${newsToDelete.title}"`);

    res.status(200).json({
      success: true,
      message: 'Berita berhasil dihapus'
    });

  } catch (error) {
    console.error('DeleteNews Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menghapus berita'
    });
  }
};
