const express = require('express');
const router = express.Router();
const StatusBerlakuController = require('../controller/StatusBerlakuController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /statusBerlaku/:
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
router.post('/', authenticateToken, StatusBerlakuController.createData);

// Get All Data - GET
/**
 * @swagger
 * /statusBerlaku/:
 *   get:
 *     summary: Ambil semua data.
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/', authenticateToken, StatusBerlakuController.getAllData);

// Update - PUT
/**
 * @swagger
 * /statusBerlaku/{id}:
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
router.put('/:id', authenticateToken, StatusBerlakuController.updateData);

// Delete - DELETE
/**
 * @swagger
 * /statusBerlaku/{id}:
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
router.delete('/:id', authenticateToken, StatusBerlakuController.deleteData);

module.exports = router;
