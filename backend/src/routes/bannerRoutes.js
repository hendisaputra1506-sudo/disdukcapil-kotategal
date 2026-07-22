const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const authMiddleware = require('../middleware/authMiddleware');
const optionalAuthMiddleware = require('../middleware/optionalAuthMiddleware');
const { uploadSingleBanner } = require('../middleware/uploadMiddleware');

// Public / Read-Only Banner Routes
router.get('/', optionalAuthMiddleware, bannerController.getBanners);
router.get('/:id', optionalAuthMiddleware, bannerController.getBannerById);

// Protected Admin Banner Routes (Membutuhkan Sesi Autentikasi HttpOnly Cookie / JWT Valid)
router.post('/', authMiddleware, uploadSingleBanner, bannerController.createBanner);
router.put('/:id', authMiddleware, uploadSingleBanner, bannerController.updateBanner);
router.delete('/:id', authMiddleware, bannerController.deleteBanner);

module.exports = router;
