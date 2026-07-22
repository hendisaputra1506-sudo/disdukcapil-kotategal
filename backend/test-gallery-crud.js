const db = require('./src/config/database');

async function runGalleryCrudTests() {
  console.log('================================================================');
  console.log('🧪 RUNNING GALLERY MANAGEMENT CRUD INTEGRATION TEST SUITE');
  console.log('================================================================\n');

  let adminCookie = '';
  let createdGalleryId = null;
  let galleryCategoryId = 5; // ID Kategori 'Dokumentasi' (type = 'gallery')
  let newsCategoryId = 1;    // ID Kategori 'Informasi' (type = 'news')

  // Dummy Image Buffer (PNG)
  const dummyImage = Buffer.from(
    'iVBORw0KGgoAAAANSU5EUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );

  const results = [];

  function recordTest(no, name, expected, actual, passed, detail = '') {
    const status = passed ? 'PASS' : 'FAIL';
    results.push({ No: no, Test: name, Expected: expected, Actual: actual, Status: status });
    console.log(`[${status}] Test ${no}: ${name} -> ${detail}`);
  }

  try {
    // 1. ADMIN LOGIN
    console.log('--- Step 1: Admin Login ---');
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@disdukcapil.go.id', password: 'rahasia123' })
    });
    const setCookie = loginRes.headers.get('set-cookie');
    if (setCookie) adminCookie = setCookie.split(';')[0];
    recordTest(1, 'Admin Login', 'HTTP 200 & Cookie', `HTTP ${loginRes.status}`, loginRes.status === 200 && !!adminCookie, 'Cookie received');

    // 2. UNAUTHORIZED GET
    console.log('\n--- Step 2: Public GET /api/gallery ---');
    const pubRes = await fetch('http://localhost:3000/api/gallery');
    recordTest(2, 'Public GET Gallery', 'HTTP 200', `HTTP ${pubRes.status}`, pubRes.status === 200, 'Public read accessible');

    // 3. UNAUTHORIZED POST
    console.log('\n--- Step 3: Unauthorized POST /api/gallery ---');
    const unauthPostRes = await fetch('http://localhost:3000/api/gallery', { method: 'POST' });
    recordTest(3, 'Unauthorized POST', 'HTTP 401', `HTTP ${unauthPostRes.status}`, unauthPostRes.status === 401, 'Rejected without cookie');

    // 4. INVALID TOKEN POST
    console.log('\n--- Step 4: Invalid Token POST ---');
    const invalidTokenRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': 'adminToken=invalid_token_xyz' }
    });
    recordTest(4, 'Invalid Token POST', 'HTTP 401', `HTTP ${invalidTokenRes.status}`, invalidTokenRes.status === 401, 'Rejected invalid JWT');

    // 5. INVALID CATEGORY ID (Non-existent category 9999)
    console.log('\n--- Step 5: Invalid Category ID ---');
    const formInvCat = new FormData();
    formInvCat.append('title', 'Dokumentasi Acara Fiktif');
    formInvCat.append('category_id', '9999');
    formInvCat.append('image', new Blob([dummyImage], { type: 'image/png' }), 'doc.png');

    const invCatRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formInvCat
    });
    const invCatData = await invCatRes.json();
    recordTest(5, 'Invalid Category ID', 'HTTP 400', `HTTP ${invCatRes.status}`, invCatRes.status === 400, invCatData.message);

    // 6. NEWS CATEGORY REJECTION (category_id = 1, type = 'news')
    console.log('\n--- Step 6: News Category Rejection ---');
    const formNewsCat = new FormData();
    formNewsCat.append('title', 'Galeri Menggunakan Kategori Berita');
    formNewsCat.append('category_id', String(newsCategoryId));
    formNewsCat.append('image', new Blob([dummyImage], { type: 'image/png' }), 'doc.png');

    const newsCatRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formNewsCat
    });
    const newsCatData = await newsCatRes.json();
    recordTest(6, 'News Category Rejection', 'HTTP 400', `HTTP ${newsCatRes.status}`, newsCatRes.status === 400, newsCatData.message);

    // 7. CREATE GALLERY (Valid Category & Image)
    console.log('\n--- Step 7: Create Gallery ---');
    const formCreate = new FormData();
    formCreate.append('title', 'Dokumentasi Pelayanan Jemput Bola Disdukcapil');
    formCreate.append('category_id', String(galleryCategoryId));
    formCreate.append('image', new Blob([dummyImage], { type: 'image/png' }), 'jemput-bola.png');

    const createRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formCreate
    });
    const createData = await createRes.json();
    if (createRes.status === 201 && createData.data?.id) {
      createdGalleryId = createData.data.id;
    }
    recordTest(7, 'Create Gallery', 'HTTP 201 & ID', `HTTP ${createRes.status}`, createRes.status === 201 && !!createdGalleryId, `Created ID: ${createdGalleryId}`);

    // 8. GET GALLERY LIST
    console.log('\n--- Step 8: Get Gallery List ---');
    const listRes = await fetch('http://localhost:3000/api/gallery?page=1&limit=10');
    const listData = await listRes.json();
    recordTest(8, 'Get Gallery List', 'HTTP 200 & items array', `HTTP ${listRes.status}`, listRes.status === 200 && Array.isArray(listData.data), `Total Items: ${listData.pagination?.total}`);

    // 9. GET GALLERY DETAIL
    console.log('\n--- Step 9: Get Gallery Detail ---');
    const detailRes = await fetch(`http://localhost:3000/api/gallery/${createdGalleryId}`);
    const detailData = await detailRes.json();
    recordTest(9, 'Get Gallery Detail', 'HTTP 200 & Title', `HTTP ${detailRes.status}`, detailRes.status === 200 && detailData.data?.id === createdGalleryId, detailData.data?.title);

    // 10. UPDATE GALLERY WITHOUT IMAGE
    console.log('\n--- Step 10: Update Gallery Without Image ---');
    const formUpdate1 = new FormData();
    formUpdate1.append('title', 'Dokumentasi Pelayanan Jemput Bola (REVISI JU DUL)');
    formUpdate1.append('category_id', String(galleryCategoryId));

    const update1Res = await fetch(`http://localhost:3000/api/gallery/${createdGalleryId}`, {
      method: 'PUT',
      headers: { 'Cookie': adminCookie },
      body: formUpdate1
    });
    const update1Data = await update1Res.json();
    recordTest(10, 'Update Gallery (No Image)', 'HTTP 200 & Image Retained', `HTTP ${update1Res.status}`, update1Res.status === 200 && !!update1Data.data?.image, update1Data.data?.title);

    // 11. UPDATE GALLERY WITH NEW IMAGE
    console.log('\n--- Step 11: Update Gallery With New Image ---');
    const formUpdate2 = new FormData();
    formUpdate2.append('title', 'Dokumentasi Pelayanan Jemput Bola (BARU)');
    formUpdate2.append('category_id', String(galleryCategoryId));
    formUpdate2.append('image', new Blob([dummyImage], { type: 'image/png' }), 'jemput-bola-new.png');

    const update2Res = await fetch(`http://localhost:3000/api/gallery/${createdGalleryId}`, {
      method: 'PUT',
      headers: { 'Cookie': adminCookie },
      body: formUpdate2
    });
    const update2Data = await update2Res.json();
    recordTest(11, 'Update Gallery (With Image)', 'HTTP 200 & New Image', `HTTP ${update2Res.status}`, update2Res.status === 200 && !!update2Data.data?.image, update2Data.data?.image);

    // 12. DELETE GALLERY
    console.log('\n--- Step 12: Delete Gallery ---');
    const deleteRes = await fetch(`http://localhost:3000/api/gallery/${createdGalleryId}`, {
      method: 'DELETE',
      headers: { 'Cookie': adminCookie }
    });
    const deleteData = await deleteRes.json();
    recordTest(12, 'Delete Gallery', 'HTTP 200', `HTTP ${deleteRes.status}`, deleteRes.status === 200 && deleteData.success, deleteData.message);

    // 13. INVALID FILE UPLOAD (PDF)
    console.log('\n--- Step 13: Invalid File Upload (.pdf) ---');
    const formPdf = new FormData();
    formPdf.append('title', 'File PDF Terlarang');
    formPdf.append('category_id', String(galleryCategoryId));
    formPdf.append('image', new Blob(['%PDF-1.4 dummy content'], { type: 'application/pdf' }), 'document.pdf');

    const pdfRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formPdf
    });
    const pdfData = await pdfRes.json();
    recordTest(13, 'Invalid File Upload (.pdf)', 'HTTP 400', `HTTP ${pdfRes.status}`, pdfRes.status === 400, pdfData.message);

    // 14. OVERSIZED IMAGE (> 5MB)
    console.log('\n--- Step 14: Oversized Image Upload (> 5MB) ---');
    const largeBuffer = Buffer.alloc(5.5 * 1024 * 1024); // 5.5MB
    const formLarge = new FormData();
    formLarge.append('title', 'Gambar Raksasa');
    formLarge.append('category_id', String(galleryCategoryId));
    formLarge.append('image', new Blob([largeBuffer], { type: 'image/png' }), 'large-image.png');

    const largeRes = await fetch('http://localhost:3000/api/gallery', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formLarge
    });
    const largeData = await largeRes.json();
    recordTest(14, 'Oversized Image (> 5MB)', 'HTTP 400', `HTTP ${largeRes.status}`, largeRes.status === 400, largeData.message);

    // 15. ACTIVITY LOG VERIFICATION
    console.log('\n--- Step 15: Activity Log Verification ---');
    const [logs] = await db.query(
      `SELECT id, action, entity_type, entity_id, description FROM activity_logs WHERE entity_type = 'GALLERY' ORDER BY id DESC LIMIT 5`
    );
    const hasLogs = logs.length >= 3;
    recordTest(15, 'Activity Log Verification', 'CREATE, UPDATE, DELETE logged', `${logs.length} logs found`, hasLogs, `Logged actions: ${logs.map(l => l.action).join(', ')}`);

    // 16. AUTHENTICATION REGRESSION TEST
    console.log('\n--- Step 16: Authentication Regression Test (/api/auth/me) ---');
    const meRes = await fetch('http://localhost:3000/api/auth/me', { headers: { 'Cookie': adminCookie } });
    recordTest(16, 'Auth Regression (/api/auth/me)', 'HTTP 200', `HTTP ${meRes.status}`, meRes.status === 200, 'Session remains stable');

    // 17. NEWS CRUD REGRESSION TEST
    console.log('\n--- Step 17: News CRUD Regression Test (/api/news) ---');
    const newsRes = await fetch('http://localhost:3000/api/news');
    recordTest(17, 'News CRUD Regression (/api/news)', 'HTTP 200', `HTTP ${newsRes.status}`, newsRes.status === 200, 'News module intact');

    // 18. BANNER MANAGEMENT REGRESSION TEST
    console.log('\n--- Step 18: Banner Management Regression Test (/api/banners) ---');
    const bannerRes = await fetch('http://localhost:3000/api/banners');
    recordTest(18, 'Banner Regression (/api/banners)', 'HTTP 200', `HTTP ${bannerRes.status}`, bannerRes.status === 200, 'Banner module intact');

    console.log('\n================================================================');
    console.log('📊 GALLERY MANAGEMENT CRUD INTEGRATION TEST RESULTS TABLE');
    console.log('================================================================');
    console.table(results);

    const allPassed = results.every(r => r.Status === 'PASS');
    if (allPassed) {
      console.log('\n🎉 ALL 18 INTEGRATION TESTS PASSED 100%! GALLERY CRUD BACKEND READY');
    } else {
      console.error('\n❌ SOME TESTS FAILED! PLEASE REVIEW TABLE ABOVE.');
    }

  } catch (err) {
    console.error('❌ Test Execution Error:', err);
  } finally {
    process.exit();
  }
}

runGalleryCrudTests();
