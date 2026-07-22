const jwt = require('jsonwebtoken');
const db = require('../config/database');

const authMiddleware = async (req, res, next) => {
    try {
        let token = null;

        // 1. Prioritaskan pembacaan dari HttpOnly Cookie
        if (req.cookies && req.cookies.adminToken) {
            token = req.cookies.adminToken;
        } 
        // Fallback: Pembacaan dari Authorization Header Bearer (bila ada)
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak: Sesi tidak valid atau telah berakhir'
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('❌ CRITICAL ERROR: JWT_SECRET belum dikonfigurasi di environment!');
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan konfigurasi server'
            });
        }

        // 2. Verifikasi Token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak: Sesi tidak valid atau telah berakhir'
            });
        }

        // 3. Verifikasi User di Database
        const [rows] = await db.execute(
            'SELECT id, name, email, role, password_changed_at FROM users WHERE id = ?', 
            [decoded.id]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak: User tidak ditemukan'
            });
        }

        const user = rows[0];

        // 4. Session Invalidation Check (Memeriksa Perubahan Password)
        if (user.password_changed_at) {
            const passwordChangedTime = Math.floor(new Date(user.password_changed_at).getTime() / 1000);
            if (decoded.iat && decoded.iat < passwordChangedTime) {
                return res.status(401).json({
                    success: false,
                    message: 'Sesi telah berakhir karena password diubah. Silakan login kembali.'
                });
            }
        }

        // 5. Simpan payload user terverifikasi ke req.user
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak: Sesi tidak valid'
        });
    }
};

module.exports = authMiddleware;
