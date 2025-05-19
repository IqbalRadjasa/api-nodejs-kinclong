const express = require('express');
const router = express.Router();
const ProdukController = require('../controller/ProdukController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Produk
 *     description: API untuk pengelolaan produk yang tersedia
 */

// CRUD Routes
// Create - POST
/**
 * @swagger
 * /produk/:
 *   post:
 *     summary: Membuat data baru.
 *     tags: 
 *       - Produk
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
router.post('/', authenticateToken, ProdukController.createData);

// Get All Data - GET
/**
 * @swagger
 * /produk/:
 *   get:
 *     summary: Ambil semua data.
 *     tags: 
 *       - Produk
 *     responses:
 *       200:
 *         description: Data berhasil ditemukan!
 */
router.get('/', authenticateToken, ProdukController.getAllData);

// Update - PUT
/**
 * @swagger
 * /produk/{id}:
 *   put:
 *     summary: Memperbarui data berdasarkan ID.
 *     tags: 
 *       - Produk
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
router.put('/:id', authenticateToken, ProdukController.updateData);

// Delete - DELETE
/**
 * @swagger
 * /produk/{id}:
 *   delete:
 *     summary: Hapus data berdasarkan ID
 *     tags: 
 *       - Produk
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
router.delete('/:id', authenticateToken, ProdukController.deleteData);

module.exports = router;
