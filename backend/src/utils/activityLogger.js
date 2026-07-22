const db = require('../config/database');

/**
 * Mencatat aktivitas administrator ke dalam tabel activity_logs
 * @param {number} userId - ID pengguna (admin) yang melakukan aksi
 * @param {string} action - Jenis aksi ('CREATE', 'UPDATE', 'DELETE')
 * @param {string} entityType - Tipe entitas ('NEWS', 'BANNER', dll)
 * @param {number|null} entityId - ID record entitas
 * @param {string} description - Deskripsi ringkas aktivitas
 */
async function logActivity(userId, action, entityType, entityId, description) {
  try {
    if (!userId) return;
    
    await db.execute(
      `INSERT INTO activity_logs (user_id, action, entity_type, entity_id, description, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [userId, action, entityType, entityId || null, description || '']
    );
  } catch (error) {
    console.error('❌ Gagal mencatat activity log:', error.message);
    // Silent fail agar kegagalan log tidak membatalkan transaksi utama jika tidak kritis
  }
}

module.exports = {
  logActivity
};
