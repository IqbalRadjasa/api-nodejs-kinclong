const dbPool = require('../config/database');

const createBooking = async (body) => {
  const users_query = `
      INSERT INTO booking (user_id, produk_id, jenis_mobil_id, tanggal, metode_pembayaran_id, tagihan, status_berlaku_id, status_pembayaran_id) 
      VALUES (?, ?, ?, ?, ?, ?, 1, 2)
    `;
  const [result] = await dbPool.execute(users_query, [body.user_id, body.produk_id, body.jenis_mobil_id, body.tanggal, body.metode_pembayaran_id, body.tagihan]);

  return result;
};

const bookingHistory = async (user_id, start_date, end_date) => {
  const query = `
    SELECT 
      u.username AS nama_pengguna, 
      p.nama AS produk, 
      jm.nama AS jenis_mobil, 
      b.tanggal, 
      b.tagihan, 
      mp.nama as metode_pembayaran, 
      sb.nama AS status_berlaku, 
      sp.nama AS status_pembayaran, 
      b.no_antrian 
    FROM booking b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN produk p ON b.produk_id = p.id
    LEFT JOIN jenis_mobil jm ON b.jenis_mobil_id = jm.id
    LEFT JOIN metode_pembayaran mp ON b.metode_pembayaran_id = mp.id
    LEFT JOIN status_berlaku sb ON b.status_berlaku_id = sb.id
    LEFT JOIN status_pembayaran sp ON b.status_pembayaran_id = sp.id
    WHERE u.id = ? 
      AND (
        (DATE(b.tanggal) >= ? OR ? IS NULL)
        AND (DATE(b.tanggal) <= ? OR ? IS NULL)
      )
    ORDER BY b.tanggal DESC;
    `;

  const date_start = start_date || null;
  const date_end = end_date || null;

  const [rows] = await dbPool.execute(query, [user_id, date_start, date_start, date_end, date_end]);

  return rows;
};

const bookingList = async (username, tanggal) => {
  const query = `
    SELECT b.no_antrian, u.username, jm.nama, b.tanggal
    FROM booking b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN jenis_mobil jm ON b.jenis_mobil_id = jm.id
    WHERE 
      b.status_pembayaran_id = 1 
      AND b.no_antrian IS NOT NULL 
      AND (
        (u.username LIKE CONCAT('%', ?, '%') OR ? IS NULL) 
        AND (DATE(b.tanggal) = DATE(?) OR ? IS NULL)
      )
    ORDER BY b.no_antrian ASC;
  `;

  const username_null = username || null;
  const tanggal_null = tanggal || new Date().toISOString().split('T')[0];

  const [rows] = await dbPool.execute(query, [username_null, username_null, tanggal_null, tanggal_null]);

  return rows;
};

const bookingPayment = async (body) => {
  try {
    const last_queued_no_query = `
      SELECT no_antrian 
      FROM booking 
      WHERE status_berlaku_id = 1 
      AND status_pembayaran_id = 1
      AND DATE(tanggal) = ? 
      ORDER BY no_antrian DESC LIMIT 1
    `;
    const [rows] = await dbPool.execute(last_queued_no_query, [body.tanggal]);

    const last_queued_no = rows.length > 0 ? parseInt(rows[0].no_antrian) : 0;
    const new_queued_no = last_queued_no + 1;

    const payment_query = `
      UPDATE booking 
      SET status_pembayaran_id = ?, no_antrian = ? 
      WHERE id = ?
    `;
    const [exec] = await dbPool.execute(payment_query, [body.status_pembayaran_id, new_queued_no, body.booking_id]);

    return exec;
  } catch (error) {
    console.error('Error in bookingPayment:', error.message);
    throw error;
  }
};

module.exports = {
  createBooking,
  bookingHistory,
  bookingPayment,
  bookingList,
};
