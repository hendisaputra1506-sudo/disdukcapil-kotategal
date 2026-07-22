const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const { uploadSingleThumbnail } = require('../middleware/uploadMiddleware');

// Public / Read-Only News Routes (bisa diakses admin juga untuk melihat draft detail)
router.get('/', optionalAuthMiddleware, newsController.getNews);
router.get('/:id', optionalAuthMiddleware, newsController.getNewsById);

// Protected Admin News Routes (Membutuhkan Sesi Autentikasi HttpOnly Cookie / JWT Valid)
router.post('/', authMiddleware, uploadSingleThumbnail, newsController.createNews);
router.put('/:id', authMiddleware, uploadSingleThumbnail, newsController.updateNews);
router.delete('/:id', authMiddleware, newsController.deleteNews);

module.exports = router;
