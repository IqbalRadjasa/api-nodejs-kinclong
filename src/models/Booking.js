const dbPool = require('../config/database');

const createBooking = async (body) => {
  const users_query = `
      INSERT INTO booking (user_id, produk_id, jenis_mobil, tanggal, metode_pembayaran, tagihan, status_berlaku, status_pembayaran) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const [result] = await dbPool.execute(users_query, [body.user_id, body.produk_id, body.jenis_mobil, body.tanggal, body.metode_pembayaran, body.tagihan, body.status_berlaku, body.status_pembayaran]);

  return result;
};

const getAllData = async () => {
  const query = `SELECT * FROM produk`;
  const [result] = await dbPool.execute(query);
  return result;
};

const bookingPayment = (body) => {
  const last_queued_no = 'SELECT id, no_antrian FROM booking WHERE status_berlaku = "Not Expired" AND status_pembayaran = "Sudah Bayar" ORDER BY no_antrian DESC LIMIT 1';

  const new_queued_no = last_queued_no + 1;

  const payment_query = `UPDATE booking SET status_pembayaran = "${body.status_pembayaran}" WHERE id = ${body.booking_id}`;
  const exec = dbPool.execute(payment_query);

  return exec;
};

module.exports = {
  createBooking,
  getAllData,
  bookingPayment,
};
