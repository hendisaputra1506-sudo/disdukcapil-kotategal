const db = require('./src/config/database');
const bcrypt = require('bcrypt');

async function createAdmin() {
    try {
        const email = 'admin@disdukcapil.go.id';
        const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        
        if (existing.length > 0) {
            console.log('ℹ️ Akun Administrator atas nama Hendi Saputra sudah ada.');
            return;
        }

        const hashedPassword = await bcrypt.hash('rahasia123', 10);
        const query = `INSERT INTO users (name, email, password, role, created_at, updated_at) 
                       VALUES (?, ?, ?, ?, NOW(), NOW())`;
        const values = ['Hendi Saputra', email, hashedPassword, 'admin'];
        
        await db.execute(query, values);
        console.log('✅ Akun Administrator atas nama Hendi Saputra berhasil dibuat!');
    } catch (error) {
        console.error('❌ Gagal membuat akun:', error.message);
    } finally {
        process.exit();
    }
}

createAdmin();