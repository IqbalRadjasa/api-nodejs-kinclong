const dbPool = require('../config/database');

const createJenisMobil = async (body) => {
  const users_query = `
      INSERT INTO jenis_mobil (nama) 
      VALUES (?)
    `;
  const [result] = await dbPool.execute(users_query, [body.nama]);

  return result;
};

const getAllData = async () => {
  const query = `SELECT * FROM jenis_mobil`;
  const [rows] = await dbPool.execute(query);
  return rows;
};

const updateJenisMobil = (body, id) => {
  const query = `UPDATE jenis_mobil SET nama = "${body.nama}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

const deleteJenisMobil = (id) => {
  const query = `DELETE FROM jenis_mobil WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

module.exports = {
  createJenisMobil,
  getAllData,
  updateJenisMobil,
  deleteJenisMobil,
};
