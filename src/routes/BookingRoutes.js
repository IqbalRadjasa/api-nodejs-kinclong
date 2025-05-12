const express = require('express');
const router = express.Router();
const BookingController = require('../controller/BookingController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, BookingController.createBooking);
// Get All Data - GET
// router.get('/', authenticateToken, BookingController.getAllData);
// // Update - PUT
// router.put('/:id', authenticateToken, BookingController.updateProduk);
// // Delete - DELETE
// router.delete('/:id', authenticateToken, BookingController.deleteProduk);

module.exports = router;
