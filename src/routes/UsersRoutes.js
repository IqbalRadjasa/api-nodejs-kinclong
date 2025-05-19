const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Autentikasi Pengguna
 *     description: API untuk pengelolaan status pembayaran yang tersedia
 */

// CRUD Routes
// Register - POST
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Membuat akun baru.
 *     tags: 
 *       - Autentikasi Pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nohp:
 *                 type: string
 *               alamat:
 *                 type: string
 *               kecamatan:
 *                 type: string
 *               kelurahan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registrasi berhasil!
 */
router.post('/register', UsersController.createUser);

// Login - POST
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Masuk dengan akun yang terdaftar.
 *     tags: 
 *       - Autentikasi Pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Berhasil masuk!
 */
router.post('/login', UsersController.getUserByUsernamePassword);

// Update - PUT
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Memperbarui profil pengguna berdasarkan ID.
 *     tags: 
 *       - Autentikasi Pengguna
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
 *               nohp:
 *                 type: string
 *               alamat:
 *                 type: string
 *               kecamatan:
 *                 type: string
 *               kelurahan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui!
 */
router.put('/:id', authenticateToken, UsersController.updateUserProfile);

// Forgot Password
/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: >
 *       Fase Pertama Lupa Password:
 *       Masukkan email pengguna untuk mendapatkan Kode OTP.
 *     tags: 
 *       - Autentikasi Pengguna
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
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kode OTP berhasil dikirimkan ke Email!
 */
router.post('/forgot-password', UsersController.forgotPassword);

// Reset Password
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: >
 *       Fase Pertama Lupa Password:
 *       Fase Kedua Lupa Password= Masukkan Email, Kode OTP, dan Password Baru.
 *     tags: 
 *       - Autentikasi Pengguna
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
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kata Sandi berhasil diperbarui!
 */
router.post('/reset-password', UsersController.resetPassword);

module.exports = router;
