const dbPool = require('../config/database');

const createBooking = async (body) => {
  const users_query = `
      INSERT INTO booking (user_id, produk_id, jenis_mobil, tanggal, metode_pembayaran, tagihan, status_berlaku, status_pembayaran) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
  createBooking,
  getAllData,
  updateProduk,
  deleteProduk,
};
