const ProdukModel = require('../models/Produk');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');
const redisClient = require('../config/redis');
const crypto = require('crypto');
const { hashPassword, verifyPassword } = require('../utils/hashUtil');

const creatProduk = async (req, res) => {
  const { body } = req;

  if (!body.nama) {
    return res.status(400).json({
      status: 400,
      message: 'Data tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await ProdukModel.createProduk(body);

    res.status(200).json({
      status: 200,
      message: 'Produk created successfully',
      data: {
        nama: body.nama,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error.message,
    });
  }
};

const getAllData = async (req, res) => {
  try {
    const [result] = await ProdukModel.getAllData();

    if (!result) {
      return res.status(404).json({
        status: 404,
        message: 'No data has been found.',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Get all data successfull!',
      data: result,
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
    return res.status(404).json({ status: 404, message: 'Email not found' });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  await redisClient.setEx(`otp:${email}`, 300, otp);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Forgot Password OTP',
    text: `Your OTP code is: ${otp}`,
  });

  res.status(200).json({ status: 200, message: 'OTP has been sent to your email' });
};

const resetPassword = async (req, res) => {
  const { username, email, otp, newPassword } = req.body;

  const storedOtp = await redisClient.get(`otp:${email}`);

  if (!storedOtp) {
    return res.status(400).json({ status: 400, message: 'OTP expired or invalid' });
  }

  if (storedOtp !== otp) {
    return res.status(400).json({ status: 400, message: 'Invalid OTP' });
  }

  const hashedPassword = await hashPassword(newPassword);
  await UsersModel.resetPassword(username, email, hashedPassword);

  await redisClient.del(`otp:${email}`);

  res.status(200).json({ status: 200, message: 'Password has been reset' });
};

// const getByUserId = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [data] = await UsersModel.getByUserId(id);

//     res.json({
//       status: 200,
//       message: `Get User Found`,
//       data: data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Server error',
//       serverMessage: error,
//     });
//   }
// };

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await UsersModel.updateUser(body, id);

    res.status(200).json({
      status: 200,
      message: 'User updated successfully',
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

// const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     await UsersModel.deleteUser(id);

//     res.status(200).json({
//       status: 200,
//       message: 'User deleted successfully',
//       data: [],
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Server error',
//       serverMessage: error,
//     });
//   }
// };

module.exports = {
  creatProduk,
  getAllData,
  forgotPassword,
  resetPassword,
  updateUser,
  //   getByUserId,
  //   deleteUser,
};
