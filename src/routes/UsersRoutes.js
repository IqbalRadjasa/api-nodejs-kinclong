const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/register', UsersController.creatUser);
// Auth - POST
router.post('/login', UsersController.getUserByUsernamePassword);
// // Auth - POST
// router.get('/:id', UsersController.getByUserId);
// Update - PUT
router.put('/:id', authenticateToken, UsersController.updateUser);
// // Delete - DELETE
// router.delete('/:id', UsersController.deleteUser);

module.exports = router;
