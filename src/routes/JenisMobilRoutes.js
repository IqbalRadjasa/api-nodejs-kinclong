const express = require('express');
const router = express.Router();
const JenisMobilController = require('../controller/JenisMobilController');
const authenticateToken = require('../middleware/authMiddleware');

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /jenisMobil/:
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
router.post('/', authenticateToken, JenisMobilController.createData);

// Get All Data - GET
/**
 * @swagger
 * /jenisMobil/:
 *   get:
 *     summary: Ambil semua data.
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/', authenticateToken, JenisMobilController.getAllData);

// Update - PUT
/**
 * @swagger
 * /jenisMobil/{id}:
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
router.put('/:id', authenticateToken, JenisMobilController.updateData);

// Delete - DELETE
/**
 * @swagger
 * /jenisMobil/{id}:
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
router.delete('/:id', authenticateToken, JenisMobilController.deleteData);

module.exports = router;
