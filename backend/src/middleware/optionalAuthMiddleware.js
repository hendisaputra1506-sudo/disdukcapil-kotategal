const jwt = require('jsonwebtoken');
const db = require('../config/database');

const optionalAuthMiddleware = async (req, res, next) => {
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

        // Jika tidak ada token, lanjutkan sebagai guest (tidak set req.user)
        if (!token) {
            return next();
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return next();
        }

        // 2. Verifikasi Token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            // Token tidak valid, anggap guest
            return next();
        }

        // 3. Verifikasi User di Database
        const [rows] = await db.execute(
            'SELECT id, name, email, role, password_changed_at FROM users WHERE id = ?', 
            [decoded.id]
        );

        if (rows.length === 0) {
            return next();
        }

        const user = rows[0];

        // 4. Session Invalidation Check
        if (user.password_changed_at) {
            const passwordChangedTime = Math.floor(new Date(user.password_changed_at).getTime() / 1000);
            if (decoded.iat && decoded.iat < passwordChangedTime) {
                return next();
            }
        }

        // 5. Simpan payload user
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        console.error('Optional Auth Middleware Error:', error);
        next();
    }
};

module.exports = optionalAuthMiddleware;
