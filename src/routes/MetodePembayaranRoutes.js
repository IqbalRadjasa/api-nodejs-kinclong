const express = require('express');
const router = express.Router();
const MetodePembayaranController = require('../controller/MetodePembayaranController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Metode Pembayaran
 *     description: API untuk pengelolaan metode pembayaran yang tersedia
 */

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /metodePembayaran/:
 *   post:
 *     summary: Membuat data baru.
 *     tags: 
 *       - Metode Pembayaran
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data berhasil ditambahkan!
 */
router.post('/', authenticateToken, MetodePembayaranController.createData);

// Get All Data - GET
/**
 * @swagger
 * /metodePembayaran/:
 *   get:
 *     summary: Ambil semua data.
 *     tags: 
 *       - Metode Pembayaran
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/', authenticateToken, MetodePembayaranController.getAllData);

// Update - PUT
/**
 * @swagger
 * /metodePembayaran/{id}:
 *   put:
 *     summary: Memperbarui data berdasarkan ID.
 *     tags: 
 *       - Metode Pembayaran
 *     security:
 *       - BearerAuth: []
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data berhasil diperbarui!
 */
router.put('/:id', authenticateToken, MetodePembayaranController.updateData);

// Delete - DELETE
/**
 * @swagger
 * /metodePembayaran/{id}:
 *   delete:
 *     summary: Hapus data berdasarkan ID
 *     tags: 
 *       - Metode Pembayaran
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data berhasil dihapus
 */
router.delete('/:id', authenticateToken, MetodePembayaranController.deleteData);

module.exports = router;
