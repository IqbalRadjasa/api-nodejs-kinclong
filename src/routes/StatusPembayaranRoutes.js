const express = require('express');
const router = express.Router();
const StatusPembayaranController = require('../controller/StatusPembayaranController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, StatusPembayaranController.createData);
// Get All Data - GET
router.get('/', authenticateToken, StatusPembayaranController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, StatusPembayaranController.updateData);
// Delete - DELETE
router.delete('/:id', authenticateToken, StatusPembayaranController.deleteData);

module.exports = router;
