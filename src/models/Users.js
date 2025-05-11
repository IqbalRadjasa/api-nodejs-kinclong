const dbPool = require('../config/database');

const createUser = async (body) => {
  const users_query = `
      INSERT INTO users (username, email, password, no_hp, alamat, kecamatan, kelurahan) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const [result] = await dbPool.execute(users_query, [body.username, body.email, body.password, body.nohp, body.alamat, body.kecamatan, body.kelurahan]);

  return result;
};

const getUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  const [rows] = await dbPool.execute(query, [username]);
  return rows;
};

// const getByUserId = (id) => {
//   const query = `SELECT u.username, u.email, ud.address, ud.subdistrict, ud.urban_village FROM users u
//                   LEFT JOIN user_detail ud ON u.id = ud.user_id WHERE u.id = ${id}`;
//   const exec = dbPool.execute(query);

//   return exec;
// };

const updateUser = (body, id) => {
  const query = `UPDATE users SET no_hp = "${body.nohp}", alamat = "${body.alamat}", kecamatan = "${body.kecamatan}", kelurahan = "${body.kelurahan}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

// const deleteUser = (id) => {
//   const query = `DELETE FROM users WHERE id = ${id}`;
//   const exec = dbPool.execute(query);

//   return exec;
// };

module.exports = {
  createUser,
  getUserByUsername,
  updateUser,
  //   getByUserId,
  //   deleteUser,
};
