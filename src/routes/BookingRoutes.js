const express = require('express');
const router = express.Router();
const BookingController = require('../controller/BookingController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /booking/:
 *   post:
 *     summary: Membuat pemesanan baru.
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               produk_id:
 *                 type: integer
 *               jenis_mobil_id:
 *                 type: integer
 *               tanggal:
 *                 type: string
 *               metode_pembayaran_id:
 *                 type: integer
 *               tagihan:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Berhasil melakukan Booking, silahkan melanjutkan pembayaran melalui metode pembayaran yang anda pilih.
 */
router.post('/', authenticateToken, BookingController.createBooking);

// Get History - GET
/**
 * @swagger
 * /booking/history:
 *   get:
 *     summary: Ambil semua histori pemesanan.
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: start_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/history', authenticateToken, BookingController.bookingHistory);

// Get Booking List - GET
/**
 * @swagger
 * /booking/list:
 *   get:
 *     summary: Ambil semua list pemesanan yang aktif.
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: tanggal
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/list', authenticateToken, BookingController.bookingList);

// Payment - PUT
/**
 * @swagger
 * /booking/payment:
 *   put:
 *     summary: Melakukan pembayaran pemesanan.
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               booking_id:
 *                 type: integer
 *               status_pembayaran_id:
 *                 type: integer
 *               tanggal:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pembayaran berhasil!
 */
router.put('/payment', authenticateToken, BookingController.bookingPayment);

module.exports = router;
