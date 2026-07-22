const db = require('../config/database');
const path = require('path');
const fs = require('fs');
const { logActivity } = require('../utils/activityLogger');

// 1. GET DOCUMENT LIST (PAGINATION & SEARCH)
exports.getDocumentList = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { search } = req.query;

    let whereConditions = [];
    let params = [];

    if (search && search.trim() !== '') {
      whereConditions.push('(title LIKE ? OR description LIKE ?)');
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Hitung total data
    const countSql = `SELECT COUNT(*) as total FROM documents ${whereClause}`;
    const [countRows] = await db.execute(countSql, params);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit) || 1;

    // Data query
    const dataSql = `
      SELECT 
        id, 
        title, 
        description, 
        file_path AS filePath, 
        uploaded_at AS uploadedAt, 
        updated_at AS updatedAt
      FROM documents
      ${whereClause}
      ORDER BY uploaded_at DESC
      LIMIT ? OFFSET ?
    `;

    // Limit and offset must be numbers
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
    console.error('GetDocumentList Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil daftar dokumen'
    });
  }
};

// 2. GET DOCUMENT BY ID
exports.getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
      SELECT 
        id, 
        title, 
        description, 
        file_path AS filePath, 
        uploaded_at AS uploadedAt, 
        updated_at AS updatedAt
      FROM documents
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('GetDocumentById Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengambil detail dokumen'
    });
  }
};

// 3. CREATE DOCUMENT
exports.createDocument = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Judul dokumen wajib diisi' });
    }
    if (title.length > 255) {
      return res.status(400).json({ success: false, message: 'Judul dokumen maksimal 255 karakter' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File dokumen wajib diunggah' });
    }

    const filePath = `/uploads/documents/${req.file.filename}`;
    const docDesc = description ? description.trim() : null;

    const insertSql = `
      INSERT INTO documents (title, description, file_path, uploaded_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(insertSql, [
      title.trim(),
      docDesc,
      filePath
    ]);

    const documentId = result.insertId;

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'CREATE', 'DOCUMENT', documentId, `Menambahkan dokumen: "${title.trim()}"`);

    res.status(201).json({
      success: true,
      message: 'Dokumen berhasil diunggah',
      data: {
        id: documentId,
        title: title.trim(),
        description: docDesc,
        filePath: filePath
      }
    });

  } catch (error) {
    console.error('CreateDocument Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat membuat dokumen'
    });
  }
};

// 4. UPDATE DOCUMENT
exports.updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const [existingRows] = await db.execute('SELECT * FROM documents WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Dokumen tidak ditemukan' });
    }

    const currentDoc = existingRows[0];

    const updatedTitle = title !== undefined ? title.trim() : currentDoc.title;
    const updatedDesc = description !== undefined ? (description ? description.trim() : null) : currentDoc.description;

    if (!updatedTitle) {
      return res.status(400).json({ success: false, message: 'Judul dokumen tidak boleh kosong' });
    }

    let updatedFilePath = currentDoc.file_path;

    // Jika file dokumen baru diunggah
    if (req.file) {
      updatedFilePath = `/uploads/documents/${req.file.filename}`;

      // Hapus file dokumen lama dari disk
      if (currentDoc.file_path) {
        const oldRelativePath = currentDoc.file_path.replace(/^\/uploads\/documents\//, '');
        const oldFullPath = path.join(__dirname, '../../uploads/documents', oldRelativePath);
        if (fs.existsSync(oldFullPath)) {
          try {
            fs.unlinkSync(oldFullPath);
          } catch (unlinkErr) {
            console.error('⚠️ Gagal menghapus file dokumen lama:', unlinkErr.message);
          }
        }
      }
    }

    const updateSql = `
      UPDATE documents 
      SET title = ?, description = ?, file_path = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await db.execute(updateSql, [
      updatedTitle,
      updatedDesc,
      updatedFilePath,
      id
    ]);

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'UPDATE', 'DOCUMENT', id, `Mengubah dokumen: "${updatedTitle}"`);

    res.status(200).json({
      success: true,
      message: 'Dokumen berhasil diperbarui',
      data: {
        id: parseInt(id, 10),
        title: updatedTitle,
        description: updatedDesc,
        filePath: updatedFilePath
      }
    });

  } catch (error) {
    console.error('UpdateDocument Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat memperbarui dokumen'
    });
  }
};

// 5. DELETE DOCUMENT
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const [existingRows] = await db.execute('SELECT * FROM documents WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Dokumen tidak ditemukan' });
    }

    const docToDelete = existingRows[0];

    // Hapus dari DB
    await db.execute('DELETE FROM documents WHERE id = ?', [id]);

    // Hapus file dokumen fisik dari disk
    if (docToDelete.file_path) {
      const relativeFileName = docToDelete.file_path.replace(/^\/uploads\/documents\//, '');
      const fullFilePath = path.join(__dirname, '../../uploads/documents', relativeFileName);
      if (fs.existsSync(fullFilePath)) {
        try {
          fs.unlinkSync(fullFilePath);
        } catch (unlinkErr) {
          console.error('⚠️ Gagal menghapus file dokumen fisik:', unlinkErr.message);
        }
      }
    }

    // Activity Log
    const userId = req.user ? req.user.id : null;
    await logActivity(userId, 'DELETE', 'DOCUMENT', id, `Menghapus dokumen: "${docToDelete.title}"`);

    res.status(200).json({
      success: true,
      message: 'Dokumen berhasil dihapus'
    });

  } catch (error) {
    console.error('DeleteDocument Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat menghapus dokumen'
    });
  }
};

// 6. DOWNLOAD / ACCESS DOCUMENT (SECURE PATH RESOLUTION)
exports.downloadDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute('SELECT * FROM documents WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Dokumen tidak ditemukan' });
    }

    const doc = rows[0];
    const baseUploadDir = path.resolve(__dirname, '../../uploads/documents');
    const relativeFileName = doc.file_path.replace(/^\/uploads\/documents\//, '');
    const fullFilePath = path.resolve(baseUploadDir, relativeFileName);

    // Security Check: Anti Path Traversal
    if (!fullFilePath.startsWith(baseUploadDir)) {
      return res.status(403).json({
        success: false,
        message: 'Akses file dilarang (Path Traversal Detected)'
      });
    }

    if (!fs.existsSync(fullFilePath)) {
      return res.status(404).json({
        success: false,
        message: 'File fisik dokumen tidak ditemukan di server'
      });
    }

    res.download(fullFilePath, path.basename(fullFilePath));

  } catch (error) {
    console.error('DownloadDocument Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server saat mengunduh dokumen'
    });
  }
};
