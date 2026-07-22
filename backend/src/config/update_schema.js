const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabaseAndSchema() {
    try {
        const dbName = process.env.DB_NAME || 'disdukcapil_admin';
        console.log(`🔄 Memeriksa & menginisialisasi database ${dbName}...`);

        const rootConfig = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        };

        if (process.env.DB_SSL_CA) {
            rootConfig.ssl = { ca: process.env.DB_SSL_CA };
        }

        // 1. Koneksi tanpa spesifik nama database untuk membuat database jika belum ada
        const rootConnection = await mysql.createConnection(rootConfig);

        await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`✅ Database \`${dbName}\` tersedia.`);
        await rootConnection.end();

        const dbConfig = { ...rootConfig, database: dbName };

        // 2. Koneksi langsung ke database 
        const db = await mysql.createConnection(dbConfig);

        // 3. Buat tabel-tabel utama jika belum ada
        const createTableUsers = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT 'admin',
                password_changed_at DATETIME NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableUsers);
        console.log('✅ Tabel `users` tersedia.');

        const createTableCategories = `
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                type VARCHAR(50) NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableCategories);
        console.log('✅ Tabel `categories` tersedia.');

        const createTableBanners = `
            CREATE TABLE IF NOT EXISTS banners (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                image_path VARCHAR(500) NOT NULL,
                status ENUM('active','inactive') NOT NULL DEFAULT 'active',
                display_order INT NOT NULL DEFAULT 0,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableBanners);
        console.log('✅ Tabel `banners` tersedia.');

        const createTableDocuments = `
            CREATE TABLE IF NOT EXISTS documents (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                file_path VARCHAR(500) NOT NULL,
                uploaded_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableDocuments);
        console.log('✅ Tabel `documents` tersedia.');

        const createTableGalleries = `
            CREATE TABLE IF NOT EXISTS galleries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                image_path VARCHAR(500) NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableGalleries);
        console.log('✅ Tabel `galleries` tersedia.');

        const createTableNews = `
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                category_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                excerpt TEXT,
                content LONGTEXT NOT NULL,
                thumbnail_path VARCHAR(500) NOT NULL,
                status ENUM('draft','published') NOT NULL DEFAULT 'draft',
                published_at DATETIME NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableNews);
        console.log('✅ Tabel `news` tersedia.');

        const createTableActivityLogs = `
            CREATE TABLE IF NOT EXISTS activity_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                action VARCHAR(50) NOT NULL,
                entity_type VARCHAR(50) NOT NULL,
                entity_id INT NULL,
                description TEXT,
                created_at DATETIME NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableActivityLogs);
        console.log('✅ Tabel `activity_logs` tersedia.');

        const createTableWebsiteSettings = `
            CREATE TABLE IF NOT EXISTS website_settings (
                id INT PRIMARY KEY,
                logo_path VARCHAR(500) NULL,
                address TEXT,
                email VARCHAR(150) NULL,
                phone VARCHAR(50) NULL,
                facebook_url VARCHAR(255) NULL,
                instagram_url VARCHAR(255) NULL,
                youtube_url VARCHAR(255) NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        await db.query(createTableWebsiteSettings);
        console.log('✅ Tabel `website_settings` tersedia.');

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
