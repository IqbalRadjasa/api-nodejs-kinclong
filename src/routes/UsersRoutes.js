const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/register', UsersController.creatUser);
// Auth - POST
router.post('/login', UsersController.getUserByUsernamePassword);
// Update - PUT
router.put('/:id', authenticateToken, UsersController.updateUserProfile);

// Forgot Password
router.post('/forgot-password', UsersController.forgotPassword);

// Reset Password
router.post('/reset-password', UsersController.resetPassword);

module.exports = router;
