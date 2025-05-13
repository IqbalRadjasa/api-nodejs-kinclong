const express = require('express');
const router = express.Router();
const JenisMobilController = require('../controller/JenisMobilController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, JenisMobilController.creatJenisMobil);
// Get All Data - GET
router.get('/', authenticateToken, JenisMobilController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, JenisMobilController.updateJenisMobil);
// Delete - DELETE
router.delete('/:id', authenticateToken, JenisMobilController.deleteJenisMobil);

module.exports = router;
