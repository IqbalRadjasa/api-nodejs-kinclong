const express = require('express');
const router = express.Router();
const StatusBerlakuController = require('../controller/StatusBerlakuController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, StatusBerlakuController.createData);
// Get All Data - GET
router.get('/', authenticateToken, StatusBerlakuController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, StatusBerlakuController.updateData);
// Delete - DELETE
router.delete('/:id', authenticateToken, StatusBerlakuController.deleteData);

module.exports = router;
