const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Mengimpor koneksi database agar langsung dites saat server menyala
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Security Headers (Helmet)
app.use(helmet());

// 2. Cookie Parser
app.use(cookieParser());

// 3. Strict CORS Configuration
const allowedOrigins = [
    process.env.FRONTEND_ADMIN_URL || 'http://localhost:5174',
    process.env.FRONTEND_PUBLIC_URL || 'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        // Izinkan request tanpa origin (seperti dari cURL / Mobile Apps / Postman lokal) atau origin terdaftar
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Akses ditolak oleh kebijakan CORS'));
        }
    },
    credentials: true
}));

// 4. Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Static Files Serving (Uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 6. Routes Initialization
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const documentRoutes = require('./routes/documentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/banner', bannerRoutes); // Alias route support
app.use('/api/gallery', galleryRoutes);
app.use('/api/documents', documentRoutes);

// Route dasar untuk tes kesehatan API
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: 'Backend API Disdukcapil berjalan dengan baik!'
    });
});

// Menyalakan server
app.listen(PORT, () => {
    console.log(`🚀 Server backend berjalan di http://localhost:${PORT}`);
});