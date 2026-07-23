const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password harus diisi',
                errors: []
            });
        }

        // Cari user berdasarkan email
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            // Pesan generik untuk keamanan (mencegah user enumeration)
            return res.status(401).json({
                success: false,
                message: 'Email atau password tidak valid',
                errors: []
            });
        }

        const user = rows[0];

        // Cocokkan password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password tidak valid',
                errors: []
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('❌ JWT_SECRET belum diset pada file .env!');
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan internal server'
            });
        }

        // Buat token JWT
        const iat = Math.floor(Date.now() / 1000);
        const token = jwt.sign(
            { id: user.id, role: user.role, iat }, 
            secret, 
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        // Pasang HttpOnly Cookie secara aman
        const isProduction = process.env.NODE_ENV === 'production';
        const isSecure = isProduction || process.env.COOKIE_SECURE === 'true';
        const sameSiteSetting = isProduction ? 'none' : 'lax';

        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: isSecure,
            sameSite: sameSiteSetting,
            maxAge: 24 * 60 * 60 * 1000, // 1 Hari
            path: '/'
        });

        // Kirim response sukses TANPA mengembalikan token di body JSON
        res.status(200).json({
            success: true,
            message: 'Login berhasil',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server',
            errors: []
        });
    }
};

// 2. LOGOUT
exports.logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        const isSecure = isProduction || process.env.COOKIE_SECURE === 'true';
        const sameSiteSetting = isProduction ? 'none' : 'lax';

        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: isSecure,
            sameSite: sameSiteSetting,
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: 'Logout berhasil'
        });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server saat logout'
        });
    }
};

// 3. GET CURRENT USER (PROFILE ME)
exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.execute(
            'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?',
            [userId]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: rows[0]
            }
        });
    } catch (error) {
        console.error('GetMe Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server'
        });
    }
};

// 4. CHANGE PASSWORD
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Seluruh field password wajib diisi'
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password baru harus terdiri dari minimal 8 karakter'
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Konfirmasi password baru tidak cocok'
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password baru tidak boleh sama dengan password saat ini'
            });
        }

        // Ambil data user beserta password hash
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Pengguna tidak ditemukan'
            });
        }

        const user = rows[0];

        // Verifikasi password saat ini
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Password saat ini salah'
            });
        }

        // Hash password baru
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update database dan perbarui password_changed_at ke NOW() untuk Session Invalidation
        await db.execute(
            'UPDATE users SET password = ?, password_changed_at = NOW(), updated_at = NOW() WHERE id = ?',
            [hashedNewPassword, userId]
        );

        // Invalidate session di client (Hapus HttpOnly Cookie)
        const isProduction = process.env.NODE_ENV === 'production';
        const isSecure = isProduction || process.env.COOKIE_SECURE === 'true';
        const sameSiteSetting = isProduction ? 'none' : 'lax';

        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: isSecure,
            sameSite: sameSiteSetting,
            path: '/'
        });

        res.status(200).json({
            success: true,
            message: 'Password berhasil diubah. Sesi Anda telah berakhir, silakan login kembali.'
        });

    } catch (error) {
        console.error('ChangePassword Error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan server saat mengubah password'
        });
    }
};