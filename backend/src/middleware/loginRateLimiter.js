const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // Maksimal 5 percobaan gagal per IP dalam 15 menit
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Teraplikasi pembatasan akses: Terlalu banyak percobaan login gagal. Silakan coba lagi dalam 15 menit.',
        errors: []
    },
    skipSuccessfulRequests: true // Hanya menghitung request yang gagal
});

module.exports = loginRateLimiter;
