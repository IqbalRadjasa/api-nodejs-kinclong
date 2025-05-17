const express = require('express');
const router = express.Router();
const StatusPembayaranController = require('../controller/StatusPembayaranController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /statusPembayaran/:
 *   post:
 *     summary: Membuat data baru.
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
router.post('/', authenticateToken, StatusPembayaranController.createData);

// Get All Data - GET
/**
 * @swagger
 * /statusPembayaran/:
 *   get:
 *     summary: Ambil semua data.
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/', authenticateToken, StatusPembayaranController.getAllData);

// Update - PUT
/**
 * @swagger
 * /statusPembayaran/{id}:
 *   put:
 *     summary: Memperbarui data berdasarkan ID.
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
router.put('/:id', authenticateToken, StatusPembayaranController.updateData);

// Delete - DELETE
/**
 * @swagger
 * /statusPembayaran/{id}:
 *   delete:
 *     summary: Hapus data berdasarkan ID
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
router.delete('/:id', authenticateToken, StatusPembayaranController.deleteData);

module.exports = router;
