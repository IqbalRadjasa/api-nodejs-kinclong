const dbPool = require('../config/database');

const createProduk = async (body) => {
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

const updateProduk = (body, id) => {
  // UPDATE
  const query = `UPDATE produk SET nama = "${body.nama}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

const deleteProduk = (id) => {
  const query = `DELETE FROM produk WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

module.exports = {
  createProduk,
  getAllData,
  updateProduk,
  deleteProduk,
};
