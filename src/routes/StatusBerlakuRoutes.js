const express = require('express');
const router = express.Router();
const StatusBerlakuController = require('../controller/StatusBerlakuController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Status Berlaku
 *     description: API untuk pengelolaan status berlaku yang tersedia
 */

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /statusBerlaku/:
 *   post:
 *     summary: Membuat data baru.
 *     tags: 
 *       - Status Berlaku
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
 *     tags: 
 *       - Status Berlaku
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
 *     tags: 
 *       - Status Berlaku
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
 *     tags: 
 *       - Status Berlaku
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
