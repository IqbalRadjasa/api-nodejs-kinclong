const express = require('express');
const router = express.Router();
const ProdukController = require('../controller/ProdukController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, ProdukController.createData);
// Get All Data - GET
router.get('/', authenticateToken, ProdukController.getAllData);
// Update - PUT
router.put('/:id', authenticateToken, ProdukController.updateData);
// Delete - DELETE
router.delete('/:id', authenticateToken, ProdukController.deleteData);

module.exports = router;
