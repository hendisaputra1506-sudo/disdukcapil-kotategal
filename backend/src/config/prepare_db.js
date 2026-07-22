const db = require('./database');

async function prepareDatabase() {
    try {
        console.log(`🔄 Memulai persiapan database ${process.env.DB_NAME || 'disdukcapil_admin'}...`);

        // ==========================================
        // BAGIAN A: Migration password_changed_at
        // ==========================================
        console.log('\n--- 1. Memeriksa Kolom `password_changed_at` pada Tabel `users` ---');
        const [columns] = await db.query(`SHOW COLUMNS FROM users LIKE 'password_changed_at';`);

        if (columns.length === 0) {
            await db.query(`ALTER TABLE users ADD COLUMN password_changed_at DATETIME NULL AFTER role;`);
            console.log('✅ Kolom `password_changed_at` BERHASIL ditambahkan ke tabel `users`.');
        } else {
            console.log('ℹ️ Kolom `password_changed_at` SUDAH TERSEDIA pada tabel `users` (Skipped).');
        }

        // ==========================================
        // BAGIAN B: Seeder Kategori Berita & Galeri
        // ==========================================
        console.log('\n--- 2. Memeriksa & Seeding Kategori Berita/Galeri ---');
        const initialCategories = [
            { name: 'Informasi', type: 'news' },
            { name: 'Pelayanan', type: 'news' },
            { name: 'Pengumuman', type: 'news' },
            { name: 'Kegiatan', type: 'news' },
            { name: 'Dokumentasi', type: 'gallery' }
        ];

        for (const cat of initialCategories) {
            const [existing] = await db.execute(
                'SELECT id FROM categories WHERE name = ? AND type = ?',
                [cat.name, cat.type]
            );

            if (existing.length === 0) {
                await db.execute(
                    'INSERT INTO categories (name, type, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
                    [cat.name, cat.type]
                );
                console.log(`✅ Kategori '${cat.name}' (type: ${cat.type}) berhasil ditambahkan.`);
            } else {
                console.log(`ℹ️ Kategori '${cat.name}' (type: ${cat.type}) sudah ada (Skipped).`);
            }
        }

        console.log('\n🎉 Database Preparation Selesai dengan Sukses!');
    } catch (error) {
        console.error('❌ Gagal melakukan persiapan database:', error);
    } finally {
        process.exit();
    }
}

prepareDatabase();
