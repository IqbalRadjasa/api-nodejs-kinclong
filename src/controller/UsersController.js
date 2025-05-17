const UsersModel = require('../models/Users');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');
const crypto = require('crypto');
const { hashPassword, verifyPassword } = require('../utils/hashUtil');

const createUser = async (req, res) => {
  const { body } = req;

  if (!body.username || !body.email || !body.password || !body.nohp || !body.alamat || !body.kecamatan || !body.kelurahan) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    const hashedPassword = await hashPassword(body.password);

    body.password = hashedPassword;

    await UsersModel.createUser(body);

    res.status(200).json({
      status: 200,
      message: 'Registrasi berhasil!',
      data: {
        username: body.username,
        email: body.email,
        nohp: body.nohp,
        alamat: body.alamat,
        kecamatan: body.kecamatan,
        kelurahan: body.kelurahan,
      },
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      const duplicateField = error.sqlMessage.includes('username') ? 'Username' : 'Email';
      return res.status(400).json({
        status: 400,
        message: `${duplicateField} telah dipakai.`,
      });
    }

    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const getUserByUsernamePassword = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Nama Pengguna dan Kata Sandi diperlukan!',
        data: null,
      });
    }

    const [user] = await UsersModel.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Pengguna tidak terdaftar.',
        data: null,
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: 'Kata Sandi salah!',
        data: null,
      });
    }

    delete user.password;

    const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      status: 200,
      message: 'Berhasil masuk!',
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UsersModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ status: 404, message: 'Email tidak ditemukan' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  await UsersModel.createOtp(email, otp);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Lupa Kata Sandi',
    text: `Kode OTP kamu adalah: ${otp}, gunakan Kode OTP tersebut untuk melakukan pembuatan ulang Kata Sandi.`,
  });

  res.status(200).json({ status: 200, message: 'Kode OTP berhasil dikirimkan ke Email!' });
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const storedOtp = await UsersModel.verifyOtp(email);

  if (!storedOtp) {
    return res.status(400).json({ status: 400, message: 'Kode OTP tidak berlaku atau tidak sesuai!' });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ status: 400, message: 'Kode OTP tidak sesuai!' });
  }

  const hashedPassword = await hashPassword(newPassword);
  await UsersModel.resetPassword(email, hashedPassword);

  await UsersModel.deleteOtp(email);

  res.status(200).json({ status: 200, message: 'Kata Sandi berhasil dibuat ulang!' });
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await UsersModel.updateUser(body, id);

    res.status(200).json({
      status: 200,
      message: 'Profil berhasil diperbarui!',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error,
    });
  }
};

module.exports = {
  createUser,
  getUserByUsernamePassword,
  forgotPassword,
  resetPassword,
  updateUserProfile,
};
