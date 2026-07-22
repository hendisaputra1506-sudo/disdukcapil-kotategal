const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadSingleDocument } = require('../middleware/uploadMiddleware');

// Public / Read-Only Document Routes
router.get('/', documentController.getDocumentList);
router.get('/:id', documentController.getDocumentById);
router.get('/:id/download', documentController.downloadDocument);

// Protected Admin Document Routes (Membutuhkan Sesi Autentikasi HttpOnly Cookie / JWT Valid)
router.post('/', authMiddleware, uploadSingleDocument, documentController.createDocument);
router.put('/:id', authMiddleware, uploadSingleDocument, documentController.updateDocument);
router.delete('/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;
