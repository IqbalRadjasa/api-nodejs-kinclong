const UsersModel = require('../models/Users');
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
    res.status(500).json({
      status: 500,
      message: 'Server error',
      serverMessage: error,
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

    res.status(200).json({
      status: 200,
      message: 'Login successful',
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

// const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { body } = req;

//   try {
//     await UsersModel.updateUser(body, id);

//     res.status(200).json({
//       status: 200,
//       message: 'User updated successfully',
//       data: {
//         id: id,
//         ...body,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 500,
//       message: 'Server error',
//       serverMessage: error,
//     });
//   }
// };

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
  //   getByUserId,
  //   updateUser,
  //   deleteUser,
};
