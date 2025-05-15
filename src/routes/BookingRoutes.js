const express = require('express');
const router = express.Router();
const BookingController = require('../controller/BookingController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
router.post('/', authenticateToken, BookingController.createBooking);
// Get History - GET
router.get('/history', authenticateToken, BookingController.bookingHistory);
// Get Booking List - GET
router.get('/list', authenticateToken, BookingController.bookingList);
// Payment - PUT
router.put('/payment', authenticateToken, BookingController.bookingPayment);

module.exports = router;
