const dbPool = require('../config/database');

const createData = async (body) => {
  const users_query = `
      INSERT INTO produk (nama) 
      VALUES (?)
    `;
  const [result] = await dbPool.execute(users_query, [body.nama]);

  return result;
};

const getAllData = async () => {
  const query = `SELECT * FROM produk`;
  const [result] = await dbPool.execute(query);
  return result;
};

const updateData = (body, id) => {
  const query = `UPDATE produk SET nama = "${body.nama}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

const deleteData = (id) => {
  const query = `DELETE FROM produk WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

module.exports = {
  createData,
  getAllData,
  updateData,
  deleteData,
};
