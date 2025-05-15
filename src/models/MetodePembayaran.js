const dbPool = require('../config/database');

const createData = async (body) => {
  const users_query = `
      INSERT INTO metode_pembayaran (nama) 
      VALUES (?)
    `;

    // body.nama = "testing"
  const [result] = await dbPool.execute(users_query, [body.nama]);

  return result;
};

const getAllData = async () => {
  const query = `SELECT * FROM metode_pembayaran`;
  const [rows] = await dbPool.execute(query);
  return rows;
};

const updateData = (body, id) => {
  const query = `UPDATE metode_pembayaran SET nama = "${body.nama}" WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

const deleteData = (id) => {
  const query = `DELETE FROM metode_pembayaran WHERE id = ${id}`;
  const exec = dbPool.execute(query);

  return exec;
};

module.exports = {
  createData,
  getAllData,
  updateData,
  deleteData,
};
