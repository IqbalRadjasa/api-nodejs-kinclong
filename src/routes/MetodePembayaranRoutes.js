const express = require('express');
const router = express.Router();
const MetodePembayaranController = require('../controller/MetodePembayaranController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /metodePembayaran/:
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
router.post('/', authenticateToken, MetodePembayaranController.createData);

// Get All Data - GET
/**
 * @swagger
 * /metodePembayaran/:
 *   get:
 *     summary: Ambil semua data.
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
