const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabaseAndSchema() {
    try {
        console.log('🔄 Memeriksa & menginisialisasi database disdukcapil_admin...');

        // 1. Koneksi tanpa spesifik nama database untuk membuat database jika belum ada
        const rootConnection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });

        const dbName = process.env.DB_NAME || 'disdukcapil_admin';
        await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`✅ Database \`${dbName}\` tersedia.`);
        await rootConnection.end();

        // 2. Koneksi langsung ke database disdukcapil_admin
        const db = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: dbName,
            port: process.env.DB_PORT || 3306
        });

        // 3. Buat tabel users jika belum ada
        const createTableUsers = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'superadmin') NOT NULL DEFAULT 'admin',
                password_changed_at TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableUsers);
        console.log('✅ Tabel `users` tersedia.');

        // 4. Pastikan kolom password_changed_at ada
        const [columns] = await db.query(`SHOW COLUMNS FROM users LIKE 'password_changed_at';`);
        if (columns.length === 0) {
            await db.query(`ALTER TABLE users ADD COLUMN password_changed_at TIMESTAMP NULL AFTER role;`);
            console.log('✅ Kolom `password_changed_at` berhasil ditambahkan.');
        }

        await db.end();
        console.log('🎉 Inisialisasi Database & Skema Selesai!');
    } catch (error) {
        console.error('❌ Gagal menginisialisasi database:', error);
    } finally {
        process.exit();
    }
}

initDatabaseAndSchema();
