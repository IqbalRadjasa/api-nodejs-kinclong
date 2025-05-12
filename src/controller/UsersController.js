const UsersModel = require('../models/Users');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');
const redisClient = require('../config/redis');
const crypto = require('crypto');
const { hashPassword, verifyPassword } = require('../utils/hashUtil');

const creatUser = async (req, res) => {
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
      message: 'User created successfully',
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
        message: `${duplicateField} is already been used.`,
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
        message: 'Username and password are required!',
        data: null,
      });
    }

    const [user] = await UsersModel.getUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found!',
        data: null,
      });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid password!',
        data: null,
      });
    }

    delete user.password;

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      status: 200,
      message: 'Login successful',
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
  creatUser,
  getUserByUsernamePassword,
  forgotPassword,
  resetPassword,
  updateUser,
  //   getByUserId,
  //   deleteUser,
};
