const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadSingleGallery } = require('../middleware/uploadMiddleware');

// Public / Read-Only Gallery Routes
router.get('/', galleryController.getGalleryList);
router.get('/:id', galleryController.getGalleryById);

// Protected Admin Gallery Routes (Membutuhkan Sesi Autentikasi HttpOnly Cookie / JWT Valid)
router.post('/', authMiddleware, uploadSingleGallery, galleryController.createGallery);
router.put('/:id', authMiddleware, uploadSingleGallery, galleryController.updateGallery);
router.delete('/:id', authMiddleware, galleryController.deleteGallery);

module.exports = router;
