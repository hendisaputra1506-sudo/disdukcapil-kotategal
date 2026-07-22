const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Optional SSL support for Aiven MySQL / Cloud Databases
if (process.env.DB_SSL_CA) {
    dbConfig.ssl = {
        ca: process.env.DB_SSL_CA
    };
}

const dbPool = mysql.createPool(dbConfig);

// Mengetes koneksi
dbPool.getConnection()
    .then(() => {
        console.log(`✅ Berhasil terhubung ke database MySQL: ${process.env.DB_NAME}!`);
    })
    .catch((err) => {
        console.error('❌ Database connection failed');
        console.error(`Host: ${process.env.DB_HOST}`);
        console.error(`Port: ${process.env.DB_PORT}`);
        console.error(`Database: ${process.env.DB_NAME}`);
        console.error(`Error Code: ${err.code}`);
        console.error(`Error Message: ${err.message}`);
    });

module.exports = dbPool;