const db = require('../config/database');

exports.getSettings = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM website_settings WHERE id = 1');
        if (rows.length === 0) {
            return res.status(200).json({
                success: true,
                data: null
            });
        }
        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error('Get Settings Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server saat mengambil pengaturan'
        });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { address, email, phone, facebook_url, instagram_url, youtube_url, x, tiktok } = req.body;
        
        // Mempertahankan struktur respons API yang ada
        const query = `
            INSERT INTO website_settings (id, address, email, phone, facebook_url, instagram_url, youtube_url, created_at, updated_at)
            VALUES (1, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            ON DUPLICATE KEY UPDATE
            address = VALUES(address),
            email = VALUES(email),
            phone = VALUES(phone),
            facebook_url = VALUES(facebook_url),
            instagram_url = VALUES(instagram_url),
            youtube_url = VALUES(youtube_url),
            updated_at = NOW()
        `;
        
        await db.execute(query, [
            address || null, 
            email || null, 
            phone || null, 
            facebook_url || req.body.facebook || null, 
            instagram_url || req.body.instagram || null, 
            youtube_url || req.body.youtube || req.body.x || req.body.tiktok || null // Simpan di fields yg ada tanpa mengubah skema
        ]);

        res.status(200).json({
            success: true,
            message: 'Pengaturan berhasil disimpan!'
        });
    } catch (error) {
        console.error('Update Settings Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server saat menyimpan pengaturan'
        });
    }
};
