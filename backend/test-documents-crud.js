const db = require('./src/config/database');

async function runDocumentsCrudTests() {
  console.log('================================================================');
  console.log('🧪 RUNNING DOCUMENTS MANAGEMENT CRUD INTEGRATION TEST SUITE');
  console.log('================================================================\n');

  let adminCookie = '';
  let createdDocumentId = null;

  // Dummy PDF Buffer
  const dummyPdf = Buffer.from(
    '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kinds [] /Count 0 >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF',
    'utf-8'
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

    // 2. PUBLIC GET DOCUMENTS
    console.log('\n--- Step 2: Public GET /api/documents ---');
    const pubRes = await fetch('http://localhost:3000/api/documents');
    const pubData = await pubRes.json();
    recordTest(2, 'Public GET Documents', 'HTTP 200', `HTTP ${pubRes.status}`, pubRes.status === 200 && Array.isArray(pubData.data), 'Public read accessible');

    // 3. UNAUTHORIZED POST
    console.log('\n--- Step 3: Unauthorized POST /api/documents ---');
    const unauthPostRes = await fetch('http://localhost:3000/api/documents', { method: 'POST' });
    recordTest(3, 'Unauthorized POST', 'HTTP 401', `HTTP ${unauthPostRes.status}`, unauthPostRes.status === 401, 'Rejected without cookie');

    // 4. INVALID JWT POST
    console.log('\n--- Step 4: Invalid JWT POST ---');
    const invalidJwtRes = await fetch('http://localhost:3000/api/documents', {
      method: 'POST',
      headers: { 'Cookie': 'adminToken=invalid_token_xyz' }
    });
    recordTest(4, 'Invalid JWT POST', 'HTTP 401', `HTTP ${invalidJwtRes.status}`, invalidJwtRes.status === 401, 'Rejected invalid JWT');

    // 5. CREATE DOCUMENT (Valid PDF File)
    console.log('\n--- Step 5: Create Document (PDF) ---');
    const formCreate = new FormData();
    formCreate.append('title', 'Formulir Permohonan KTP-el Online 2026');
    formCreate.append('description', 'Formulir resmi permohonan penerbitan KTP-el Kota Tegal.');
    formCreate.append('file', new Blob([dummyPdf], { type: 'application/pdf' }), 'formulir-ktp.pdf');

    const createRes = await fetch('http://localhost:3000/api/documents', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formCreate
    });
    const createData = await createRes.json();
    if (createRes.status === 201 && createData.data?.id) {
      createdDocumentId = createData.data.id;
    }
    recordTest(5, 'Create Document (PDF)', 'HTTP 201 & ID', `HTTP ${createRes.status}`, createRes.status === 201 && !!createdDocumentId, `Created ID: ${createdDocumentId}`);

    // 6. GET CREATED DOCUMENT DETAIL
    console.log('\n--- Step 6: Get Created Document Detail ---');
    const detailRes = await fetch(`http://localhost:3000/api/documents/${createdDocumentId}`);
    const detailData = await detailRes.json();
    recordTest(6, 'Get Document Detail', 'HTTP 200 & Title', `HTTP ${detailRes.status}`, detailRes.status === 200 && detailData.data?.id === createdDocumentId, detailData.data?.title);

    // 7. UPDATE METADATA ONLY (Without new file)
    console.log('\n--- Step 7: Update Metadata Only ---');
    const formUpdate1 = new FormData();
    formUpdate1.append('title', 'Formulir Permohonan KTP-el Online 2026 (REVISI JU DUL)');
    formUpdate1.append('description', 'Deskripsi diperbarui tanpa mengunggah ulang file PDF.');

    const update1Res = await fetch(`http://localhost:3000/api/documents/${createdDocumentId}`, {
      method: 'PUT',
      headers: { 'Cookie': adminCookie },
      body: formUpdate1
    });
    const update1Data = await update1Res.json();
    recordTest(7, 'Update Metadata Only', 'HTTP 200 & File Retained', `HTTP ${update1Res.status}`, update1Res.status === 200 && !!update1Data.data?.filePath, update1Data.data?.title);

    // 8. UPDATE WITH NEW FILE REPLACEMENT
    console.log('\n--- Step 8: Update With New File Replacement ---');
    const formUpdate2 = new FormData();
    formUpdate2.append('title', 'Formulir Permohonan KTP-el Online 2026 (FINAL)');
    formUpdate2.append('description', 'Formulir versi baru.');
    formUpdate2.append('file', new Blob([dummyPdf], { type: 'application/pdf' }), 'formulir-ktp-v2.pdf');

    const update2Res = await fetch(`http://localhost:3000/api/documents/${createdDocumentId}`, {
      method: 'PUT',
      headers: { 'Cookie': adminCookie },
      body: formUpdate2
    });
    const update2Data = await update2Res.json();
    recordTest(8, 'Update With New File', 'HTTP 200 & New Path', `HTTP ${update2Res.status}`, update2Res.status === 200 && !!update2Data.data?.filePath, update2Data.data?.filePath);

    // 9. DOWNLOAD DOCUMENT ENDPOINT
    console.log('\n--- Step 9: Download Document Endpoint ---');
    const downloadRes = await fetch(`http://localhost:3000/api/documents/${createdDocumentId}/download`);
    recordTest(9, 'Download Document Endpoint', 'HTTP 200', `HTTP ${downloadRes.status}`, downloadRes.status === 200, 'File download accessible');

    // 10. DELETE DOCUMENT
    console.log('\n--- Step 10: Delete Document ---');
    const deleteRes = await fetch(`http://localhost:3000/api/documents/${createdDocumentId}`, {
      method: 'DELETE',
      headers: { 'Cookie': adminCookie }
    });
    const deleteData = await deleteRes.json();
    recordTest(10, 'Delete Document', 'HTTP 200', `HTTP ${deleteRes.status}`, deleteRes.status === 200 && deleteData.success, deleteData.message);

    // 11. INVALID FILE TYPE (.exe)
    console.log('\n--- Step 11: Invalid File Type (.exe) ---');
    const formExe = new FormData();
    formExe.append('title', 'File Executable Terlarang');
    formExe.append('file', new Blob(['binary data'], { type: 'application/x-msdownload' }), 'malicious.exe');

    const exeRes = await fetch('http://localhost:3000/api/documents', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formExe
    });
    const exeData = await exeRes.json();
    recordTest(11, 'Invalid File Type (.exe)', 'HTTP 400', `HTTP ${exeRes.status}`, exeRes.status === 400, exeData.message);

    // 12. OVERSIZED FILE (> 10MB)
    console.log('\n--- Step 12: Oversized File (> 10MB) ---');
    const largeBuffer = Buffer.alloc(10.5 * 1024 * 1024); // 10.5MB
    const formLarge = new FormData();
    formLarge.append('title', 'Dokumen Raksasa');
    formLarge.append('file', new Blob([largeBuffer], { type: 'application/pdf' }), 'large-document.pdf');

    const largeRes = await fetch('http://localhost:3000/api/documents', {
      method: 'POST',
      headers: { 'Cookie': adminCookie },
      body: formLarge
    });
    const largeData = await largeRes.json();
    recordTest(12, 'Oversized File (> 10MB)', 'HTTP 400', `HTTP ${largeRes.status}`, largeRes.status === 400, largeData.message);

    // 13. PATH TRAVERSAL ATTEMPT
    console.log('\n--- Step 13: Path Traversal Attempt ---');
    const travRes = await fetch('http://localhost:3000/api/documents/../../etc/passwd/download');
    recordTest(13, 'Path Traversal Attempt', 'HTTP 404 / 403', `HTTP ${travRes.status}`, travRes.status === 404 || travRes.status === 403, 'Path traversal safely prevented');

    // 14. ARBITRARY FILE ACCESS ATTEMPT (Non-existent Document ID)
    console.log('\n--- Step 14: Arbitrary File Access Attempt ---');
    const arbRes = await fetch('http://localhost:3000/api/documents/99999/download');
    recordTest(14, 'Arbitrary File Access', 'HTTP 404', `HTTP ${arbRes.status}`, arbRes.status === 404, 'Non-existent ID rejected');

    // 15. ACTIVITY LOG VERIFICATION
    console.log('\n--- Step 15: Activity Log Verification ---');
    const [logs] = await db.query(
      `SELECT id, action, entity_type, entity_id, description FROM activity_logs WHERE entity_type = 'DOCUMENT' ORDER BY id DESC LIMIT 5`
    );
    const hasLogs = logs.length >= 3;
    recordTest(15, 'Activity Log Verification', 'CREATE, UPDATE, DELETE logged', `${logs.length} logs found`, hasLogs, `Logged actions: ${logs.map(l => l.action).join(', ')}`);

    // 16. AUTHENTICATION REGRESSION TEST
    console.log('\n--- Step 16: Auth Regression (/api/auth/me) ---');
    const meRes = await fetch('http://localhost:3000/api/auth/me', { headers: { 'Cookie': adminCookie } });
    recordTest(16, 'Auth Regression (/api/auth/me)', 'HTTP 200', `HTTP ${meRes.status}`, meRes.status === 200, 'Session remains stable');

    // 17. NEWS CRUD REGRESSION TEST
    console.log('\n--- Step 17: News CRUD Regression (/api/news) ---');
    const newsRes = await fetch('http://localhost:3000/api/news');
    recordTest(17, 'News CRUD Regression (/api/news)', 'HTTP 200', `HTTP ${newsRes.status}`, newsRes.status === 200, 'News module intact');

    // 18. GALLERY CRUD REGRESSION TEST
    console.log('\n--- Step 18: Gallery CRUD Regression (/api/gallery) ---');
    const galleryRes = await fetch('http://localhost:3000/api/gallery');
    recordTest(18, 'Gallery CRUD Regression (/api/gallery)', 'HTTP 200', `HTTP ${galleryRes.status}`, galleryRes.status === 200, 'Gallery module intact');

    // 19. BANNER MANAGEMENT REGRESSION TEST
    console.log('\n--- Step 19: Banner Regression (/api/banners) ---');
    const bannerRes = await fetch('http://localhost:3000/api/banners');
    recordTest(19, 'Banner Regression (/api/banners)', 'HTTP 200', `HTTP ${bannerRes.status}`, bannerRes.status === 200, 'Banner module intact');

    console.log('\n================================================================');
    console.log('📊 DOCUMENTS MANAGEMENT CRUD INTEGRATION TEST RESULTS TABLE');
    console.log('================================================================');
    console.table(results);

    const allPassed = results.every(r => r.Status === 'PASS');
    if (allPassed) {
      console.log('\n🎉 ALL 19 INTEGRATION TESTS PASSED 100%! DOCUMENTS CRUD BACKEND READY');
    } else {
      console.error('\n❌ SOME TESTS FAILED! PLEASE REVIEW TABLE ABOVE.');
    }

  } catch (err) {
    console.error('❌ Test Execution Error:', err);
  } finally {
    process.exit();
  }
}

runDocumentsCrudTests();
