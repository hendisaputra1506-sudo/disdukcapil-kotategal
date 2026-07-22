const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const loginRateLimiter = require('../middleware/loginRateLimiter');

// Public Auth Routes
router.post('/login', loginRateLimiter, authController.login);

// Protected Auth Routes (Membutuhkan HttpOnly Cookie / JWT Valid)
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getMe);
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;