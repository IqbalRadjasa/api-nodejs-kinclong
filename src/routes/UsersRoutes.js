const express = require('express');

const router = express.Router();

const UsersController = require('../controller/UsersController');

// CRUD Routes
// Create - POST
router.post('/', UsersController.creatUser);
// Auth - GET
router.get('/', UsersController.getUserByUsernamePassword);
// // Auth - POST
// router.get('/:id', UsersController.getByUserId);
// // Update - PATCH
// router.patch('/:id', UsersController.updateUser);
// // Delete - DELETE
// router.delete('/:id', UsersController.deleteUser);

module.exports = router;
