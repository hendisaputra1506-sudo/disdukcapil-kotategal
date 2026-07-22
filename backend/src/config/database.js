const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Mengetes koneksi
dbPool.getConnection()
    .then(() => {
        console.log('✅ Berhasil terhubung ke database MySQL disdukcapil_admin!');
    })
    .catch((err) => {
        console.error('❌ Gagal terhubung ke database:', err.message);
    });

module.exports = dbPool;