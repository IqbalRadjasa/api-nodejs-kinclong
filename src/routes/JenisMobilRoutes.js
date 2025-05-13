const express = require('express');
const router = express.Router();
const JenisMobilController = require('../controller/JenisMobilController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, JenisMobilController.createData);
// Get All Data - GET
router.get('/', authenticateToken, JenisMobilController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, JenisMobilController.updateData);
// Delete - DELETE
router.delete('/:id', authenticateToken, JenisMobilController.deleteData);

module.exports = router;
