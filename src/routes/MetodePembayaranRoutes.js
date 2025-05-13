const express = require('express');
const router = express.Router();
const MetodePembayaranController = require('../controller/MetodePembayaranController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, MetodePembayaranController.createData);
// Get All Data - GET
router.get('/', authenticateToken, MetodePembayaranController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, MetodePembayaranController.updateData);
// Delete - DELETE
router.delete('/:id', authenticateToken, MetodePembayaranController.deleteData);

module.exports = router;
