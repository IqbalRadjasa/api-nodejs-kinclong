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

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await dbPool.execute(query, [email]);
  return rows;
};

const resetPassword = async (username, email, hashedPassword) => {
  const query = `
    UPDATE users SET password = ? WHERE username = ? and email = ? 
  `;
  const [result] = await dbPool.execute(query, [hashedPassword, username, email]);

  if (result.affectedRows === 0) {
    throw new Error('User not found or invalid username/email combination');
  }

  return result;
};

const updateUser = (body, id) => {
  const query = `UPDATE users SET no_hp = "${body.nohp}", alamat = "${body.alamat}", kecamatan = "${body.kecamatan}", kelurahan = "${body.kelurahan}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserByEmail,
  resetPassword,
  updateUser,
};
