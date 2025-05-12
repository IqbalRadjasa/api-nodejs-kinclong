const express = require('express');
const router = express.Router();
const ProdukController = require('../controller/ProdukController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, ProdukController.creatProduk);
// Auth - POST
router.get('/', authenticateToken, ProdukController.getAllData);
// // Update - PUT
// router.put('/:id', authenticateToken, UsersController.updateUser);

// // Forgot Password
// router.post('/forgot-password', UsersController.forgotPassword);

// // Reset Password
// router.post('/reset-password', UsersController.resetPassword);

module.exports = router;
